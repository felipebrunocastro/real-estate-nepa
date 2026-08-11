import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { Icon } from "@/components/ui/Icon";
import { Link } from "@/i18n/navigation";
import { getCityBySlug } from "@/data/cities";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const active = (hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale) as Locale;
  const t = await getTranslations({ locale: active, namespace: "propertySearch" });
  return buildMetadata({
    locale: active,
    path: "/property-search",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function PropertySearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const sp = await searchParams;
  const t = await getTranslations({ locale, namespace: "propertySearch" });

  const str = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;

  const location = str(sp.location);
  const city = location ? getCityBySlug(location) : undefined;
  const chips: { label: string; value: string }[] = [];
  if (city) chips.push({ label: t("location"), value: `${city.name}, PA` });
  if (str(sp.minPrice))
    chips.push({
      label: t("minPrice"),
      value: `$${Number(str(sp.minPrice)).toLocaleString("en-US")}`,
    });
  if (str(sp.maxPrice))
    chips.push({
      label: t("maxPrice"),
      value: `$${Number(str(sp.maxPrice)).toLocaleString("en-US")}`,
    });
  if (str(sp.beds)) chips.push({ label: t("beds"), value: `${str(sp.beds)}+` });
  if (str(sp.type)) chips.push({ label: t("type"), value: String(str(sp.type)) });

  return (
    <Container className="py-16 sm:py-20">
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-navy-900">
              {t("home")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-navy-800">{t("breadcrumb")}</li>
        </ol>
      </nav>

      <div className="mt-8 max-w-3xl">
        <SampleBadge>{t("placeholderBadge")}</SampleBadge>
        <h1 className="mt-4 font-display text-4xl font-bold text-navy-900 sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">{t("body")}</p>
      </div>

      {chips.length > 0 && (
        <div className="mt-8 rounded-xl border border-border bg-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
            {t("yourSearch")}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-3 py-1.5 text-sm text-navy-800"
              >
                <span className="font-semibold text-navy-900">{chip.label}:</span>
                {chip.value}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 flex flex-col items-start gap-4 rounded-xl border border-dashed border-navy-300 bg-sand-100 p-8">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy-900 text-white">
          <Icon name="search" className="h-6 w-6" />
        </span>
        <p className="max-w-xl text-navy-800">{t("note")}</p>
        <Button href="/cities" variant="outline">
          {t("exploreCities")}
          <Icon name="arrow-right" className="h-4 w-4" />
        </Button>
      </div>
    </Container>
  );
}
