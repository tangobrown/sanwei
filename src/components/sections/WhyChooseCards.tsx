import Link from "next/link";
import { emphasise } from "@/lib/emphasis";

export type WhyChooseReason = {
  text: string;
  /** Certifications get the accent treatment instead of the ink card. */
  certification?: boolean;
};

/**
 * The "why choose us" reasons as a card grid.
 *
 * The counts (5, 6, 7) do not divide evenly into three, so the last card
 * stretches across whatever columns remain. That span has to be recomputed per
 * breakpoint, since the column count changes 3 → 2 → 1.
 */
function lastCardSpan(count: number) {
  const remainderAt = (columns: number) => {
    const inLastRow = count % columns;
    return inLastRow === 0 ? 1 : columns - inLastRow + 1;
  };
  // Written as literal class names so Tailwind picks them up.
  const lg = { 1: "", 2: "lg:col-span-2", 3: "lg:col-span-3" }[remainderAt(3)] ?? "";
  const sm = { 1: "", 2: "sm:col-span-2" }[remainderAt(2)] ?? "";
  return `${sm} ${lg}`.trim();
}

export function WhyChooseCards({
  heading,
  reasons,
  linkLabel,
  linkHref = "/contact",
}: {
  heading: string;
  reasons: WhyChooseReason[];
  linkLabel: string;
  linkHref?: string;
}) {
  const span = lastCardSpan(reasons.length);

  return (
    <section className="pad-x border-y border-rule bg-white py-[104px] max-md:py-14">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <h2 className="max-w-[720px] font-display text-[clamp(36px,4.6vw,56px)] leading-[1.05] tracking-[-0.01em]">
          {heading}
        </h2>
        <Link
          href={linkHref}
          className="border-b border-accent pb-[3px] text-[15px] font-semibold text-accent transition-colors duration-[180ms] hover:border-ink hover:text-ink"
        >
          {linkLabel}
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason, i) => {
          const last = i === reasons.length - 1;
          const index = String(i + 1).padStart(2, "0");

          return (
            <div
              key={reason.text}
              className={`flex min-h-[230px] flex-col justify-between px-8 pb-10 pt-9 ${
                reason.certification ? "bg-accent text-white" : "bg-ink text-on-dark"
              } ${last ? span : ""}`}
            >
              <p
                className={`text-[13px] uppercase tracking-[0.16em] ${
                  reason.certification ? "text-white/80" : "text-steel-light"
                }`}
              >
                {reason.certification ? `${index} · Certified` : index}
              </p>
              {reason.certification ? (
                <p className="font-display text-[clamp(40px,4.4vw,54px)] leading-[1.05]">{reason.text}</p>
              ) : (
                <p className="font-display text-[26px] leading-[1.25]">{emphasise(reason.text)}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
