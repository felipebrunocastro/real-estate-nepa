import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PropertySearchBar } from "./PropertySearchBar";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      {/* Layered background: deep navy gradient + subtle skyline motif. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 120% at 50% 0%, #1d3350 0%, #0e1a2b 60%, #080f1a 100%)",
        }}
        aria-hidden="true"
      />
      <svg
        className="absolute bottom-0 left-0 w-full opacity-10"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 200V120l40-20v-30l28 16V70l44 24v-16l32 18V80l48 28v-18l36 20V88l44 24v-12l32 18V96l52 28v-14l36 20v-24l40 22v-12l36 20V108l44 24v-14l32 18V112l52 28v-16l36 20v-20l40 22v-10l36 20v-18l44 24V200Z"
          fill="#ffffff"
        />
      </svg>

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-200">
            <Icon name="map-pin" className="h-4 w-4" />
            {t("badge")}
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {t("headline")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-100">
            {t("subhead")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/property-search" variant="secondary" size="lg">
              {t("ctaPrimary")}
              <Icon name="arrow-right" className="h-5 w-5" />
            </Button>
            <Button
              href="/cities"
              size="lg"
              className="bg-white/10! text-white! hover:bg-white/20!"
            >
              {t("ctaSecondary")}
            </Button>
            <Button
              href="/market-reports"
              variant="ghost"
              size="lg"
              className="text-white/85! hover:bg-white/10! hover:text-white!"
            >
              {t("ctaTertiary")}
            </Button>
          </div>
        </div>

        <div className="mt-10 lg:mt-12">
          <PropertySearchBar />
        </div>
      </Container>
    </section>
  );
}
