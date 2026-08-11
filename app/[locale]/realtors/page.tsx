import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata, resolveLocale } from "@/lib/seo";
import { getRealtors, toRealtorCardData } from "@/data/realtors";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContentSection } from "@/components/content/ContentSection";
import { CtaBanner } from "@/components/content/CtaBanner";
import { Disclaimer } from "@/components/content/Disclaimer";
import { RealtorDirectory } from "@/components/realtors/RealtorDirectory";
import { SampleBadge } from "@/components/ui/SampleBadge";

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
  const tr = await getTranslations({ locale, namespace: "realtors" });

  const cards = toRealtorCardData(getRealtors());

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: t("title"), href: "/realtors" }]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
      />

      <ContentSection>
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <SampleBadge>{tr("sampleBadge")}</SampleBadge>
          {tr("sampleBanner")}
        </div>

        <RealtorDirectory realtors={cards} />

        <div className="mt-8">
          <Disclaimer>{t("disclosure")}</Disclaimer>
        </div>
      </ContentSection>

      <CtaBanner
        title={tr("join.title")}
        body={tr("join.body")}
        primary={{ label: tr("join.cta"), href: "/contact" }}
        secondary={{ label: t("title"), href: "/realtors" }}
      />
    </>
  );
}
