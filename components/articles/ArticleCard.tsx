import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { ArticleCardData } from "@/types";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Icon } from "@/components/ui/Icon";

/** Article preview card, usable in server and client (filtered) lists. */
export function ArticleCard({ article }: { article: ArticleCardData }) {
  const locale = useLocale();
  const t = useTranslations("publication");

  const date = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(article.publishedAt));

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-shadow hover:shadow-md">
      <Link href={`/${article.section}/${article.slug}`} className="block">
        <PlaceholderImage
          label={article.cityName ?? "NEPA"}
          sublabel={t(`categories.${article.category}`)}
          accent={article.accent}
          aspect="aspect-[16/9]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full bg-navy-50 px-2.5 py-1 font-semibold uppercase tracking-wide text-accent-700">
            {t(`categories.${article.category}`)}
          </span>
          <span className="text-muted">{date}</span>
        </div>
        <h3 className="mt-3 font-display text-lg font-semibold text-navy-900">
          <Link
            href={`/${article.section}/${article.slug}`}
            className="hover:text-accent-700"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {article.excerpt}
        </p>
        <Link
          href={`/${article.section}/${article.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-600 hover:text-accent-700"
        >
          {t("readMore")}
          <Icon name="arrow-right" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
