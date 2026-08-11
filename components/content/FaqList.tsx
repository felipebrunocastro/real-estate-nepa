import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";

export interface Faq {
  q: string;
  a: string;
}

/**
 * Accessible FAQ using native <details>/<summary> (keyboard-friendly, no client
 * JS) plus FAQPage structured data generated from the same items.
 */
export function FaqList({ items }: { items: Faq[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-navy-900 hover:bg-navy-50">
            {item.q}
            <Icon
              name="chevron-down"
              className="h-5 w-5 shrink-0 text-accent-600 transition-transform group-open:rotate-180"
            />
          </summary>
          <div className="px-5 pb-5 text-sm leading-relaxed text-muted">
            {item.a}
          </div>
        </details>
      ))}
      <JsonLd data={jsonLd} />
    </div>
  );
}
