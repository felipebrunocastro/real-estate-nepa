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
  const t = await getTranslations({ locale: active, namespace: "pages.realtors" });
  return buildMetadata({
    locale: active,
    path: "/realtors",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function RealtorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.realtors" });
  const tn = await getTranslations({ locale, namespace: "nav" });

  const features = t.raw("features.items") as Feature[];

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: tn("links.realtors"), href: "/realtors" }]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
      />

      <ContentSection>
        <Callout
          icon="map-pin"
          badge={t("comingSoon.badge")}
          title={t("comingSoon.title")}
          body={t("comingSoon.body")}
          ctaLabel={tn("links.contact")}
          ctaHref="/contact"
        />
      </ContentSection>

      <ContentSection bordered title={t("features.title")} intro={t("features.intro")}>
        <FeatureGrid items={features} columns={3} />
        <div className="mt-6">
          <Disclaimer>{t("disclosure")}</Disclaimer>
        </div>
      </ContentSection>

      <CtaBanner
        title={t("cta.title")}
        body={t("cta.body")}
        primary={{ label: tn("links.contact"), href: "/contact" }}
        secondary={{ label: tn("links.propertySearch"), href: "/property-search" }}
      />
    </>
  );
}
