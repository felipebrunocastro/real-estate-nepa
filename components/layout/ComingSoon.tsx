import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/**
 * Shared placeholder for routes whose full experience arrives in a later phase.
 * Keeps navigation links functional and honestly labels the page as upcoming,
 * rather than leaving dead links or fabricating content.
 */
export function ComingSoon({
  title,
  path,
}: {
  title: string;
  path: string;
}) {
  const t = useTranslations("comingSoon");

  return (
    <Container className="py-20 sm:py-28">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-navy-900">
              {t("home")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-navy-800">{title}</li>
        </ol>
      </nav>

      <div className="mt-10 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-600">
          {t("eyebrow")}
        </p>
        <h1 className="font-display text-4xl font-bold text-navy-900 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">{t("body")}</p>
        <p className="mt-4 inline-flex items-center gap-2 rounded-md border border-border bg-sand-100 px-3 py-2 text-sm font-medium text-navy-700">
          <span className="font-mono text-xs text-muted">{path}</span>
        </p>
        <div className="mt-8">
          <Button href="/">
            <Icon name="arrow-right" className="h-5 w-5 rotate-180" />
            {t("cta")}
          </Button>
        </div>
      </div>
    </Container>
  );
}
