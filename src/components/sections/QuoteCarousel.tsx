"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";
import { getPhoto } from "@/content/photography";
import type { ClientReference } from "@/content/site";

const ROTATE_INTERVAL = 7000;

/** The homepage client-reference band, rotating through the four quotes. */
export function QuoteCarousel({ references }: { references: ClientReference[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || references.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(() => setIndex((current) => (current + 1) % references.length), ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [paused, references.length]);

  const step = (delta: number) => {
    setPaused(true);
    setIndex((current) => (current + delta + references.length) % references.length);
  };

  const reference = references[index];
  const backdrop = getPhoto("Client references backdrop");

  return (
    <section className="relative isolate overflow-hidden bg-ink py-[88px] text-on-dark max-md:py-14 max-sm:py-11">
      {backdrop ? (
        <Image
          src={backdrop.src}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          /* Scaled up so the blur's soft edge falls outside the band. */
          className="-z-20 scale-110 object-cover opacity-35 blur-[14px]"
        />
      ) : null}

      {/*
       * Scrim, densest on the left where the copy sits and clearing toward the
       * right so the photograph still reads. Without it the 13px eyebrow and
       * role labels fall below 4.5:1 against the brighter parts of the image.
       */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(38,55,70,0.97)_0%,rgba(38,55,70,0.94)_60%,rgba(38,55,70,0.38)_100%)]"
      />

      <div className="pad-x">
        <div className="max-w-[900px]">
          <p className="t-eyebrow mb-[26px] text-steel-light">Client references</p>

          <figure aria-live="polite">
            <blockquote key={index} className="t-statement mb-[26px] animate-fade-up">
              &ldquo;{reference.quote}&rdquo;
            </blockquote>
            <figcaption className="t-label text-accent-soft">{reference.role}</figcaption>
          </figure>

          <div className="mt-[38px] flex gap-[10px]">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous client reference"
              className="flex h-11 w-11 items-center justify-center border border-rule-dark transition-colors duration-[180ms] hover:border-accent-soft hover:text-accent-soft"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next client reference"
              className="flex h-11 w-11 items-center justify-center border border-rule-dark transition-colors duration-[180ms] hover:border-accent-soft hover:text-accent-soft"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
