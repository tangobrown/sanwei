import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { IntroSplit, CtaBand, ServicesList } from "@/components/sections/Bands";
import { StatStrip } from "@/components/sections/Lists";
import { QuoteCarousel } from "@/components/sections/QuoteCarousel";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { clientReferences } from "@/content/site";
import { homepageIndustries } from "@/content/industries";

export const metadata: Metadata = {
  title: "Sanwei Asia | Part sourcing, manufacturing and project management",
  description:
    "Discover the missing pieces of your supply chain and manufacturing puzzle. Sanwei sources, manufactures and project-manages high-value components for the audio, automotive and marine industries.",
};

const stats = [
  { value: "20+", label: "Years supplying OEMs" },
  { value: "2", label: "Offices, Taipei & UK" },
  { value: "4", label: "IATF16949 · ISO9000 · ISO14001 · AS9100" },
  { value: "1", label: "Own plant, HonJeh, Taiwan" },
];

export default function HomePage() {
  return (
    <>
      <Hero
        variant="home"
        eyebrow="Sourcing · Manufacturing · Project management"
        title="Discover the missing pieces of your supply chain and manufacturing puzzle."
        slides={[
          { brief: "Factory floor, wide" },
          { brief: "Press shop / tooling" },
          { brief: "Inspection / metrology" },
        ]}
      />

      <IntroSplit
        heading="Need a quality assembly, component or proprietary part for your project?"
        statement="We'll make it for you. Or we'll source the exact part your specification requires."
        statementPosition="right"
        paragraphs={[
          "Our factory in Taiwan and extensive Asian sourcing network can supply you with parts that fit your project scope. Whether you know exactly what you need or require some expert advice, our decades of experience, eye for detail and project management know-how will be delivered to you on time and on brief as standard.",
          "Sanwei supplies some of the most prestigious Automotive, Marine and Audio companies around the globe, working to rigorous quality standards so that you receive superior parts within your budget.",
        ]}
        links={[
          { label: "About us", href: "/why-sanwei", accent: true },
          { label: "Our process", href: "/process" },
        ]}
      />

      <StatStrip stats={stats} />

      <section className="pad-x py-20 max-md:py-14 max-sm:py-11">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <h2 className="t-h2-minor">Technically challenging, high-value products.</h2>
          <p className="max-w-[340px] text-[15px] leading-[1.6] text-steel">
            Select your industry to find out more about how Sanwei can help you.
          </p>
        </div>

        {/* minmax(0, 1fr) keeps the image slots from forcing the last card off the row. */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))]">
          {homepageIndustries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group block border border-rule bg-card transition-colors duration-[180ms] hover:border-ink"
            >
              <ImageSlot
                brief={industry.cardImage}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-[300px]"
              />
              <div className="p-8 max-md:p-6">
                <p className="mb-2 font-display text-[30px]">{industry.cardTitle}</p>
                <p className="text-[14px] leading-[1.6] text-ink-mute">{industry.cardBody}</p>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/industries/other-industries"
          className="group mt-5 flex flex-wrap items-center justify-between gap-3 border border-rule bg-card px-8 py-7 transition-colors duration-[180ms] hover:border-ink max-md:px-6"
        >
          <span className="font-display text-[28px]">Other industries</span>
          <span className="inline-flex items-center gap-2 text-[15px] text-ink-mute transition-colors duration-[180ms] group-hover:text-accent">
            Need complex, high-quality parts for your manufacturing project? We can help. &rarr;
          </span>
        </Link>
      </section>

      <ServicesList
        heading="Our services focus on bringing your project to fruition."
        subline="Sanwei really is an extension of your procurement team in Asia."
      />

      <QuoteCarousel references={clientReferences} />

      <CtaBand />
    </>
  );
}
