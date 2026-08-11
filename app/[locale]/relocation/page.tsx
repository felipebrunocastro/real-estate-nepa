import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata, resolveLocale } from "@/lib/seo";
import { featuredCities } from "@/data/cities";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContentSection } from "@/components/content/ContentSection";
import { FeatureGrid, type Feature } from "@/components/content/FeatureGrid";
import { ProcessSteps, type Step } from "@/components/content/ProcessSteps";
import { Disclaimer } from "@/components/content/Disclaimer";
import { CtaBanner } from "@/components/content/CtaBanner";
import { CityCard } from "@/components/cities/CityCard";
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

  const explore = t.raw("explore.items") as Feature[];
  const practical = t.raw("practical.items") as Feature[];
  const checklist = t.raw("checklist.items") as Step[];

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
        <Button href="/property-search" variant="outline">
          {tn("links.propertySearch")}
        </Button>
      </PageHeader>

      {/* Getting to know NEPA */}
      <ContentSection eyebrow={t("explore.eyebrow")} title={t("explore.title")} intro={t("explore.intro")}>
        <FeatureGrid items={explore} columns={3} />
      </ContentSection>

      {/* Daily life & logistics */}
      <ContentSection bordered title={t("practical.title")} intro={t("practical.intro")}>
        <FeatureGrid items={practical} columns={3} />
      </ContentSection>

      {/* Explore individual city guides */}
      <ContentSection bordered title={t("cities.title")} intro={t("cities.intro")}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCities.map((city) => (
            <CityCard key={city.slug} city={city} />
          ))}
        </div>
        <div className="mt-8">
          <Button href="/cities" variant="outline">
            {tn("links.cities")}
            <Icon name="arrow-right" className="h-4 w-4" />
          </Button>
        </div>
      </ContentSection>

      {/* Moving checklist */}
      <ContentSection bordered title={t("checklist.title")} intro={t("checklist.intro")}>
        <ProcessSteps steps={checklist} />
      </ContentSection>

      <ContentSection>
        <Disclaimer>{t("disclaimer")}</Disclaimer>
      </ContentSection>

      <CtaBanner
        title={t("cta.title")}
        body={t("cta.body")}
        primary={{ label: tn("links.cities"), href: "/cities" }}
        secondary={{ label: tn("links.contact"), href: "/contact" }}
      />
    </>
  );
}
