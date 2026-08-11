import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { buildMetadata, resolveLocale } from "@/lib/seo";
import {
  getArticle,
  getArticleSlugs,
  getRelatedArticles,
  toCardData,
} from "@/lib/content";
import { ArticleDetail } from "@/components/articles/ArticleDetail";

const SECTION = "nepa-news" as const;

export function generateStaticParams() {
  return getArticleSlugs(SECTION).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const active = resolveLocale(locale);
  const article = getArticle(SECTION, slug);
  if (!article) return {};
  return buildMetadata({
    locale: active,
    path: `/${SECTION}/${slug}`,
    title: article.title[active],
    description: article.excerpt[active],
  });
}

export default async function NepaNewsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const active = resolveLocale(locale);
  const article = getArticle(SECTION, slug);
  if (!article) notFound();

  const related = toCardData(getRelatedArticles(SECTION, slug), active);
  return <ArticleDetail article={article} related={related} />;
}
