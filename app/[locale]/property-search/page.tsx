import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata, resolveLocale } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PropertySearchInterface } from "@/components/property/PropertySearchInterface";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const active = resolveLocale(locale);
  const t = await getTranslations({ locale: active, namespace: "pages.propertySearch" });
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
  const t = await getTranslations({ locale, namespace: "pages.propertySearch" });
  const tn = await getTranslations({ locale, namespace: "nav" });

  const str = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : (v ?? "");

  const initial = {
    location: str(sp.location),
    minPrice: str(sp.minPrice),
    maxPrice: str(sp.maxPrice),
    beds: str(sp.beds),
    baths: str(sp.baths),
    type: str(sp.type),
    status: str(sp.status),
    minSqft: str(sp.minSqft),
    lotSize: str(sp.lotSize),
  };

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: tn("links.propertySearch"), href: "/property-search" },
        ]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
      />
      <Container className="py-10 sm:py-12">
        <PropertySearchInterface initial={initial} />
      </Container>
    </>
  );
}
