import type { Metadata } from "next";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { ClientReferenceBand } from "@/components/sections/Bands";
import { CtaDirectRoutes } from "@/components/sections/CtaDirectRoutes";
import { PillLink } from "@/components/ui/Buttons";
import { referenceByRole } from "@/content/site";
import { processSteps } from "@/content/process";

export const metadata: Metadata = {
  title: "Our process, from NDA to delivery",
  description:
    "Eight stages, from the NDA that protects your design to the shipment that lands on your dock. See how Sanwei runs a sourcing or manufacturing project in Asia.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <>
      <InteriorHero
        eyebrow="How we work"
        title="Our process"
        subline="A tried-and-tested method for sourcing success."
        cta={{ label: "Get in touch", href: "/contact" }}
      />

      <section className="pad-x bg-paper py-24 max-md:py-14">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-[760px] font-display text-[clamp(30px,3.4vw,40px)] leading-[1.15]">
            We realise that every project is different, so there&rsquo;s always a slight variation in what might be the
            best approach. But generally speaking, working with us will look something like this.
          </h2>
          <PillLink href="/contact" variant="accent" withArrow className="px-7 py-[15px] hover:bg-ink">
            Get started
          </PillLink>
        </div>

        {/*
         * Eight stages, 4 across. It steps to 2 then 1 and never 3, because 8
         * does not divide into 3 and would leave an orphan.
         */}
        <ol className="grid gap-y-14 bg-ink p-14 text-on-dark max-md:p-[clamp(28px,4vw,48px)] sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <li key={step.title} className="relative border-t border-rule-dark pr-6 pt-[30px] max-sm:pr-0">
              <span aria-hidden="true" className="absolute left-0 top-0 h-[3px] w-3 -translate-y-[2px] bg-accent-soft" />
              <p aria-hidden="true" className="font-display text-[44px] leading-none text-accent-soft">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-[18px] font-bold leading-[1.3]">{step.title}</h3>
              <p className="mt-3 text-[14px] leading-[1.7] text-on-dark-dim">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <ClientReferenceBand reference={referenceByRole.purchasingManager} />

      <CtaDirectRoutes heading="Find quality components fast." />
    </>
  );
}
