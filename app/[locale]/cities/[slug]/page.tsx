import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata, resolveLocale, localizedUrl } from "@/lib/seo";
import { cities, getCityBySlug, getNearbyCities } from "@/data/cities";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContentSection } from "@/components/content/ContentSection";
import { Disclaimer } from "@/components/content/Disclaimer";
import { FaqList, type Faq } from "@/components/content/FaqList";
import { CityCard } from "@/components/cities/CityCard";
import { CityMarketSnapshot } from "@/components/cities/CityMarketSnapshot";
import { CityOverview } from "@/components/cities/CityOverview";
import { CityMarketAnalysis } from "@/components/cities/CityMarketAnalysis";
import { CityCharts } from "@/components/cities/CityCharts";
import { CityHomesForSale } from "@/components/cities/CityHomesForSale";
import { CityPropertyTypes } from "@/components/cities/CityPropertyTypes";
import { CityNeighborhoods } from "@/components/cities/CityNeighborhoods";
import { CityAmenities } from "@/components/cities/CityAmenities";
import { CityCommute } from "@/components/cities/CityCommute";
import { CityLocalNews } from "@/components/cities/CityLocalNews";
import { CityLeadCta } from "@/components/cities/CityLeadCta";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const active = resolveLocale(locale);
  const city = getCityBySlug(slug);
  if (!city) return {};
  const t = await getTranslations({ locale: active, namespace: "cityPage" });
  return buildMetadata({
    locale: active,
    path: `/cities/${slug}`,
    title: t("metaTitle", { city: city.name }),
    description: t("metaDescription", { city: city.name, county: city.county }),
  });
}

const FAQ_KEYS = ["listings", "market", "buying", "schools"] as const;

export default async function CityPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const active = locale as Locale;
  const t = await getTranslations({ locale, namespace: "cityPage" });
  const tg = await getTranslations({ locale, namespace: "cityGuide" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const nearby = getNearbyCities(city);

  const cityFaqs: Faq[] = (city.faq ?? []).map((f) => ({
    q: f.q[active],
    a: f.a[active],
  }));
  const templatedFaqs: Faq[] = FAQ_KEYS.map((key) => ({
    q: t(`faq.items.${key}.q`, { city: city.name }),
    a: t(`faq.items.${key}.a`, { city: city.name }),
  }));
  const faqs = [...cityFaqs, ...templatedFaqs];

  const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${city.name}, Pennsylvania`,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: "PA",
      addressCountry: "US",
    },
    url: localizedUrl(active, `/cities/${slug}`),
  };

  return (
    <>
      <JsonLd data={placeJsonLd} />

      {/* Hero */}
      <PageHeader
        breadcrumbs={[
          { label: tg("home"), href: "/" },
          { label: tn("links.cities"), href: "/cities" },
          { label: `${city.name}, PA`, href: `/cities/${slug}` },
        ]}
        eyebrow={city.county}
        title={t("metaTitle", { city: city.name })}
        intro={tg("hero.subhead")}
      >
        <Button href={`/property-search?location=${slug}`} variant="secondary">
          {tg("hero.viewHomes")}
          <Icon name="arrow-right" className="h-5 w-5" />
        </Button>
        <Button href="#market" variant="outline">
          {tg("hero.exploreMarket")}
        </Button>
      </PageHeader>

      <PlaceholderImage
        label={t("heroLabel", { city: city.name })}
        sublabel={city.county}
        accent={city.accent}
        aspect="aspect-[16/6]"
      />

      {/* Quick overview */}
      <ContentSection title={tg("overviewTitle", { city: city.name })}>
        <CityOverview city={city} />
      </ContentSection>

      {/* Living in [city] */}
      {city.living && (
        <ContentSection bordered title={tg("livingTitle", { city: city.name })}>
          <p className="max-w-3xl text-lg leading-relaxed text-navy-800">
            {city.living[active]}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {city.highlights.map((h) => (
              <span key={h} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-navy-800">
                <Icon name="map-pin" className="h-4 w-4 text-accent-600" />
                {h}
              </span>
            ))}
          </div>
        </ContentSection>
      )}

      {/* Real estate market */}
      <ContentSection id="market" bordered title={t("market.title", { city: city.name })}>
        <CityMarketSnapshot area={city.slug} />
        <div className="mt-10">
          <h3 className="mb-5 font-display text-xl font-semibold text-navy-900">
            {tg("chartsTitle", { city: city.name })}
          </h3>
          <CityCharts cityName={city.name} accent={city.accent} />
        </div>
      </ContentSection>

      {/* Market analysis */}
      <ContentSection bordered title={tg("analysisTitle", { city: city.name })}>
        <CityMarketAnalysis city={city.slug} />
      </ContentSection>

      {/* Homes for sale */}
      <ContentSection bordered title={tg("homesTitle", { city: city.name })}>
        <CityHomesForSale slug={city.slug} cityName={city.name} />
      </ContentSection>

      {/* Property types */}
      <ContentSection bordered title={tg("typesTitle", { city: city.name })}>
        <CityPropertyTypes city={city} />
      </ContentSection>

      {/* Neighborhoods (only when data exists) */}
      {city.neighborhoods && city.neighborhoods.length > 0 && (
        <ContentSection bordered title={tg("neighborhoodsTitle", { city: city.name })} intro={tg("neighborhoodsIntro", { city: city.name })}>
          <CityNeighborhoods city={city} />
        </ContentSection>
      )}

      {/* Map + amenities */}
      <ContentSection bordered title={t("map.label", { city: city.name })}>
        <div className="overflow-hidden rounded-xl border border-border">
          <PlaceholderImage
            label={t("map.label", { city: city.name })}
            sublabel={t("map.soon")}
            accent={city.accent}
            aspect="aspect-[16/8]"
          />
        </div>
      </ContentSection>

      {city.amenities && city.amenities.length > 0 && (
        <ContentSection bordered title={tg("amenitiesTitle", { city: city.name })}>
          <CityAmenities city={city} />
        </ContentSection>
      )}

      {/* Schools */}
      <ContentSection bordered title={t("schools.title")}>
        <Disclaimer>{t("schools.body", { city: city.name })}</Disclaimer>
      </ContentSection>

      {/* Commute */}
      {city.distances && city.distances.length > 0 && (
        <ContentSection bordered title={tg("commuteTitle")} intro={tg("commuteIntro", { city: city.name })}>
          <CityCommute city={city} />
        </ContentSection>
      )}

      {/* Nearby communities */}
      {nearby.length > 0 && (
        <ContentSection bordered title={t("nearby.title")} intro={t("nearby.intro", { city: city.name })}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {nearby.map((c) => (
              <CityCard key={c.slug} city={c} />
            ))}
          </div>
        </ContentSection>
      )}

      {/* Local news */}
      <ContentSection bordered title={tg("newsTitle", { city: city.name })}>
        <CityLocalNews slug={city.slug} cityName={city.name} />
      </ContentSection>

      {/* FAQ */}
      <ContentSection bordered title={t("faq.title", { city: city.name })}>
        <FaqList items={faqs} />
      </ContentSection>

      {/* Lead generation */}
      <CityLeadCta slug={city.slug} cityName={city.name} />
    </>
  );
}
