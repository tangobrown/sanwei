import type { ReactNode } from "react";
import { ArrowLink, PillLink } from "@/components/ui/Buttons";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { HairlineGrid } from "@/components/ui/HairlineGrid";

/**
 * The "why choose us" band: a heading cell on the column edge beside a grid of
 * numbered points. The dividing rules come from the grid's own 1px gap over a
 * rule-coloured ground, so they stay correct at any column count.
 */
export function WhyChooseUs({
  heading,
  points,
  linkLabel,
  linkHref,
}: {
  heading: string;
  points: ReactNode[];
  linkLabel: string;
  linkHref: string;
}) {
  return (
    <section className="pad-x grid border-y border-rule lg:grid-cols-2">
      <div className="py-14 pr-14 max-lg:pr-0 max-md:py-10 lg:border-r lg:border-rule">
        <h2 className="t-h2-minor text-[clamp(26px,3.2vw,38px)]">{heading}</h2>
      </div>
      <div>
        <HairlineGrid columns={{ base: 1, sm: 2, lg: 2 }} className="sm:grid-cols-2">
          {[
            ...points.map((point, i) => (
              <div key={i} className="flex items-baseline gap-[18px] bg-paper px-10 py-[34px] max-md:px-6">
                <span className="font-display text-[26px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[17px] leading-[1.5]">{point}</span>
              </div>
            )),
            /* The link cell carries the same opaque fill so the rules stay true. */
            <div key="cta" className="flex items-center bg-paper px-10 py-[34px] max-md:px-6">
              <ArrowLink href={linkHref} tone="accent">
                {linkLabel}
              </ArrowLink>
            </div>,
          ]}
        </HairlineGrid>
      </div>
    </section>
  );
}

/** Three steps from first conversation to parts on the dock. */
export function ProcessTriptych({
  heading,
  subline,
  steps,
  cta,
}: {
  heading: string;
  subline: string;
  steps: { label: string; title: string; body: ReactNode }[];
  cta: { label: string; href: string };
}) {
  return (
    <section className="pad-x py-20 max-md:py-14 max-sm:py-11">
      <div className="border border-rule bg-card p-14 max-md:p-6">
        <div className="mb-11 flex flex-wrap items-end justify-between gap-4">
          <h2 className="t-h2-minor">{heading}</h2>
          <p className="max-w-[320px] text-[15px] leading-[1.6] text-steel">{subline}</p>
        </div>
        <div className="grid lg:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.label}
              className={`max-lg:border-b max-lg:border-rule-soft max-lg:py-8 lg:px-10 ${
                i === 0 ? "lg:pl-0" : ""
              } ${i === steps.length - 1 ? "lg:border-none lg:pr-0 max-lg:border-b-0 max-lg:pb-0" : "lg:border-r lg:border-rule-soft"}`}
            >
              <p className="t-eyebrow-sm mb-[14px] text-steel">{step.label}</p>
              <p className="mb-4 font-display text-[clamp(26px,3vw,34px)] italic">{step.title}</p>
              <p className="text-[15px] leading-[1.75] text-ink-soft">{step.body}</p>
            </div>
          ))}
        </div>
        <PillLink href={cta.href} variant="ink" withArrow className="mt-11 px-7 py-[15px]">
          {cta.label}
        </PillLink>
      </div>
    </section>
  );
}

/** The homepage proof strip: serif numerals against hairline-separated cells. */
export function StatStrip({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section className="bg-steel text-white" aria-label="Sanwei by numbers">
      <HairlineGrid
        columns={{ base: 2, sm: 2, lg: 4 }}
        className="grid-cols-2 bg-white/30 lg:grid-cols-4"
        fillerClassName="bg-steel"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="bg-steel p-10 max-md:p-6">
            <p className="font-display text-[clamp(40px,5vw,54px)] leading-none">{stat.value}</p>
            <p className="t-label mt-3 text-on-dark-body">{stat.label}</p>
          </div>
        ))}
      </HairlineGrid>
    </section>
  );
}

/** A full-bleed split of copy and photograph, used for the electrification band. */
export function FeatureSplit({
  eyebrow,
  heading,
  paragraphs,
  cta,
  image,
}: {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  cta?: { label: string; href: string };
  image: { brief: string; src?: string; alt?: string };
}) {
  return (
    <section className="grid items-stretch border-y border-rule lg:grid-cols-2">
      <div className="flex flex-col justify-center gap-5 px-14 py-[88px] max-md:px-6 max-md:py-14">
        <p className="t-eyebrow-sm text-steel">{eyebrow}</p>
        <h2 className="t-h2-minor">{heading}</h2>
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="t-body max-w-[620px] text-ink-soft">
            {paragraph}
          </p>
        ))}
        {cta ? (
          <ArrowLink href={cta.href} underline className="self-start">
            {cta.label}
          </ArrowLink>
        ) : null}
      </div>
      <ImageSlot
        brief={image.brief}
        src={image.src}
        alt={image.alt}
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="min-h-[420px] max-md:min-h-[300px]"
      />
    </section>
  );
}
