import { PillLink } from "@/components/ui/Buttons";

export default function NotFound() {
  return (
    <section className="pad-x py-[140px] text-center max-md:py-20">
      <p className="t-eyebrow mb-6 text-steel">404</p>
      <h1 className="t-page-title mb-6">We could not find that page.</h1>
      <p className="mx-auto mb-10 max-w-[520px] t-lead text-ink-soft">
        The page may have moved. Try the navigation above, or get in touch and we will point you in the right direction.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <PillLink href="/" variant="accent" className="px-8 py-[17px]">
          Back to the homepage
        </PillLink>
        <PillLink href="/contact" variant="outline" className="px-8 py-[17px]">
          Contact us
        </PillLink>
      </div>
    </section>
  );
}
