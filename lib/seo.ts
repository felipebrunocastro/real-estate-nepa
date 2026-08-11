import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "./site";

/**
 * Build the canonical URL for a given locale + path.
 * English (default) has no prefix; other locales are prefixed (/es, /pt).
 */
export function localizedUrl(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.replace(/^\/+/, "/");
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${site.url}${prefix}${clean}`;
}

/**
 * Produce the `alternates` block (canonical + hreflang for every locale plus
 * x-default) so search engines correctly associate translated pages.
 */
export function buildAlternates(locale: Locale, path = "/") {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = localizedUrl(l, path);
  }
  languages["x-default"] = localizedUrl(routing.defaultLocale, path);

  return {
    canonical: localizedUrl(locale, path),
    languages,
  };
}

interface PageMetaInput {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
}

/**
 * Shared metadata factory: sets titles, description, canonical + hreflang,
 * Open Graph and Twitter cards consistently across every page.
 */
export function buildMetadata({
  locale,
  path = "/",
  title,
  description,
}: PageMetaInput): Metadata {
  const url = localizedUrl(locale, path);
  return {
    title,
    description,
    alternates: buildAlternates(locale, path),
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
