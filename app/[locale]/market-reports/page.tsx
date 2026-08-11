import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata, resolveLocale } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContentSection } from "@/components/content/ContentSection";
import { FeatureGrid, type Feature } from "@/components/content/FeatureGrid";
import { Callout } from "@/components/content/Callout";
import { Disclaimer } from "@/components/content/Disclaimer";
import { CtaBanner } from "@/components/content/CtaBanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const active = resolveLocale(locale);
  const t = await getTranslations({ locale: active, namespace: "pages.marketReports" });
  return buildMetadata({
    locale: active,
    path: "/market-reports",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function MarketReportsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.marketReports" });
  const tn = await getTranslations({ locale, namespace: "nav" });

  const metrics = t.raw("metrics.items") as Feature[];

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: tn("links.marketReports"), href: "/market-reports" }]}
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

      <ContentSection bordered title={t("metrics.title")} intro={t("metrics.intro")}>
        <FeatureGrid items={metrics} columns={3} />
        <div className="mt-6">
          <Disclaimer>{t("disclaimer")}</Disclaimer>
        </div>
      </ContentSection>

      <CtaBanner
        title={t("cta.title")}
        body={t("cta.body")}
        primary={{ label: tn("links.cities"), href: "/cities" }}
        secondary={{ label: tn("links.invest"), href: "/invest" }}
      />
    </>
  );
}
