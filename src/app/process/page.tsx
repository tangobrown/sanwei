import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ClientReferenceBand, CtaBand } from "@/components/sections/Bands";
import { PillLink } from "@/components/ui/Buttons";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { referenceByRole } from "@/content/site";
import { processSteps } from "@/content/process";

export const metadata: Metadata = {
  title: "Our process",
  description:
    "Eight stages, from the NDA that protects your design to the shipment that lands on your dock. A tried-and-tested method for sourcing success.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <>
      <Hero
        eyebrow="How we work"
        title="Our process"
        subline="A tried-and-tested method for sourcing success."
        slides={[{ brief: "Inspection bench / metrology, wide" }]}
      />

      <section className="pad-x grid items-start gap-12 pb-[72px] pt-[88px] max-md:pb-14 max-md:pt-14 max-sm:pb-11 max-sm:pt-11 lg:grid-cols-2 lg:gap-20">
        <h2 className="t-h2-major">
          We realise that every project is different, so there&rsquo;s always a slight variation in what might be the
          best approach. But generally speaking, working with us will look something like this.
        </h2>
        <p className="t-lead pt-[10px] text-ink-soft">
          Eight stages, from the NDA that protects your design to the shipment that lands on your dock. You keep one
          point of contact throughout.
        </p>
      </section>

      <ol className="pad-x border-t border-rule">
        {processSteps.map((step, i) => (
          <li
            key={step.title}
            className="grid items-start gap-8 border-b border-rule py-12 max-md:py-8 lg:grid-cols-[120px_1fr_1fr] lg:gap-16"
          >
            <span aria-hidden="true" className="font-display text-[clamp(44px,5vw,64px)] leading-none text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="text-[20px] font-bold leading-[1.35]">{step.title}</h2>
              <p className="mt-3 text-[16px] leading-[1.75] text-ink-soft lg:hidden">{step.body}</p>
            </div>
            <p className="hidden text-[16px] leading-[1.75] text-ink-soft lg:block">{step.body}</p>
          </li>
        ))}
      </ol>

      {/* Alternating imagery, sitting between the sequence and the assurance band. */}
      <section className="pad-x grid gap-5 py-20 max-md:py-14 max-sm:py-11 lg:grid-cols-3">
        <ImageSlot brief="NDA and drawing on a desk" sizes="(max-width: 1024px) 100vw, 33vw" className="h-[280px]" />
        <ImageSlot brief="Engineering assessment, screen and team" sizes="(max-width: 1024px) 100vw, 33vw" className="h-[280px]" />
        <ImageSlot brief="Packed parts leaving the factory" sizes="(max-width: 1024px) 100vw, 33vw" className="h-[280px]" />
      </section>

      <section className="pad-x bg-paper-tint py-20 text-center max-md:py-14 max-sm:py-11">
        <PillLink href="/contact" variant="ink" withArrow className="px-7 py-[15px]">
          Get started
        </PillLink>
      </section>

      <ClientReferenceBand reference={referenceByRole.purchasingManager} />

      <CtaBand showEmail />
    </>
  );
}
