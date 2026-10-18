"use client";

import { useRef, useState } from "react";
import { ImageSlot } from "@/components/ui/ImageSlot";
import type { TeamMember } from "@/content/team";

/**
 * The team as a roster beside a featured profile, replacing the carousel.
 *
 * Built as a tablist: each roster row is a tab controlling one panel, with
 * arrow-key navigation and roving tabindex, so the whole section is reachable
 * from the keyboard.
 */
export function TeamRoster({ members }: { members: TeamMember[] }) {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (index: number) => {
    const next = (index + members.length) % members.length;
    setSelected(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (event.key in keys) {
      event.preventDefault();
      focusTab(selected + keys[event.key]);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusTab(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusTab(members.length - 1);
    }
  };

  const member = members[selected];

  return (
    <section className="pad-x bg-white py-24 max-md:py-14">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-[clamp(38px,4.4vw,52px)] leading-[1.05]">Let&rsquo;s meet the Sanwei team&hellip;</h2>
        <p className="max-w-[340px] text-[15px] leading-[1.6] text-steel">
          Specialist engineers, quality auditors and supply chain managers across the UK and Taiwan.
        </p>
      </div>

      <div className="grid gap-16 lg:grid-cols-[5fr_7fr]">
        <div role="tablist" aria-label="Sanwei team" aria-orientation="vertical" onKeyDown={onKeyDown} className="border-t border-ink">
          {members.map((person, i) => {
            const active = i === selected;
            return (
              <button
                key={person.name}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`team-tab-${i}`}
                aria-selected={active}
                aria-controls="team-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => setSelected(i)}
                className={`flex w-full items-baseline gap-5 border-b border-rule px-4 py-5 text-left transition-colors duration-[180ms] ${
                  active ? "bg-paper text-accent" : "text-ink hover:bg-paper-tint hover:text-accent"
                }`}
              >
                <span className={`text-[13px] ${active ? "text-accent" : "text-steel"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-display text-[28px] leading-[1.1]">{person.name}</span>
                  <span className="mt-1 block text-[11px] uppercase tracking-[0.14em] text-steel">{person.role}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id="team-panel"
          aria-labelledby={`team-tab-${selected}`}
          tabIndex={0}
          className="motion-safe:animate-fade-up"
          key={selected}
        >
          {/* Portrait above the profile, in one column: a thumbnail, not a panel. */}
          <ImageSlot brief={member.brief} sizes="150px" className="mb-8 aspect-[4/5] w-full max-w-[150px]" />
          <div>
            <h3 className="font-display text-[40px] leading-[1.1]">{member.name}</h3>
            <p className="mt-2 text-[12px] uppercase tracking-[0.14em] text-accent">{member.role}</p>
            <div className="mt-6 flex flex-col gap-4">
              {member.bio.map((paragraph) => (
                <p key={paragraph} className="text-[15px] leading-[1.75] text-ink-soft">
                  {paragraph}
                </p>
              ))}
            </div>
            <p className="mt-6 border-t border-rule pt-5 font-display text-[16px] italic text-steel">
              {member.education}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
