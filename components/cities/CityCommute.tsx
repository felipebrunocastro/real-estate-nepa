import { useTranslations } from "next-intl";
import type { City } from "@/types";
import { Icon } from "@/components/ui/Icon";

/**
 * "Getting Around" — verified approximate driving distances from the city to
 * the destinations that are actually relevant to it (not a fixed list).
 */
export function CityCommute({ city }: { city: City }) {
  const t = useTranslations("cityGuide.commute");
  const distances = city.distances ?? [];
  if (distances.length === 0) return null;

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {distances.map((d) => (
        <li
          key={d.to}
          className="flex items-center justify-between rounded-xl border border-border bg-surface p-4"
        >
          <span className="flex items-center gap-2 text-navy-800">
            <Icon name="map-pin" className="h-4 w-4 text-accent-600" />
            {d.to}
          </span>
          <span className="font-semibold text-navy-900">{t("miles", { miles: d.miles })}</span>
        </li>
      ))}
    </ul>
  );
}
