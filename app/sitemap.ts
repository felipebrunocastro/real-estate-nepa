import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { localizedUrl } from "@/lib/seo";
import { cities } from "@/data/cities";

/**
 * Locale-aware sitemap. Each route is emitted for every locale with hreflang
 * `alternates` so search engines understand the translated equivalents. New
 * top-level routes and cities are added to `paths` as later phases land.
 */
const paths = [
  "/",
  "/property-search",
  "/buy",
  "/sell",
  "/invest",
  "/market-reports",
  "/nepa-news",
  "/mortgage-calculator",
  "/first-time-buyers",
  "/relocation",
  "/cities",
  "/realtors",
  "/contact",
  ...cities.map((c) => `/cities/${c.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return paths.map((path) => ({
    url: localizedUrl(routing.defaultLocale, path),
    lastModified: now,
    changeFrequency: "weekly" as const,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, localizedUrl(l, path)]),
      ),
    },
  }));
}
