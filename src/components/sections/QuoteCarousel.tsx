"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";
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

  return (
    <section className="pad-x bg-ink py-[88px] text-on-dark max-md:py-14 max-sm:py-11">
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
    </section>
  );
}
