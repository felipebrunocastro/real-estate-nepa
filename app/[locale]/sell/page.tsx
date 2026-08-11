import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata, resolveLocale } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContentSection } from "@/components/content/ContentSection";
import { ProcessSteps, type Step } from "@/components/content/ProcessSteps";
import { FeatureGrid, type Feature } from "@/components/content/FeatureGrid";
import { Callout } from "@/components/content/Callout";
import { Disclaimer } from "@/components/content/Disclaimer";
import { CtaBanner } from "@/components/content/CtaBanner";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const active = resolveLocale(locale);
  const t = await getTranslations({ locale: active, namespace: "pages.sell" });
  return buildMetadata({
    locale: active,
    path: "/sell",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function SellPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.sell" });
  const tn = await getTranslations({ locale, namespace: "nav" });

  const steps = t.raw("process.steps") as Step[];
  const prep = t.raw("prep.items") as Feature[];

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: tn("links.sell"), href: "/sell" }]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
      >
        <Button href="/contact" variant="secondary">
          {t("ctaValuation")}
          <Icon name="arrow-right" className="h-5 w-5" />
        </Button>
      </PageHeader>

      <ContentSection>
        <Callout
          icon="calculator"
          badge={t("valuationTool.badge")}
          title={t("valuationTool.title")}
          body={t("valuationTool.body")}
          ctaLabel={t("valuationTool.cta")}
          ctaHref="/contact"
        />
        <div className="mt-4">
          <Disclaimer>{t("valuationTool.disclaimer")}</Disclaimer>
        </div>
      </ContentSection>

      <ContentSection bordered eyebrow={t("process.eyebrow")} title={t("process.title")} intro={t("process.intro")}>
        <ProcessSteps steps={steps} />
      </ContentSection>

      <ContentSection bordered title={t("prep.title")} intro={t("prep.intro")}>
        <FeatureGrid items={prep} columns={3} />
      </ContentSection>

      <CtaBanner
        title={t("cta.title")}
        body={t("cta.body")}
        primary={{ label: t("ctaValuation"), href: "/contact" }}
        secondary={{ label: tn("links.marketReports"), href: "/market-reports" }}
      />
    </>
  );
}
