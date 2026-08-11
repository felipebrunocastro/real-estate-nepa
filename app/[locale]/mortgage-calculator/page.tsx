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
  const t = await getTranslations({ locale: active, namespace: "pages.mortgageCalculator" });
  return buildMetadata({
    locale: active,
    path: "/mortgage-calculator",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function MortgageCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.mortgageCalculator" });
  const tn = await getTranslations({ locale, namespace: "nav" });

  const outputs = t.raw("outputs.items") as Feature[];

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: tn("links.mortgageCalculator"), href: "/mortgage-calculator" }]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
      />

      <ContentSection>
        <Callout
          icon="calculator"
          badge={t("comingSoon.badge")}
          title={t("comingSoon.title")}
          body={t("comingSoon.body")}
          ctaLabel={tn("links.firstTimeBuyers")}
          ctaHref="/first-time-buyers"
        />
      </ContentSection>

      <ContentSection bordered title={t("outputs.title")} intro={t("outputs.intro")}>
        <FeatureGrid items={outputs} columns={3} />
        <div className="mt-6">
          <Disclaimer>{t("disclaimer")}</Disclaimer>
        </div>
      </ContentSection>

      <CtaBanner
        title={t("cta.title")}
        body={t("cta.body")}
        primary={{ label: tn("links.buy"), href: "/buy" }}
        secondary={{ label: tn("links.propertySearch"), href: "/property-search" }}
      />
    </>
  );
}
