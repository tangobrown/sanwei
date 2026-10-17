import Link from "next/link";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { ArrowDiagonal } from "@/components/ui/Icons";
import { promoCards } from "@/content/site";

/**
 * The expertise / process pair at the foot of each service page, now two
 * photographic tiles rather than flat colour panels. Each service supplies its
 * own two images.
 */
export function ExpertiseTiles({ briefs }: { briefs: [string, string] }) {
  const tiles = promoCards.map((card, i) => ({
    ...card,
    brief: briefs[i],
    accent: i === 0,
  }));

  return (
    <section className="pad-x grid gap-4 pb-20 max-md:pb-14 lg:grid-cols-2">
      {tiles.map((tile) => (
        <div key={tile.title} className="relative h-[clamp(420px,42vw,520px)] overflow-hidden text-white">
          <ImageSlot
            brief={tile.brief}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="absolute inset-0 h-full w-full"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,30,39,0.1)_0%,rgba(20,30,39,0.88)_100%)]"
          />
          <div className="absolute inset-x-[clamp(28px,4vw,48px)] bottom-[clamp(28px,3.6vw,44px)] flex flex-col items-start gap-4">
            <h2 className="max-w-[460px] font-display text-[clamp(30px,3.2vw,38px)] leading-[1.1]">{tile.title}</h2>
            <p className="max-w-[440px] text-[16px] leading-[1.7] text-on-dark-tile">{tile.body}</p>
            <Link
              href={tile.href}
              className={`mt-2 inline-flex items-center gap-[10px] rounded-pill px-7 py-[15px] text-[15px] font-semibold transition-colors duration-[180ms] hover:bg-ink hover:text-white ${
                tile.accent ? "bg-accent text-white" : "bg-white text-ink"
              }`}
            >
              {tile.linkLabel}
              <ArrowDiagonal size={16} className="shrink-0" />
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}
