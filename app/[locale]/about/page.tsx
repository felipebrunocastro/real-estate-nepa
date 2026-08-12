import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata, resolveLocale } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { ProseSections, type ProseSection } from "@/components/content/ProseSections";

const NS = "legal.about";
const PATH = "/about";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const active = resolveLocale(locale);
  const t = await getTranslations({ locale: active, namespace: NS });
  return buildMetadata({
    locale: active,
    path: PATH,
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: NS });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const sections = t.raw("sections") as ProseSection[];

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: tn("links.about"), href: PATH }]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
      />
      <Container className="py-12 sm:py-16">
        <ProseSections sections={sections} />
        <p className="mx-auto mt-10 max-w-3xl text-xs text-muted">{t("updated")}</p>
      </Container>
    </>
  );
}
