import type { City } from "@/types";

/**
 * Data-driven NEPA city directory. Adding a new city here automatically makes
 * it available across the cities system (directory + /cities/[slug] guide),
 * the search dropdown and the sitemap.
 *
 * FAIR HOUSING: all descriptions, highlights and narratives are neutral and
 * factual. No references to protected classes, "safety", crime, "family" or
 * "professional" suitability, or subjective school/neighborhood rankings.
 *
 * Per-city market figures live in the market-data layer (data/market-input.csv
 * -> data/market-data.ts, read via lib/market.ts), not here.
 *
 * City-guide fields (living, population, distances, neighborhoods, amenities,
 * employers, faq) are OPTIONAL and hold only VERIFIED facts (proper nouns,
 * public figures). Where a fact isn't confidently known it is omitted, and the
 * guide renders a structured "coming soon" placeholder instead of inventing it.
 */
export const cities: City[] = [
  {
    slug: "wilkes-barre-pa",
    name: "Wilkes-Barre",
    county: "Luzerne County",
    featured: true,
    accent: "#274266",
    highlights: ["Public Square", "Susquehanna River", "River Common", "Downtown arts district"],
    nearby: ["kingston-pa", "plains-pa", "forty-fort-pa", "wyoming-pa"],
    population: 44328,
    populationYear: 2020,
    housingTypes: ["single-family", "multi-family", "townhouse", "condo"],
    taxContext: {
      en: "Property taxes are set by Luzerne County, the municipality, and the school district; rates vary by parcel.",
      es: "Los impuestos a la propiedad los fijan el condado de Luzerne, el municipio y el distrito escolar; las tasas varían por parcela.",
      pt: "Os impostos sobre a propriedade são definidos pelo condado de Luzerne, pelo município e pelo distrito escolar; as taxas variam por lote.",
    },
    distances: [
      { to: "Scranton", miles: 20 },
      { to: "Hazleton", miles: 25 },
      { to: "Pocono Mountains", miles: 35 },
      { to: "Lehigh Valley", miles: 55 },
      { to: "New York City", miles: 130 },
      { to: "Philadelphia", miles: 120 },
    ],
    amenities: [
      { category: "parks", items: ["Kirby Park", "Public Square", "River Common"] },
      { category: "shopping", items: ["Wyoming Valley Mall", "Arena Hub Plaza"] },
      { category: "healthcare", items: ["Wilkes-Barre General Hospital", "Geisinger Wyoming Valley Medical Center"] },
      { category: "education", items: ["Wilkes University", "King's College", "Penn State Wilkes-Barre"] },
      { category: "transportation", items: ["Interstate 81", "Cross Valley Expressway (PA-309)", "Wilkes-Barre/Scranton International Airport"] },
    ],
    employers: ["Geisinger", "Commonwealth Health", "Wilkes University", "King's College", "Luzerne County"],
    description: {
      en: "The seat of Luzerne County, anchoring the Wyoming Valley with a walkable downtown and historic residential districts.",
      es: "Sede del condado de Luzerne, centro del valle de Wyoming con un centro peatonal y distritos residenciales históricos.",
      pt: "Sede do condado de Luzerne, centro do vale de Wyoming, com um centro caminhável e bairros residenciais históricos.",
    },
    living: {
      en: "Wilkes-Barre sits at the heart of the Wyoming Valley along the Susquehanna River, serving as Luzerne County's seat and one of NEPA's two urban centers alongside Scranton. Downtown centers on Public Square and is home to Wilkes University and King's College, with historic neighborhoods, a riverfront common, and quick access to Interstate 81.",
      es: "Wilkes-Barre está en el corazón del valle de Wyoming, junto al río Susquehanna, como sede del condado de Luzerne y uno de los dos centros urbanos de NEPA junto con Scranton. El centro gira en torno a Public Square y alberga Wilkes University y King's College, con barrios históricos, un paseo junto al río y acceso rápido a la Interestatal 81.",
      pt: "Wilkes-Barre fica no coração do vale de Wyoming, às margens do rio Susquehanna, como sede do condado de Luzerne e um dos dois centros urbanos de NEPA, ao lado de Scranton. O centro gira em torno da Public Square e abriga a Wilkes University e o King's College, com bairros históricos, uma orla e acesso rápido à Interestadual 81.",
    },
    faq: [
      {
        q: {
          en: "What county is Wilkes-Barre in?",
          es: "¿En qué condado está Wilkes-Barre?",
          pt: "Em que condado fica Wilkes-Barre?",
        },
        a: {
          en: "Wilkes-Barre is the county seat of Luzerne County, Pennsylvania.",
          es: "Wilkes-Barre es la sede del condado de Luzerne, Pensilvania.",
          pt: "Wilkes-Barre é a sede do condado de Luzerne, Pensilvânia.",
        },
      },
    ],
  },
  {
    slug: "scranton-pa",
    name: "Scranton",
    county: "Lackawanna County",
    featured: true,
    accent: "#1f4d7b",
    highlights: ["Steamtown National Historic Site", "Lackawanna River", "Nay Aug Park", "Downtown Scranton"],
    nearby: ["clarks-summit-pa", "pittston-pa"],
    population: 76328,
    populationYear: 2020,
    housingTypes: ["single-family", "multi-family", "townhouse", "condo"],
    taxContext: {
      en: "Property taxes are set by Lackawanna County, the City of Scranton, and the Scranton School District; rates vary by parcel.",
      es: "Los impuestos a la propiedad los fijan el condado de Lackawanna, la ciudad de Scranton y el distrito escolar de Scranton; las tasas varían por parcela.",
      pt: "Os impostos sobre a propriedade são definidos pelo condado de Lackawanna, pela cidade de Scranton e pelo distrito escolar de Scranton; as taxas variam por lote.",
    },
    distances: [
      { to: "Wilkes-Barre", miles: 20 },
      { to: "Pocono Mountains", miles: 40 },
      { to: "Binghamton, NY", miles: 65 },
      { to: "New York City", miles: 125 },
      { to: "Philadelphia", miles: 125 },
    ],
    neighborhoods: [
      { name: "Green Ridge" },
      { name: "Hill Section" },
      { name: "South Side" },
      { name: "West Side" },
      { name: "Minooka" },
      { name: "Tripp Park" },
    ],
    amenities: [
      { category: "parks", items: ["Nay Aug Park", "McDade Park", "Lake Scranton"] },
      { category: "shopping", items: ["Viewmont Mall", "Marketplace at Steamtown", "The Shoppes at Montage"] },
      { category: "healthcare", items: ["Geisinger Community Medical Center", "Moses Taylor Hospital", "Regional Hospital of Scranton"] },
      { category: "education", items: ["University of Scranton", "Marywood University", "Lackawanna College"] },
      { category: "transportation", items: ["Interstate 81", "Interstate 84 / 380", "Wilkes-Barre/Scranton International Airport"] },
    ],
    employers: ["University of Scranton", "Geisinger", "Commonwealth Health", "Marywood University", "Lackawanna County"],
    description: {
      en: "The largest city in NEPA and the seat of Lackawanna County, known for its rail history and revitalized downtown core.",
      es: "La ciudad más grande de NEPA y sede del condado de Lackawanna, conocida por su historia ferroviaria y su centro revitalizado.",
      pt: "A maior cidade de NEPA e sede do condado de Lackawanna, conhecida por sua história ferroviária e centro revitalizado.",
    },
    living: {
      en: "Scranton is the largest city in Northeastern Pennsylvania and the seat of Lackawanna County, grown from its 19th-century rail and coal history into a regional hub for education and healthcare. It is home to the University of Scranton and Marywood University, the Steamtown National Historic Site, and established neighborhoods such as Green Ridge and the Hill Section, with Interstates 81, 84 and 380 meeting nearby.",
      es: "Scranton es la ciudad más grande del noreste de Pensilvania y sede del condado de Lackawanna, que pasó de su historia ferroviaria y del carbón del siglo XIX a ser un centro regional de educación y salud. Alberga la University of Scranton y Marywood University, el Steamtown National Historic Site y barrios consolidados como Green Ridge y Hill Section, con las Interestatales 81, 84 y 380 cerca.",
      pt: "Scranton é a maior cidade do nordeste da Pensilvânia e sede do condado de Lackawanna, que passou de sua história ferroviária e do carvão do século XIX a um polo regional de educação e saúde. Abriga a University of Scranton e a Marywood University, o Steamtown National Historic Site e bairros consolidados como Green Ridge e Hill Section, com as Interestaduais 81, 84 e 380 por perto.",
    },
    faq: [
      {
        q: {
          en: "How far is Scranton from Wilkes-Barre?",
          es: "¿A qué distancia está Scranton de Wilkes-Barre?",
          pt: "Qual a distância de Scranton a Wilkes-Barre?",
        },
        a: {
          en: "Scranton is about 20 miles (roughly a 25–30 minute drive) north of Wilkes-Barre via Interstate 81.",
          es: "Scranton está a unas 20 millas (unos 25–30 minutos en auto) al norte de Wilkes-Barre por la Interestatal 81.",
          pt: "Scranton fica a cerca de 32 km (uns 25–30 minutos de carro) ao norte de Wilkes-Barre pela Interestadual 81.",
        },
      },
    ],
  },
  {
    slug: "pittston-pa",
    name: "Pittston",
    county: "Luzerne County",
    featured: true,
    accent: "#245e97",
    highlights: ["Historic Main Street", "Susquehanna River", "Pittston Tomato Festival", "Riverfront"],
    nearby: ["wyoming-pa", "forty-fort-pa", "plains-pa", "scranton-pa"],
    population: 7739,
    populationYear: 2020,
    housingTypes: ["single-family", "multi-family", "townhouse"],
    taxContext: {
      en: "Property taxes combine Luzerne County, City of Pittston, and Pittston Area School District levies.",
      es: "Los impuestos a la propiedad combinan gravámenes del condado de Luzerne, la ciudad de Pittston y el distrito escolar de Pittston Area.",
      pt: "Os impostos sobre a propriedade combinam o condado de Luzerne, a cidade de Pittston e o distrito escolar de Pittston Area.",
    },
    distances: [
      { to: "Scranton", miles: 10 },
      { to: "Wilkes-Barre", miles: 10 },
      { to: "Wilkes-Barre/Scranton Airport", miles: 3 },
    ],
    amenities: [
      { category: "transportation", items: ["Interstate 81", "Wilkes-Barre/Scranton International Airport"] },
    ],
    description: {
      en: "A riverfront city midway between Scranton and Wilkes-Barre with a compact, revitalized Main Street.",
      es: "Ciudad ribereña a medio camino entre Scranton y Wilkes-Barre, con una Main Street compacta y renovada.",
      pt: "Cidade à beira-rio entre Scranton e Wilkes-Barre, com uma Main Street compacta e revitalizada.",
    },
    living: {
      en: "Pittston sits on the Susquehanna River almost exactly midway between Scranton and Wilkes-Barre, giving residents short drives to both cities and the regional airport nearby. Its walkable, revitalized Main Street and annual Tomato Festival anchor a compact community of historic homes and riverfront blocks.",
      es: "Pittston está sobre el río Susquehanna casi exactamente a medio camino entre Scranton y Wilkes-Barre, con trayectos cortos a ambas ciudades y al aeropuerto regional cercano. Su Main Street peatonal y renovada y el Tomato Festival anual son el eje de una comunidad compacta de casas históricas y cuadras junto al río.",
      pt: "Pittston fica sobre o rio Susquehanna quase exatamente no meio do caminho entre Scranton e Wilkes-Barre, com trajetos curtos às duas cidades e ao aeroporto regional próximo. Sua Main Street revitalizada e caminhável e o Tomato Festival anual são o eixo de uma comunidade compacta de casas históricas e quarteirões à beira-rio.",
    },
    faq: [],
  },
  {
    slug: "kingston-pa",
    name: "Kingston",
    county: "Luzerne County",
    featured: true,
    accent: "#345680",
    highlights: ["Susquehanna River", "Nesbitt Park", "Wyoming Avenue shops", "Kirby Park (nearby)"],
    nearby: ["wilkes-barre-pa", "forty-fort-pa", "wyoming-pa"],
    population: 13030,
    populationYear: 2020,
    housingTypes: ["single-family", "multi-family", "townhouse"],
    taxContext: {
      en: "Property taxes combine Luzerne County, Kingston Municipality, and Wyoming Valley West School District levies.",
      es: "Los impuestos a la propiedad combinan gravámenes del condado de Luzerne, el municipio de Kingston y el distrito escolar Wyoming Valley West.",
      pt: "Os impostos sobre a propriedade combinam o condado de Luzerne, o município de Kingston e o distrito escolar Wyoming Valley West.",
    },
    distances: [
      { to: "Wilkes-Barre", miles: 2 },
      { to: "Scranton", miles: 22 },
    ],
    amenities: [
      { category: "parks", items: ["Nesbitt Park", "Kirby Park (adjacent)"] },
      { category: "education", items: ["Wyoming Seminary"] },
    ],
    description: {
      en: "A residential borough across the Susquehanna River from Wilkes-Barre with tree-lined streets and local shops.",
      es: "Municipio residencial al otro lado del río Susquehanna desde Wilkes-Barre, con calles arboladas y comercios locales.",
      pt: "Município residencial do outro lado do rio Susquehanna, em frente a Wilkes-Barre, com ruas arborizadas e comércio local.",
    },
    living: {
      en: "Kingston lies directly across the Susquehanna River from Wilkes-Barre, a primarily residential municipality with tree-lined streets, the Wyoming Avenue commercial corridor, and riverfront parks. Its central Wyoming Valley location puts downtown Wilkes-Barre just minutes away.",
      es: "Kingston está justo al otro lado del río Susquehanna frente a Wilkes-Barre, un municipio principalmente residencial con calles arboladas, el corredor comercial de Wyoming Avenue y parques junto al río. Su ubicación central en el valle de Wyoming deja el centro de Wilkes-Barre a pocos minutos.",
      pt: "Kingston fica bem em frente a Wilkes-Barre, do outro lado do rio Susquehanna — um município majoritariamente residencial, com ruas arborizadas, o corredor comercial da Wyoming Avenue e parques à beira-rio. Sua localização central no vale de Wyoming deixa o centro de Wilkes-Barre a poucos minutos.",
    },
    faq: [],
  },
  {
    slug: "dallas-pa",
    name: "Dallas",
    county: "Luzerne County",
    featured: true,
    accent: "#1d3350",
    highlights: ["Back Mountain area", "Frances Slocum State Park (nearby)", "Misericordia University", "Rural surroundings"],
    nearby: ["kingston-pa", "wilkes-barre-pa"],
    housingTypes: ["single-family", "land"],
    taxContext: {
      en: "Property taxes combine Luzerne County, the borough/township, and Dallas School District levies.",
      es: "Los impuestos a la propiedad combinan gravámenes del condado de Luzerne, el municipio y el distrito escolar de Dallas.",
      pt: "Os impostos sobre a propriedade combinam o condado de Luzerne, o município e o distrito escolar de Dallas.",
    },
    distances: [
      { to: "Wilkes-Barre", miles: 10 },
      { to: "Scranton", miles: 25 },
    ],
    amenities: [
      { category: "education", items: ["Misericordia University"] },
      { category: "parks", items: ["Frances Slocum State Park (nearby)"] },
    ],
    description: {
      en: "A borough and surrounding township in the Back Mountain area offering more open, suburban settings.",
      es: "Municipio y su distrito circundante en la zona de Back Mountain, con entornos más abiertos y suburbanos.",
      pt: "Município e distrito vizinho na região de Back Mountain, com ambientes mais abertos e suburbanos.",
    },
    living: {
      en: "Dallas anchors the Back Mountain area northwest of Wilkes-Barre, offering more open, suburban and rural surroundings than the valley floor. It is home to Misericordia University and sits near Frances Slocum State Park, with the Back Mountain's larger lots and wooded settings.",
      es: "Dallas es el eje de la zona de Back Mountain, al noroeste de Wilkes-Barre, con entornos más abiertos, suburbanos y rurales que el fondo del valle. Alberga Misericordia University y está cerca de Frances Slocum State Park, con los lotes más grandes y bosques de Back Mountain.",
      pt: "Dallas é o eixo da região de Back Mountain, a noroeste de Wilkes-Barre, com ambientes mais abertos, suburbanos e rurais do que o fundo do vale. Abriga a Misericordia University e fica perto do Frances Slocum State Park, com os lotes maiores e áreas arborizadas de Back Mountain.",
    },
    faq: [],
  },
  {
    slug: "hazleton-pa",
    name: "Hazleton",
    county: "Luzerne County",
    featured: true,
    accent: "#274266",
    highlights: ["Downtown Hazleton", "Penn State Hazleton", "Higher elevation", "Community facilities"],
    nearby: ["mountain-top-pa"],
    population: 29963,
    populationYear: 2020,
    housingTypes: ["single-family", "multi-family", "townhouse"],
    taxContext: {
      en: "Property taxes combine Luzerne County, City of Hazleton, and Hazleton Area School District levies.",
      es: "Los impuestos a la propiedad combinan gravámenes del condado de Luzerne, la ciudad de Hazleton y el distrito escolar de Hazleton Area.",
      pt: "Os impostos sobre a propriedade combinam o condado de Luzerne, a cidade de Hazleton e o distrito escolar de Hazleton Area.",
    },
    distances: [
      { to: "Wilkes-Barre", miles: 25 },
      { to: "Lehigh Valley", miles: 35 },
      { to: "Scranton", miles: 45 },
    ],
    amenities: [
      { category: "education", items: ["Penn State Hazleton", "Lackawanna College Hazleton"] },
      { category: "healthcare", items: ["Lehigh Valley Hospital–Hazleton"] },
      { category: "transportation", items: ["Interstate 81", "Interstate 80"] },
    ],
    employers: ["Hazleton Area School District", "Lehigh Valley Health Network", "regional logistics and distribution centers"],
    description: {
      en: "A city in southern Luzerne County at one of the highest elevations in the region, with a diverse, growing community.",
      es: "Ciudad en el sur del condado de Luzerne, a una de las mayores altitudes de la región, con una comunidad diversa y creciente.",
      pt: "Cidade no sul do condado de Luzerne, em uma das maiores altitudes da região, com uma comunidade diversa e crescente.",
    },
    living: {
      en: "Hazleton sits in southern Luzerne County at one of the highest elevations in the region, near the junction of Interstates 80 and 81. A diverse and growing community, it hosts Penn State Hazleton and has become a hub for regional logistics and distribution along the highway corridor.",
      es: "Hazleton está en el sur del condado de Luzerne, a una de las mayores altitudes de la región, cerca del cruce de las Interestatales 80 y 81. Comunidad diversa y en crecimiento, alberga Penn State Hazleton y se ha convertido en un centro de logística y distribución regional a lo largo del corredor de autopistas.",
      pt: "Hazleton fica no sul do condado de Luzerne, em uma das maiores altitudes da região, perto do cruzamento das Interestaduais 80 e 81. Comunidade diversa e em crescimento, abriga a Penn State Hazleton e se tornou um polo de logística e distribuição regional ao longo do corredor de rodovias.",
    },
    faq: [],
  },
  {
    slug: "nanticoke-pa",
    name: "Nanticoke",
    county: "Luzerne County",
    featured: false,
    accent: "#1f4d7b",
    highlights: ["Susquehanna River", "Luzerne County Community College", "Riverfront", "Local parks"],
    nearby: ["wilkes-barre-pa", "kingston-pa"],
    population: 10465,
    populationYear: 2020,
    housingTypes: ["single-family", "multi-family"],
    distances: [
      { to: "Wilkes-Barre", miles: 7 },
      { to: "Scranton", miles: 27 },
    ],
    amenities: [
      { category: "education", items: ["Luzerne County Community College"] },
    ],
    description: {
      en: "A city along the Susquehanna River, home to a Luzerne County Community College campus.",
      es: "Ciudad a orillas del río Susquehanna, sede de un campus del Luzerne County Community College.",
      pt: "Cidade às margens do rio Susquehanna, onde fica um campus do Luzerne County Community College.",
    },
    living: {
      en: "Nanticoke lies along the Susquehanna River in the southern Wyoming Valley, a short drive from Wilkes-Barre. It is home to the main campus of Luzerne County Community College and a mix of established residential blocks near the river.",
      es: "Nanticoke está a orillas del río Susquehanna, en el sur del valle de Wyoming, a poca distancia en auto de Wilkes-Barre. Alberga el campus principal del Luzerne County Community College y una mezcla de cuadras residenciales consolidadas cerca del río.",
      pt: "Nanticoke fica às margens do rio Susquehanna, no sul do vale de Wyoming, a poucos minutos de carro de Wilkes-Barre. Abriga o campus principal do Luzerne County Community College e uma mistura de quarteirões residenciais consolidados perto do rio.",
    },
    faq: [],
  },
  {
    slug: "mountain-top-pa",
    name: "Mountain Top",
    county: "Luzerne County",
    featured: false,
    accent: "#245e97",
    highlights: ["Wright Township", "Wooded, elevated setting", "Nuangola area", "Regional access to I-81"],
    nearby: ["wilkes-barre-pa", "hazleton-pa"],
    housingTypes: ["single-family", "land"],
    distances: [
      { to: "Wilkes-Barre", miles: 10 },
      { to: "Hazleton", miles: 15 },
    ],
    amenities: [
      { category: "transportation", items: ["Interstate 81"] },
    ],
    description: {
      en: "An elevated community in Wright Township south of Wilkes-Barre with a more rural, wooded character.",
      es: "Comunidad elevada en Wright Township, al sur de Wilkes-Barre, de carácter más rural y boscoso.",
      pt: "Comunidade elevada em Wright Township, ao sul de Wilkes-Barre, com caráter mais rural e arborizado.",
    },
    living: {
      en: "Mountain Top is an elevated community centered on Wright Township, south of Wilkes-Barre along the Interstate 81 corridor. Its wooded, higher-elevation setting and areas like Nuangola give it a more rural, suburban character while keeping the valley's cities within a short drive.",
      es: "Mountain Top es una comunidad elevada centrada en Wright Township, al sur de Wilkes-Barre, junto al corredor de la Interestatal 81. Su entorno boscoso y de mayor altitud y zonas como Nuangola le dan un carácter más rural y suburbano, con las ciudades del valle a poca distancia.",
      pt: "Mountain Top é uma comunidade elevada centrada em Wright Township, ao sul de Wilkes-Barre, junto ao corredor da Interestadual 81. Seu ambiente arborizado e de maior altitude e áreas como Nuangola lhe dão um caráter mais rural e suburbano, com as cidades do vale a poucos minutos.",
    },
    faq: [],
  },
  {
    slug: "clarks-summit-pa",
    name: "Clarks Summit",
    county: "Lackawanna County",
    featured: false,
    accent: "#345680",
    highlights: ["The Abingtons", "State Street district", "Local shops and cafes", "Access to Scranton"],
    nearby: ["scranton-pa"],
    population: 5085,
    populationYear: 2020,
    housingTypes: ["single-family", "townhouse"],
    distances: [
      { to: "Scranton", miles: 8 },
      { to: "Wilkes-Barre", miles: 28 },
    ],
    amenities: [
      { category: "shopping", items: ["State Street district"] },
    ],
    description: {
      en: "A borough in the Abingtons north of Scranton with a compact commercial district.",
      es: "Municipio en la zona de los Abingtons, al norte de Scranton, con un distrito comercial compacto.",
      pt: "Município na região dos Abingtons, ao norte de Scranton, com um distrito comercial compacto.",
    },
    living: {
      en: "Clarks Summit is the commercial center of the Abingtons, a cluster of communities just north of Scranton. Its walkable State Street district of local shops and cafes, combined with a quick commute into the city, defines the borough's character.",
      es: "Clarks Summit es el centro comercial de los Abingtons, un conjunto de comunidades justo al norte de Scranton. Su distrito peatonal de State Street, con comercios y cafés locales, junto con un trayecto rápido a la ciudad, define el carácter del municipio.",
      pt: "Clarks Summit é o centro comercial dos Abingtons, um conjunto de comunidades logo ao norte de Scranton. Seu distrito caminhável da State Street, com comércio e cafés locais, somado a um deslocamento rápido para a cidade, define o caráter do município.",
    },
    faq: [],
  },
  {
    slug: "plains-pa",
    name: "Plains",
    county: "Luzerne County",
    featured: false,
    accent: "#1d3350",
    highlights: ["Regional retail corridor", "Adjacent to Wilkes-Barre", "Mohegan Pennsylvania", "Local parks"],
    nearby: ["wilkes-barre-pa", "pittston-pa"],
    housingTypes: ["single-family", "multi-family"],
    distances: [
      { to: "Wilkes-Barre", miles: 3 },
      { to: "Scranton", miles: 18 },
    ],
    amenities: [
      { category: "shopping", items: ["Mohegan Pennsylvania", "regional retail corridor"] },
      { category: "healthcare", items: ["Geisinger Wyoming Valley Medical Center"] },
    ],
    description: {
      en: "A township adjacent to Wilkes-Barre combining residential neighborhoods with regional retail.",
      es: "Distrito contiguo a Wilkes-Barre que combina barrios residenciales con comercio regional.",
      pt: "Distrito vizinho a Wilkes-Barre que combina bairros residenciais com comércio regional.",
    },
    living: {
      en: "Plains Township borders Wilkes-Barre to the northeast, combining residential neighborhoods with one of the valley's main retail corridors. It is home to Mohegan Pennsylvania and Geisinger Wyoming Valley Medical Center, with quick access to Interstate 81.",
      es: "Plains Township limita con Wilkes-Barre al noreste y combina barrios residenciales con uno de los principales corredores comerciales del valle. Alberga Mohegan Pennsylvania y el Geisinger Wyoming Valley Medical Center, con acceso rápido a la Interestatal 81.",
      pt: "Plains Township faz divisa com Wilkes-Barre a nordeste e combina bairros residenciais com um dos principais corredores comerciais do vale. Abriga o Mohegan Pennsylvania e o Geisinger Wyoming Valley Medical Center, com acesso rápido à Interestadual 81.",
    },
    faq: [],
  },
  {
    slug: "forty-fort-pa",
    name: "Forty Fort",
    county: "Luzerne County",
    featured: false,
    accent: "#274266",
    highlights: ["Historic district", "Wyoming Valley Airport", "Susquehanna River", "Forty Fort Cemetery"],
    nearby: ["kingston-pa", "wilkes-barre-pa", "wyoming-pa"],
    population: 4214,
    populationYear: 2020,
    housingTypes: ["single-family", "multi-family"],
    distances: [
      { to: "Wilkes-Barre", miles: 3 },
      { to: "Scranton", miles: 22 },
    ],
    amenities: [
      { category: "transportation", items: ["Wyoming Valley Airport"] },
    ],
    description: {
      en: "A small riverfront borough in the Wyoming Valley with a historic district and local airport.",
      es: "Pequeño municipio ribereño en el valle de Wyoming, con un distrito histórico y aeropuerto local.",
      pt: "Pequeno município à beira-rio no vale de Wyoming, com distrito histórico e aeroporto local.",
    },
    living: {
      en: "Forty Fort is a small riverfront borough in the heart of the Wyoming Valley, between Kingston and Wyoming along the Susquehanna. Known for its historic district and the Wyoming Valley Airport, it offers a compact, residential setting minutes from Wilkes-Barre.",
      es: "Forty Fort es un pequeño municipio ribereño en el corazón del valle de Wyoming, entre Kingston y Wyoming, a orillas del Susquehanna. Conocido por su distrito histórico y el Wyoming Valley Airport, ofrece un entorno compacto y residencial a minutos de Wilkes-Barre.",
      pt: "Forty Fort é um pequeno município à beira-rio no coração do vale de Wyoming, entre Kingston e Wyoming, às margens do Susquehanna. Conhecido por seu distrito histórico e pelo Wyoming Valley Airport, oferece um ambiente compacto e residencial a minutos de Wilkes-Barre.",
    },
    faq: [],
  },
  {
    slug: "wyoming-pa",
    name: "Wyoming",
    county: "Luzerne County",
    featured: false,
    accent: "#1f4d7b",
    highlights: ["Susquehanna River west bank", "Wyoming Monument", "Eighth Street corridor", "Riverfront access"],
    nearby: ["forty-fort-pa", "kingston-pa", "pittston-pa"],
    population: 3009,
    populationYear: 2020,
    housingTypes: ["single-family", "multi-family"],
    distances: [
      { to: "Wilkes-Barre", miles: 7 },
      { to: "Pittston", miles: 5 },
      { to: "Scranton", miles: 15 },
    ],
    amenities: [
      { category: "parks", items: ["Wyoming Monument"] },
    ],
    description: {
      en: "A borough along the west bank of the Susquehanna River within the Wyoming Valley.",
      es: "Municipio en la margen oeste del río Susquehanna, dentro del valle de Wyoming.",
      pt: "Município na margem oeste do rio Susquehanna, dentro do vale de Wyoming.",
    },
    living: {
      en: "Wyoming is a borough along the west bank of the Susquehanna River, between Forty Fort and West Pittston. Home to the Wyoming Monument commemorating the 1778 Battle of Wyoming, it offers a small, historic riverfront community with easy access up and down the valley.",
      es: "Wyoming es un municipio en la margen oeste del río Susquehanna, entre Forty Fort y West Pittston. Sede del Wyoming Monument, que conmemora la Batalla de Wyoming de 1778, ofrece una pequeña comunidad ribereña e histórica con fácil acceso a lo largo del valle.",
      pt: "Wyoming é um município na margem oeste do rio Susquehanna, entre Forty Fort e West Pittston. Sede do Wyoming Monument, que lembra a Batalha de Wyoming de 1778, oferece uma pequena comunidade histórica à beira-rio, com acesso fácil por todo o vale.",
    },
    faq: [],
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
