import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { footerColumns } from "@/data/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { site } from "@/lib/site";

export function Footer() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-navy-900 text-navy-100">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {/* Brand + tagline */}
          <div className="col-span-2">
            <span className="font-display text-lg font-bold text-white">
              Real Estate in <span className="text-accent-300">NEPA</span>
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-navy-200">
              {site.tagline}
            </p>
            <div className="mt-5">
              <LanguageSwitcher className="[&_button]:text-navy-200 [&_button:hover]:bg-navy-800 [&_button:hover]:text-white [&_button[aria-current]]:bg-white [&_button[aria-current]]:text-navy-900" />
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.key}>
              <h2 className="text-xs font-bold uppercase tracking-widest text-accent-300">
                {t(`groups.${column.key}`)}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="text-sm text-navy-200 transition-colors hover:text-white"
                    >
                      {t(`links.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Fair Housing + disclaimer */}
        <div className="mt-12 space-y-3 border-t border-navy-700 pt-8 text-xs leading-relaxed text-navy-300">
          <p className="font-semibold text-navy-100">{tf("fairHousingTitle")}</p>
          <p>{tf("fairHousing")}</p>
          <p>{tf("disclaimer")}</p>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-navy-700 pt-6 text-xs text-navy-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {tf("rights")}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy" className="hover:text-white">
              {t("links.privacy")}
            </Link>
            <Link href="/terms" className="hover:text-white">
              {t("links.terms")}
            </Link>
            <Link href="/fair-housing" className="hover:text-white">
              {t("links.fairHousing")}
            </Link>
            <Link href="/accessibility" className="hover:text-white">
              {t("links.accessibility")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
