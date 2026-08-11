import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata, resolveLocale } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContentSection } from "@/components/content/ContentSection";
import { ProcessSteps, type Step } from "@/components/content/ProcessSteps";
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
  const t = await getTranslations({ locale: active, namespace: "pages.firstTimeBuyers" });
  return buildMetadata({
    locale: active,
    path: "/first-time-buyers",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function FirstTimeBuyersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.firstTimeBuyers" });
  const tn = await getTranslations({ locale, namespace: "nav" });

  const steps = t.raw("journey.steps") as Step[];

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: tn("links.firstTimeBuyers"), href: "/first-time-buyers" }]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
      >
        <Button href="/mortgage-calculator" variant="secondary">
          {tn("links.mortgageCalculator")}
          <Icon name="calculator" className="h-5 w-5" />
        </Button>
        <Button href="/buy" variant="outline">
          {tn("links.buy")}
        </Button>
      </PageHeader>

      <ContentSection eyebrow={t("journey.eyebrow")} title={t("journey.title")} intro={t("journey.intro")}>
        <ProcessSteps steps={steps} />
        <div className="mt-6">
          <Disclaimer>{t("disclaimer")}</Disclaimer>
        </div>
      </ContentSection>

      <CtaBanner
        title={t("cta.title")}
        body={t("cta.body")}
        primary={{ label: tn("links.propertySearch"), href: "/property-search" }}
        secondary={{ label: tn("links.contact"), href: "/contact" }}
      />
    </>
  );
}
