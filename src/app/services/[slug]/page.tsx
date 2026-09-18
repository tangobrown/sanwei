import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import {
  ClientReferenceBand,
  CtaBand,
  IndustrySpecialisms,
  IntroWithImage,
  PromoCards,
  ServicesList,
} from "@/components/sections/Bands";
import {
  BeyondProducts,
  HoweverBand,
  IntroGallery,
  RiskFactors,
  ServiceDetail,
  SolutionBand,
} from "@/components/sections/ServiceBlocks";
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

  return (
    <>
      <Hero
        eyebrow="Services"
        title={service.name}
        subline={service.heroSubline}
        cta={{ label: "Get in touch", href: "/contact" }}
        slides={[{ brief: service.heroSlide }]}
      />

      {service.standfirst ? (
        <section className="pad-x border-b border-rule py-14 max-md:py-10">
          <p className="max-w-[900px] t-lead text-ink-soft">{service.standfirst}</p>
        </section>
      ) : null}

      <IntroWithImage
        heading={service.intro.heading}
        paragraphs={service.intro.paragraphs.map(emphasise)}
        image={{ brief: service.intro.image }}
      />

      {service.introGallery ? <IntroGallery images={service.introGallery} /> : null}

      {/* Project Management keeps this narrative order: risk, however, solution, detail. */}
      {service.riskFactors ? <RiskFactors riskFactors={service.riskFactors} /> : null}
      {service.however ? <HoweverBand however={service.however} /> : null}
      {service.solution ? <SolutionBand solution={service.solution} /> : null}
      {service.beyond ? <BeyondProducts beyond={service.beyond} /> : null}

      <ServiceDetail detail={service.detail} />

      <IndustrySpecialisms />

      <PromoCards />

      <ServicesList heading="All services" className="border-t border-rule" />

      <ClientReferenceBand reference={service.reference} />

      <CtaBand showEmail showExperts={false} />
    </>
  );
}
