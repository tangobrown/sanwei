import Image from "next/image";

export type ImageSlotProps = {
  /**
   * The art-direction brief for this slot, carried over from the prototypes.
   * It is shown inside the placeholder and used as the fallback alt text.
   */
  brief: string;
  /** Real photography. Supplying it swaps the placeholder for a next/image. */
  src?: string;
  /** Alt text for the real photograph. Defaults to the brief. */
  alt?: string;
  /** Passed to next/image so the browser picks a sensible source width. */
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * All photography on the site is still placeholder. Until a real `src` is
 * supplied this renders the grey slot from the prototypes with its brief
 * visible, so the outstanding shots stay legible to whoever is sourcing them.
 *
 * The full list of briefs is exported from `src/lib/photo-brief.ts`.
 */
export function ImageSlot({ brief, src, alt, sizes = "100vw", priority, className = "" }: ImageSlotProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden bg-slot ${className}`}>
        <Image src={src} alt={alt ?? brief} fill sizes={sizes} priority={priority} className="object-cover" />
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
