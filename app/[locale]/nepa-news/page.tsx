import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata, resolveLocale } from "@/lib/seo";
import { getArticles, toCardData } from "@/lib/content";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContentSection } from "@/components/content/ContentSection";
import { CtaBanner } from "@/components/content/CtaBanner";
import { ArticleFilterList } from "@/components/articles/ArticleFilterList";
import { SampleBadge } from "@/components/ui/SampleBadge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const active = resolveLocale(locale);
  const t = await getTranslations({ locale: active, namespace: "pages.nepaNews" });
  return buildMetadata({
    locale: active,
    path: "/nepa-news",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function NepaNewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const active = resolveLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.nepaNews" });
  const tp = await getTranslations({ locale, namespace: "publication" });
  const tn = await getTranslations({ locale, namespace: "nav" });

  const cards = toCardData(getArticles("nepa-news"), active);

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: tn("links.nepaNews"), href: "/nepa-news" }]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
      />

      <ContentSection>
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <SampleBadge>{tp("sampleData")}</SampleBadge>
          {tp("sampleBanner")}
        </div>
        <ArticleFilterList articles={cards} />
      </ContentSection>

      <CtaBanner
        title={t("cta.title")}
        body={t("cta.body")}
        primary={{ label: tn("links.marketReports"), href: "/market-reports" }}
        secondary={{ label: tn("links.cities"), href: "/cities" }}
      />
    </>
  );
}
