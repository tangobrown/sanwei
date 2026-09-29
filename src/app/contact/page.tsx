import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { OfficeMap } from "@/components/contact/OfficeMap";
import { offices, salesEmail } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Tell us what you need sourced, made or managed. Our team in Taipei and the UK will come back to you with a route forward.",
  alternates: { canonical: "/contact" },
};

const detailGroups = [
  {
    label: "Phone",
    rows: [
      { label: "Asia", value: offices.asia.phone, href: offices.asia.phoneHref },
      { label: "United Kingdom", value: offices.uk.phone, href: offices.uk.phoneHref },
    ],
  },
  {
    label: "Email",
    rows: [
      { label: "Support", value: offices.asia.email, href: `mailto:${offices.asia.email}` },
      { label: "Sales", value: salesEmail, href: `mailto:${salesEmail}` },
    ],
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="pad-x border-b border-rule pb-14 pt-20 max-md:pb-10 max-md:pt-14">
        <p className="t-eyebrow mb-6 text-steel">Contact</p>
        <h1 className="t-page-title mb-6">Get in touch with Sanwei</h1>
        <p className="t-hero-sub max-w-[760px] text-accent">
          Tell us what you need sourced, made or managed. Our team in Taipei and the UK will come back to you with a
          route forward.
        </p>
      </section>

      <section className="pad-x grid border-b border-rule lg:grid-cols-2">
        <div className="py-[72px] pr-14 max-lg:pr-0 max-md:py-8">
          {detailGroups.map((group) => (
            <div key={group.label} className="mb-10">
              <h2 className="t-label border-b border-rule pb-3 text-steel">{group.label}</h2>
              {group.rows.map((row) => (
                <div key={row.label} className="flex flex-wrap items-baseline justify-between gap-3 py-4">
                  <span className="text-[14px] text-steel">{row.label}</span>
                  <a
                    href={row.href}
                    className="text-[20px] font-semibold transition-colors duration-[180ms] hover:text-accent"
                  >
                    {row.value}
                  </a>
                </div>
              ))}
            </div>
          ))}

          <div>
            <h2 className="t-label border-b border-rule pb-3 text-steel">Office Addresses</h2>
            <div className="grid gap-8 pt-6 sm:grid-cols-2">
              {[offices.asia, offices.uk].map((office) => (
                <div key={office.name}>
                  <h3 className="mb-3 font-display text-[28px]">{office.name}</h3>
                  <address className="text-[15px] not-italic leading-[1.75] text-ink-soft">
                    {office.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                    <a
                      href={`mailto:${office.email}`}
                      className="mt-1 block text-accent transition-colors duration-[180ms] hover:text-ink"
                    >
                      {office.email}
                    </a>
                  </address>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ContactForm />
      </section>

      <OfficeMap />
    </>
  );
}
