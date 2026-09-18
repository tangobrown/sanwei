import Image from "next/image";
import Link from "next/link";
import { footerDocuments, groupBlurb, offices } from "@/content/site";

export function Footer() {
  return (
    <footer className="pad-x bg-ink py-[52px] text-[13px] leading-[1.75] text-steel-light">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-full mb-1">
          <Image src="/brand/sanwei-logo-light.png" alt="Sanwei" width={165} height={132} className="h-[66px] w-auto" />
        </div>

        <div>
          <h2 className="mb-3 font-semibold text-on-dark">{offices.asia.name}</h2>
          <address className="not-italic">
            24F, No. 161 Song De Road
            <br />
            Xinyi District 110032, Taipei, Taiwan
            <br />
            <a href={offices.asia.phoneHref} className="transition-colors duration-[180ms] hover:text-accent-soft">
              {offices.asia.phone}
            </a>
            <br />
            <a
              href={`mailto:${offices.asia.email}`}
              className="transition-colors duration-[180ms] hover:text-accent-soft"
            >
              {offices.asia.email}
            </a>
          </address>
        </div>

        <div>
          <h2 className="mb-3 font-semibold text-on-dark">{offices.uk.name}</h2>
          <address className="not-italic">
            Axminster, East Devon
            <br />
            <a href={offices.uk.phoneHref} className="transition-colors duration-[180ms] hover:text-accent-soft">
              {offices.uk.phone}
            </a>
            <br />
            <a href={`mailto:${offices.uk.email}`} className="transition-colors duration-[180ms] hover:text-accent-soft">
              {offices.uk.email}
            </a>
          </address>
        </div>

        <div>
          <h2 className="mb-3 font-semibold text-on-dark">Documents</h2>
          <ul>
            {footerDocuments.map((doc) => (
              <li key={doc.label}>
                <Link href={doc.href} className="transition-colors duration-[180ms] hover:text-accent-soft">
                  {doc.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-3 font-semibold text-on-dark">Group</h2>
          <p>
            {groupBlurb.text}{" "}
            <a
              href={groupBlurb.linkHref}
              target="_blank"
              rel="noreferrer"
              className="text-accent-soft transition-colors duration-[180ms] hover:text-white"
            >
              {groupBlurb.linkLabel}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
