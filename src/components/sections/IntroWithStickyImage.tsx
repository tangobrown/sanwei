import type { ReactNode } from "react";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { ImageCarousel, type CarouselSlide } from "@/components/sections/ImageCarousel";

/**
 * The intro that sits under `InteriorHero`. Its image rises 300px into the
 * hero and then sticks, following the reader while the copy scrolls past,
 * releasing at the end of the section.
 *
 * `items-start` is required for the sticky child to work, and no ancestor may
 * set `overflow: hidden` or the stickiness is silently lost.
 */
export function IntroWithStickyImage({
  image,
  carousel,
  children,
}: {
  image: { brief: string; alt?: string };
  /** Prototyping shows three stages here rather than a single shot. */
  carousel?: CarouselSlide[];
  children: ReactNode;
}) {
  return (
    <section className="pad-x grid items-start gap-20 bg-white pb-32 pt-24 max-md:gap-10 max-md:pb-16 max-md:pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div>{children}</div>

      {/*
       * Desktop: pulled up over the hero and sticky beneath the 92px header.
       * Mobile: neither, so it simply follows the copy.
       */}
      {/*
       * The single shot rises into the hero; the carousel does not. Its
       * controls would straddle the band edge, and a white panel cutting
       * across the dark hero reads as a mistake.
       */}
      <div
        className={`relative lg:sticky lg:top-[116px] lg:z-[2] ${carousel ? "" : "lg:-mt-[396px]"}`}
      >
        {carousel ? (
          <ImageCarousel slides={carousel} />
        ) : (
          <ImageSlot
            brief={image.brief}
            alt={image.alt}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-[clamp(420px,44vw,580px)] shadow-[0_30px_60px_rgba(20,30,39,0.22)] max-md:h-[320px]"
          />
        )}
      </div>
    </section>
  );
}
