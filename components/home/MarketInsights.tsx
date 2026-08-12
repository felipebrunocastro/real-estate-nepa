import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { getAllArticles, toCardData } from "@/lib/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ArticleCard } from "@/components/articles/ArticleCard";

export function MarketInsights() {
  const t = useTranslations("home.insights");
  const locale = useLocale() as Locale;

  // Show the most recent articles from the publication system (Phase 4).
  const latest = toCardData(getAllArticles().slice(0, 3), locale);

  return (
    <Section>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={t("intro")}
        />
        <Button href="/market-reports" variant="outline" className="shrink-0">
          {t("viewAll")}
          <Icon name="arrow-right" className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latest.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      <p className="mt-6 text-xs text-muted">{t("editorialNotice")}</p>
    </Section>
  );
}
