import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/**
 * "Thinking About Buying or Selling in [City]?" lead-generation band. The CTAs
 * route into the (IDX-ready) search, the contact form for a valuation, and the
 * Realtors directory — the same clean lead pipeline used site-wide.
 */
export function CityLeadCta({ slug, cityName }: { slug: string; cityName: string }) {
  const t = useTranslations("cityGuide.lead");

  return (
    <section className="bg-navy-900 text-white">
      <Container className="py-14 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            {t("title", { city: cityName })}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-navy-100">
            {t("body", { city: cityName })}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={`/property-search?location=${slug}`} variant="secondary" size="lg">
              {t("search")}
              <Icon name="arrow-right" className="h-5 w-5" />
            </Button>
            <Button href="/contact" size="lg" className="bg-white/10! text-white! hover:bg-white/20!">
              {t("valuation")}
            </Button>
            <Button href="/realtors" size="lg" className="bg-white/10! text-white! hover:bg-white/20!">
              {t("talk")}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
