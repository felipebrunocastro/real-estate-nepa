import { useTranslations } from "next-intl";
import type { City, AmenityCategory } from "@/types";
import { Icon, type IconName } from "@/components/ui/Icon";

/**
 * "Around [City]" — verified local amenities grouped by category. Only groups
 * with verified entries are rendered (proper nouns), so nothing is invented to
 * fill the section.
 */
const CATEGORY_ICON: Record<AmenityCategory, IconName> = {
  parks: "map-pin",
  shopping: "buy",
  dining: "area",
  healthcare: "check",
  education: "document",
  transportation: "move",
};

export function CityAmenities({ city }: { city: City }) {
  const t = useTranslations("cityGuide.amenities");
  const groups = city.amenities ?? [];
  if (groups.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <div key={group.category} className="rounded-xl border border-border bg-surface p-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-navy-50 text-accent-600">
              <Icon name={CATEGORY_ICON[group.category]} className="h-5 w-5" />
            </span>
            <h3 className="font-display text-base font-semibold text-navy-900">
              {t(`category.${group.category}`)}
            </h3>
          </div>
          <ul className="mt-3 space-y-1.5 text-sm text-navy-800">
            {group.items.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
