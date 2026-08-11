import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata, resolveLocale } from "@/lib/seo";
import { getRealtorBySlug, getRealtorSlugs } from "@/data/realtors";
import { RealtorProfile } from "@/components/realtors/RealtorProfile";

export function generateStaticParams() {
  return getRealtorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const active = resolveLocale(locale);
  const realtor = getRealtorBySlug(slug);
  if (!realtor) return {};
  const t = await getTranslations({ locale: active, namespace: "realtors" });
  return buildMetadata({
    locale: active,
    path: `/realtors/${slug}`,
    title: t("profileMeta.title", { name: realtor.name }),
    description: t("profileMeta.description", {
      name: realtor.name,
      brokerage: realtor.brokerage,
    }),
  });
}

export default async function RealtorProfilePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const realtor = getRealtorBySlug(slug);
  if (!realtor) notFound();

  return <RealtorProfile realtor={realtor} />;
}
