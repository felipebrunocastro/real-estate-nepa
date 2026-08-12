import type { City } from "@/types";

/**
 * Data-driven NEPA city directory. Adding a new city here automatically makes
 * it available across the cities system (directory + /cities/[slug] pages),
 * the search dropdown and the sitemap.
 *
 * FAIR HOUSING: all descriptions, highlights and content are neutral and
 * factual. No references to protected classes, "safety", crime, "family" or
 * "professional" suitability, or subjective school/neighborhood rankings.
 * Highlights are proper-noun landmarks and civic/geographic features only.
 *
 * Per-city market figures live in the market-data layer (data/market-input.csv
 * -> data/market-data.ts, read via lib/market.ts), not here.
 */
export const cities: City[] = [
  {
    slug: "wilkes-barre-pa",
    name: "Wilkes-Barre",
    county: "Luzerne County",
    featured: true,
    accent: "#274266",
    highlights: ["Public Square", "Susquehanna River", "River Common", "Downtown arts district"],
    nearby: ["kingston-pa", "plains-pa", "forty-fort-pa"],
    description: {
      en: "The seat of Luzerne County, anchoring the Wyoming Valley with a walkable downtown and historic residential districts.",
      es: "Sede del condado de Luzerne, centro del valle de Wyoming con un centro peatonal y distritos residenciales históricos.",
      pt: "Sede do condado de Luzerne, centro do vale de Wyoming, com um centro caminhável e bairros residenciais históricos.",
    },
  },
  {
    slug: "scranton-pa",
    name: "Scranton",
    county: "Lackawanna County",
    featured: true,
    accent: "#1f4d7b",
    highlights: ["Steamtown National Historic Site", "Lackawanna River", "Nay Aug Park", "Downtown Scranton"],
    nearby: ["clarks-summit-pa"],
    description: {
      en: "The largest city in NEPA and the seat of Lackawanna County, known for its rail history and revitalized downtown core.",
      es: "La ciudad más grande de NEPA y sede del condado de Lackawanna, conocida por su historia ferroviaria y su centro revitalizado.",
      pt: "A maior cidade de NEPA e sede do condado de Lackawanna, conhecida por sua história ferroviária e centro revitalizado.",
    },
  },
  {
    slug: "pittston-pa",
    name: "Pittston",
    county: "Luzerne County",
    featured: true,
    accent: "#245e97",
    highlights: ["Historic Main Street", "Susquehanna River", "Pittston Tomato Festival", "Riverfront"],
    nearby: ["wyoming-pa", "forty-fort-pa", "plains-pa"],
    description: {
      en: "A riverfront city midway between Scranton and Wilkes-Barre with a compact, revitalized Main Street.",
      es: "Ciudad ribereña a medio camino entre Scranton y Wilkes-Barre, con una Main Street compacta y renovada.",
      pt: "Cidade à beira-rio entre Scranton e Wilkes-Barre, com uma Main Street compacta e revitalizada.",
    },
  },
  {
    slug: "kingston-pa",
    name: "Kingston",
    county: "Luzerne County",
    featured: true,
    accent: "#345680",
    highlights: ["Susquehanna River", "Nesbitt Park", "Wyoming Avenue shops", "Kirby Park (nearby)"],
    nearby: ["wilkes-barre-pa", "forty-fort-pa", "wyoming-pa"],
    description: {
      en: "A residential borough across the Susquehanna River from Wilkes-Barre with tree-lined streets and local shops.",
      es: "Municipio residencial al otro lado del río Susquehanna desde Wilkes-Barre, con calles arboladas y comercios locales.",
      pt: "Município residencial do outro lado do rio Susquehanna, em frente a Wilkes-Barre, com ruas arborizadas e comércio local.",
    },
  },
  {
    slug: "dallas-pa",
    name: "Dallas",
    county: "Luzerne County",
    featured: true,
    accent: "#1d3350",
    highlights: ["Back Mountain area", "Frances Slocum State Park (nearby)", "Misericordia University", "Rural surroundings"],
    nearby: ["kingston-pa", "wilkes-barre-pa"],
    description: {
      en: "A borough and surrounding township in the Back Mountain area offering more open, suburban settings.",
      es: "Municipio y su distrito circundante en la zona de Back Mountain, con entornos más abiertos y suburbanos.",
      pt: "Município e distrito vizinho na região de Back Mountain, com ambientes mais abertos e suburbanos.",
    },
  },
  {
    slug: "hazleton-pa",
    name: "Hazleton",
    county: "Luzerne County",
    featured: true,
    accent: "#274266",
    highlights: ["Downtown Hazleton", "Penn State Hazleton", "Higher elevation", "Community facilities"],
    nearby: ["mountain-top-pa"],
    description: {
      en: "A city in southern Luzerne County at one of the highest elevations in the region, with a diverse, growing community.",
      es: "Ciudad en el sur del condado de Luzerne, a una de las mayores altitudes de la región, con una comunidad diversa y creciente.",
      pt: "Cidade no sul do condado de Luzerne, em uma das maiores altitudes da região, com uma comunidade diversa e crescente.",
    },
  },
  {
    slug: "nanticoke-pa",
    name: "Nanticoke",
    county: "Luzerne County",
    featured: false,
    accent: "#1f4d7b",
    highlights: ["Susquehanna River", "Luzerne County Community College", "Riverfront", "Local parks"],
    nearby: ["wilkes-barre-pa", "kingston-pa"],
    description: {
      en: "A city along the Susquehanna River, home to a Luzerne County Community College campus.",
      es: "Ciudad a orillas del río Susquehanna, sede de un campus del Luzerne County Community College.",
      pt: "Cidade às margens do rio Susquehanna, onde fica um campus do Luzerne County Community College.",
    },
  },
  {
    slug: "mountain-top-pa",
    name: "Mountain Top",
    county: "Luzerne County",
    featured: false,
    accent: "#245e97",
    highlights: ["Wright Township", "Wooded, elevated setting", "Nuangola area", "Regional access to I-81"],
    nearby: ["wilkes-barre-pa", "hazleton-pa"],
    description: {
      en: "An elevated community in Wright Township south of Wilkes-Barre with a more rural, wooded character.",
      es: "Comunidad elevada en Wright Township, al sur de Wilkes-Barre, de carácter más rural y boscoso.",
      pt: "Comunidade elevada em Wright Township, ao sul de Wilkes-Barre, com caráter mais rural e arborizado.",
    },
  },
  {
    slug: "clarks-summit-pa",
    name: "Clarks Summit",
    county: "Lackawanna County",
    featured: false,
    accent: "#345680",
    highlights: ["The Abingtons", "State Street district", "Local shops and cafes", "Access to Scranton"],
    nearby: ["scranton-pa"],
    description: {
      en: "A borough in the Abingtons north of Scranton with a compact commercial district.",
      es: "Municipio en la zona de los Abingtons, al norte de Scranton, con un distrito comercial compacto.",
      pt: "Município na região dos Abingtons, ao norte de Scranton, com um distrito comercial compacto.",
    },
  },
  {
    slug: "plains-pa",
    name: "Plains",
    county: "Luzerne County",
    featured: false,
    accent: "#1d3350",
    highlights: ["Regional retail corridor", "Adjacent to Wilkes-Barre", "Mohegan area", "Local parks"],
    nearby: ["wilkes-barre-pa", "pittston-pa"],
    description: {
      en: "A township adjacent to Wilkes-Barre combining residential neighborhoods with regional retail.",
      es: "Distrito contiguo a Wilkes-Barre que combina barrios residenciales con comercio regional.",
      pt: "Distrito vizinho a Wilkes-Barre que combina bairros residenciais com comércio regional.",
    },
  },
  {
    slug: "forty-fort-pa",
    name: "Forty Fort",
    county: "Luzerne County",
    featured: false,
    accent: "#274266",
    highlights: ["Historic district", "Wyoming Valley Airport", "Susquehanna River", "Forty Fort Cemetery"],
    nearby: ["kingston-pa", "wilkes-barre-pa", "wyoming-pa"],
    description: {
      en: "A small riverfront borough in the Wyoming Valley with a historic district and local airport.",
      es: "Pequeño municipio ribereño en el valle de Wyoming, con un distrito histórico y aeropuerto local.",
      pt: "Pequeno município à beira-rio no vale de Wyoming, com distrito histórico e aeroporto local.",
    },
  },
  {
    slug: "wyoming-pa",
    name: "Wyoming",
    county: "Luzerne County",
    featured: false,
    accent: "#1f4d7b",
    highlights: ["Susquehanna River west bank", "Wyoming Monument", "Eighth Street corridor", "Riverfront access"],
    nearby: ["forty-fort-pa", "kingston-pa", "pittston-pa"],
    description: {
      en: "A borough along the west bank of the Susquehanna River within the Wyoming Valley.",
      es: "Municipio en la margen oeste del río Susquehanna, dentro del valle de Wyoming.",
      pt: "Município na margem oeste do rio Susquehanna, dentro do vale de Wyoming.",
    },
  },
];

export const featuredCities = cities.filter((c) => c.featured);

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

/** Resolve a list of nearby slugs to City objects (skipping any unknown). */
export function getNearbyCities(city: City): City[] {
  return city.nearby
    .map((slug) => getCityBySlug(slug))
    .filter((c): c is City => Boolean(c));
}
