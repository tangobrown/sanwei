"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { GALLERY_PER_PAGE, galleryFilters, galleryItems } from "@/content/gallery";

const ALL = "All parts";

/**
 * Client-side filtering and pagination. Both live in the URL query so a
 * filtered view is shareable, and both reset the grid's scroll position
 * rather than calling scrollIntoView.
 */
export function GalleryBrowser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const gridRef = useRef<HTMLDivElement>(null);

  const requestedFilter = searchParams.get("industry");
  const filter = galleryFilters.find((option) => option === requestedFilter) ?? ALL;

  const filtered = filter === ALL ? galleryItems : galleryItems.filter((item) => item.industry === filter);
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

  const rangeLabel =
    filtered.length === 0
      ? "No parts"
      : `${start + 1}–${Math.min(start + GALLERY_PER_PAGE, filtered.length)} of ${filtered.length} parts`;

  return (
    <>
      <div className="pad-x flex flex-wrap items-center justify-between gap-4 pb-5">
        <div className="flex flex-wrap gap-[10px]" role="group" aria-label="Filter parts by industry">
          {galleryFilters.map((option) => {
            const active = option === filter;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={active}
                onClick={() => navigate(option, 1)}
                className={`rounded-pill border px-5 py-[10px] text-[14px] font-semibold transition-colors duration-[180ms] ${
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
          {visible.map((item) => (
            <figure key={`${item.industry}-${item.name}`} className="border border-rule bg-card">
              <ImageSlot
                brief={item.brief}
                sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="aspect-square"
              />
              <figcaption className="flex items-center justify-between gap-3 px-5 py-4 max-sm:px-3">
                <span className="text-[15px] font-semibold">{item.name}</span>
                <span className="shrink-0 text-[12px] uppercase tracking-[0.1em] text-steel">{item.industry}</span>
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
              className="border border-rule px-5 py-[10px] text-[14px] font-semibold transition-colors duration-[180ms] enabled:hover:border-ink disabled:text-disabled"
            >
              Previous
            </button>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                type="button"
                aria-current={number === page ? "page" : undefined}
                onClick={() => navigate(filter, number)}
                className={`min-w-11 border px-4 py-[10px] text-[14px] font-semibold transition-colors duration-[180ms] ${
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
              className="border border-rule px-5 py-[10px] text-[14px] font-semibold transition-colors duration-[180ms] enabled:hover:border-ink disabled:text-disabled"
            >
              Next
            </button>
          </nav>
        ) : null}
      </div>
    </>
  );
}
