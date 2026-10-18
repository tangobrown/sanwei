"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";
import { GALLERY_PER_PAGE, galleryFilters, galleryRef, numberedGalleryItems } from "@/content/gallery";

const ALL = "All parts";

/**
 * Client-side filtering and pagination. Both live in the URL query so a
 * filtered view is shareable, and both reset the grid's scroll position
 * rather than calling scrollIntoView.
 *
 * A tile opens the lightbox, which steps through the parts the current filter
 * shows rather than the whole gallery.
 */
export function GalleryBrowser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const gridRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const requestedFilter = searchParams.get("industry");
  const filter = galleryFilters.find((option) => option === requestedFilter) ?? ALL;

  const filtered =
    filter === ALL ? numberedGalleryItems : numberedGalleryItems.filter((item) => item.categories.some((c) => c === filter));
  const pageCount = Math.max(1, Math.ceil(filtered.length / GALLERY_PER_PAGE));

  const requestedPage = Number.parseInt(searchParams.get("page") ?? "1", 10);
  const page = Number.isFinite(requestedPage) ? Math.min(Math.max(requestedPage, 1), pageCount) : 1;

  const start = (page - 1) * GALLERY_PER_PAGE;
  const visible = filtered.slice(start, start + GALLERY_PER_PAGE);

  const navigate = (nextFilter: string, nextPage: number) => {
    const params = new URLSearchParams();
    if (nextFilter !== ALL) params.set("industry", nextFilter);
    if (nextPage > 1) params.set("page", String(nextPage));

    const query = params.toString();
    router.replace(query ? `/gallery?${query}` : "/gallery", { scroll: false });

    // Return the reader to the top of the grid without hijacking the page.
    const top = gridRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) window.scrollTo({ top: window.scrollY + top - 24, behavior: "smooth" });
  };

  const count = filtered.length;
  const stepLightbox = (delta: number) =>
    setLightbox((current) => (current === null ? null : (current + delta + count) % count));

  // Escape closes, the arrows walk the filtered set, and the page behind
  // stays put while the overlay is open.
  useEffect(() => {
    if (lightbox === null) return;

    const step = (delta: number) =>
      setLightbox((current) => (current === null ? null : (current + delta + count) % count));

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [lightbox, count]);

  const rangeLabel =
    filtered.length === 0
      ? "No parts"
      : `${start + 1}–${Math.min(start + GALLERY_PER_PAGE, filtered.length)} of ${filtered.length} parts`;

  const open = lightbox === null ? null : filtered[lightbox];

  return (
    <>
      <div className="pad-x flex flex-wrap items-center justify-between gap-4 pb-5">
        <div className="flex flex-wrap gap-[10px]" role="group" aria-label="Filter parts by category">
          {galleryFilters.map((option) => {
            const active = option === filter;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={active}
                onClick={() => navigate(option, 1)}
                className={`cursor-pointer rounded-pill border px-5 py-[10px] text-[14px] font-semibold transition-colors duration-[180ms] ${
                  active
                    ? "border-ink bg-ink text-white"
                    : "border-rule-strong bg-transparent text-ink-soft hover:border-ink hover:text-ink"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
        <p aria-live="polite" className="text-[14px] text-steel">
          {rangeLabel}
        </p>
      </div>

      <div ref={gridRef} className="pad-x pb-14 max-md:pb-10">
        <div className="grid grid-cols-2 gap-5 max-sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((item, i) => (
            <figure key={item.file} className="border border-rule bg-card">
              <button
                type="button"
                onClick={() => setLightbox(start + i)}
                aria-label={`View part ${galleryRef(item.ref)}, ${item.name}, larger`}
                className="block w-full cursor-pointer"
              >
                <ImageSlot
                  brief={item.name}
                  src={`/gallery/${item.file}`}
                  alt={item.name}
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="aspect-square transition-opacity duration-[180ms] hover:opacity-90"
                />
              </button>
              <figcaption className="px-5 py-4 max-sm:px-3">
                <span className="text-[12px] tracking-[0.1em] text-steel">{galleryRef(item.ref)}</span>
                <span className="mt-[2px] block text-[15px] font-semibold">{item.name}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {pageCount > 1 ? (
          <nav aria-label="Gallery pages" className="mt-12 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => navigate(filter, page - 1)}
              disabled={page === 1}
              className="border border-rule px-5 py-[10px] text-[14px] font-semibold transition-colors duration-[180ms] enabled:cursor-pointer enabled:hover:border-ink disabled:text-disabled"
            >
              Previous
            </button>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                type="button"
                aria-current={number === page ? "page" : undefined}
                onClick={() => navigate(filter, number)}
                className={`min-w-11 cursor-pointer border px-4 py-[10px] text-[14px] font-semibold transition-colors duration-[180ms] ${
                  number === page ? "border-ink bg-ink text-white" : "border-rule text-ink-soft hover:border-ink"
                }`}
              >
                {number}
              </button>
            ))}
            <button
              type="button"
              onClick={() => navigate(filter, page + 1)}
              disabled={page === pageCount}
              className="border border-rule px-5 py-[10px] text-[14px] font-semibold transition-colors duration-[180ms] enabled:cursor-pointer enabled:hover:border-ink disabled:text-disabled"
            >
              Next
            </button>
          </nav>
        ) : null}
      </div>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Part ${galleryRef(open.ref)}, ${open.name}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-6 max-sm:p-3"
          onClick={() => setLightbox(null)}
        >
          {/* The frame swallows the click so only the backdrop closes. */}
          <div className="relative w-full max-w-[860px]" onClick={(event) => event.stopPropagation()}>
            <div className="bg-white p-4 max-sm:p-2">
              {/* Fitted, not cropped, and short enough to clear the controls. */}
              <ImageSlot
                key={open.file}
                brief={open.name}
                src={`/gallery/${open.file}`}
                alt={open.name}
                fit="contain"
                sizes="(max-width: 900px) 100vw, 860px"
                className="h-[min(62vh,720px)] w-full"
              />
              <div className="flex items-baseline gap-4 px-2 pb-1 pt-4">
                <span className="text-[13px] tracking-[0.1em] text-steel">{galleryRef(open.ref)}</span>
                <span className="text-[16px] font-semibold">{open.name}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-[10px]">
                <button
                  type="button"
                  onClick={() => stepLightbox(-1)}
                  aria-label="Previous part"
                  className="flex h-11 w-11 cursor-pointer items-center justify-center border border-rule-dark text-on-dark transition-colors duration-[180ms] hover:border-accent-soft hover:text-accent-soft"
                >
                  <ArrowLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => stepLightbox(1)}
                  aria-label="Next part"
                  className="flex h-11 w-11 cursor-pointer items-center justify-center border border-rule-dark text-on-dark transition-colors duration-[180ms] hover:border-accent-soft hover:text-accent-soft"
                >
                  <ArrowRight size={20} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="cursor-pointer rounded-pill bg-white px-6 py-3 text-[14px] font-semibold text-ink transition-colors duration-[180ms] hover:bg-accent hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
