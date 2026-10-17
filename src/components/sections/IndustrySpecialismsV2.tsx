import Link from "next/link";
import { ImageTile } from "@/components/ui/ImageTile";
import { ArrowDiagonal } from "@/components/ui/Icons";

const tiles = [
  {
    label: "Audio",
    href: "/industries/audio",
    brief: "Audio",
    caption: "Components and complex final products for consumer electronic & related industries.",
  },
  {
    label: "Automotive",
    href: "/industries/automotive",
    brief: "Automotive",
    caption: "Precision automotive components and assemblies of the highest quality.",
  },
  {
    label: "Marine",
    href: "/industries/marine",
    brief: "Marine",
    caption: "Engine components, assemblies & boat parts made to challenging specifications.",
  },
];

const sectors = ["Energy", "Aerospace", "Hardware", "Military", "And more…"];

/** Photo tiles plus the sector strip. Replaces the old five-tile row. */
export function IndustrySpecialismsV2() {
  return (
    <section className="pad-x bg-paper py-[88px] max-md:py-14">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-[clamp(36px,4vw,48px)] leading-[1.08]">Industry specialisms</h2>
        <p className="max-w-[340px] text-[15px] leading-[1.6] text-steel">
          Select an industry to find out more about how Sanwei can help you.
        </p>
      </div>

      {/* Three across, straight to one on mobile. Never two plus an orphan. */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {tiles.map((tile) => (
          <ImageTile
            key={tile.label}
            href={tile.href}
            title={tile.label}
            caption={tile.caption}
            brief={tile.brief}
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="h-[clamp(300px,30vw,380px)]"
          />
        ))}
      </div>

      <Link
        href="/industries/other-industries"
        className="group mt-4 flex flex-wrap items-center gap-x-7 gap-y-3 bg-ink px-10 py-8 text-on-dark transition-colors duration-[180ms] hover:bg-accent max-md:px-6"
      >
        <span className="font-display text-[28px]">Other industries</span>
        <span className="flex flex-wrap gap-x-7 gap-y-1 text-[15px] text-on-dark-dim group-hover:text-white">
          {sectors.map((sector) => (
            <span key={sector}>{sector}</span>
          ))}
        </span>
        <ArrowDiagonal size={18} className="ml-auto shrink-0" />
      </Link>
    </section>
  );
}
