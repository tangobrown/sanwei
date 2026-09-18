import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import {
  ClientReferenceBand,
  CtaBand,
  IndustrySpecialisms,
  IntroSplit,
  ProductShowcase,
} from "@/components/sections/Bands";
import { FeatureSplit, ProcessTriptych, WhyChooseUs } from "@/components/sections/Lists";
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
    title: industry.name,
    description: industry.heroSubline,
    alternates: { canonical: `/industries/${industry.slug}` },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const galleryHref = `/gallery?industry=${encodeURIComponent(
    industry.slug === "other-industries" ? "Other industries" : industry.name,
  )}`;

  return (
    <>
      <Hero
        eyebrow="Industries"
        title={industry.name}
        subline={industry.heroSubline}
        cta={{ label: "Get in touch", href: "/contact" }}
        slides={industry.heroSlides.map((brief) => ({ brief }))}
      />

      <IntroSplit
        heading={industry.intro.heading}
        statement={industry.intro.statement}
        paragraphs={industry.intro.paragraphs}
        narrowRight
      />

      {industry.featureBand ? (
        <FeatureSplit
          eyebrow={industry.featureBand.eyebrow}
          heading={industry.featureBand.heading}
          paragraphs={industry.featureBand.paragraphs}
          cta={{ label: industry.featureBand.ctaLabel, href: "/contact" }}
          image={{ brief: industry.featureBand.image }}
        />
      ) : null}

      {industry.whyChooseUs ? (
        <WhyChooseUs
          heading={industry.whyChooseUs.heading}
          points={industry.whyChooseUs.points.map(emphasise)}
          linkLabel={industry.whyChooseUs.linkLabel}
          linkHref="/contact"
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

      {industry.showSpecialisms ? <IndustrySpecialisms /> : null}

      {industry.process ? (
        <ProcessTriptych
          heading={industry.process.heading}
          subline={industry.process.subline}
          steps={industry.process.steps.map((step) => ({ ...step, body: emphasise(step.body) }))}
          cta={{ label: "Get started", href: "/contact" }}
        />
      ) : null}

      <ClientReferenceBand reference={industry.reference} />

      <CtaBand heading={industry.ctaHeading} showEmail />
    </>
  );
}
