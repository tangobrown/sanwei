"use client";

import { useState } from "react";
import { ArrowDiagonal } from "@/components/ui/Icons";
import { offices } from "@/content/site";

type LocationKey = keyof typeof offices;

const MIN_ZOOM = 12;
const MAX_ZOOM = 18;
const DEFAULT_ZOOM = 15;

/**
 * The embed takes a bounding box rather than a zoom level, so each step halves
 * or doubles the span around the office. Latitude is narrowed by the longitude
 * convergence at that latitude, which keeps the scale even on both maps.
 */
function embedUrl(center: { lat: number; lon: number }, zoom: number) {
  const lonSpan = 0.08 / 2 ** (zoom - DEFAULT_ZOOM);
  const latSpan = (lonSpan * Math.cos((center.lat * Math.PI) / 180)) / 2;
  const bbox = [center.lon - lonSpan / 2, center.lat - latSpan / 2, center.lon + lonSpan / 2, center.lat + latSpan / 2];

  return (
    "https://www.openstreetmap.org/export/embed.html" +
    `?bbox=${bbox.map((n) => n.toFixed(5)).join("%2C")}` +
    `&layer=mapnik&marker=${center.lat}%2C${center.lon}`
  );
}

/**
 * The two-office map. The embed is OpenStreetMap, kept behind this single
 * component so swapping to the client's chosen provider is a one-file change.
 *
 * A transparent shield covers the frame so the wheel scrolls the page rather
 * than zooming the map, which also rules out dragging it off the office. The
 * buttons below are the only way to change the scale.
 */
export function OfficeMap() {
  const [location, setLocation] = useState<LocationKey>("asia");
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const office = offices[location];

  return (
    <section className="pt-20 max-md:pt-14 max-sm:pt-11">
      <div className="pad-x mb-10 flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-display text-[clamp(26px,3vw,34px)]">Where we are</h2>
        <div className="flex gap-[10px]" role="group" aria-label="Choose an office">
          {(Object.keys(offices) as LocationKey[]).map((key) => {
            const active = key === location;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setLocation(key);
                  setZoom(DEFAULT_ZOOM);
                }}
                className={`cursor-pointer rounded-pill border px-5 py-[10px] text-[14px] font-semibold transition-colors duration-[180ms] ${
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
          key={`${location}-${zoom}`}
          src={embedUrl(office.center, zoom)}
          title={`Map showing the Sanwei ${office.name}`}
          loading="lazy"
          className="block h-[520px] w-full border-0 [filter:saturate(0.72)] max-md:h-[380px]"
        />

        <div aria-hidden="true" className="absolute inset-0" />

        <div className="absolute right-6 top-6 flex flex-col gap-[6px] max-sm:right-4 max-sm:top-4">
          {[
            { label: "Zoom in", symbol: "+", delta: 1, disabled: zoom >= MAX_ZOOM },
            { label: "Zoom out", symbol: "\u2212", delta: -1, disabled: zoom <= MIN_ZOOM },
          ].map((control) => (
            <button
              key={control.label}
              type="button"
              aria-label={control.label}
              disabled={control.disabled}
              onClick={() => setZoom((current) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, current + control.delta)))}
              className="flex h-11 w-11 items-center justify-center bg-white text-[20px] leading-none text-ink shadow-[0_8px_20px_rgba(38,55,70,0.18)] transition-colors duration-[180ms] enabled:cursor-pointer enabled:hover:bg-ink enabled:hover:text-white disabled:text-disabled"
            >
              {control.symbol}
            </button>
          ))}
        </div>

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
