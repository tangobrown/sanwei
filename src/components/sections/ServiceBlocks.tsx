import Link from "next/link";
import { ArrowLink } from "@/components/ui/Buttons";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { DetailBand, PanelList } from "@/components/sections/Bands";
import type { DetailBlock, Service } from "@/content/services";
import { HairlineGrid } from "@/components/ui/HairlineGrid";
import { emphasise } from "@/lib/emphasis";

/** The photograph-and-panel band that every service page carries. */
export function ServiceDetail({ detail }: { detail: DetailBlock }) {
  return (
    <DetailBand image={{ brief: detail.image }} tone={detail.tone ?? "steel"}>
      {detail.heading ? (
        <h2 className="mb-[14px] font-display text-[clamp(26px,3.2vw,36px)] leading-[1.14]">{detail.heading}</h2>
      ) : null}

      {detail.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="text-[15px] leading-[1.75]">
          {emphasise(paragraph)}
        </p>
      ))}

      {detail.secondary ? (
        <div className="mt-2">
          <h3 className="mb-[14px] font-display text-[clamp(24px,2.6vw,30px)] leading-[1.14]">
            {detail.secondary.heading}
          </h3>
          {detail.secondary.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-[15px] leading-[1.75]">
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}

      {detail.listIntro ? <p className="mt-5 text-[15px] font-bold">{detail.listIntro}</p> : null}
      {detail.list ? <PanelList items={detail.list} /> : null}

      {detail.footnote ? (
        <p className="mt-5 text-[15px] leading-[1.75]">
          {detail.footnote.before}
          <Link href={detail.footnote.href} className="underline underline-offset-4 hover:text-accent-soft">
            {detail.footnote.linkLabel}
          </Link>
          {detail.footnote.after}
        </p>
      ) : null}

      {detail.ctaLabel && detail.ctaHref ? (
        <ArrowLink href={detail.ctaHref} tone="on-dark" className="mt-2 self-start">
          {detail.ctaLabel}
        </ArrowLink>
      ) : null}
    </DetailBand>
  );
}

/** Project Management's numbered risk-factor band. */
export function RiskFactors({ riskFactors }: { riskFactors: NonNullable<Service["riskFactors"]> }) {
  return (
    <section className="pad-x border-y border-rule py-20 max-md:py-14 max-sm:py-11">
      <p className="t-eyebrow-sm mb-8 text-steel">{riskFactors.eyebrow}</p>
      <HairlineGrid columns={{ base: 1, sm: 2, lg: 3 }} className="sm:grid-cols-2 lg:grid-cols-3">
        {riskFactors.points.map((point, i) => (
          <div key={point} className="flex items-baseline gap-[18px] bg-paper px-10 py-[34px] max-md:px-6">
            <span className="font-display text-[26px] text-accent">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-[17px] leading-[1.5]">{point}</span>
          </div>
        ))}
      </HairlineGrid>
    </section>
  );
}

/** Project Management's "However..." section. */
export function HoweverBand({ however }: { however: NonNullable<Service["however"]> }) {
  return (
    <section className="pad-x grid items-start gap-12 py-20 max-md:py-14 max-sm:py-11 lg:grid-cols-2 lg:gap-20">
      <h2 className="t-h2-major">{however.heading}</h2>
      <div className="flex flex-col gap-[22px] pt-[10px]">
        {however.paragraphs.map((paragraph) => (
          <p key={paragraph} className="t-body text-ink-soft">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

/** Project Management's centred "The solution?" band. */
export function SolutionBand({ solution }: { solution: NonNullable<Service["solution"]> }) {
  return (
    <section className="pad-x bg-paper-tint py-[88px] text-center max-md:py-14 max-sm:py-11">
      <h2 className="t-h2-major mb-6">{solution.heading}</h2>
      <div className="mx-auto mb-10 flex max-w-[760px] flex-col gap-5">
        {solution.paragraphs.map((paragraph) => (
          <p key={paragraph} className="t-lead text-ink-soft">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mx-auto flex max-w-[760px] flex-col items-center gap-4">
        <p className="text-[20px] font-bold leading-[1.35]">{solution.first}</p>
        <p className="font-display text-[22px] italic text-steel">{solution.conjunction}</p>
        <p className="text-[20px] font-bold leading-[1.35]">{solution.second}</p>
      </div>
    </section>
  );
}

/** Quality Control's "Beyond products" section. */
export function BeyondProducts({ beyond }: { beyond: NonNullable<Service["beyond"]> }) {
  return (
    <section className="pad-x border-t border-rule py-20 max-md:py-14 max-sm:py-11">
      <h2 className="t-h2-minor mb-4">{beyond.heading}</h2>
      <p className="mb-10 max-w-[760px] t-lead text-ink-soft">{beyond.intro}</p>
      <HairlineGrid columns={{ base: 1, sm: 1, lg: 2 }} className="lg:grid-cols-2">
        {beyond.columns.map((column) => (
          <div key={column.title} className="bg-paper px-10 py-[34px] max-md:px-6">
            <h3 className="mb-4 font-display text-[28px]">{column.title}</h3>
            {column.lead ? <p className="mb-3 text-[15px] font-semibold text-ink">{column.lead}</p> : null}
            {column.list ? (
              <ul className="flex flex-col gap-3">
                {column.list.map((item) => (
                  <li key={item} className="border-t border-rule pt-3 text-[15px] leading-[1.6] text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
            {column.body ? (
              <p className="text-[15px] leading-[1.75] text-ink-soft">
                {column.body.before}
                <Link href={column.body.href} className="text-accent underline underline-offset-4 hover:text-ink">
                  {column.body.linkLabel}
                </Link>
                {column.body.after}
              </p>
            ) : null}
          </div>
        ))}
      </HairlineGrid>
    </section>
  );
}

/** Tooling's three extra shots beneath the intro. */
export function IntroGallery({ images }: { images: string[] }) {
  return (
    <section className="pad-x grid gap-5 pb-[88px] max-md:pb-14 max-sm:pb-11 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((brief) => (
        <ImageSlot
          key={brief}
          brief={brief}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="h-[300px] border border-rule"
        />
      ))}
    </section>
  );
}
