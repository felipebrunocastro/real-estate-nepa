import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const STRATEGY_KEYS = [
  "rental",
  "multifamily",
  "buyHold",
  "fixFlip",
  "outOfState",
] as const;

export function InvestSection() {
  const t = useTranslations("home.invest");

  return (
    <Section className="bg-sand-100">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-600">
            {t("eyebrow")}
          </p>
          <h2 className="font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{t("intro")}</p>
          <div className="mt-8">
            <Button href="/invest" size="lg">
              {t("cta")}
              <Icon name="arrow-right" className="h-5 w-5" />
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted">{t("disclaimer")}</p>
        </div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {STRATEGY_KEYS.map((key) => (
            <li
              key={key}
              className="flex items-start gap-3 rounded-xl border border-border bg-surface p-5"
            >
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-accent-600">
                <Icon name="check" className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-navy-900">
                  {t(`strategies.${key}.title`)}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {t(`strategies.${key}.description`)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
