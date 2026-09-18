import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { CtaBand } from "@/components/sections/Bands";
import { TeamCarousel } from "@/components/about/TeamCarousel";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { offices } from "@/content/site";
import { team } from "@/content/team";

export const metadata: Metadata = {
  title: "Why Sanwei?",
  description:
    "Sanwei Technical Ltd is an Asia based part sourcing, project management, engineering and manufacturing company, with a factory in Taiwan and a customer-facing presence in the UK.",
  alternates: { canonical: "/why-sanwei" },
};

export default function WhySanweiPage() {
  return (
    <>
      <Hero
        eyebrow="Why Sanwei?"
        title="About us"
        subline="Our team of specialist engineers are completely focused on helping you to achieve your goals."
        slides={[{ brief: "Sanwei team on site, wide" }]}
      />

      <section className="pad-x grid items-start gap-[72px] pb-[72px] pt-[88px] max-md:pb-14 max-md:pt-14 max-sm:pb-11 max-sm:pt-11 lg:grid-cols-2">
        <div>
          <h2 className="t-h2-minor mb-[26px]">
            Sanwei Technical Ltd is an Asia based part sourcing, project management, engineering and manufacturing
            company.
          </h2>
          <div className="flex flex-col gap-[18px]">
            <p className="t-body max-w-[620px] text-ink-soft">
              We have a factory in Taiwan, a vast network of trusted suppliers and manufacturers across the whole of
              Asia, plus a customer-facing presence in the UK. For over 30 years we have specialised in providing high
              end technical components to companies globally, with a particular focus on the automotive, audio and
              marine industries.
            </p>
            <p className="t-body max-w-[620px] text-ink-soft">
              We can help you manufacture or source any part, big or small, to complete your project, and provide high
              quality products in the most cost effective way. Sanwei is your procurement team in Asia.
            </p>
            <p className="t-body max-w-[620px] text-ink-soft">
              As part of the Sanwei group, HonJeh is a manufacturing plant specialising in metal stampings, metal
              grilles and assemblies.{" "}
              <a
                href="https://honjeh.com"
                target="_blank"
                rel="noreferrer"
                className="text-accent underline underline-offset-4 hover:text-ink"
              >
                View our HonJeh website
              </a>{" "}
              for more information.
            </p>
          </div>
        </div>
        <ImageSlot
          brief="Company outing group photo"
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="h-[460px] max-md:h-[300px]"
        />
      </section>

      <section className="pad-x grid gap-16 bg-ink py-[104px] text-on-dark max-md:py-14 max-sm:py-11 lg:grid-cols-2">
        <div>
          <p className="t-eyebrow-sm mb-4 text-steel-light">Our story</p>
          <h2 className="t-h2-minor mb-6">From simple audio components to complex assemblies.</h2>
          <div className="flex flex-col gap-5">
            <p className="text-[15px] leading-[1.75] text-on-dark-dim">
              Sanwei was founded with an initial focus on providing simple components for the audio and consumer
              electronics industries, which soon evolved to incorporate more complex assemblies.
            </p>
            <p className="text-[15px] leading-[1.75] text-on-dark-dim">
              As our supply network, customer relationships and reputation for quality grew, we diversified into
              supplying audio parts for the automotive industry, and then automotive parts themselves. These days, we
              manufacture and source parts for a wide range of industries including marine, EV, aerospace, energy and
              many more. We have been trading under the Sanwei brand for over 12 years, and are relentless in our
              pursuit of ever higher standards of quality in our products and services.
            </p>
          </div>
          <ImageSlot
            brief="Taipei team photo"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="mt-8 h-[280px]"
          />
        </div>

        <div>
          <p className="t-eyebrow-sm mb-4 text-steel-light">Why choose Sanwei?</p>
          <h2 className="t-h2-minor mb-6">We remove engineering roadblocks.</h2>
          <div className="flex flex-col gap-5">
            <p className="text-[15px] leading-[1.75] text-on-dark-dim">
              It&rsquo;s our mission to remove engineering roadblocks for our customers by providing first-class Asian
              product sourcing and manufacturing. We&rsquo;re fully invested in helping you to make sure your project
              becomes more than the sum of its parts. Whether it&rsquo;s a brilliant new creation, the evolution of an
              existing product or something that makes better quality more widely available to consumers, we believe
              your project can make the world a better place.
            </p>
            <p className="text-[15px] leading-[1.75] text-on-dark-dim">
              That&rsquo;s why our team of specialist engineers are completely focused on helping you to achieve your
              goals. Our three decades of experience has provided us with the multi-discipline capability to provide
              unrivalled holistic consultancy for your project, whatever your organisation&rsquo;s size or location.
            </p>
            <p className="text-[15px] leading-[1.75] text-on-dark-dim">
              Many other parts sourcing providers simply act as a point of contact between customer and factory, taking
              no responsibility for the overall quality of the end product. At Sanwei, all of our products are
              guaranteed, so you can order with confidence. Our team also plays a proactive role in solving any
              challenges your project could encounter, liaising directly with suppliers to deliver the best possible
              outcomes.
            </p>
          </div>
        </div>
      </section>

      <TeamCarousel members={team} />

      <CtaBand showEmail showExperts={false} />

      <section className="pad-x border-t border-rule py-20 max-md:py-14 max-sm:py-11">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="grid gap-10 sm:grid-cols-2">
            {[offices.asia, offices.uk].map((office) => (
              <div key={office.name}>
                <h2 className="mb-4 font-serif text-[28px]">{office.name}</h2>
                <address className="text-[15px] not-italic leading-[1.75] text-ink-soft">
                  {office.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <a href={office.phoneHref} className="block hover:text-accent">
                    {office.phone}
                  </a>
                  <a href={`mailto:${office.email}`} className="block text-accent hover:text-ink">
                    {office.email}
                  </a>
                </address>
              </div>
            ))}
            <div className="sm:col-span-2">
              <Link
                href="/contact"
                className="inline-flex rounded-pill bg-ink px-[30px] py-4 text-[15px] font-semibold text-on-dark transition-colors duration-[180ms] hover:bg-accent"
              >
                Contact us
              </Link>
            </div>
          </div>
          <ImageSlot
            brief="Map of the Taipei office"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-[360px] border border-rule"
          />
        </div>
      </section>
    </>
  );
}
