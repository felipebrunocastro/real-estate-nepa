import { useTranslations } from "next-intl";
import { sampleProperties } from "@/data/sample-properties";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PropertyCard } from "@/components/property/PropertyCard";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { Icon } from "@/components/ui/Icon";

export function FeaturedProperties() {
  const t = useTranslations("home.properties");

  return (
    <Section>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={t("intro")}
        />
        <Button href="/property-search" variant="outline" className="shrink-0">
          {t("browse")}
          <Icon name="arrow-right" className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-6">
        <SampleBadge>{t("sampleNotice")}</SampleBadge>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sampleProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </Section>
  );
}
