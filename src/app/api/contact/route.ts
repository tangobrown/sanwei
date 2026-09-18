import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

/** Where enquiries are delivered. Overridable so staging can divert them. */
const TO_ADDRESS = process.env.CONTACT_TO_ADDRESS ?? "sales@sanwei-asia.com";
const FROM_ADDRESS = process.env.CONTACT_FROM_ADDRESS ?? "website@sanwei-asia.com";

/**
 * A small in-memory rate limit. It is per-instance rather than global, which
 * is enough to blunt casual abuse; move it to a shared store if the site is
 * deployed across several long-lived instances.
 */
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) {
    for (const [existingKey, times] of hits) {
      if (times.every((time) => now - time >= RATE_LIMIT_WINDOW_MS)) hits.delete(existingKey);
    }
  }

  return recent.length > RATE_LIMIT_MAX;
}

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  if (isRateLimited(clientKey(request))) {
    return NextResponse.json(
      { error: "Too many enquiries from this address. Please try again shortly, or call us." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "form");
      fieldErrors[field] ??= issue.message;
    }
    return NextResponse.json({ error: "Please check the highlighted fields.", fieldErrors }, { status: 400 });
  }

  const values = parsed.data;

  // The honeypot is filled, so this is a bot. Answer as though it succeeded.
  if (values.website) {
    return NextResponse.json({ ok: true });
  }

  const token = process.env.POSTMARK_SERVER_TOKEN;
  if (!token) {
    console.error("POSTMARK_SERVER_TOKEN is not set; the enquiry was not delivered.");
    return NextResponse.json(
      { error: "We could not send your enquiry just now. Please email or call us instead." },
      { status: 500 },
    );
  }

  const rows: [string, string][] = [
    ["Name", values.name],
    ["Company", values.company || "—"],
    ["Email", values.email],
    ["Phone", values.phone || "—"],
    ["Enquiry type", values.enquiry_type ?? "—"],
  ];

  const textBody = [...rows.map(([label, value]) => `${label}: ${value}`), "", "Message:", values.message].join("\n");

  const htmlBody = `
    <table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:4px 12px 4px 0;color:#5E839B">${label}</td><td style="padding:4px 0">${escapeHtml(
              value,
            )}</td></tr>`,
        )
        .join("")}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(values.message)}</p>
  `;

  try {
    const response = await fetch("https://api.postmarkapp.com/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Postmark-Server-Token": token,
      },
      body: JSON.stringify({
        From: FROM_ADDRESS,
        To: TO_ADDRESS,
        ReplyTo: values.email,
        Subject: `Website enquiry from ${values.name}${values.company ? ` (${values.company})` : ""}`,
        TextBody: textBody,
        HtmlBody: htmlBody,
        MessageStream: process.env.POSTMARK_MESSAGE_STREAM ?? "outbound",
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Postmark rejected the enquiry:", response.status, detail);
      return NextResponse.json(
        { error: "We could not send your enquiry just now. Please email or call us instead." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Postmark request failed:", error);
    return NextResponse.json(
      { error: "We could not send your enquiry just now. Please email or call us instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
