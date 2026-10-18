"use client";

import { useState } from "react";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";

export type CarouselSlide = {
  /** Art-direction brief, which doubles as the lookup into the registry. */
  brief: string;
  caption: string;
};

/**
 * A small gallery of product shots with a caption under each. It does not
 * advance on its own: the captions name stages the reader is comparing, so
 * the step is theirs to take.
 *
 * Every slide stays mounted and the hidden ones are taken out of the flow,
 * which keeps the frame the height of its tallest slide rather than jumping
 * as the captions change length.
 */
export function ImageCarousel({ slides, className = "" }: { slides: CarouselSlide[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const step = (delta: number) => setIndex((current) => (current + delta + slides.length) % slides.length);

  return (
    <div className={`bg-white ${className}`}>
      <div className="grid">
        {slides.map((slide, i) => (
          <figure
            key={slide.brief}
            aria-hidden={i === index ? undefined : true}
            className={`col-start-1 row-start-1 ${i === index ? "" : "invisible"}`}
          >
            <ImageSlot
              brief={slide.brief}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-[clamp(300px,32vw,420px)]"
            />
            <figcaption className="mt-5 text-center text-[15px] font-semibold">{slide.caption}</figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-[10px]">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous image"
          className="flex h-11 w-11 items-center justify-center border border-rule transition-colors duration-[180ms] hover:border-ink hover:text-accent"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex items-center gap-2 px-2" role="tablist" aria-label="Choose an image">
          {slides.map((slide, i) => (
            <button
              key={slide.brief}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={slide.caption}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition-colors duration-[180ms] ${
                i === index ? "bg-ink" : "bg-rule-strong hover:bg-steel"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next image"
          className="flex h-11 w-11 items-center justify-center border border-rule transition-colors duration-[180ms] hover:border-ink hover:text-accent"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
