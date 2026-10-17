import type { ReactNode } from "react";
import { ImageSlot } from "@/components/ui/ImageSlot";

/**
 * Photograph left, copy right, on white and contained to the content column.
 * Replaces the old full-bleed image beside a steel-blue panel, so the copy is
 * recoloured for a light ground by its caller.
 */
export function ImageTextSplit({
  image,
  children,
  topPadding = false,
}: {
  image: { brief: string; alt?: string };
  children: ReactNode;
  /** Project Management follows a tinted band, so it needs padding above. */
  topPadding?: boolean;
}) {
  return (
    <section
      className={`pad-x grid items-center gap-[clamp(40px,6vw,80px)] bg-white pb-[104px] max-md:pb-14 lg:grid-cols-2 ${
        topPadding ? "pt-24 max-md:pt-14" : ""
      }`}
    >
      <ImageSlot
        brief={image.brief}
        alt={image.alt}
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="h-[clamp(360px,40vw,520px)] max-md:h-[300px]"
      />
      <div className="text-ink">{children}</div>
    </section>
  );
}
