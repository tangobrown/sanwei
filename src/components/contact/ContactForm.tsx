"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight } from "@/components/ui/Icons";
import { enquiryTypes } from "@/lib/contact-schema";
import { offices } from "@/content/site";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full box-border border border-rule bg-paper px-4 py-[14px] text-[16px] text-ink outline-none transition-colors duration-[180ms] placeholder:text-steel-light focus:border-steel focus:bg-white";

const labelClass = "t-label mb-2 block text-steel";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const successHeading = useRef<HTMLHeadingElement>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setFormError(null);
    setFieldErrors({});

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      enquiry_type: String(formData.get("enquiry_type") ?? ""),
      message: String(formData.get("message") ?? ""),
      consent: formData.get("consent") === "on",
      website: String(formData.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: { ok?: boolean; error?: string; fieldErrors?: Record<string, string> } = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        setFieldErrors(data.fieldErrors ?? {});
        setFormError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      // Move focus to the confirmation so screen readers land on it.
      requestAnimationFrame(() => successHeading.current?.focus());
    } catch {
      setFormError("We could not reach the server. Please try again, or call us.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex min-h-[420px] flex-col justify-center border-x border-rule bg-white p-[72px] max-md:border-x-0 max-md:border-t max-md:p-8">
        <h2 ref={successHeading} tabIndex={-1} className="font-display text-[clamp(32px,4vw,44px)] outline-none">
          Thank you.
        </h2>
        <p className="mt-5 max-w-[400px] text-[16px] leading-[1.7] text-ink-soft">
          Your enquiry is with our team. We aim to respond within one working day, Taipei or UK time.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 self-start text-[14px] font-semibold text-accent transition-colors duration-[180ms] hover:text-ink"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const errorFor = (field: string) => fieldErrors[field];
  const borderFor = (field: string) => (errorFor(field) ? "!border-accent" : "");

  return (
    <div className="border-x border-rule bg-white p-[72px] max-md:border-x-0 max-md:border-t max-md:p-8">
      <h2 className="font-display text-[clamp(30px,3.6vw,40px)]">Send an enquiry</h2>
      <p className="mt-3 text-[15px] text-steel">Fields marked with an asterisk are required.</p>

      <form onSubmit={onSubmit} noValidate className="mt-9 flex flex-col gap-[22px]">
        {/* Honeypot: hidden from people, tempting to bots. */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid gap-[22px] sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Jane Doe"
              aria-invalid={Boolean(errorFor("name"))}
              aria-describedby={errorFor("name") ? "name-error" : undefined}
              className={`${fieldClass} ${borderFor("name")}`}
            />
            {errorFor("name") ? (
              <p id="name-error" className="mt-2 text-[13px] text-accent">
                {errorFor("name")}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="company" className={labelClass}>
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Company Ltd"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              aria-invalid={Boolean(errorFor("email"))}
              aria-describedby={errorFor("email") ? "email-error" : undefined}
              className={`${fieldClass} ${borderFor("email")}`}
            />
            {errorFor("email") ? (
              <p id="email-error" className="mt-2 text-[13px] text-accent">
                {errorFor("email")}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+44 1297 631306"
              className={fieldClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="enquiry_type" className={labelClass}>
            Enquiry type
          </label>
          <select id="enquiry_type" name="enquiry_type" defaultValue={enquiryTypes[0]} className={fieldClass}>
            {enquiryTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            Your message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            placeholder="Part, volume, target market, timescale, and anything else that helps us understand the project."
            aria-invalid={Boolean(errorFor("message"))}
            aria-describedby={errorFor("message") ? "message-error" : undefined}
            className={`${fieldClass} ${borderFor("message")}`}
          />
          {errorFor("message") ? (
            <p id="message-error" className="mt-2 text-[13px] text-accent">
              {errorFor("message")}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="consent" className="flex items-start gap-3 text-[14px] leading-[1.6]">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              required
              aria-invalid={Boolean(errorFor("consent"))}
              aria-describedby={errorFor("consent") ? "consent-error" : undefined}
              className="mt-[3px] h-4 w-4 shrink-0 accent-[#D84242]"
            />
            <span>I am happy for Sanwei to store these details in order to respond to my enquiry.</span>
          </label>
          {errorFor("consent") ? (
            <p id="consent-error" className="mt-2 text-[13px] text-accent">
              {errorFor("consent")}
            </p>
          ) : null}
        </div>

        {status === "error" && formError ? (
          <div role="alert" className="border border-accent bg-paper p-4 text-[14px] leading-[1.6] text-ink-soft">
            <p className="font-semibold text-accent">{formError}</p>
            <p className="mt-2">
              You can also call us on{" "}
              <a href={offices.asia.phoneHref} className="font-semibold hover:text-accent">
                {offices.asia.phone}
              </a>{" "}
              (Asia) or{" "}
              <a href={offices.uk.phoneHref} className="font-semibold hover:text-accent">
                {offices.uk.phone}
              </a>{" "}
              (UK).
            </p>
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-5">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center gap-[10px] rounded-pill bg-ink px-[30px] py-4 text-[15px] font-semibold text-white transition-colors duration-[180ms] enabled:hover:bg-accent disabled:opacity-70"
          >
            {status === "submitting" ? "Sending…" : "Send enquiry"}
            <ArrowRight size={20} />
          </button>
          <p className="text-[13px] text-steel">Delivered by Postmark</p>
        </div>
      </form>
    </div>
  );
}
