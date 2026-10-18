import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { IntroWithStickyImage } from "@/components/sections/IntroWithStickyImage";
import { ImageTextSplit } from "@/components/sections/ImageTextSplit";
import { IndustrySpecialismsV2 } from "@/components/sections/IndustrySpecialismsV2";
import { ExpertiseTiles } from "@/components/sections/ExpertiseTiles";
import { CtaDirectRoutes } from "@/components/sections/CtaDirectRoutes";
import { ClientReferenceBand } from "@/components/sections/Bands";
import { ServicesPanel } from "@/components/sections/ServicesPanel";
import { BeyondProducts, HoweverBand, IntroGallery, RiskFactors, SolutionBand } from "@/components/sections/ServiceBlocks";
import { getService, services } from "@/content/services";
import { emphasise } from "@/lib/emphasis";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.name,
    description: service.heroSubline,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const { detail } = service;
  // Project Management's detail band follows the tinted "The solution?" band,
  // so it needs padding above; every other page continues from white.
  /* The bands that run full width leave the detail block hard against them. */
  const introCopy = (
    <>
      <div>
        {service.standfirst ? <p className="t-lead mb-8 text-ink-soft">{service.standfirst}</p> : null}
        <h2 className="t-h2-major mb-7">{service.intro.heading}</h2>
      </div>
      <div className="flex flex-col gap-5">
        {service.intro.paragraphs.map((paragraph) => (
          <p key={paragraph} className="t-body text-ink-soft">
            {emphasise(paragraph)}
          </p>
        ))}
      </div>
    </>
  );

  const detailNeedsTopPadding = Boolean(service.solution || service.beyond);

  return (
    <>
      <InteriorHero
        eyebrow="Services"
        title={service.name}
        subline={service.heroSubline}
        cta={{ label: "Get in touch", href: "/contact" }}
        titleClass="t-hero-service"
      />

      {service.introImage || service.introCarousel ? (
        <IntroWithStickyImage image={{ brief: service.introImage ?? "" }} carousel={service.introCarousel}>
          {introCopy}
        </IntroWithStickyImage>
      ) : (
        /* No photograph to sit beside, so the heading takes the left column. */
        <section className="pad-x grid items-start gap-20 bg-white pb-32 pt-24 max-md:gap-10 max-md:pb-16 max-md:pt-12 lg:grid-cols-2">
          {introCopy}
        </section>
      )}

      {service.introGallery ? <IntroGallery images={service.introGallery} /> : null}

      {/* Project Management keeps its narrative order: risk, however, solution. */}
      {service.riskFactors ? <RiskFactors riskFactors={service.riskFactors} /> : null}
      {service.however ? <HoweverBand however={service.however} /> : null}
      {service.solution ? <SolutionBand solution={service.solution} /> : null}
      {service.beyond ? <BeyondProducts beyond={service.beyond} /> : null}

      <ImageTextSplit image={{ brief: detail.image }} topPadding={detailNeedsTopPadding}>
        {detail.heading ? (
          <h2 className="mb-5 font-display text-[clamp(28px,3.2vw,36px)] leading-[1.14]">{detail.heading}</h2>
        ) : null}
        {detail.paragraphs?.map((paragraph) => (
          <p key={paragraph} className="mb-4 text-[16px] leading-[1.75] text-ink-soft">
            {emphasise(paragraph)}
          </p>
        ))}
        {detail.secondary ? (
          <div className="mt-6">
            <h3 className="mb-4 font-display text-[clamp(24px,2.6vw,30px)] leading-[1.14]">
              {detail.secondary.heading}
            </h3>
            {detail.secondary.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[16px] leading-[1.75] text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}
        {detail.listIntro ? (
          <h2 className="mt-7 font-display text-[clamp(24px,2.6vw,30px)] leading-[1.2]">{detail.listIntro}</h2>
        ) : null}
        {detail.list ? (
          /*
           * The points keep their rules. A point that carries sub-points holds
           * them as plain bullets inside its own row, and that list runs in one
           * column so a child never lands in the column beside its parent.
           */
          <ul className={`mt-6 grid gap-x-7 ${detail.list.every((item) => typeof item === "string") ? "sm:grid-cols-2" : ""}`}>
            {detail.list.map((item) => {
              const text = typeof item === "string" ? item : item.text;
              return (
                <li key={text} className="border-t border-rule py-[10px] text-[15px] leading-[1.5] text-ink-soft">
                  {text}
                  {typeof item === "string" ? null : (
                    <ul className="mt-2 list-disc pl-5 marker:text-steel">
                      {item.items.map((child) => (
                        <li key={child} className="mb-[6px] pl-1 last:mb-0">
                          {child}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        ) : null}
        {detail.footnote ? (
          <p className="mt-5 text-[15px] leading-[1.75] text-ink-soft">
            {detail.footnote.before}
            <Link href={detail.footnote.href} className="text-accent underline underline-offset-4 hover:text-ink">
              {detail.footnote.linkLabel}
            </Link>
            {detail.footnote.after}
          </p>
        ) : null}
        {detail.ctaLabel && detail.ctaHref ? (
          <Link
            href={detail.ctaHref}
            className="mt-6 inline-block border-b border-accent pb-[3px] text-[15px] font-semibold text-accent transition-colors duration-[180ms] hover:border-ink hover:text-ink"
          >
            {detail.ctaLabel}
          </Link>
        ) : null}
      </ImageTextSplit>

      <IndustrySpecialismsV2 />

      <ExpertiseTiles briefs={service.tileImages} />

      <ServicesPanel heading="All services" ground="white" tightTop />

      <ClientReferenceBand reference={service.reference} />

      <CtaDirectRoutes heading="Find quality components fast." />
    </>
  );
}
