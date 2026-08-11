import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { City } from "@/types";
import type { Locale } from "@/i18n/routing";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Icon } from "@/components/ui/Icon";

/** Reusable city card used on the homepage and the /cities directory. */
export function CityCard({ city }: { city: City }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("cities");

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-shadow hover:shadow-md">
      <PlaceholderImage
        label={city.name}
        sublabel={city.county}
        accent={city.accent}
        aspect="aspect-[3/2]"
      />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold text-navy-900">
          {city.name}, PA
        </h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-accent-600">
          {city.county}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {city.description[locale]}
        </p>
        <Link
          href={`/cities/${city.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-600 hover:text-accent-700"
        >
          {t("explore", { city: city.name })}
          <Icon name="arrow-right" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
