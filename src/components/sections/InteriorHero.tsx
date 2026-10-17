import { PillLink } from "@/components/ui/Buttons";

/**
 * Colour-only hero for the interior pages. It replaced the photo slideshow,
 * so there is no image layer, scrim, indicator or timer here.
 *
 * The height is a minimum rather than a fixed value: long titles such as
 * "Supply Chain Management" have to be able to grow the band.
 */
export function InteriorHero({
  eyebrow,
  title,
  subline,
  cta,
  titleClass = "t-hero",
}: {
  eyebrow: string;
  title: string;
  subline?: string;
  cta?: { label: string; href: string };
  /** Service names set a size smaller; see `.t-hero-service`. */
  titleClass?: "t-hero" | "t-hero-service";
}) {
  return (
    <section
      className="pad-x flex min-h-[400px] items-end bg-[radial-gradient(120%_140%_at_0%_100%,#1A2733_0%,#263746_55%,#2D4152_100%)] pb-12 pt-[88px] text-on-dark"
      aria-label={`${title} hero`}
    >
      {/*
       * Held to the left half so the rising intro image, which overlaps 300px
       * up into this band, never lands on the text.
       */}
      <div className="w-full max-w-[min(620px,calc(50%-96px))] max-md:max-w-full">
        <p className="t-eyebrow mb-6 text-on-dark-dim">{eyebrow}</p>
        <h1 className={titleClass}>{title}</h1>
        {subline ? <p className="t-hero-sub mt-6 text-on-dark-soft">{subline}</p> : null}
        {cta ? (
          <PillLink href={cta.href} variant="accent" withArrow className="mt-9 px-7 py-[15px] hover:bg-white hover:text-ink">
            {cta.label}
          </PillLink>
        ) : null}
      </div>
    </section>
  );
}
