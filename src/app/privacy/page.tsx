import type { Metadata } from "next";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { CtaDirectRoutes } from "@/components/sections/CtaDirectRoutes";
import { PillLink } from "@/components/ui/Buttons";
import { privacyPolicy } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Sanwei Group collects, uses and discloses the personal information you share with us, covering log data, cookies, communications and security.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const { intro, sections } = privacyPolicy;

  return (
    <>
      <InteriorHero eyebrow="Legal" title="Privacy policy" />

      <section className="pad-x bg-paper py-24 max-md:py-14">
        <div className="max-w-[760px]">
          {intro.map((paragraph) => (
            <p key={paragraph} className="mb-11 text-[17px] leading-[1.75]">
              {paragraph}
            </p>
          ))}

          {sections.map((section) => (
            <div key={section.heading} className="mb-11 last:mb-0">
              <h2 className="mb-4 font-display text-[clamp(24px,2.6vw,30px)] leading-[1.2]">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mb-4 text-[16px] leading-[1.8] last:mb-0">
                  {paragraph}
                </p>
              ))}
              {section.cta ? (
                <PillLink href={section.cta.href} variant="ink" withArrow className="mt-6 px-7 py-[15px]">
                  {section.cta.label}
                </PillLink>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <CtaDirectRoutes heading="Find quality components fast." />
    </>
  );
}
