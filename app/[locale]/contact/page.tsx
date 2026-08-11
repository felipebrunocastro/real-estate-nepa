import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata, resolveLocale } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { Icon, type IconName } from "@/components/ui/Icon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const active = resolveLocale(locale);
  const t = await getTranslations({ locale: active, namespace: "pages.contact" });
  return buildMetadata({
    locale: active,
    path: "/contact",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.contact" });
  const tn = await getTranslations({ locale, namespace: "nav" });

  const helps = t.raw("help.items") as { icon: IconName; title: string; body: string }[];

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: tn("links.contact"), href: "/contact" }]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
      />

      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
          <ContactForm />

          <aside className="space-y-4">
            <h2 className="font-display text-lg font-semibold text-navy-900">
              {t("help.title")}
            </h2>
            {helps.map((help) => (
              <div
                key={help.title}
                className="flex gap-3 rounded-xl border border-border bg-surface p-5"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-accent-600">
                  <Icon name={help.icon} className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-navy-900">{help.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {help.body}
                  </p>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </Container>
    </>
  );
}
