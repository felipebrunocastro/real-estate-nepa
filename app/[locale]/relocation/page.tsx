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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const active = resolveLocale(locale);
  const t = await getTranslations({ locale: active, namespace: "pages.relocation" });
  return buildMetadata({
    locale: active,
    path: "/relocation",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function RelocationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.relocation" });
  const tn = await getTranslations({ locale, namespace: "nav" });

  const topics = t.raw("topics.items") as Feature[];

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: tn("links.relocation"), href: "/relocation" }]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
      >
        <Button href="/cities" variant="secondary">
          {tn("links.cities")}
          <Icon name="arrow-right" className="h-5 w-5" />
        </Button>
      </PageHeader>

      <ContentSection eyebrow={t("topics.eyebrow")} title={t("topics.title")} intro={t("topics.intro")}>
        <FeatureGrid items={topics} columns={3} />
        <div className="mt-6">
          <Disclaimer>{t("disclaimer")}</Disclaimer>
        </div>
      </ContentSection>

      <CtaBanner
        title={t("cta.title")}
        body={t("cta.body")}
        primary={{ label: tn("links.cities"), href: "/cities" }}
        secondary={{ label: tn("links.propertySearch"), href: "/property-search" }}
      />
    </>
  );
}
