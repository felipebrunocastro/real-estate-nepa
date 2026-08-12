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

### Adding an article (Market Reports / NEPA News)

Append to `data/articles.ts` (section, category, localized title/excerpt, portable
content `body` blocks, tags, sources, `isSample`). Every page reads through
`lib/content.ts`, so that file is the single swap point for a future MDX / database
/ headless CMS. Article routes and the sitemap update automatically. Never present
figures as real — charts and stats stay labeled samples.

### Adding a Realtor

Append to `data/realtors.ts`. Sample profiles must stay clearly labeled with
reserved fictional contact info (555-01xx phones, `example.com`) and no invented
license numbers. `tier: "featured"` sorts first (monetization architecture — no
payments). `RealEstateAgent` structured data is emitted only for real
(non-sample) profiles.

### Leads & newsletter

Forms POST to `/api/leads` and `/api/newsletter`. Validation and delivery live in
`lib/leads.ts` / `lib/newsletter.ts`; set `LEAD_WEBHOOK_URL` /
`NEWSLETTER_WEBHOOK_URL` to route submissions to a CRM/automation endpoint, or add
a first-class adapter (Supabase/HubSpot/Resend). No credentials in code — see
`.env.example`.

### Updating market data (replacing the sample figures)

Every market snapshot (homepage, city pages) reads through `lib/market.ts`, backed
by **`data/market-data.ts`**, which is **generated** from **`data/market-input.csv`**.
To publish real numbers:

1. Open `data/market-input.csv`. Each row is an area (`nepa` for the region, plus
   each city slug). Fill in `medianPrice`, `homesForSale`, `daysOnMarket`,
   `saleToList` (raw numbers — no `$` or `,`) from a public source such as
   **[Zillow Research](https://www.zillow.com/research/data/)** or
   **Redfin's Data Center**. Optional `*_change` columns take a display label like
   `+3.1%` (the up/down arrow is derived from the sign).
2. Set that row's `source` (e.g. `Zillow Research`), optional `sourceUrl`, and
   `asOf` date. **The "Sample Data" badge automatically becomes real attribution
   ("Source: … · as of …") for any row whose `source` is not "Sample data".**
3. Run the importer and rebuild:

   ```bash
   node scripts/import-market.mjs
   npm run build
   ```

Cities with no row fall back to the regional figures, labeled "Regional estimate".
Public sources are reliable at metro/county/large-city level; small boroughs may
stay on the regional estimate until county-records data is added.

## Roadmap (phased) — all phases complete

- **Phase 1:** Foundation, design system, i18n, homepage, SEO base.
- **Phase 2:** Core pages (`/buy`, `/sell`, `/invest`, `/property-search`, ...).
- **Phase 3:** Cities / local-SEO engine (`/cities/[slug]`).
- **Phase 4:** Market Reports + NEPA News publication system.
- **Phase 5:** Calculators & tools (Mortgage Calculator + tools architecture).
- **Phase 6:** First-Time Buyers + Relocation hubs.
- **Phase 7:** Realtors directory (`/realtors`, `/realtors/[slug]`).
- **Phase 8:** Contact, leads & newsletter API with CRM-adapter architecture.
- **Trust & SEO:** About, Privacy, Terms, Fair Housing, Accessibility pages;
  site-wide Organization + WebSite structured data.

Future integrations (architected for, not built): IDX/MLS, Supabase, Resend,
Mapbox/Google Maps, analytics, user accounts. Configure via environment variables —
see `.env.example`.

## SEO & structured data

Per-page canonical + hreflang alternates, `robots.txt`, a locale-aware
`sitemap.xml`, and JSON-LD: `Organization` + `WebSite` site-wide, plus
`BreadcrumbList`, `Article`/`NewsArticle`, `FAQPage`, `Place`, and `RealEstateAgent`
(real profiles only) where appropriate.

## Deployment

Target: **Vercel** → custom domain `realestateinnepa.com` (redirect `www` → apex).
The app runs with **no environment variables**; add them only to connect the future
integrations above.
