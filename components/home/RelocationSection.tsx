import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Icon } from "@/components/ui/Icon";

const TOPIC_KEYS = [
  "communities",
  "housing",
  "costOfLiving",
  "commuting",
  "lifestyle",
  "resources",
] as const;

export function RelocationSection() {
  const t = useTranslations("home.relocation");

  return (
    <Section>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
        <div className="order-2 lg:order-1">
          <PlaceholderImage
            label={t("imageLabel")}
            sublabel="Northeastern Pennsylvania"
            accent="#1d3350"
            aspect="aspect-[4/3]"
            className="rounded-xl"
          />
        </div>

        <div className="order-1 lg:order-2">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-600">
            {t("eyebrow")}
          </p>
          <h2 className="font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{t("intro")}</p>

          <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {TOPIC_KEYS.map((key) => (
              <li key={key} className="flex items-center gap-2 text-sm text-navy-800">
                <Icon name="check" className="h-5 w-5 shrink-0 text-accent-600" />
                {t(`topics.${key}`)}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button href="/relocation" size="lg">
              {t("cta")}
              <Icon name="arrow-right" className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
