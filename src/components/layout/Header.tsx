"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { industryLinks, serviceLinks } from "@/content/site";
import { MobileNav } from "./MobileNav";

type MenuKey = "industries" | "services";

const menus: Record<MenuKey, { label: string; links: typeof industryLinks; columns: 1 | 2 }> = {
  industries: { label: "Industries", links: industryLinks, columns: 1 },
  services: { label: "Services", links: serviceLinks, columns: 2 },
};

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  /** Opening one dropdown closes the other. */
  const openMenu = useCallback(
    (key: MenuKey) => {
      clearCloseTimer();
      setOpen(key);
    },
    [clearCloseTimer],
  );

  /** Hover-out closes on a 180ms delay so the pointer can reach the panel. */
  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(null), 180);
  }, [clearCloseTimer]);

  useEffect(() => clearCloseTimer, [clearCloseTimer]);

  // Escape closes, and so does a click outside the nav.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        clearCloseTimer();
        setOpen(null);
      }
    };
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        clearCloseTimer();
        setOpen(null);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [open, clearCloseTimer]);

  // Close everything on a route change, adjusting state during render rather
  // than in an effect so no extra pass is scheduled.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    // A pending close timer only ever sets `open` to null, so leaving it to
    // fire is harmless; clearing a ref here would be a render-time read.
    setOpen(null);
    setMobileOpen(false);
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const sectionActive = (key: MenuKey) => pathname.startsWith(key === "industries" ? "/industries" : "/services");

  const linkClass = (active: boolean) =>
    `pb-[2px] text-[14px] transition-colors duration-[180ms] ${
      active ? "border-b border-accent font-semibold text-accent" : "text-ink hover:text-accent"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper">
      <div className="pad-x flex h-[72px] items-center justify-between lg:h-[92px]">
        <Link href="/" aria-label="Sanwei, home" className="block shrink-0">
          <Image
            src="/brand/sanwei-logo.png"
            alt="Sanwei"
            width={165}
            height={132}
            priority
            className="h-[52px] w-auto lg:h-[66px]"
          />
        </Link>

        <nav ref={navRef} aria-label="Primary" className="hidden items-center gap-[34px] lg:flex">
          <Link href="/" className={linkClass(pathname === "/")}>
            Home
          </Link>

          {(Object.keys(menus) as MenuKey[]).map((key) => {
            const menu = menus[key];
            const expanded = open === key;
            return (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => openMenu(key)}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-haspopup="true"
                  onClick={() => (expanded ? setOpen(null) : openMenu(key))}
                  className={`inline-flex items-center gap-[7px] ${linkClass(sectionActive(key))}`}
                >
                  {menu.label}
                  <span aria-hidden="true" className="text-[10px] leading-none">
                    &#9662;
                  </span>
                </button>

                {/* An 18px invisible bridge lets the pointer travel into the panel. */}
                <div className={`absolute left-[-20px] top-full pt-[18px] ${expanded ? "block" : "hidden"}`}>
                  <div
                    className={`grid border border-rule bg-white p-2 shadow-[0_18px_40px_rgba(38,55,70,0.14)] ${
                      menu.columns === 2 ? "grid-cols-[232px_232px]" : "grid-cols-[232px]"
                    }`}
                  >
                    {menu.links.map((link) => {
                      const current = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          aria-current={current ? "page" : undefined}
                          className={`block px-4 py-3 text-[14px] transition-colors duration-[180ms] ${
                            current ? "bg-paper font-semibold text-accent" : "hover:bg-paper"
                          }`}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}

          <Link href="/gallery" className={linkClass(isActive("/gallery"))}>
            Gallery
          </Link>
          <Link href="/why-sanwei" className={linkClass(isActive("/why-sanwei"))}>
            Why Sanwei?
          </Link>
          <Link href="/process" className={linkClass(isActive("/process"))}>
            Process
          </Link>
          <Link
            href="/contact"
            aria-current={isActive("/contact") ? "page" : undefined}
            className="rounded-pill bg-ink px-6 py-3 text-[14px] text-on-dark transition-colors duration-[180ms] hover:bg-accent"
          >
            Contact us
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
        >
          <span className="sr-only">Open menu</span>
          <span aria-hidden="true" className="flex w-6 flex-col gap-[6px]">
            <span className="block h-[2px] w-full bg-ink" />
            <span className="block h-[2px] w-full bg-ink" />
            <span className="block h-[2px] w-full bg-ink" />
          </span>
        </button>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
