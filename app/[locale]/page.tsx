import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { JourneyCards } from "@/components/home/JourneyCards";
import { FeaturedCities } from "@/components/home/FeaturedCities";
import { MarketSnapshot } from "@/components/home/MarketSnapshot";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { InvestSection } from "@/components/home/InvestSection";
import { MarketInsights } from "@/components/home/MarketInsights";
import { RelocationSection } from "@/components/home/RelocationSection";
import { Newsletter } from "@/components/home/Newsletter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const active = (hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale) as Locale;
  const t = await getTranslations({ locale: active, namespace: "meta" });
  return buildMetadata({
    locale: active,
    path: "/",
    title: t("homeTitle"),
    description: t("homeDescription"),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <JourneyCards />
      <FeaturedCities />
      <MarketSnapshot />
      <FeaturedProperties />
      <InvestSection />
      <MarketInsights />
      <RelocationSection />
      <Newsletter />
    </>
  );
}
