"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";
import { ImageSlot } from "@/components/ui/ImageSlot";
import type { TeamMember } from "@/content/team";

/** How many cards are visible at each breakpoint: 3 desktop, 2 at lg, 1 at sm. */
function useVisibleCount() {
  const [visible, setVisible] = useState(3);

  useEffect(() => {
    const compute = () => {
      const width = window.innerWidth;
      setVisible(width <= 680 ? 1 : width <= 1000 ? 2 : 3);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return visible;
}

export function TeamCarousel({ members }: { members: TeamMember[] }) {
  const visible = useVisibleCount();
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);

  const maxIndex = Math.max(0, members.length - visible);
  const current = Math.min(index, maxIndex);

  const step = (delta: number) => setIndex(Math.min(maxIndex, Math.max(0, current + delta)));

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const delta = touchStart.current - event.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) step(delta > 0 ? 1 : -1);
    touchStart.current = null;
  };

  const gap = 20;

  return (
    <section className="pad-x py-20 max-md:py-14 max-sm:py-11">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
        <h2 className="t-h2-minor">Let&rsquo;s meet the Sanwei team</h2>
        <p className="max-w-[340px] text-[15px] leading-[1.6] text-steel">
          Specialist engineers, quality auditors and supply chain managers across the UK and Taiwan.
        </p>
      </div>

      <div
        className="overflow-hidden"
        role="group"
        aria-roledescription="carousel"
        aria-label="Sanwei team"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onTouchStart={(event) => {
          touchStart.current = event.touches[0].clientX;
        }}
        onTouchEnd={onTouchEnd}
      >
        <ul
          className="flex transition-transform duration-500 ease-out"
          style={{
            gap: `${gap}px`,
            transform: `translateX(calc(${-current} * ((100% - ${(visible - 1) * gap}px) / ${visible} + ${gap}px)))`,
          }}
        >
          {members.map((member, i) => (
            <li
              key={member.name}
              aria-hidden={i < current || i >= current + visible}
              className="shrink-0 border border-rule bg-card"
              style={{ width: `calc((100% - ${(visible - 1) * gap}px) / ${visible})` }}
            >
              <ImageSlot
                brief={member.brief}
                sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 33vw"
                className="aspect-[4/5]"
              />
              <div className="p-8 max-md:p-6">
                <h3 className="font-display text-[clamp(24px,2.4vw,28px)] leading-[1.15]">{member.name}</h3>
                <p className="t-label mt-2 text-steel">{member.role}</p>
                <div className="mt-4 flex flex-col gap-3">
                  {member.bio.map((paragraph) => (
                    <p key={paragraph} className="text-[15px] leading-[1.7] text-ink-soft">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <p className="mt-4 text-[13px] leading-[1.6] text-steel">{member.education}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <div className="flex gap-[10px]">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={current === 0}
            aria-label="Previous team members"
            className="flex h-11 w-11 items-center justify-center border border-rule transition-colors duration-[180ms] enabled:hover:border-ink disabled:text-disabled"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={current >= maxIndex}
            aria-label="Next team members"
            className="flex h-11 w-11 items-center justify-center border border-rule transition-colors duration-[180ms] enabled:hover:border-ink disabled:text-disabled"
          >
            <ArrowRight size={20} />
          </button>
        </div>
        <p aria-live="polite" className="text-[14px] text-steel">
          Showing {current + 1}&ndash;{Math.min(current + visible, members.length)} of {members.length}
        </p>
      </div>
    </section>
  );
}
