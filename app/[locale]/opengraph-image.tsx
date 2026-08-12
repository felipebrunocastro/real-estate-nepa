import { ImageResponse } from "next/og";
import { routing } from "@/i18n/routing";

export const alt = "Real Estate in NEPA — Your Guide to Northeastern Pennsylvania";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Pre-generate the social image for every locale. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const TAGLINES: Record<string, string> = {
  en: "Your Guide to Real Estate in Northeastern Pennsylvania",
  es: "Tu Guía de Bienes Raíces en el Noreste de Pensilvania",
  pt: "Seu Guia de Imóveis no Nordeste da Pensilvânia",
};

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tagline = TAGLINES[locale] ?? TAGLINES.en;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundImage:
            "linear-gradient(135deg, #14243b 0%, #0e1a2b 55%, #080f1a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            border: "2px solid rgba(255,255,255,0.25)",
            borderRadius: "9999px",
            padding: "10px 24px",
            fontSize: 24,
            letterSpacing: "0.2em",
            color: "#a7cfed",
            textTransform: "uppercase",
          }}
        >
          Northeastern Pennsylvania
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 700, lineHeight: 1.05 }}>
            Real Estate in&nbsp;<span style={{ color: "#4691d0" }}>NEPA</span>
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 40, color: "#d3e7f6" }}>
            {tagline}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#7f9bbd" }}>
          realestateinnepa.com
        </div>
      </div>
    ),
    { ...size },
  );
}
