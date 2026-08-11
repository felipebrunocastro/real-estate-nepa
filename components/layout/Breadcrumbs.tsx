import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { localizedUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export interface Crumb {
  label: string;
  /** App-relative path (locale prefix is added automatically). Omit for the current page. */
  href?: string;
}

/**
 * Accessible breadcrumb trail + BreadcrumbList structured data. The visual
 * markup and the JSON-LD are generated from the same `items`, so they never
 * drift apart.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const locale = useLocale() as Locale;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: localizedUrl(locale, item.href) } : {}),
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={`${item.label}-${i}`} className="flex items-center gap-2">
                {item.href && !isLast ? (
                  <Link href={item.href} className="hover:text-navy-900">
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={isLast ? "font-medium text-navy-800" : undefined}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
                {!isLast && <span aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={jsonLd} />
    </>
  );
}
