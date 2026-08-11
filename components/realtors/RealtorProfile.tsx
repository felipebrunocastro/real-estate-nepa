import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Realtor } from "@/types";
import type { Locale } from "@/i18n/routing";
import { localizedUrl } from "@/lib/seo";
import { getCityBySlug } from "@/data/cities";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBanner } from "@/components/content/CtaBanner";
import { Disclaimer } from "@/components/content/Disclaimer";
import { RealtorAvatar } from "./RealtorAvatar";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";

export function RealtorProfile({ realtor }: { realtor: Realtor }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("realtors");
  const tn = useTranslations("nav");

  const path = `/realtors/${realtor.slug}`;

  // PageHeader's breadcrumbs already emit BreadcrumbList structured data.
  // RealEstateAgent schema is emitted ONLY for real (non-sample) profiles, so
  // we never publish structured data describing a fabricated professional.
  const agentJsonLd = realtor.isSample
    ? null
    : {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        name: realtor.name,
        worksFor: { "@type": "Organization", name: realtor.brokerage },
        areaServed: realtor.serviceAreas
          .map((s) => getCityBySlug(s)?.name)
          .filter(Boolean),
        knowsLanguage: realtor.languages,
        url: localizedUrl(locale, path),
      };

  return (
    <>
      {agentJsonLd && <JsonLd data={agentJsonLd} />}

      <PageHeader
        breadcrumbs={[
          { label: tn("links.realtors"), href: "/realtors" },
          { label: realtor.name, href: path },
        ]}
        eyebrow={realtor.brokerage}
        title={realtor.name}
      />

      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
          {/* Main */}
          <div>
            <div className="flex items-start gap-5">
              <RealtorAvatar name={realtor.name} accent={realtor.accent} size="lg" />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <SampleBadge>{t("sampleBadge")}</SampleBadge>
                  {realtor.tier === "featured" && (
                    <span className="rounded-full bg-accent-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                      {t("featured")}
                    </span>
                  )}
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-sm">
                  {realtor.verified ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                      <Icon name="check" className="h-4 w-4" />
                      {t("verified")}
                    </span>
                  ) : (
                    <span className="text-muted">{t("verificationPending")}</span>
                  )}
                </p>
                <p className="mt-1 text-sm text-muted">{realtor.licenseNote[locale]}</p>
              </div>
            </div>

            <h2 className="mt-8 font-display text-xl font-semibold text-navy-900">
              {t("aboutTitle", { name: realtor.name })}
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-navy-800">
              {realtor.bio[locale]}
            </p>

            {/* Specialties */}
            <h2 className="mt-8 text-xs font-bold uppercase tracking-widest text-muted">
              {t("specialtiesLabel")}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {realtor.specialties.map((s) => (
                <span key={s} className="rounded-full bg-navy-50 px-3 py-1 text-sm font-medium text-navy-700">
                  {t(`specialties.${s}`)}
                </span>
              ))}
            </div>

            {/* Languages */}
            <h2 className="mt-8 text-xs font-bold uppercase tracking-widest text-muted">
              {t("languagesLabel")}
            </h2>
            <p className="mt-3 text-navy-800">
              {realtor.languages.map((l) => t(`languages.${l}`)).join(", ")}
            </p>

            {/* Service areas -> city guides */}
            <h2 className="mt-8 text-xs font-bold uppercase tracking-widest text-muted">
              {t("serviceAreasLabel")}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {realtor.serviceAreas.map((slug) => {
                const city = getCityBySlug(slug);
                if (!city) return null;
                return (
                  <Link
                    key={slug}
                    href={`/cities/${slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-navy-800 hover:border-accent-300"
                  >
                    <Icon name="map-pin" className="h-4 w-4 text-accent-600" />
                    {city.name}, PA
                  </Link>
                );
              })}
            </div>

            <div className="mt-8">
              <Disclaimer>{t("disclosure")}</Disclaimer>
            </div>
          </div>

          {/* Contact panel */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-border bg-surface p-6">
              <h2 className="font-display text-lg font-semibold text-navy-900">
                {t("contact.title")}
              </h2>
              <p className="mt-2 text-xs text-muted">{t("contact.note")}</p>

              <dl className="mt-4 space-y-3 text-sm">
                {realtor.contact.phone && (
                  <div className="flex items-center gap-2">
                    <Icon name="map-pin" className="h-4 w-4 text-accent-600" />
                    <dt className="sr-only">{t("contact.phone")}</dt>
                    <dd className="text-navy-800">{realtor.contact.phone}</dd>
                  </div>
                )}
                {realtor.contact.email && (
                  <div className="flex items-center gap-2">
                    <Icon name="document" className="h-4 w-4 text-accent-600" />
                    <dt className="sr-only">{t("contact.email")}</dt>
                    <dd className="text-navy-800">{realtor.contact.email}</dd>
                  </div>
                )}
                {realtor.contact.website && (
                  <div className="flex items-center gap-2">
                    <Icon name="search" className="h-4 w-4 text-accent-600" />
                    <dt className="sr-only">{t("contact.website")}</dt>
                    <dd className="text-navy-800">{realtor.contact.website}</dd>
                  </div>
                )}
              </dl>

              <div className="mt-5">
                <Button href="/contact" className="w-full justify-center">
                  {t("contact.cta")}
                </Button>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-10">
          <Link
            href="/realtors"
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent-600 hover:text-accent-700"
          >
            <Icon name="arrow-right" className="h-4 w-4 rotate-180" />
            {t("backToDirectory")}
          </Link>
        </div>
      </Container>

      <CtaBanner
        title={t("join.title")}
        body={t("join.body")}
        primary={{ label: t("join.cta"), href: "/contact" }}
        secondary={{ label: tn("links.propertySearch"), href: "/property-search" }}
      />
    </>
  );
}
