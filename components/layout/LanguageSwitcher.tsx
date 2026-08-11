"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LABELS: Record<Locale, string> = { en: "EN", es: "ES", pt: "PT" };
const NAMES: Record<Locale, string> = {
  en: "English",
  es: "Español",
  pt: "Português",
};

/**
 * EN | ES | PT switcher. Uses next-intl's locale-aware router so the user stays
 * on the equivalent page when switching languages (the pathname is preserved,
 * only the locale prefix changes).
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(next: Locale) {
    if (next === locale) return;
    // `pathname` already contains the resolved path (including any dynamic
    // slug), so replacing with the new locale keeps the user on the same page.
    router.replace(pathname, { locale: next });
  }

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="group"
      aria-label="Select language"
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => switchTo(l)}
            aria-current={active ? "true" : undefined}
            title={NAMES[l]}
            className={cn(
              "rounded-sm px-1.5 py-1 text-xs font-semibold transition-colors",
              active
                ? "bg-navy-900 text-white"
                : "text-muted hover:bg-navy-50 hover:text-navy-900",
            )}
          >
            {LABELS[l]}
          </button>
        );
      })}
    </div>
  );
}
