# Real Estate in NEPA

**Your Guide to Real Estate in Northeastern Pennsylvania** — a premium, trilingual
regional real estate platform for NEPA (`realestateinnepa.com`).

> This is an independent regional real estate **information** platform. It is not a
> licensed brokerage, mortgage lender, law firm, or financial advisor. Sample
> listings and market figures are for demonstration only and are clearly labeled
> as such — they never represent live MLS data.

---

## Tech stack

| Area            | Choice                                    |
| --------------- | ----------------------------------------- |
| Framework       | Next.js 16 (App Router) + React 19        |
| Language        | TypeScript (strict)                       |
| Styling         | Tailwind CSS v4 (CSS-first design tokens) |
| i18n            | next-intl (EN default, ES, PT)            |
| Fonts           | Inter (UI) + Source Serif 4 (editorial)   |
| Linting         | ESLint (eslint-config-next)               |
| Deploy (target) | Vercel                                    |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000  (this repo's launch config uses 3100)
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
npx tsc --noEmit # type-check
```

## Internationalization

- **English** is the default and is served with **no prefix**: `/`, `/buy`, `/cities/scranton-pa`.
- **Spanish**: `/es`, `/es/buy`, `/es/cities/scranton-pa`.
- **Portuguese**: `/pt`, `/pt/buy`, `/pt/cities/scranton-pa`.

Configuration lives in `i18n/`:

- `routing.ts` — locales, default locale, `localePrefix: "as-needed"`.
- `navigation.ts` — locale-aware `Link`, `useRouter`, `usePathname` (import these, **not** `next/link`).
- `request.ts` — loads the correct `messages/<locale>.json` per request.
- `middleware.ts` — routes requests through next-intl.

`hreflang` alternates and canonical URLs are generated in `lib/seo.ts` and applied
via each page's `generateMetadata`.

### Adding / editing translations

All interface copy lives in `messages/en.json`, `messages/es.json`, `messages/pt.json`.
Keep the **key structure identical** across all three files. Verify parity with:

```bash
node -e 'const fs=require("fs");const flat=(o,p="")=>Object.entries(o).flatMap(([k,v])=>typeof v==="object"&&v?flat(v,p+k+"."):[p+k]);const en=flat(JSON.parse(fs.readFileSync("messages/en.json")));["es","pt"].forEach(l=>{const o=flat(JSON.parse(fs.readFileSync("messages/"+l+".json")));console.log(l,"missing:",en.filter(k=>!o.includes(k)));});'
```

Never hardcode UI copy inside components — add a key and reference it with `useTranslations`.

## Project structure

```
app/[locale]/        Localized routes (homepage + placeholder pages)
app/robots.ts        robots.txt
app/sitemap.ts       Locale-aware sitemap with hreflang alternates
components/ui/        Design-system primitives (Button, Section, Icon, ...)
components/layout/    Header (mega-menu), Footer, LanguageSwitcher, ComingSoon
components/home/      Homepage sections (Hero, MarketSnapshot, ...)
components/property/  PropertyCard
components/cities/    CityCard
data/                 Structured, data-driven content (cities, nav, samples)
i18n/                 next-intl configuration
lib/                  site config, SEO helpers, utils
messages/             en.json / es.json / pt.json
types/                Shared domain types
```

## Design tokens

All brand colours, fonts and radii are declared as CSS variables in
`app/globals.css` under `@theme`. Re-brand by editing those values — every
`bg-navy-*`, `text-accent-*`, etc. utility updates automatically.

## Content how-tos

### Add a city

Append an entry to `data/cities.ts` (slug, name, county, per-locale `description`,
`featured`, `accent`). It automatically appears in the search dropdown, sitemap
and (from Phase 3) the cities directory. City descriptions must stay **neutral and
Fair-Housing compliant** — no references to protected classes, "safety",
"family-friendliness" or school quality.

### Sample listings

`data/sample-properties.ts` holds demonstration listings only. Any UI that renders
them shows a visible **"Sample Listing"** badge. The `SampleProperty` shape mirrors
the future IDX/MLS feed so real data drops in without UI changes.

## Roadmap (phased)

- **Phase 1 (done):** Foundation, design system, i18n, homepage, SEO base.
- **Phase 2:** Core pages (`/buy`, `/sell`, `/invest`, `/property-search`, ...).
- **Phase 3:** Cities / local-SEO engine.
- **Phase 4:** Market Reports + NEPA News publication system.
- **Phase 5:** Calculators & tools.
- **Phase 6:** First-Time Buyers + Relocation hubs.
- **Phase 7:** Realtors directory.
- **Phase 8:** Contact, leads & CRM integration.

Future integrations (not built yet): IDX/MLS, Supabase, Resend, Mapbox/Google Maps,
analytics. Configure via environment variables — see `.env.example`.

## Deployment

Target: **Vercel** → custom domain `realestateinnepa.com` (redirect `www` → apex).
No environment variables are required for the current build.
