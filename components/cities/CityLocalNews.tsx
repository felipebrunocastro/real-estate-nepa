import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { getAllArticles, toCardData } from "@/lib/content";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/**
 * "Latest [City] Real Estate & Community News" — articles from the publication
 * system tagged to this city. When there are none yet it shows a structured
 * note and links to the regional NEPA News, keeping city pages fresh over time.
 */
export function CityLocalNews({ slug, cityName }: { slug: string; cityName: string }) {
  const t = useTranslations("cityGuide.news");
  const locale = useLocale() as Locale;
  const cityArticles = getAllArticles().filter((a) => a.city === slug);
  const cards = toCardData(cityArticles, locale).slice(0, 3);

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-xl border border-dashed border-navy-300 bg-sand-100 p-6">
        <p className="text-navy-800">{t("none", { city: cityName })}</p>
        <Button href="/nepa-news" variant="outline">
          {t("allNews")}
          <Icon name="arrow-right" className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
      <div className="mt-6">
        <Button href="/nepa-news" variant="outline">
          {t("allNews")}
          <Icon name="arrow-right" className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
