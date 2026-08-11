import { articles } from "@/data/articles";
import { getCityBySlug } from "@/data/cities";
import type {
  Article,
  ArticleCardData,
  ArticleSection,
} from "@/types";
import type { Locale } from "@/i18n/routing";

/**
 * Content access layer. Every page/component reads articles through these
 * functions rather than importing the data directly, so the underlying source
 * (currently `data/articles.ts`) can be replaced by MDX, a database, or a
 * headless CMS without touching the UI. Swap the implementations here and the
 * rest of the app is unaffected.
 */

function byNewest(a: Article, b: Article): number {
  return b.publishedAt.localeCompare(a.publishedAt);
}

/** All articles in a section, newest first. */
export function getArticles(section: ArticleSection): Article[] {
  return articles.filter((a) => a.section === section).sort(byNewest);
}

/** A single article by section + slug. */
export function getArticle(
  section: ArticleSection,
  slug: string,
): Article | undefined {
  return articles.find((a) => a.section === section && a.slug === slug);
}

/** Slugs for static generation of a section's detail pages. */
export function getArticleSlugs(section: ArticleSection): string[] {
  return getArticles(section).map((a) => a.slug);
}

/** Every article (both sections) — used for sitemap + related content. */
export function getAllArticles(): Article[] {
  return [...articles].sort(byNewest);
}

/** Related articles in the same section (excluding the current slug). */
export function getRelatedArticles(
  section: ArticleSection,
  slug: string,
  limit = 3,
): Article[] {
  return getArticles(section)
    .filter((a) => a.slug !== slug)
    .slice(0, limit);
}

/**
 * Flatten articles to a locale-resolved, serializable shape for client
 * list/filter components (Localized fields resolved to plain strings).
 */
export function toCardData(
  list: Article[],
  locale: Locale,
): ArticleCardData[] {
  return list.map((a) => ({
    slug: a.slug,
    section: a.section,
    category: a.category,
    title: a.title[locale],
    excerpt: a.excerpt[locale],
    publishedAt: a.publishedAt,
    city: a.city,
    cityName: a.city ? getCityBySlug(a.city)?.name : undefined,
    accent: a.accent,
  }));
}
