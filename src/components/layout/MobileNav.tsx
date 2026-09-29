"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "@/components/ui/Icons";
import { industryLinks, offices, serviceLinks } from "@/content/site";

const plainLinks = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Why Sanwei?", href: "/why-sanwei" },
  { label: "Process", href: "/process" },
];

const accordions = [
  { key: "industries", label: "Industries", links: industryLinks },
  { key: "services", label: "Services", links: serviceLinks },
];

/**
 * Full-screen navigation panel below `lg`. Locks body scroll, traps focus and
 * closes on Escape, on a route change and on the close button.
 */
export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const rowClass =
    "flex min-h-11 items-center justify-between border-b border-rule py-4 text-[20px] transition-colors duration-[180ms]";

  return (
    <div
      id="mobile-nav"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-50 flex flex-col bg-paper motion-safe:animate-[fade-up_220ms_ease_both] lg:hidden"
    >
      <div className="pad-x flex h-[72px] shrink-0 items-center justify-between border-b border-rule">
        <Link href="/" onClick={onClose} aria-label="Sanwei, home">
          <Image src="/brand/sanwei-logo.png" alt="Sanwei" width={165} height={132} className="h-[52px] w-auto" />
        </Link>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="-mr-2 flex h-11 w-11 items-center justify-center"
        >
          <span className="sr-only">Close menu</span>
          <span aria-hidden="true" className="relative block h-6 w-6">
            <span className="absolute left-0 top-1/2 block h-[2px] w-full -translate-y-1/2 rotate-45 bg-ink" />
            <span className="absolute left-0 top-1/2 block h-[2px] w-full -translate-y-1/2 -rotate-45 bg-ink" />
          </span>
        </button>
      </div>

      <nav aria-label="Mobile" className="pad-x flex-1 overflow-y-auto pb-10 pt-2">
        <Link href="/" onClick={onClose} className={`${rowClass} ${pathname === "/" ? "text-accent" : ""}`}>
          Home
        </Link>

        {accordions.map((section) => {
          const isOpen = expanded === section.key;
          return (
            <div key={section.key}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setExpanded(isOpen ? null : section.key)}
                className={`${rowClass} w-full text-left`}
              >
                {section.label}
                <ChevronDown
                  size={18}
                  className={`shrink-0 transition-transform duration-[180ms] ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen ? (
                <div className="border-b border-rule py-2">
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      className={`flex min-h-11 items-center pl-5 text-[17px] ${
                        pathname === link.href ? "text-accent" : "text-ink-soft"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}

        {plainLinks.slice(1).map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={`${rowClass} ${pathname.startsWith(link.href) ? "text-accent" : ""}`}
          >
            {link.label}
          </Link>
        ))}

        <Link
          href="/contact"
          onClick={onClose}
          className="mt-8 flex min-h-11 w-full items-center justify-center rounded-pill bg-ink px-6 py-4 text-[15px] font-semibold text-on-dark"
        >
          Contact us
        </Link>

        {/* On mobile, calling is the likeliest action. */}
        <div className="mt-6 flex flex-col">
          <a href={offices.asia.phoneHref} className="flex min-h-11 items-center gap-3 text-[17px] font-semibold">
            <span className="t-label text-steel">Asia</span>
            {offices.asia.phone}
          </a>
          <a href={offices.uk.phoneHref} className="flex min-h-11 items-center gap-3 text-[17px] font-semibold">
            <span className="t-label text-steel">UK</span>
            {offices.uk.phone}
          </a>
        </div>
      </nav>
    </div>
  );
}
