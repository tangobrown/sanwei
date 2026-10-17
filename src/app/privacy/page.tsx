import type { Metadata } from "next";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { CtaDirectRoutes } from "@/components/sections/CtaDirectRoutes";
import { offices } from "@/content/site";
import { privacyPolicy } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Sanwei Asia collects, uses and protects the personal data you share with us.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const { sections } = privacyPolicy;

  return (
    <>
      <InteriorHero eyebrow="Legal" title="Privacy policy" />

      <section className="pad-x bg-paper py-24 max-md:py-14">
        <div className="max-w-[760px]">
          {sections.length > 0 ? (
            sections.map((section) => (
              <div key={section.heading} className="mb-12 last:mb-0">
                <h2 className="mb-4 font-display text-[clamp(24px,2.6vw,30px)] leading-[1.2]">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mb-4 text-[16px] leading-[1.8] last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))
          ) : (
            <p className="text-[16px] leading-[1.8]">
              Our privacy policy is being brought across to this site. In the meantime, if you have a question about
              how we handle your data, email us at{" "}
              <a
                href={`mailto:${offices.uk.email}`}
                className="text-steel-deep underline underline-offset-4 transition-colors duration-[180ms] hover:text-accent"
              >
                {offices.uk.email}
              </a>
              .
            </p>
          )}
        </div>
      </section>

      <CtaDirectRoutes heading="Find quality components fast." />
    </>
  );
}
