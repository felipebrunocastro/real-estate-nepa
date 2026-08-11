import type { Realtor, RealtorCardData } from "@/types";
import { getCityBySlug } from "./cities";

/**
 * DEMO realtor profiles. Every entry is sample / demonstration content
 * (`isSample: true`) shown to illustrate how the directory works — NOT real
 * professionals. To avoid fabricating credentials:
 *   - contact phones use the reserved fictional 555-01xx range,
 *   - emails/websites use the reserved example.com domain,
 *   - `licenseNote` is a note, never an invented license number,
 *   - bios make no claims of awards, sales, reviews, or transactions.
 * Real profiles will replace these with verified, self-provided information.
 *
 * `tier: "featured"` demonstrates the monetization architecture (featured
 * profiles sort first and carry a badge). No payments are implemented.
 */
export const realtors: Realtor[] = [
  {
    slug: "sample-jordan-ellis",
    name: "Jordan Ellis",
    brokerage: "Wyoming Valley Realty (sample)",
    licenseNote: {
      en: "PA-licensed — verified at onboarding (sample)",
      es: "Con licencia de PA — verificada al registrarse (muestra)",
      pt: "Licenciado(a) na PA — verificado no cadastro (amostra)",
    },
    languages: ["en", "es"],
    serviceAreas: ["wilkes-barre-pa", "kingston-pa", "forty-fort-pa"],
    specialties: ["buyer-agent", "first-time", "relocation"],
    contact: {
      phone: "(570) 555-0142",
      email: "jordan@example.com",
      website: "example.com",
    },
    bio: {
      en: "Jordan focuses on guiding buyers and first-time homeowners across the Wyoming Valley, with an emphasis on clear communication through every step.",
      es: "Jordan se enfoca en guiar a compradores y a quienes compran su primera casa en el valle de Wyoming, con énfasis en una comunicación clara en cada paso.",
      pt: "Jordan foca em orientar compradores e quem compra a primeira casa no vale de Wyoming, com ênfase em uma comunicação clara em cada etapa.",
    },
    verified: true,
    tier: "featured",
    accent: "#274266",
    isSample: true,
  },
  {
    slug: "sample-maria-santos",
    name: "Maria Santos",
    brokerage: "Lackawanna Realty Group (sample)",
    licenseNote: {
      en: "PA-licensed — verified at onboarding (sample)",
      es: "Con licencia de PA — verificada al registrarse (muestra)",
      pt: "Licenciada na PA — verificado no cadastro (amostra)",
    },
    languages: ["en", "es", "pt"],
    serviceAreas: ["scranton-pa", "clarks-summit-pa"],
    specialties: ["listing-agent", "buyer-agent", "relocation"],
    contact: {
      phone: "(570) 555-0158",
      email: "maria@example.com",
      website: "example.com",
    },
    bio: {
      en: "Maria works with buyers and sellers in Scranton and the Abingtons, and supports relocating clients in English, Spanish and Portuguese.",
      es: "Maria trabaja con compradores y vendedores en Scranton y los Abingtons, y apoya a clientes que se mudan en inglés, español y portugués.",
      pt: "Maria trabalha com compradores e vendedores em Scranton e nos Abingtons, e atende clientes em mudança em inglês, espanhol e português.",
    },
    verified: true,
    tier: "featured",
    accent: "#1f4d7b",
    isSample: true,
  },
  {
    slug: "sample-sam-carter",
    name: "Sam Carter",
    brokerage: "NEPA Investment Advisors (sample)",
    licenseNote: {
      en: "PA-licensed — verified at onboarding (sample)",
      es: "Con licencia de PA — verificada al registrarse (muestra)",
      pt: "Licenciado na PA — verificado no cadastro (amostra)",
    },
    languages: ["en"],
    serviceAreas: ["wilkes-barre-pa", "pittston-pa", "hazleton-pa"],
    specialties: ["investment", "commercial"],
    contact: {
      phone: "(570) 555-0173",
      email: "sam@example.com",
      website: "example.com",
    },
    bio: {
      en: "Sam works with investors and commercial clients researching rental, multifamily and mixed-use opportunities across NEPA.",
      es: "Sam trabaja con inversionistas y clientes comerciales que investigan oportunidades de renta, multifamiliares y de uso mixto en NEPA.",
      pt: "Sam trabalha com investidores e clientes comerciais que pesquisam oportunidades de aluguel, multifamiliares e de uso misto em NEPA.",
    },
    verified: true,
    tier: "standard",
    accent: "#245e97",
    isSample: true,
  },
  {
    slug: "sample-priya-nair",
    name: "Priya Nair",
    brokerage: "Back Mountain Properties (sample)",
    licenseNote: {
      en: "PA-licensed — verified at onboarding (sample)",
      es: "Con licencia de PA — verificada al registrarse (muestra)",
      pt: "Licenciada na PA — verificado no cadastro (amostra)",
    },
    languages: ["en"],
    serviceAreas: ["dallas-pa", "kingston-pa"],
    specialties: ["buyer-agent", "luxury"],
    contact: {
      phone: "(570) 555-0189",
      email: "priya@example.com",
      website: "example.com",
    },
    bio: {
      en: "Priya helps buyers in the Back Mountain area and surrounding communities, with attention to detail from first tour to closing.",
      es: "Priya ayuda a compradores en la zona de Back Mountain y comunidades cercanas, con atención al detalle desde la primera visita hasta el cierre.",
      pt: "Priya ajuda compradores na região de Back Mountain e comunidades vizinhas, com atenção aos detalhes da primeira visita ao fechamento.",
    },
    verified: true,
    tier: "standard",
    accent: "#1d3350",
    isSample: true,
  },
  {
    slug: "sample-diego-morales",
    name: "Diego Morales",
    brokerage: "Valley Homes Realty (sample)",
    licenseNote: {
      en: "PA-licensed — verified at onboarding (sample)",
      es: "Con licencia de PA — verificada al registrarse (muestra)",
      pt: "Licenciado na PA — verificado no cadastro (amostra)",
    },
    languages: ["en", "es"],
    serviceAreas: ["hazleton-pa", "nanticoke-pa"],
    specialties: ["first-time", "rental", "relocation"],
    contact: {
      phone: "(570) 555-0196",
      email: "diego@example.com",
      website: "example.com",
    },
    bio: {
      en: "Diego supports first-time buyers and renters in the Hazleton area, working with clients in English and Spanish.",
      es: "Diego apoya a compradores primerizos e inquilinos en la zona de Hazleton, atendiendo a clientes en inglés y español.",
      pt: "Diego atende compradores de primeira viagem e inquilinos na região de Hazleton, trabalhando com clientes em inglês e espanhol.",
    },
    verified: true,
    tier: "standard",
    accent: "#274266",
    isSample: true,
  },
  {
    slug: "sample-emily-brooks",
    name: "Emily Brooks",
    brokerage: "Abington Realty (sample)",
    licenseNote: {
      en: "Verification pending (sample)",
      es: "Verificación pendiente (muestra)",
      pt: "Verificação pendente (amostra)",
    },
    languages: ["en"],
    serviceAreas: ["clarks-summit-pa", "scranton-pa"],
    specialties: ["listing-agent", "relocation"],
    contact: {
      phone: "(570) 555-0110",
      email: "emily@example.com",
      website: "example.com",
    },
    bio: {
      en: "Emily lists homes in the Abingtons and north Scranton and assists clients relocating to the area.",
      es: "Emily lista casas en los Abingtons y el norte de Scranton y ayuda a clientes que se mudan a la zona.",
      pt: "Emily anuncia casas nos Abingtons e no norte de Scranton e auxilia clientes que se mudam para a região.",
    },
    verified: false,
    tier: "standard",
    accent: "#345680",
    isSample: true,
  },
];

const TIER_RANK: Record<Realtor["tier"], number> = {
  featured: 0,
  premium: 0,
  standard: 1,
};

/** All realtors, featured first (monetization architecture — no payments). */
export function getRealtors(): Realtor[] {
  return [...realtors].sort(
    (a, b) => TIER_RANK[a.tier] - TIER_RANK[b.tier] || a.name.localeCompare(b.name),
  );
}

export function getRealtorBySlug(slug: string): Realtor | undefined {
  return realtors.find((r) => r.slug === slug);
}

export function getRealtorSlugs(): string[] {
  return realtors.map((r) => r.slug);
}

/** Flatten to serializable card data for the client directory. */
export function toRealtorCardData(list: Realtor[]): RealtorCardData[] {
  return list.map((r) => ({
    slug: r.slug,
    name: r.name,
    brokerage: r.brokerage,
    languages: r.languages,
    serviceAreas: r.serviceAreas,
    serviceAreaNames: r.serviceAreas
      .map((s) => getCityBySlug(s)?.name)
      .filter((n): n is string => Boolean(n)),
    specialties: r.specialties,
    verified: r.verified,
    tier: r.tier,
    accent: r.accent,
  }));
}
