import Link from "next/link";
import { ImageSlot } from "@/components/ui/ImageSlot";

/**
 * Automotive's electrification band: a wide photograph with a white panel
 * pulled up over its bottom-right corner. On mobile the panel goes full width
 * but keeps the overlap.
 */
export function BatteryBand({
  eyebrow,
  heading,
  paragraphs,
  ctaLabel,
  image,
}: {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  ctaLabel: string;
  image: { brief: string; alt?: string };
}) {
  return (
    <section className="pad-x bg-white pb-[104px] max-md:pb-14">
      <ImageSlot
        brief={image.brief}
        alt={image.alt}
        sizes="100vw"
        className="h-[clamp(300px,40vw,480px)]"
      />
      <div className="flex justify-end">
        <div className="relative -mt-[clamp(120px,22vw,280px)] max-w-[500px] bg-white p-12 shadow-[0_20px_50px_rgba(38,55,70,0.12)] max-md:max-w-full max-md:p-8 lg:mr-14">
          <p className="t-eyebrow-sm mb-4 text-steel">{eyebrow}</p>
          <h2 className="mb-5 font-display text-[clamp(32px,3.4vw,40px)] leading-[1.1]">{heading}</h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="t-body text-ink-soft">
              {paragraph}
            </p>
          ))}
          <Link
            href="/contact"
            className="mt-6 inline-block border-b border-accent pb-[3px] text-[15px] font-semibold text-accent transition-colors duration-[180ms] hover:border-ink hover:text-ink"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
