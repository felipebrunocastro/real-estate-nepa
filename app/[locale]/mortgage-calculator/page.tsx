import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata, resolveLocale } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContentSection } from "@/components/content/ContentSection";
import { CtaBanner } from "@/components/content/CtaBanner";
import { MortgageCalculator } from "@/components/calculators/MortgageCalculator";
import { ToolsGrid } from "@/components/calculators/ToolsGrid";

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
  const tc = await getTranslations({ locale, namespace: "calculators" });
  const tn = await getTranslations({ locale, namespace: "nav" });

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: tn("links.mortgageCalculator"), href: "/mortgage-calculator" }]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
      />

      <ContentSection>
        <MortgageCalculator />
      </ContentSection>

      <ContentSection bordered title={tc("tools.title")} intro={tc("tools.intro")}>
        <ToolsGrid exclude="mortgage" />
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
