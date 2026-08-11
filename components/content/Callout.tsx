import { Button } from "@/components/ui/Button";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { Icon, type IconName } from "@/components/ui/Icon";

/**
 * Highlighted callout box — used for future-tool placeholders (e.g. "What's My
 * Home Worth?", investment calculators) and secondary CTAs. An optional badge
 * clearly marks features that arrive in a later phase.
 */
export function Callout({
  icon,
  title,
  body,
  badge,
  ctaLabel,
  ctaHref,
}: {
  icon?: IconName;
  title: string;
  body: string;
  badge?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-dashed border-navy-300 bg-sand-100 p-6 sm:p-8">
      <div className="flex items-start gap-4">
        {icon && (
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-white">
            <Icon name={icon} className="h-6 w-6" />
          </span>
        )}
        <div>
          {badge && (
            <div className="mb-2">
              <SampleBadge>{badge}</SampleBadge>
            </div>
          )}
          <h3 className="font-display text-xl font-semibold text-navy-900">
            {title}
          </h3>
          <p className="mt-2 text-navy-700">{body}</p>
        </div>
      </div>
      {ctaLabel && ctaHref && (
        <div>
          <Button href={ctaHref} variant="outline">
            {ctaLabel}
            <Icon name="arrow-right" className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
