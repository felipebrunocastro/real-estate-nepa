import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/**
 * Full-width closing call-to-action band used at the foot of core pages to
 * drive users into the next step (search, contact, related guides).
 */
export function CtaBanner({
  title,
  body,
  primary,
  secondary,
}: {
  title: string;
  body?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="bg-navy-900 text-white">
      <Container className="py-14 sm:py-16">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              {title}
            </h2>
            {body && <p className="mt-3 text-lg leading-relaxed text-navy-100">{body}</p>}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={primary.href} variant="secondary" size="lg">
              {primary.label}
              <Icon name="arrow-right" className="h-5 w-5" />
            </Button>
            {secondary && (
              <Button
                href={secondary.href}
                size="lg"
                className="bg-white/10! text-white! hover:bg-white/20!"
              >
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
