import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { IntroWithStickyImage } from "@/components/sections/IntroWithStickyImage";
import { CtaDirectRoutes } from "@/components/sections/CtaDirectRoutes";
import { ClientReferenceBand, ProductShowcase } from "@/components/sections/Bands";
import { IndustrySpecialismsV2 } from "@/components/sections/IndustrySpecialismsV2";
import { ProcessTriptych } from "@/components/sections/Lists";
import { WhyChooseCards } from "@/components/sections/WhyChooseCards";
import { BatteryBand } from "@/components/sections/BatteryBand";
import { galleryCategories } from "@/content/gallery";
import { getIndustry, industries } from "@/content/industries";
import { emphasise } from "@/lib/emphasis";

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};

  return {
    title: industry.seo.title,
    description: industry.seo.description,
    alternates: { canonical: `/industries/${industry.slug}` },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  /*
   * The gallery filters are the categories the photographs arrived in, so
   * only deep-link where one matches. Other Industries has no category of
   * its own and opens the unfiltered grid.
   */
  const galleryCategory = galleryCategories.find((category) => category === industry.name);
  const galleryHref = galleryCategory ? `/gallery?industry=${encodeURIComponent(galleryCategory)}` : "/gallery";

  return (
    <>
      <InteriorHero
        eyebrow="Industries"
        title={industry.name}
        subline={industry.heroSubline}
        cta={{ label: "Get in touch", href: "/contact" }}
      />

      <IntroWithStickyImage image={{ brief: industry.introImage }}>
        <h2 className="t-h2-major mb-6">{industry.intro.heading}</h2>
        <p className="border-b border-rule pb-6 font-display text-[clamp(22px,2.4vw,26px)] italic leading-[1.3] text-accent">
          {industry.intro.statement}
        </p>
        <div className="mt-9 flex flex-col gap-5">
          {industry.intro.paragraphs.map((paragraph) => (
            <p key={paragraph} className="t-body text-ink-soft">
              {paragraph}
            </p>
          ))}
        </div>
      </IntroWithStickyImage>

      {industry.featureBand ? (
        <BatteryBand
          eyebrow={industry.featureBand.eyebrow}
          heading={industry.featureBand.heading}
          paragraphs={industry.featureBand.paragraphs}
          ctaLabel={industry.featureBand.ctaLabel}
          image={{ brief: industry.featureBand.image }}
        />
      ) : null}

      {industry.whyChooseUs ? (
        <WhyChooseCards
          heading={industry.whyChooseUs.heading}
          reasons={industry.whyChooseUs.points}
          linkLabel={industry.whyChooseUs.linkLabel}
        />
      ) : null}

      {industry.showcase ? (
        <ProductShowcase
          heading={industry.showcase.heading}
          linkLabel={industry.showcase.linkLabel}
          href={galleryHref}
          images={industry.showcase.images}
        />
      ) : null}

      {/* Only Other Industries carries this; the strip is flat there, not a self-link. */}
      {industry.showSpecialisms ? <IndustrySpecialismsV2 linkOtherIndustries={false} /> : null}

      {industry.process ? (
        <ProcessTriptych
          heading={industry.process.heading}
          subline={industry.process.subline}
          steps={industry.process.steps.map((step) => ({ ...step, body: emphasise(step.body) }))}
          cta={{ label: "Get started", href: "/contact" }}
        />
      ) : null}

      <ClientReferenceBand reference={industry.reference} />

      <CtaDirectRoutes heading={industry.ctaHeading} />
    </>
  );
}
