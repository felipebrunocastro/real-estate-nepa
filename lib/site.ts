/**
 * Central site configuration. A single source of truth for branding, domain
 * and canonical URL construction used across metadata, SEO and the UI.
 */
export const site = {
  name: "Real Estate in NEPA",
  shortName: "NEPA Real Estate",
  region: "Northeastern Pennsylvania",
  domain: "realestateinnepa.com",
  url: "https://realestateinnepa.com",
  tagline: "Your Guide to Real Estate in Northeastern Pennsylvania",
  // Used by JSON-LD Organization / WebSite structured data (Phase 2 SEO work).
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
  },
} as const;

export type Site = typeof site;
