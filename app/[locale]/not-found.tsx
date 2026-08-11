import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-6xl font-bold text-navy-200">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-navy-900">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-md text-muted">{t("description")}</p>
      <div className="mt-8">
        <Button href="/">{t("cta")}</Button>
      </div>
    </Container>
  );
}
