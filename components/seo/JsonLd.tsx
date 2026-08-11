/**
 * Renders a JSON-LD structured-data block. Kept tiny and reusable so pages can
 * attach Organization / BreadcrumbList / FAQPage / Article schema consistently.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is a trusted, server-built object (no user input).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
