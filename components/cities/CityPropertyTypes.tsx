import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { City } from "@/types";
import { Icon, type IconName } from "@/components/ui/Icon";

/**
 * "Explore Real Estate in [City]" — cards for the property categories actually
 * relevant to this city (from `housingTypes`) plus universal Investment and New
 * Listings entries. Each links into the (IDX-ready) property search pre-filtered
 * for this city + type. No categories are shown just to fill space.
 */
const TYPE_ICON: Record<string, IconName> = {
  "single-family": "buy",
  "multi-family": "invest",
  condo: "area",
  townhouse: "bed",
  land: "map-pin",
  investment: "trend-up",
  "new-listings": "document",
};

export function CityPropertyTypes({ city }: { city: City }) {
  const t = useTranslations("cityGuide.types");

  const types = [
    ...(city.housingTypes ?? []),
    ...(city.housingTypes?.includes("multi-family") ? (["investment"] as const) : []),
    "new-listings" as const,
  ];
  // de-dupe while preserving order
  const unique = Array.from(new Set(types));

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {unique.map((type) => {
        const href =
          type === "new-listings"
            ? `/property-search?location=${city.slug}&status=for-sale`
            : type === "investment"
              ? `/property-search?location=${city.slug}&type=multi-family`
              : `/property-search?location=${city.slug}&type=${type}`;
        return (
          <Link
            key={type}
            href={href}
            className="group flex flex-col items-start rounded-xl border border-border bg-surface p-5 transition-shadow hover:shadow-md"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-navy-50 text-accent-600">
              <Icon name={TYPE_ICON[type] ?? "buy"} className="h-5 w-5" />
            </span>
            <span className="mt-3 font-semibold text-navy-900">{t(type)}</span>
            <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-accent-600">
              {t("browse")}
              <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
