import type { Metadata } from "next";
import { Suspense } from "react";
import { CtaBand } from "@/components/sections/Bands";
import { ArrowLink } from "@/components/ui/Buttons";
import { GalleryBrowser } from "@/components/gallery/GalleryBrowser";
import { galleryItems } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Parts gallery: audio, automotive, marine",
  description:
    `Browse ${galleryItems.length} parts Sanwei has made and sourced across audio, automotive, fluid technologies and marine. Filter by category, then quote a part number.`,
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <section className="pad-x pb-14 pt-20 max-md:pb-10 max-md:pt-14">
        <p className="t-eyebrow mb-6 text-steel">Gallery</p>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-[760px]">
            <h1 className="t-page-title mb-6">Parts we&rsquo;ve made and sourced.</h1>
            <p className="t-lead text-ink-soft">
              A cross-section of recent work across audio, automotive, marine and beyond. Filter by category, or send us
              a drawing and ask whether we&rsquo;ve made something like it before.
            </p>
          </div>
          <ArrowLink href="/contact" underline>
            Enquire about a part
          </ArrowLink>
        </div>
      </section>

      <Suspense fallback={<div className="pad-x py-14 text-[14px] text-steel">Loading parts&hellip;</div>}>
        <GalleryBrowser />
      </Suspense>

      <CtaBand
        heading="Seen something close to your part?"
        tone="paper-tint"
      />
    </>
  );
}
