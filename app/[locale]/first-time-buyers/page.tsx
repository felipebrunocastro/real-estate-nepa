import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata, resolveLocale } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContentSection } from "@/components/content/ContentSection";
import { ProcessSteps, type Step } from "@/components/content/ProcessSteps";
import { FeatureGrid, type Feature } from "@/components/content/FeatureGrid";
import { FaqList, type Faq } from "@/components/content/FaqList";
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

  const readiness = t.raw("readiness.items") as Feature[];
  const steps = t.raw("journey.steps") as Step[];
  const programs = t.raw("programs.items") as Feature[];
  const creditTips = t.raw("credit.items") as string[];
  const faqs = t.raw("faqs") as Faq[];

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

      {/* Can I buy a home? readiness */}
      <ContentSection eyebrow={t("readiness.eyebrow")} title={t("readiness.title")} intro={t("readiness.intro")}>
        <FeatureGrid items={readiness} columns={2} />
      </ContentSection>

      {/* Step-by-step journey */}
      <ContentSection bordered title={t("journey.title")} intro={t("journey.intro")}>
        <ProcessSteps steps={steps} />
        <div className="mt-6">
          <Disclaimer>{t("disclaimer")}</Disclaimer>
        </div>
      </ContentSection>

      {/* Understanding credit */}
      <ContentSection bordered title={t("credit.title")} intro={t("credit.intro")}>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {creditTips.map((tip) => (
            <li
              key={tip}
              className="flex items-start gap-3 rounded-xl border border-border bg-surface p-5"
            >
              <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" />
              <span className="text-navy-800">{tip}</span>
            </li>
          ))}
        </ul>
      </ContentSection>

      {/* Loan programs */}
      <ContentSection bordered title={t("programs.title")} intro={t("programs.intro")}>
        <FeatureGrid items={programs} columns={3} />
        <div className="mt-6">
          <Disclaimer>{t("programs.note")}</Disclaimer>
        </div>
      </ContentSection>

      {/* FAQ */}
      <ContentSection bordered title={t("faqTitle")}>
        <FaqList items={faqs} />
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
