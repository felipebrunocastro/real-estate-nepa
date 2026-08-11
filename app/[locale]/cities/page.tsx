import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata, resolveLocale } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContentSection } from "@/components/content/ContentSection";
import { CtaBanner } from "@/components/content/CtaBanner";
import { CityCard } from "@/components/cities/CityCard";
import { cities } from "@/data/cities";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const active = resolveLocale(locale);
  const t = await getTranslations({ locale: active, namespace: "pages.cities" });
  return buildMetadata({
    locale: active,
    path: "/cities",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function CitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.cities" });
  const tn = await getTranslations({ locale, namespace: "nav" });

  const counties = ["Luzerne County", "Lackawanna County"] as const;

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: tn("links.cities"), href: "/cities" }]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
      />

      {counties.map((county, i) => {
        const group = cities.filter((c) => c.county === county);
        if (group.length === 0) return null;
        return (
          <ContentSection key={county} bordered={i > 0} title={county}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.map((city) => (
                <CityCard key={city.slug} city={city} />
              ))}
            </div>
          </ContentSection>
        );
      })}

      <CtaBanner
        title={t("cta.title")}
        body={t("cta.body")}
        primary={{ label: tn("links.propertySearch"), href: "/property-search" }}
        secondary={{ label: tn("links.relocation"), href: "/relocation" }}
      />
    </>
  );
}
