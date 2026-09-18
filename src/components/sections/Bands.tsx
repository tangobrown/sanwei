import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLink, PillLink } from "@/components/ui/Buttons";
import { ArrowDiagonal } from "@/components/ui/Icons";
import { ImageSlot } from "@/components/ui/ImageSlot";
import type { ClientReference } from "@/content/site";
import { defaultCta, industrySpecialisms, promoCards, salesEmail, serviceListOrder } from "@/content/site";

/** Two columns: serif heading plus accent italic statement at left, body at right. */
export function IntroSplit({
  heading,
  statement,
  paragraphs,
  links,
  narrowRight = false,
}: {
  heading: string;
  statement?: string;
  paragraphs: string[];
  links?: { label: string; href: string; accent?: boolean }[];
  narrowRight?: boolean;
}) {
  return (
    <section
      className={`pad-x grid items-start gap-12 pb-[72px] pt-[88px] max-md:pb-14 max-md:pt-14 max-sm:pb-11 max-sm:pt-11 lg:gap-20 ${
        narrowRight ? "lg:grid-cols-[1fr_460px]" : "lg:grid-cols-2"
      }`}
    >
      <div>
        <h2 className="t-h2-major mb-[18px]">{heading}</h2>
        {statement ? <p className="t-statement max-w-[620px] text-accent">{statement}</p> : null}
      </div>
      <div className="flex flex-col gap-[22px] pt-[10px]">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="t-body text-ink-soft">
            {paragraph}
          </p>
        ))}
        {links?.length ? (
          <div className="flex flex-wrap gap-6 text-[14px] font-semibold">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`pb-[3px] transition-colors duration-[180ms] ${
                  link.accent ? "border-b border-accent text-accent" : "border-b border-rule-muted hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/** Intro split whose right-hand column is a photograph rather than body copy. */
export function IntroWithImage({
  heading,
  paragraphs,
  image,
  children,
}: {
  heading: string;
  paragraphs: ReactNode[];
  image: { brief: string; src?: string; alt?: string };
  children?: ReactNode;
}) {
  return (
    <section className="pad-x grid items-start gap-[72px] pb-[72px] pt-[88px] max-md:pb-14 max-md:pt-14 max-sm:pb-11 max-sm:pt-11 lg:grid-cols-2">
      <div>
        <h2 className="t-h2-minor mb-[26px]">{heading}</h2>
        <div className="flex flex-col gap-[18px]">
          {paragraphs.map((paragraph, i) => (
            <p key={i} className="t-body max-w-[620px] text-ink-soft">
              {paragraph}
            </p>
          ))}
        </div>
        {children}
      </div>
      <ImageSlot
        brief={image.brief}
        src={image.src}
        alt={image.alt}
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="h-[460px] max-md:h-[300px]"
      />
    </section>
  );
}

/**
 * A full-bleed split of photograph and coloured panel. The dividing rules are
 * the panel edges, so nothing breaks when the grid reflows to one column.
 */
export function DetailBand({
  image,
  tone = "steel",
  children,
  imageFirst = true,
}: {
  image: { brief: string; src?: string; alt?: string };
  tone?: "steel" | "ink";
  children: ReactNode;
  imageFirst?: boolean;
}) {
  const panel =
    tone === "ink" ? "bg-ink text-on-dark" : "bg-steel text-white";

  return (
    <section className="grid items-stretch lg:grid-cols-2">
      <ImageSlot
        brief={image.brief}
        src={image.src}
        alt={image.alt}
        sizes="(max-width: 1024px) 100vw, 50vw"
        className={`min-h-[520px] max-md:min-h-[300px] ${imageFirst ? "" : "lg:order-2"}`}
      />
      <div className={`flex flex-col justify-center gap-5 px-14 py-[72px] max-md:px-6 max-md:py-14 ${panel}`}>
        {children}
      </div>
    </section>
  );
}

/** A list of short points rendered as hairline-topped rows inside a dark panel. */
export function PanelList({ items }: { items: string[] }) {
  return (
    <div className="mt-5 grid gap-x-7 gap-y-[10px] sm:grid-cols-2">
      {items.map((item) => (
        <p key={item} className="border-t border-white/30 py-[10px] text-[15px] leading-[1.5]">
          {item}
        </p>
      ))}
    </div>
  );
}

/** The `ink` feature band carrying a single client reference. */
export function ClientReferenceBand({ reference, label = "Client reference" }: { reference: ClientReference; label?: string }) {
  return (
    <section className="pad-x bg-ink py-[88px] text-on-dark max-md:py-14 max-sm:py-11">
      <figure className="max-w-[900px]">
        <figcaption className="t-eyebrow mb-[26px] text-steel-light">{label}</figcaption>
        <blockquote className="t-statement mb-[26px] text-on-dark">&ldquo;{reference.quote}&rdquo;</blockquote>
        <p className="t-label text-accent-soft">{reference.role}</p>
      </figure>
    </section>
  );
}

/** The closing call to action. */
export function CtaBand({
  heading = defaultCta.heading,
  body = defaultCta.body,
  primary = { label: "Send us a message", href: "/contact" },
  showEmail = false,
  showExperts = true,
  tone = "paper",
}: {
  heading?: string;
  body?: string;
  primary?: { label: string; href: string };
  showEmail?: boolean;
  showExperts?: boolean;
  tone?: "paper" | "paper-tint";
}) {
  return (
    <section
      className={`pad-x py-[100px] text-center max-md:py-14 max-sm:py-11 ${
        tone === "paper-tint" ? "bg-paper-tint" : "bg-paper"
      }`}
    >
      <h2 className="t-h2-major mb-4 text-[clamp(34px,5.4vw,66px)]">{heading}</h2>
      <p className="mx-auto mb-[38px] max-w-[560px] text-[17px] leading-[1.6] text-ink-mute">{body}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <PillLink href={primary.href} variant="accent" className="py-[17px] px-8">
          {primary.label}
        </PillLink>
        {showEmail ? (
          <a
            href={`mailto:${salesEmail}`}
            className="inline-flex items-center rounded-pill border border-ink px-8 py-[17px] text-[15px] font-semibold transition-colors duration-[180ms] hover:border-accent hover:text-accent"
          >
            Email our team
          </a>
        ) : null}
        {showExperts ? (
          <PillLink href="/why-sanwei" variant="outline" className="py-[17px] px-8">
            Meet our experts
          </PillLink>
        ) : null}
      </div>
    </section>
  );
}

/** The three linked industry cards above the five named-sector tiles. */
export function IndustrySpecialisms() {
  return (
    <section className="pad-x py-20 max-md:py-14 max-sm:py-11">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 className="t-h2-minor text-[clamp(26px,3.4vw,40px)]">{industrySpecialisms.heading}</h2>
        <p className="max-w-[340px] text-[15px] leading-[1.6] text-steel">{industrySpecialisms.subline}</p>
      </div>

      <div className="mb-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {industrySpecialisms.cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group block border border-rule bg-white transition-colors duration-[180ms] hover:border-ink"
          >
            <ImageSlot
              brief={card.slot}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-[220px]"
            />
            <div className="flex items-center justify-between px-7 py-6">
              <span className="font-serif text-[28px]">{card.label}</span>
              <ArrowDiagonal size={16} className="shrink-0 transition-colors duration-[180ms] group-hover:text-accent" />
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {industrySpecialisms.tiles.map((tile) => (
          <Link
            key={tile.label}
            href={tile.href}
            className={`border border-rule px-6 py-[22px] text-[16px] font-semibold transition-colors duration-[180ms] hover:border-ink hover:text-accent ${
              tile.label.startsWith("And more") ? "text-accent" : ""
            }`}
          >
            {tile.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

/** The two tall promo cards shared by the service pages. */
export function PromoCards() {
  return (
    <section className="pad-x grid gap-0 pb-20 max-md:pb-14 max-sm:pb-11 lg:grid-cols-2">
      {promoCards.map((card, i) => (
        <div
          key={card.title}
          className={`flex min-h-[420px] flex-col justify-center px-14 py-[104px] max-md:px-6 max-md:py-14 ${
            i === 0 ? "bg-ink text-on-dark" : "bg-steel text-white"
          }`}
        >
          <h2 className="mb-[18px] font-serif text-[clamp(26px,3vw,34px)] leading-[1.2]">{card.title}</h2>
          <p
            className={`mb-7 max-w-[460px] text-[15px] leading-[1.75] ${
              i === 0 ? "text-on-dark-dim" : "text-on-dark-body"
            }`}
          >
            {card.body}
          </p>
          <PillLink
            href={card.href}
            variant={i === 0 ? "accent" : "white"}
            withArrow
            className="self-start px-[30px] py-4"
          >
            {card.linkLabel}
          </PillLink>
        </div>
      ))}
    </section>
  );
}

/** The nine services as a scannable hairline list. */
export function ServicesList({
  heading,
  subline,
  className = "",
}: {
  heading: string;
  subline?: string;
  className?: string;
}) {
  return (
    <section className={`pad-x py-20 max-md:py-14 max-sm:py-11 ${className}`}>
      <div className="border border-rule bg-card p-14 max-md:p-6">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <h2 className="t-h2-minor max-w-[720px]">{heading}</h2>
          {subline ? <p className="max-w-[340px] text-[15px] leading-[1.7] text-steel">{subline}</p> : null}
        </div>
        <div className="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          {serviceListOrder.map((service) => (
            <Link
              key={service.label}
              href={service.href}
              className="group flex items-center justify-between border-b border-rule-soft py-[17px] text-[18px] transition-colors duration-[180ms] hover:text-accent"
            >
              <span>{service.label}</span>
              <ArrowDiagonal size={16} className="shrink-0 transition-colors duration-[180ms] group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** A row of three part photographs with a link through to the gallery. */
export function ProductShowcase({
  heading,
  linkLabel,
  href,
  images,
}: {
  heading: string;
  linkLabel: string;
  href: string;
  images: string[];
}) {
  return (
    <section className="pad-x py-20 max-md:py-14 max-sm:py-11">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 className="t-h2-minor">{heading}</h2>
        <ArrowLink href={href} underline>
          {linkLabel}
        </ArrowLink>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((brief) => (
          <ImageSlot
            key={brief}
            brief={brief}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="h-[340px]"
          />
        ))}
      </div>
    </section>
  );
}
