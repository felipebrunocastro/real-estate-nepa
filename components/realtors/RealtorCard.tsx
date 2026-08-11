import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { RealtorCardData } from "@/types";
import { RealtorAvatar } from "./RealtorAvatar";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { Icon } from "@/components/ui/Icon";

/** Directory card for a realtor profile. Usable in the client filter grid. */
export function RealtorCard({ realtor }: { realtor: RealtorCardData }) {
  const t = useTranslations("realtors");

  return (
    <article className="flex flex-col rounded-xl border border-border bg-surface p-6">
      <div className="flex items-start justify-between gap-3">
        <RealtorAvatar name={realtor.name} accent={realtor.accent} />
        <div className="flex flex-col items-end gap-1.5">
          <SampleBadge>{t("sampleBadge")}</SampleBadge>
          {realtor.tier === "featured" && (
            <span className="rounded-full bg-accent-600 px-2.5 py-0.5 text-xs font-semibold text-white">
              {t("featured")}
            </span>
          )}
        </div>
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">
        <Link href={`/realtors/${realtor.slug}`} className="hover:text-accent-700">
          {realtor.name}
        </Link>
      </h3>
      <p className="text-sm text-muted">{realtor.brokerage}</p>

      <div className="mt-2 flex items-center gap-1.5 text-xs">
        {realtor.verified ? (
          <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
            <Icon name="check" className="h-4 w-4" />
            {t("verified")}
          </span>
        ) : (
          <span className="text-muted">{t("verificationPending")}</span>
        )}
      </div>

      {/* Specialties */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {realtor.specialties.map((s) => (
          <span
            key={s}
            className="rounded-full bg-navy-50 px-2.5 py-1 text-xs font-medium text-navy-700"
          >
            {t(`specialties.${s}`)}
          </span>
        ))}
      </div>

      {/* Service areas + languages */}
      <dl className="mt-4 space-y-1.5 text-sm">
        <div className="flex gap-2">
          <dt className="text-muted">{t("serviceAreasLabel")}:</dt>
          <dd className="text-navy-800">{realtor.serviceAreaNames.join(", ")}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-muted">{t("languagesLabel")}:</dt>
          <dd className="text-navy-800">
            {realtor.languages.map((l) => t(`languages.${l}`)).join(", ")}
          </dd>
        </div>
      </dl>

      <Link
        href={`/realtors/${realtor.slug}`}
        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent-600 hover:text-accent-700"
      >
        {t("viewProfile")}
        <Icon name="arrow-right" className="h-4 w-4" />
      </Link>
    </article>
  );
}
