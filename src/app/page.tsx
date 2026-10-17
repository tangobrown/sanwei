import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { CtaDirectRoutes } from "@/components/sections/CtaDirectRoutes";
import { ServicesPanel } from "@/components/sections/ServicesPanel";
import { QuoteCarousel } from "@/components/sections/QuoteCarousel";
import { ImageTile } from "@/components/ui/ImageTile";
import { PillLink } from "@/components/ui/Buttons";
import { ArrowDiagonal } from "@/components/ui/Icons";
import { clientReferences } from "@/content/site";

export const metadata: Metadata = {
  title: "Sanwei Asia | Part sourcing, manufacturing and project management",
  description:
    "Discover the missing pieces of your supply chain and manufacturing puzzle. Sanwei sources, manufactures and project-manages high-value components for the audio, automotive and marine industries.",
};

export default function HomePage() {
  return (
    <>
      {/* The homepage keeps its slideshow; only the interior heroes lost theirs. */}
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

      <section className="pad-x flex flex-col items-center pb-24 pt-28 text-center max-md:pb-14 max-md:pt-14">
        <p className="t-eyebrow mb-7 text-steel">Sourcing &amp; manufacturing in Asia</p>
        <h2 className="mb-6 max-w-[920px] font-display text-[clamp(38px,5.6vw,64px)] leading-[1.04] tracking-[-0.02em] text-wrap-balance">
          Need a quality assembly, component or proprietary part for your project?
        </h2>
        <p className="max-w-[760px] font-display text-[clamp(24px,3vw,34px)] italic leading-[1.25] text-accent text-wrap-balance">
          We&rsquo;ll make it for you. Or we&rsquo;ll source the exact part your specification requires.
        </p>

        <div className="mb-12 mt-16 w-full border-t border-rule" />

        <div className="flex w-full max-w-[760px] flex-col gap-6">
          <p className="t-body text-ink-soft">
            Our factory in Taiwan and extensive Asian sourcing network can supply you with parts that fit your project
            scope. Whether you know exactly what you need or require some expert advice, our decades of experience, eye
            for detail and project management know-how will be delivered to you on time and on brief as standard.
          </p>
          <p className="t-body text-ink-soft">
            {/* The live site links the company name here, so the underline is
                the one place the design allows it: an inline body link. */}
            <Link href="/" className="text-accent underline underline-offset-4 hover:text-ink">
              Sanwei
            </Link>{" "}
            supplies some of the most prestigious Automotive, Marine and Audio companies around the globe. We work to
            rigorous quality standards including: IATF16949, ISO9000, ISO14001, AS9100, using APQP, FMEA and SPC. This
            helps us to ensure critical tasks are completed and PPAP documents are submitted where required, so that you
            receive superior parts within your budget.
          </p>
          <p className="t-body text-ink-soft">
            Our reputation as a credible supplier speaks for itself &ndash; but don&rsquo;t take our word for it. The
            customer testimonials below should help to inspire confidence that we can deliver.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <PillLink href="/why-sanwei" variant="ink" className="px-7 py-[14px]">
            About us
          </PillLink>
          <PillLink href="/process" variant="outline" className="px-7 py-[13px]">
            Our process
          </PillLink>
        </div>
      </section>

      {/*
       * Industries mosaic. Twelve columns on desktop with Audio double height;
       * one column on mobile in reading order, so no tile is orphaned.
       */}
      <section className="pad-x border-y border-rule bg-white py-24 max-md:py-14">
        <div className="grid gap-4 lg:grid-cols-12 lg:grid-rows-[auto_300px_300px]">
          <div className="flex flex-col gap-4 pb-7 lg:col-span-7 lg:row-start-1">
            <h2 className="font-display text-[clamp(34px,4.4vw,52px)] leading-[1.05] tracking-[-0.02em]">
              Technically challenging, high-value products.
            </h2>
            <p className="max-w-[340px] text-[15px] leading-[1.6] text-ink-soft">
              Select your industry to find out more about how Sanwei can help you.
            </p>
          </div>

          <ImageTile
            href="/industries/audio"
            title="Audio"
            caption="Components and complex final products for consumer electronic & related industries."
            brief="Audio components"
            titleClass="text-[clamp(34px,4vw,48px)]"
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="h-[400px] lg:col-span-7 lg:row-span-2 lg:row-start-2 lg:h-auto"
          />
          <ImageTile
            href="/industries/automotive"
            title="Automotive"
            caption="Precision automotive components and assemblies of the highest quality."
            brief="Automotive assemblies"
            titleClass="text-[32px]"
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="h-[320px] lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:h-auto"
          />
          <ImageTile
            href="/industries/marine"
            title="Marine"
            caption="Engine components, assemblies & boat parts made to challenging specifications."
            brief="Marine engine parts"
            titleClass="text-[32px]"
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="h-[320px] lg:col-span-5 lg:col-start-8 lg:row-start-3 lg:h-auto"
          />

          {/* Last in the DOM so mobile reads heading, Audio, Automotive,
              Marine, Other; placed back into row 1 on desktop. */}
          <Link
            href="/industries/other-industries"
            className="flex flex-col justify-between gap-[18px] bg-paper px-[30px] py-7 transition-colors duration-[180ms] hover:bg-paper-tint lg:col-span-5 lg:col-start-8 lg:row-start-1"
          >
            <span className="flex items-center justify-between">
              <span className="font-display text-[30px]">Other industries</span>
              <ArrowDiagonal size={18} className="shrink-0 text-accent" />
            </span>
            <span className="text-[15px] leading-[1.6] text-ink-soft">
              Need complex, high-quality parts for your manufacturing project? We can help.
            </span>
          </Link>
        </div>
      </section>

      <ServicesPanel
        heading="Our services focus on bringing your project to fruition."
        subline="Sanwei really is an extension of your procurement team in Asia."
      />

      <QuoteCarousel references={clientReferences} />

      <CtaDirectRoutes heading="Find quality components fast with Sanwei." />
    </>
  );
}
