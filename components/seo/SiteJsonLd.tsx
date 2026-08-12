import { site } from "@/lib/site";
import { JsonLd } from "./JsonLd";

/**
 * Site-wide Organization + WebSite structured data. Rendered once in the root
 * layout so every page carries a consistent, accurate publisher identity.
 */
export function SiteJsonLd({ locale }: { locale: string }) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.tagline,
    areaServed: site.region,
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    inLanguage: locale,
    publisher: { "@type": "Organization", name: site.name },
  };
  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={website} />
    </>
  );
}
