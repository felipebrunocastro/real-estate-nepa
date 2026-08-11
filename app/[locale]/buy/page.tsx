import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata, resolveLocale } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContentSection } from "@/components/content/ContentSection";
import { ProcessSteps, type Step } from "@/components/content/ProcessSteps";
import { FeatureGrid, type Feature } from "@/components/content/FeatureGrid";
import { FaqList, type Faq } from "@/components/content/FaqList";
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
  const t = await getTranslations({ locale: active, namespace: "pages.buy" });
  return buildMetadata({
    locale: active,
    path: "/buy",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function BuyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.buy" });
  const tn = await getTranslations({ locale, namespace: "nav" });

  const steps = t.raw("process.steps") as Step[];
  const financing = t.raw("financing.items") as Feature[];
  const faqs = t.raw("faqs") as Faq[];

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: tn("links.buy"), href: "/buy" }]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
      >
        <Button href="/property-search" variant="secondary">
          {t("ctaSearch")}
          <Icon name="arrow-right" className="h-5 w-5" />
        </Button>
        <Button href="/first-time-buyers" variant="outline">
          {t("ctaFirstTime")}
        </Button>
      </PageHeader>

      <ContentSection eyebrow={t("process.eyebrow")} title={t("process.title")} intro={t("process.intro")}>
        <ProcessSteps steps={steps} />
      </ContentSection>

      <ContentSection
        bordered
        title={t("financing.title")}
        intro={t("financing.intro")}
      >
        <FeatureGrid items={financing} columns={3} />
        <p className="mt-6">
          <Button href="/mortgage-calculator" variant="outline">
            {t("financing.calculatorCta")}
            <Icon name="calculator" className="h-5 w-5" />
          </Button>
        </p>
      </ContentSection>

      <ContentSection bordered title={t("faqTitle")}>
        <FaqList items={faqs} />
      </ContentSection>

      <CtaBanner
        title={t("cta.title")}
        body={t("cta.body")}
        primary={{ label: t("ctaSearch"), href: "/property-search" }}
        secondary={{ label: tn("links.contact"), href: "/contact" }}
      />
    </>
  );
}
