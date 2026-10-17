import { PillLink } from "@/components/ui/Buttons";
import { ArrowDiagonal } from "@/components/ui/Icons";
import { defaultCta, offices, salesEmail } from "@/content/site";

/**
 * The closing CTA. Replaces the old centred band: the call to action sits at
 * left and the three direct routes (sales, Asia, UK) at right, so a reader who
 * would rather phone or email does not have to go via the contact form.
 */
const routes = [
  { label: "Sales", value: salesEmail, href: `mailto:${salesEmail}` },
  { label: "Asia office", value: offices.asia.phone, href: offices.asia.phoneHref },
  { label: "UK office", value: offices.uk.phone, href: offices.uk.phoneHref },
];

export function CtaDirectRoutes({
  heading,
  body = defaultCta.body,
}: {
  heading: string;
  body?: string;
}) {
  return (
    <section className="pad-x grid items-center gap-14 bg-paper-tint py-24 max-md:py-14 lg:grid-cols-2 lg:gap-20">
      <div>
        <h2 className="font-display text-[clamp(40px,5vw,60px)] leading-[1.05] tracking-[-0.01em] text-wrap-balance">
          {heading}
        </h2>
        <p className="mt-6 max-w-[420px] text-[17px] leading-[1.7] text-ink-soft">{body}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <PillLink href="/contact" variant="accent" withArrow className="px-8 py-[17px] hover:bg-ink">
            Send us a message
          </PillLink>
          <PillLink href="/why-sanwei" variant="outline" className="px-8 py-[17px]">
            Meet our experts
          </PillLink>
        </div>
      </div>

      <div className="border-t border-ink">
        {routes.map((route) => (
          <a
            key={route.label}
            href={route.href}
            className="group grid grid-cols-[minmax(110px,150px)_1fr_18px] items-center gap-4 border-b border-rule-strong py-[22px] transition-colors duration-[180ms] hover:text-accent max-sm:grid-cols-[1fr_18px]"
          >
            <span className="t-label text-ink-soft max-sm:col-span-2">{route.label}</span>
            <span className="text-[20px] font-semibold">{route.value}</span>
            <ArrowDiagonal size={18} className="shrink-0" />
          </a>
        ))}
      </div>
    </section>
  );
}
