"use client";

import { useState } from "react";
import { ArrowDiagonal } from "@/components/ui/Icons";
import { offices } from "@/content/site";

type LocationKey = keyof typeof offices;

/**
 * The two-office map. The embed is OpenStreetMap, kept behind this single
 * component so swapping to the client's chosen provider is a one-file change.
 */
export function OfficeMap() {
  const [location, setLocation] = useState<LocationKey>("asia");
  const office = offices[location];

  return (
    <section className="py-20 max-md:py-14 max-sm:py-11">
      <div className="pad-x mb-10 flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-serif text-[clamp(26px,3vw,34px)]">Where we are</h2>
        <div className="flex gap-[10px]" role="group" aria-label="Choose an office">
          {(Object.keys(offices) as LocationKey[]).map((key) => {
            const active = key === location;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={active}
                onClick={() => setLocation(key)}
                className={`rounded-pill border px-5 py-[10px] text-[14px] font-semibold transition-colors duration-[180ms] ${
                  active
                    ? "border-ink bg-ink text-white"
                    : "border-rule-strong bg-transparent text-ink-soft hover:border-ink hover:text-ink"
                }`}
              >
                {offices[key].shortName}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative border-y border-rule">
        <iframe
          key={location}
          src={office.mapEmbed}
          title={`Map showing the Sanwei ${office.name}`}
          loading="lazy"
          className="block h-[520px] w-full border-0 [filter:saturate(0.72)] max-md:h-[380px]"
        />

        {/* Floats over the map from sm up; sits beneath it on small phones. */}
        <div className="pad-x pointer-events-none absolute inset-x-0 bottom-10 hidden sm:block">
          <div className="pointer-events-auto max-w-[340px] bg-ink px-[30px] py-[26px] text-on-dark shadow-[0_20px_50px_rgba(38,55,70,0.24)]">
            <MapCardBody office={office} />
          </div>
        </div>
      </div>

      <div className="pad-x sm:hidden">
        <div className="bg-ink px-6 py-6 text-on-dark">
          <MapCardBody office={office} />
        </div>
      </div>
    </section>
  );
}

function MapCardBody({ office }: { office: (typeof offices)[LocationKey] }) {
  return (
    <>
      <p className="t-label mb-3 text-steel-light">{office.name}</p>
      <address className="text-[15px] not-italic leading-[1.75]">{office.addressLines.join(", ")}</address>
      <a
        href={office.mapLink}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-accent-soft transition-colors duration-[180ms] hover:text-white"
      >
        Open in maps
        <ArrowDiagonal size={15} />
      </a>
    </>
  );
}
