import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Article, ArticleCardData } from "@/types";
import type { Locale } from "@/i18n/routing";
import { localizedUrl } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { CtaBanner } from "@/components/content/CtaBanner";
import { ArticleBody } from "./ArticleBody";
import { ArticleCard } from "./ArticleCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";

const SECTION_NAV_KEY = {
  "market-reports": "marketReports",
  "nepa-news": "nepaNews",
} as const;

export function ArticleDetail({
  article,
  related,
}: {
  article: Article;
  related: ArticleCardData[];
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("publication");
  const tn = useTranslations("nav");

  const path = `/${article.section}/${article.slug}`;
  const fmtDate = (iso: string) =>
    new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": article.section === "nepa-news" ? "NewsArticle" : "Article",
    headline: article.title[locale],
    description: article.excerpt[locale],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    inLanguage: locale,
    author: { "@type": "Organization", name: article.author },
    publisher: { "@type": "Organization", name: "Real Estate in NEPA" },
    mainEntityOfPage: localizedUrl(locale, path),
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <PageHeader
        breadcrumbs={[
          { label: tn(`links.${SECTION_NAV_KEY[article.section]}`), href: `/${article.section}` },
          { label: article.title[locale], href: path },
        ]}
        eyebrow={t(`categories.${article.category}`)}
        title={article.title[locale]}
        intro={article.excerpt[locale]}
      >
        <p className="text-sm text-muted">
          {t("byLabel", { author: article.author })} · {t("publishedLabel")}{" "}
          {fmtDate(article.publishedAt)}
          {article.updatedAt && (
            <> · {t("updatedLabel")} {fmtDate(article.updatedAt)}</>
          )}
        </p>
      </PageHeader>

      <PlaceholderImage
        label={article.title[locale]}
        sublabel={t(`categories.${article.category}`)}
        accent={article.accent}
        aspect="aspect-[16/6]"
      />

      <Container className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <ArticleBody blocks={article.body} />

          {/* Sources */}
          <div className="mt-10 border-t border-border pt-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted">
              {t("sourcesLabel")}
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm text-muted">
              {article.sources.map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Icon name="document" className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
                  {s.url ? (
                    <a href={s.url} className="hover:text-navy-900">
                      {s.label}
                    </a>
                  ) : (
                    s.label
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mt-6">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-navy-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16 border-t border-border pt-10">
            <h2 className="mb-6 font-display text-2xl font-semibold text-navy-900">
              {t("relatedLabel")}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          <Link
            href={`/${article.section}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent-600 hover:text-accent-700"
          >
            <Icon name="arrow-right" className="h-4 w-4 rotate-180" />
            {t("backTo", { section: tn(`links.${SECTION_NAV_KEY[article.section]}`) })}
          </Link>
        </div>
      </Container>

      <CtaBanner
        title={t("cta.title")}
        body={t("cta.body")}
        primary={{ label: tn("links.propertySearch"), href: "/property-search" }}
        secondary={{ label: tn("links.contact"), href: "/contact" }}
      />
    </>
  );
}
