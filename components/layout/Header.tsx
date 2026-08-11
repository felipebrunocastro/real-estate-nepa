"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navGroups } from "@/data/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("nav");
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close all menus — used when a navigation link is followed.
  const closeAll = useCallback(() => {
    setOpenGroup(null);
    setMobileOpen(false);
  }, []);

  // Subtle sticky elevation once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes any open menu; click-away closes the mega-menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-surface/95 backdrop-blur transition-shadow",
        scrolled ? "shadow-sm" : "shadow-none",
        "border-b border-border",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop mega-menu */}
        <nav
          ref={navRef}
          aria-label={t("menuLabel")}
          className="hidden lg:flex lg:items-center lg:gap-1"
        >
          {navGroups.map((group) => {
            const isOpen = openGroup === group.key;
            return (
              <div
                key={group.key}
                className="relative"
                onMouseEnter={() => setOpenGroup(group.key)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={() => setOpenGroup(isOpen ? null : group.key)}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold transition-colors",
                    isOpen
                      ? "bg-navy-50 text-navy-900"
                      : "text-navy-700 hover:bg-navy-50 hover:text-navy-900",
                  )}
                >
                  {t(`groups.${group.key}`)}
                  <Icon
                    name="chevron-down"
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="absolute left-0 top-full w-80 pt-2">
                    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-lg">
                      <ul className="p-2" onClick={closeAll}>
                        {group.links.map((link) => (
                          <li key={link.key}>
                            <Link
                              href={link.href}
                              className="block rounded-md px-3 py-2.5 hover:bg-navy-50"
                            >
                              <span className="block text-sm font-semibold text-navy-900">
                                {t(`links.${link.key}`)}
                              </span>
                              <span className="mt-0.5 block text-xs leading-snug text-muted">
                                {t(`descriptions.${link.key}`)}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher className="hidden sm:flex" />
          <Button href="/contact" size="sm" className="hidden sm:inline-flex">
            {t("cta")}
          </Button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-navy-900 hover:bg-navy-50 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <Icon name={mobileOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-surface lg:hidden"
        >
          <nav
            aria-label={t("menuLabel")}
            className="max-h-[calc(100vh-4rem)] overflow-y-auto px-4 py-4"
            onClick={(e) => {
              // Close the mobile menu when a link (not the container) is tapped.
              if ((e.target as HTMLElement).closest("a")) closeAll();
            }}
          >
            {navGroups.map((group) => (
              <div key={group.key} className="py-2">
                <p className="px-2 pb-1 text-xs font-bold uppercase tracking-widest text-muted">
                  {t(`groups.${group.key}`)}
                </p>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.key}>
                      <Link
                        href={link.href}
                        className="block rounded-md px-2 py-2.5 text-base font-medium text-navy-800 hover:bg-navy-50"
                      >
                        {t(`links.${link.key}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="mt-3 flex items-center justify-between border-t border-border pt-4">
              <LanguageSwitcher />
              <Button href="/contact" size="sm">
                {t("cta")}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
