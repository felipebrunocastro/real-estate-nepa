import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { SampleProperty } from "@/types";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { Icon } from "@/components/ui/Icon";
import { formatUsd } from "@/lib/utils";

/**
 * Reusable property card. Renders a SAMPLE listing with a clearly visible
 * "Sample Listing" badge. The `SampleProperty` shape mirrors what a future IDX
 * feed will provide, so real listings can drop in without UI changes.
 */
export function PropertyCard({ property }: { property: SampleProperty }) {
  const t = useTranslations("properties");

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-shadow hover:shadow-md">
      <div className="relative">
        <PlaceholderImage
          label={property.cityName}
          sublabel={t(`type.${property.type}`)}
          accent={property.accent}
          aspect="aspect-[3/2]"
        />
        <div className="absolute left-3 top-3">
          <SampleBadge>{t("sampleLabel")}</SampleBadge>
        </div>
        <div className="absolute right-3 top-3">
          <span className="rounded-full bg-navy-900/90 px-2.5 py-1 text-xs font-semibold text-white">
            {t(`status.${property.status}`)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-display text-xl font-bold text-navy-900">
          {formatUsd(property.price)}
        </p>
        <p className="mt-1 text-sm font-medium text-navy-800">
          {property.address}
        </p>
        <p className="flex items-center gap-1 text-sm text-muted">
          <Icon name="map-pin" className="h-4 w-4" />
          {property.cityName}, PA
        </p>

        <dl className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-sm text-navy-700">
          <div className="flex items-center gap-1.5">
            <Icon name="bed" className="h-5 w-5 text-accent-600" />
            <dt className="sr-only">{t("beds")}</dt>
            <dd>
              <span className="font-semibold">{property.beds}</span> {t("bedsShort")}
            </dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name="bath" className="h-5 w-5 text-accent-600" />
            <dt className="sr-only">{t("baths")}</dt>
            <dd>
              <span className="font-semibold">{property.baths}</span> {t("bathsShort")}
            </dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name="area" className="h-5 w-5 text-accent-600" />
            <dt className="sr-only">{t("sqft")}</dt>
            <dd>
              <span className="font-semibold">
                {property.sqft.toLocaleString("en-US")}
              </span>{" "}
              {t("sqftShort")}
            </dd>
          </div>
        </dl>

        <Link
          href="/property-search"
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-600 hover:text-accent-700"
        >
          {t("viewDetails")}
          <Icon name="arrow-right" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
