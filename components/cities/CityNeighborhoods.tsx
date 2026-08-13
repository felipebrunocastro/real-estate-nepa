import { useLocale } from "next-intl";
import type { City } from "@/types";
import type { Locale } from "@/i18n/routing";
import { Icon } from "@/components/ui/Icon";

/**
 * "Neighborhoods & Areas in [City]" — locally-recognized areas (verified proper
 * nouns only). Renders only when the city has neighborhood data; each card is
 * ready to become its own landing page later (e.g. /cities/scranton-pa/green-ridge).
 */
export function CityNeighborhoods({ city }: { city: City }) {
  const locale = useLocale() as Locale;
  const list = city.neighborhoods ?? [];
  if (list.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {list.map((n) => (
        <div key={n.name} className="rounded-xl border border-border bg-surface p-4">
          <p className="flex items-center gap-1.5 font-semibold text-navy-900">
            <Icon name="map-pin" className="h-4 w-4 text-accent-600" />
            {n.name}
          </p>
          {n.note && <p className="mt-1 text-xs leading-snug text-muted">{n.note[locale]}</p>}
        </div>
      ))}
    </div>
  );
}
