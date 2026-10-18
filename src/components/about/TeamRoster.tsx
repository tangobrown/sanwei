"use client";

import { useRef, useState } from "react";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { ArrowRight, ChevronDown } from "@/components/ui/Icons";
import type { TeamMember } from "@/content/team";

/**
 * The team, in two shapes.
 *
 * Side by side, it is a tablist: each roster row is a tab controlling one
 * panel, with arrow-key navigation and roving tabindex.
 *
 * Stacked, that would put the open profile a screen below the name you
 * tapped, so the same roster becomes an accordion and the profile opens
 * directly under its own row. Only one of the two is in the layout at a
 * time, and their ids are kept apart.
 */
export function TeamRoster({ members }: { members: TeamMember[] }) {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(0);
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
      <div className="mb-10">
        <h2 className="font-display text-[clamp(38px,4.4vw,52px)] leading-[1.05]">Let&rsquo;s meet the Sanwei team&hellip;</h2>
        {/* Full width, so it sets on one line rather than breaking in a column. */}
        <p className="mt-4 text-[15px] leading-[1.6] text-steel">
          Specialist engineers, quality auditors and supply chain managers across the UK and Taiwan.
        </p>
      </div>

      {/* Stacked: an accordion, each profile under the name that opens it. */}
      <div className="border-t border-ink lg:hidden">
        {members.map((person, i) => {
          const open = i === expanded;
          return (
            <div key={person.name}>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`team-accordion-${i}`}
                onClick={() => setExpanded(open ? null : i)}
                className={`flex w-full cursor-pointer items-center gap-5 border-b border-rule px-4 py-5 text-left transition-colors duration-[180ms] ${
                  open ? "bg-paper text-accent" : "text-ink"
                }`}
              >
                <span className={`text-[13px] ${open ? "text-accent" : "text-steel"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-display text-[26px] leading-[1.1]">{person.name}</span>
                  <span className="mt-1 block text-[11px] uppercase tracking-[0.14em] text-steel">{person.role}</span>
                </span>
                <ChevronDown
                  size={18}
                  className={`ml-auto shrink-0 transition-transform duration-[180ms] ${
                    open ? "rotate-180 text-accent" : "text-steel"
                  }`}
                />
              </button>

              {open ? (
                <div id={`team-accordion-${i}`} className="border-b border-rule px-4 py-8">
                  <TeamProfile member={person} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Side by side: the roster chooses, the panel beside it shows. */}
      <div className="grid gap-16 max-lg:hidden lg:grid-cols-[5fr_7fr]">
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
                className={`group flex w-full items-baseline gap-5 border-b border-rule px-4 py-5 text-left transition-colors duration-[180ms] ${
                  active ? "bg-paper text-accent" : "cursor-pointer text-ink hover:bg-paper-tint hover:text-accent"
                }`}
              >
                <span className={`text-[13px] ${active ? "text-accent" : "text-steel"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-display text-[28px] leading-[1.1]">{person.name}</span>
                  <span className="mt-1 block text-[11px] uppercase tracking-[0.14em] text-steel">{person.role}</span>
                </span>
                {/* The arrow marks the rows there is still something to open. */}
                {active ? null : (
                  <ArrowRight
                    size={18}
                    className="ml-auto shrink-0 self-center text-steel transition-colors duration-[180ms] group-hover:text-accent"
                  />
                )}
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
          <TeamProfile member={member} />
        </div>
      </div>
    </section>
  );
}

function TeamProfile({ member }: { member: TeamMember }) {
  return (
    <>
      {/* Portrait above the profile, in one column: a thumbnail, not a panel. */}
      <ImageSlot brief={member.brief} sizes="150px" className="mb-8 aspect-[4/5] w-full max-w-[150px]" />
      <div>
        <h3 className="font-display text-[clamp(30px,4vw,40px)] leading-[1.1]">{member.name}</h3>
        <p className="mt-2 text-[12px] uppercase tracking-[0.14em] text-accent">{member.role}</p>
        <div className="mt-6 flex flex-col gap-4">
          {member.bio.map((paragraph) => (
            <p key={paragraph} className="text-[15px] leading-[1.75] text-ink-soft">
              {paragraph}
            </p>
          ))}
        </div>
        <p className="mt-6 border-t border-rule pt-5 font-display text-[16px] italic text-steel">{member.education}</p>
      </div>
    </>
  );
}
