import Image from "next/image";
import { getPhoto } from "@/content/photography";

export type ImageSlotProps = {
  /**
   * The art-direction brief for this slot, carried over from the prototypes.
   * It doubles as the lookup key into the photography registry.
   */
  brief: string;
  /** Overrides the registry, for a one-off image. */
  src?: string;
  /** Overrides the registry's alt text. Pass "" for a decorative image. */
  alt?: string;
  /** Passed to next/image so the browser picks a sensible source width. */
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Renders the photograph registered for this brief. Where none has been
 * supplied yet it falls back to the grey slot from the prototypes with the
 * brief showing, so outstanding shots stay visible rather than silently
 * becoming empty boxes.
 */
export function ImageSlot({ brief, src, alt, sizes = "100vw", priority, className = "" }: ImageSlotProps) {
  const photo = getPhoto(brief);
  const resolvedSrc = src ?? photo?.src;
  const resolvedAlt = alt ?? photo?.alt ?? brief;
  const contain = photo?.fit === "contain";

  if (resolvedSrc) {
    return (
      <div className={`relative overflow-hidden ${contain ? "bg-white" : "bg-slot"} ${className}`}>
        <Image
          src={resolvedSrc}
          alt={resolvedAlt}
          fill
          sizes={sizes}
          priority={priority}
          className={contain ? "object-contain p-6" : "object-cover"}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-slot ${className}`}
      role="img"
      aria-label={`Placeholder: ${brief}`}
    >
      <span className="pointer-events-none select-none px-6 text-center text-[13px] leading-snug tracking-[0.04em] text-steel">
        {brief}
      </span>
    </div>
  );
}
