import { useTranslations } from "next-intl";
import { featuredCities } from "@/data/cities";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CityCard } from "@/components/cities/CityCard";
import { Icon } from "@/components/ui/Icon";

export function FeaturedCities() {
  const t = useTranslations("home.cities");

  return (
    <Section className="bg-sand-100">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={t("intro")}
        />
        <Button href="/cities" variant="outline" className="shrink-0">
          {t("viewAll")}
          <Icon name="arrow-right" className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredCities.map((city) => (
          <CityCard key={city.slug} city={city} />
        ))}
      </div>
    </Section>
  );
}
