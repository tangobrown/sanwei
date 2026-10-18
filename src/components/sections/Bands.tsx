import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLink, PillLink } from "@/components/ui/Buttons";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { getPhoto } from "@/content/photography";
import type { ClientReference } from "@/content/site";
import { defaultCta, promoCards, salesEmail } from "@/content/site";

/** Two columns: serif heading plus accent italic statement at left, body at right. */
export function IntroSplit({
  heading,
  statement,
  paragraphs,
  links,
  narrowRight = false,
  statementPosition = "left",
}: {
  heading: string;
  statement?: string;
  paragraphs: string[];
  links?: { label: string; href: string; accent?: boolean }[];
  narrowRight?: boolean;
  /**
   * Where the accent italic statement sits. Under the heading by default; the
   * homepage runs it at the head of the right-hand column instead, where it
   * reads as a lead-in to the body copy and so sets a size smaller.
   */
  statementPosition?: "left" | "right";
}) {
  const statementOnRight = statementPosition === "right";
  return (
    <section
      className={`pad-x grid items-start gap-12 pb-[72px] pt-[88px] max-md:pb-14 max-md:pt-14 max-sm:pb-11 max-sm:pt-11 lg:gap-20 ${
        narrowRight ? "lg:grid-cols-[1fr_460px]" : "lg:grid-cols-2"
      }`}
    >
      <div>
        <h2 className={`t-h2-major ${statement && !statementOnRight ? "mb-[18px]" : ""}`}>{heading}</h2>
        {statement && !statementOnRight ? (
          <p className="t-statement max-w-[620px] text-accent">{statement}</p>
        ) : null}
      </div>
      <div className="flex flex-col gap-[22px] pt-[10px]">
        {statement && statementOnRight ? (
          <p className="font-display text-[clamp(20px,2.4vw,30px)] italic leading-[1.25] text-accent">{statement}</p>
        ) : null}
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
export function PanelList({ items }: { items: (string | { text: string; items: string[] })[] }) {
  /* A nested point keeps its children, set in from the rule they sit under. */
  const rows = items.flatMap((item) =>
    typeof item === "string"
      ? [{ text: item, nested: false }]
      : [{ text: item.text, nested: false }, ...item.items.map((child) => ({ text: child, nested: true }))],
  );

  return (
    <div className="mt-6 grid gap-x-7 gap-y-[10px] sm:grid-cols-2">
      {rows.map((row) => (
        <p
          key={row.text}
          className={`border-t border-white/30 py-[10px] text-[15px] leading-[1.5] ${row.nested ? "pl-4" : ""}`}
        >
          {row.text}
        </p>
      ))}
    </div>
  );
}

/** The `ink` feature band carrying a single client reference. */
export function ClientReferenceBand({ reference, label = "Client reference" }: { reference: ClientReference; label?: string }) {
  const backdrop = getPhoto("Client references backdrop");

  return (
    <section className="relative isolate overflow-hidden bg-ink py-[88px] text-on-dark max-md:py-14 max-sm:py-11">
      {backdrop ? (
        <Image
          src={backdrop.src}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          /* Scaled up so the blur's soft edge falls outside the band. */
          className="-z-10 scale-110 object-cover opacity-30 blur-[14px]"
        />
      ) : null}

      <div className="pad-x">
        <figure className="mx-auto max-w-[900px] text-center">
          {/*
           * The two small labels are brightened against the photograph; at
           * steel-light and accent-soft they fell under 4.5:1 over it.
           */}
          <figcaption className="t-eyebrow mb-[26px] text-on-dark-soft">{label}</figcaption>
          <blockquote className="t-quote mb-[26px] text-on-dark">&ldquo;{reference.quote}&rdquo;</blockquote>
          <p className="t-label text-accent-pale">{reference.role}</p>
        </figure>
      </div>
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
      <h2 className="t-h2-major mb-4 text-[clamp(30px,4.7vw,58px)]">{heading}</h2>
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
          <h2 className="mb-[18px] font-display text-[clamp(26px,3vw,34px)] leading-[1.2]">{card.title}</h2>
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
