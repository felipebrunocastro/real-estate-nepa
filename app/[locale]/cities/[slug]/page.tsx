import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata, resolveLocale, localizedUrl } from "@/lib/seo";
import { cities, getCityBySlug, getNearbyCities } from "@/data/cities";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContentSection } from "@/components/content/ContentSection";
import { CtaBanner } from "@/components/content/CtaBanner";
import { FaqList, type Faq } from "@/components/content/FaqList";
import { Disclaimer } from "@/components/content/Disclaimer";
import { CityCard } from "@/components/cities/CityCard";
import { CityMarketSnapshot } from "@/components/cities/CityMarketSnapshot";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

/** Pre-render a page for every city (× every locale). */
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

const OPTION_KEYS = ["buying", "selling", "investing", "relocation"] as const;
const OPTION_META: Record<
  (typeof OPTION_KEYS)[number],
  { href: string; icon: IconName }
> = {
  buying: { href: "/buy", icon: "buy" },
  selling: { href: "/sell", icon: "sell" },
  investing: { href: "/invest", icon: "invest" },
  relocation: { href: "/relocation", icon: "move" },
};

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
  const tn = await getTranslations({ locale, namespace: "nav" });
  const nearby = getNearbyCities(city);

  const faqs: Faq[] = FAQ_KEYS.map((key) => ({
    q: t(`faq.items.${key}.q`, { city: city.name }),
    a: t(`faq.items.${key}.a`, { city: city.name }),
  }));

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

      <PageHeader
        breadcrumbs={[
          { label: tn("links.cities"), href: "/cities" },
          { label: `${city.name}, PA`, href: `/cities/${slug}` },
        ]}
        eyebrow={city.county}
        title={t("metaTitle", { city: city.name })}
        intro={t("tagline", { city: city.name })}
      >
        <Button href={`/property-search?location=${slug}`} variant="secondary">
          {t("searchCta", { city: city.name })}
          <Icon name="arrow-right" className="h-5 w-5" />
        </Button>
        <Button href="/contact" variant="outline">
          {tn("links.contact")}
        </Button>
      </PageHeader>

      {/* Hero image (structured placeholder until real photography exists) */}
      <PlaceholderImage
        label={t("heroLabel", { city: city.name })}
        sublabel={city.county}
        accent={city.accent}
        aspect="aspect-[16/6]"
      />

      {/* About + housing + market snapshot */}
      <ContentSection title={t("about.title", { city: city.name })}>
        <p className="max-w-3xl text-lg leading-relaxed text-muted">
          {city.description[active]}
        </p>
        <div className="mt-8 max-w-3xl">
          <h3 className="font-display text-xl font-semibold text-navy-900">
            {t("housing.title", { city: city.name })}
          </h3>
          <p className="mt-3 leading-relaxed text-muted">
            {t("housing.body", { city: city.name, county: city.county })}
          </p>
        </div>
        <div className="mt-10">
          <h3 className="mb-5 font-display text-xl font-semibold text-navy-900">
            {t("market.title", { city: city.name })}
          </h3>
          <CityMarketSnapshot stats={city.stats} />
        </div>
      </ContentSection>

      {/* Options: buying / selling / investing / relocation */}
      <ContentSection bordered title={t("options.title", { city: city.name })}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {OPTION_KEYS.map((key) => {
            const meta = OPTION_META[key];
            return (
              <div
                key={key}
                className="flex flex-col rounded-xl border border-border bg-surface p-6"
              >
                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-navy-50 text-accent-600">
                  <Icon name={meta.icon} className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-semibold text-navy-900">
                  {t(`options.${key}.title`, { city: city.name })}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {t(`options.${key}.body`, { city: city.name })}
                </p>
                <Link
                  href={meta.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-600 hover:text-accent-700"
                >
                  {t(`options.${key}.cta`)}
                  <Icon name="arrow-right" className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </ContentSection>

      {/* Local highlights + Map */}
      <ContentSection bordered title={t("highlights.title")} intro={t("highlights.intro", { city: city.name })}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ul className="flex flex-wrap gap-2 self-start">
            {city.highlights.map((h) => (
              <li
                key={h}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-navy-800"
              >
                <Icon name="map-pin" className="h-4 w-4 text-accent-600" />
                {h}
              </li>
            ))}
          </ul>
          <div className="overflow-hidden rounded-xl border border-border">
            <PlaceholderImage
              label={t("map.label", { city: city.name })}
              sublabel={t("map.soon")}
              accent={city.accent}
              aspect="aspect-[16/9]"
            />
          </div>
        </div>
      </ContentSection>

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

      {/* Market reports & news + schools note */}
      <ContentSection bordered title={t("articles.title", { city: city.name })}>
        <p className="max-w-3xl text-muted">{t("articles.body", { city: city.name })}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/market-reports" variant="outline">
            {tn("links.marketReports")}
          </Button>
          <Button href="/nepa-news" variant="outline">
            {tn("links.nepaNews")}
          </Button>
        </div>
        <div className="mt-8 max-w-3xl">
          <h3 className="font-display text-lg font-semibold text-navy-900">
            {t("schools.title")}
          </h3>
          <div className="mt-3">
            <Disclaimer>{t("schools.body", { city: city.name })}</Disclaimer>
          </div>
        </div>
      </ContentSection>

      {/* FAQ */}
      <ContentSection bordered title={t("faq.title", { city: city.name })}>
        <FaqList items={faqs} />
      </ContentSection>

      <CtaBanner
        title={t("cta.title", { city: city.name })}
        body={t("cta.body", { city: city.name })}
        primary={{
          label: t("searchCta", { city: city.name }),
          href: `/property-search?location=${slug}`,
        }}
        secondary={{ label: tn("links.contact"), href: "/contact" }}
      />
    </>
  );
}
