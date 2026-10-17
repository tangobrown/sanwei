import Link from "next/link";
import { ArrowDiagonal } from "@/components/ui/Icons";
import { serviceListOrder } from "@/content/site";

/**
 * The homepage services panel: a blue block inset on the paper band, with the
 * nine services reading row by row across three columns.
 *
 * The brief specifies `steel` here and notes that white on it falls just under
 * 4.5:1 for text this size, offering a slightly darker panel as the fallback.
 * That fallback is applied: `steel-deep` carries the 17px rows at 5.05:1.
 */
export function ServicesPanel() {
  return (
    <section className="pad-x bg-paper py-20 max-md:py-14">
      <div className="bg-steel-deep px-14 pb-14 pt-[60px] text-white max-md:px-6 max-md:py-10">
        <div className="mb-7 grid items-center gap-x-12 gap-y-6 lg:grid-cols-3">
          {/* Sans-serif here, not the display face. */}
          <h2 className="max-w-[700px] text-[clamp(30px,3.6vw,42px)] font-bold leading-[1.12] tracking-[-0.02em] text-wrap-balance lg:col-span-2">
            Our services focus on bringing your project to fruition.
          </h2>
          <p className="text-[15px] leading-[1.75]">
            Sanwei really is an extension of your procurement team in Asia.
          </p>
        </div>

        <div className="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          {serviceListOrder.map((service) => (
            <Link
              key={service.label}
              href={service.href}
              className="flex items-center justify-between gap-4 border-b border-white/40 py-5 text-[17px] transition-colors duration-[180ms] hover:border-white"
            >
              <span>{service.label}</span>
              <ArrowDiagonal size={14} className="shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
