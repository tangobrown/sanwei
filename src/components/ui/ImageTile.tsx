import Link from "next/link";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { ArrowDiagonal } from "@/components/ui/Icons";

/**
 * A link tile: photograph, bottom scrim, title and caption anchored
 * bottom-left. No lift, no scale; the arrow and caption carry the hover.
 */
export function ImageTile({
  href,
  title,
  caption,
  brief,
  alt,
  className = "",
  titleClass = "text-[34px]",
  sizes = "(max-width: 768px) 100vw, 33vw",
  /** The service expertise tiles darken further, to carry a pill. */
  heavyScrim = false,
  children,
}: {
  href: string;
  title: string;
  caption?: string;
  brief: string;
  alt?: string;
  className?: string;
  titleClass?: string;
  sizes?: string;
  heavyScrim?: boolean;
  children?: React.ReactNode;
}) {
  const scrim = heavyScrim
    ? "bg-[linear-gradient(180deg,rgba(20,30,39,0.1)_0%,rgba(20,30,39,0.88)_100%)]"
    : "bg-[linear-gradient(180deg,rgba(20,30,39,0)_32%,rgba(20,30,39,0.86)_100%)]";

  return (
    <Link href={href} className={`group relative block overflow-hidden ${className}`}>
      <ImageSlot brief={brief} alt={alt} sizes={sizes} className="absolute inset-0 h-full w-full" />
      <div aria-hidden="true" className={`absolute inset-0 ${scrim}`} />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-[clamp(24px,4vw,40px)] text-white">
        <div className="flex items-center justify-between gap-4">
          <span className={`font-display ${titleClass} leading-[1.1]`}>{title}</span>
          <ArrowDiagonal size={18} className="shrink-0 transition-colors duration-[180ms] group-hover:text-accent-pale" />
        </div>
        {caption ? <p className="max-w-[460px] text-[15px] leading-[1.6] text-on-dark-tile">{caption}</p> : null}
        {children}
      </div>
    </Link>
  );
}
