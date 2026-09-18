"use client";

import { useEffect, useState } from "react";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { PillLink } from "@/components/ui/Buttons";

export type HeroSlide = {
  brief: string;
  src?: string;
  alt?: string;
};

export type HeroProps = {
  eyebrow: string;
  title: string;
  subline?: string;
  cta?: { label: string; href: string };
  slides: HeroSlide[];
  /** The homepage hero is taller and sets its headline a size larger. */
  variant?: "page" | "home";
};

const SLIDE_INTERVAL = 5500;

export function Hero({ eyebrow, title, subline, cta, slides, variant = "page" }: HeroProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (slides.length < 2 || paused) return;
    // Respect prefers-reduced-motion by showing the first slide only.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(() => setIndex((current) => (current + 1) % slides.length), SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [slides.length, paused]);

  const heightClass =
    variant === "home"
      ? "h-[min(70vh,520px)] min-h-[440px] md:h-[660px]"
      : "h-[min(70vh,520px)] min-h-[440px] md:h-[600px]";

  return (
    <section className={`relative overflow-hidden bg-ink-deep ${heightClass}`} aria-label={`${title} hero`}>
      {slides.map((slide, i) => (
        <div
          key={slide.brief}
          aria-hidden={i !== index}
          className="absolute inset-0 transition-opacity duration-[1100ms] ease-[ease]"
          style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? "auto" : "none" }}
        >
          <ImageSlot
            brief={slide.brief}
            src={slide.src}
            alt={slide.alt}
            sizes="100vw"
            priority={i === 0}
            className="absolute inset-0 h-full w-full"
          />
        </div>
      ))}

      <div className="hero-scrim pointer-events-none absolute inset-0" />

      <div className="pad-x pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-start gap-[22px] text-on-dark md:bottom-14">
        <p className="t-eyebrow text-on-dark-dim">{eyebrow}</p>
        <h1 className={variant === "home" ? "t-hero-home max-w-[900px]" : "t-hero"}>{title}</h1>
        {subline ? <p className="t-hero-sub max-w-[660px] text-on-dark-soft">{subline}</p> : null}
        {cta ? (
          <PillLink href={cta.href} variant="accent" withArrow className="pointer-events-auto mt-[6px] py-[15px] px-7">
            {cta.label}
          </PillLink>
        ) : null}
      </div>

      {slides.length > 1 ? (
        <div className="pad-x absolute inset-x-0 bottom-6 z-[2] flex justify-end md:bottom-14">
          <div className="flex gap-2" role="group" aria-label="Hero slides">
            {slides.map((slide, i) => (
              <button
                key={slide.brief}
                type="button"
                aria-label={`Show slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => {
                  setIndex(i);
                  setPaused(true);
                }}
                className="h-1 w-[34px] transition-colors duration-300"
                style={{ background: i === index ? "#F3F5F6" : "rgba(243,245,246,0.35)" }}
              />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
