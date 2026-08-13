import { useTranslations } from "next-intl";
import { sampleProperties } from "@/data/sample-properties";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/Button";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { Icon } from "@/components/ui/Icon";

/**
 * "Homes for Sale in [City]" — up to 6 property cards filtered to the city.
 * Cards are clearly-labeled SAMPLE listings; the query is IDX-ready, so when a
 * live MLS/IDX feed is connected it filters real listings for this city.
 */
export function CityHomesForSale({ slug, cityName }: { slug: string; cityName: string }) {
  const t = useTranslations("cityGuide.homes");
  const homes = sampleProperties.filter((p) => p.citySlug === slug).slice(0, 6);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-2 rounded-xl border border-amber-300 bg-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-sm font-medium text-amber-900">
          <SampleBadge>{t("sampleBadge")}</SampleBadge>
          {t("idxNote", { city: cityName })}
        </p>
      </div>

      {homes.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homes.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-navy-300 bg-sand-100 p-8 text-center text-navy-800">
          {t("noneYet", { city: cityName })}
        </div>
      )}

      <div className="mt-8">
        <Button href={`/property-search?location=${slug}`} variant="secondary">
          {t("viewAll", { city: cityName })}
          <Icon name="arrow-right" className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
