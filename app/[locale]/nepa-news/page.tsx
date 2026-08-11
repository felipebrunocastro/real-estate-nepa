import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata, resolveLocale } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContentSection } from "@/components/content/ContentSection";
import { FeatureGrid, type Feature } from "@/components/content/FeatureGrid";
import { Callout } from "@/components/content/Callout";
import { CtaBanner } from "@/components/content/CtaBanner";

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
  const t = await getTranslations({ locale, namespace: "pages.nepaNews" });
  const tn = await getTranslations({ locale, namespace: "nav" });

  const topics = t.raw("topics.items") as Feature[];

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: tn("links.nepaNews"), href: "/nepa-news" }]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
      />

      <ContentSection>
        <Callout
          icon="document"
          badge={t("comingSoon.badge")}
          title={t("comingSoon.title")}
          body={t("comingSoon.body")}
          ctaLabel={tn("links.contact")}
          ctaHref="/contact"
        />
      </ContentSection>

      <ContentSection bordered title={t("topics.title")} intro={t("topics.intro")}>
        <FeatureGrid items={topics} columns={3} />
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
