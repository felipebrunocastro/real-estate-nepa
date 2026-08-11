import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata, resolveLocale } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContentSection } from "@/components/content/ContentSection";
import { FeatureGrid, type Feature } from "@/components/content/FeatureGrid";
import { Disclaimer } from "@/components/content/Disclaimer";
import { CtaBanner } from "@/components/content/CtaBanner";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SampleBadge } from "@/components/ui/SampleBadge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const active = resolveLocale(locale);
  const t = await getTranslations({ locale: active, namespace: "pages.invest" });
  return buildMetadata({
    locale: active,
    path: "/invest",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function InvestPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.invest" });
  const tn = await getTranslations({ locale, namespace: "nav" });

  const why = t.raw("why.items") as Feature[];
  const strategies = t.raw("strategies.items") as Feature[];
  const tools = t.raw("tools.items") as { title: string; description: string }[];

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: tn("links.invest"), href: "/invest" }]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
      >
        <Button href="/property-search" variant="secondary">
          {t("ctaExplore")}
          <Icon name="arrow-right" className="h-5 w-5" />
        </Button>
        <Button href="/market-reports" variant="outline">
          {tn("links.marketReports")}
        </Button>
      </PageHeader>

      <ContentSection eyebrow={t("why.eyebrow")} title={t("why.title")} intro={t("why.intro")}>
        <FeatureGrid items={why} columns={3} />
      </ContentSection>

      <ContentSection bordered title={t("strategies.title")} intro={t("strategies.intro")}>
        <FeatureGrid items={strategies} columns={3} />
      </ContentSection>

      <ContentSection bordered title={t("tools.title")} intro={t("tools.intro")}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <div
              key={tool.title}
              className="flex flex-col rounded-xl border border-dashed border-navy-300 bg-sand-100 p-5"
            >
              <div className="mb-3">
                <SampleBadge>{t("tools.badge")}</SampleBadge>
              </div>
              <span className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-navy-900 text-white">
                <Icon name="calculator" className="h-5 w-5" />
              </span>
              <h3 className="font-semibold text-navy-900">{tool.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {tool.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Disclaimer>{t("tools.disclaimer")}</Disclaimer>
        </div>
      </ContentSection>

      <ContentSection bordered title={t("research.title")} intro={t("research.intro")}>
        <div className="flex flex-wrap gap-3">
          <Button href="/market-reports" variant="outline">
            {tn("links.marketReports")}
          </Button>
          <Button href="/cities" variant="outline">
            {tn("links.cities")}
          </Button>
          <Button href="/nepa-news" variant="outline">
            {tn("links.nepaNews")}
          </Button>
        </div>
      </ContentSection>

      <CtaBanner
        title={t("cta.title")}
        body={t("cta.body")}
        primary={{ label: t("ctaExplore"), href: "/property-search" }}
        secondary={{ label: tn("links.contact"), href: "/contact" }}
      />
    </>
  );
}
