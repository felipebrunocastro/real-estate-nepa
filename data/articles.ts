import type { Article } from "@/types";

/**
 * DEMO article content for the publication system. Every entry is sample /
 * demonstration content (`isSample: true`) — NOT real reporting, and any
 * figures shown are illustrative, not live market statistics.
 *
 * This file is the current content source. It sits behind `lib/content.ts`, so
 * it can later be swapped for MDX, a database, or a headless CMS without
 * changing any page or component.
 */
export const articles: Article[] = [
  {
    slug: "nepa-market-snapshot-sample",
    section: "market-reports",
    category: "market-report",
    accent: "#1f4d7b",
    author: "Real Estate in NEPA Editorial",
    publishedAt: "2026-08-01",
    updatedAt: "2026-08-05",
    tags: ["nepa", "market", "median-price", "inventory"],
    isSample: true,
    sources: [
      { label: "Sample data — for demonstration only" },
      { label: "Future source: verified MLS / county records" },
    ],
    title: {
      en: "NEPA Market Snapshot (Sample Report)",
      es: "Panorama del Mercado de NEPA (Informe de Muestra)",
      pt: "Panorama do Mercado de NEPA (Relatório de Amostra)",
    },
    excerpt: {
      en: "A demonstration regional report showing how NEPA housing metrics will be tracked once live data is connected.",
      es: "Un informe regional de demostración que muestra cómo se seguirán las métricas de vivienda de NEPA cuando se conecten los datos reales.",
      pt: "Um relatório regional de demonstração que mostra como as métricas de moradia de NEPA serão acompanhadas quando os dados reais forem conectados.",
    },
    body: [
      {
        type: "note",
        text: {
          en: "This is a sample report. The figures below are illustrative placeholders, not live market statistics.",
          es: "Este es un informe de muestra. Las cifras siguientes son marcadores ilustrativos, no estadísticas reales del mercado.",
          pt: "Este é um relatório de amostra. Os números abaixo são marcadores ilustrativos, não estatísticas reais do mercado.",
        },
      },
      {
        type: "paragraph",
        text: {
          en: "Once connected to verified data, this regional snapshot will summarize how the Northeastern Pennsylvania housing market moved over the reporting period, with breakdowns by city and county.",
          es: "Una vez conectado a datos verificados, este panorama regional resumirá cómo se movió el mercado de vivienda del noreste de Pensilvania durante el período, con desgloses por ciudad y condado.",
          pt: "Uma vez conectado a dados verificados, este panorama regional resumirá como o mercado imobiliário do nordeste da Pensilvânia se movimentou no período, com detalhamento por cidade e condado.",
        },
      },
      {
        type: "stats",
        items: [
          {
            label: { en: "Median Sale Price", es: "Precio medio de venta", pt: "Preço médio de venda" },
            value: "$174,000",
            change: "+2.8% YoY",
            trend: "up",
          },
          {
            label: { en: "Active Listings", es: "Anuncios activos", pt: "Anúncios ativos" },
            value: "1,240",
            change: "-3.1% YoY",
            trend: "down",
          },
          {
            label: { en: "Median Days on Market", es: "Días promedio en el mercado", pt: "Dias médios no mercado" },
            value: "38",
            change: "+4 days",
            trend: "up",
          },
          {
            label: { en: "Sale-to-List Ratio", es: "Relación venta-precio de lista", pt: "Relação venda/preço anunciado" },
            value: "98.6%",
            change: "+0.3%",
            trend: "up",
          },
        ],
      },
      {
        type: "lineChart",
        unit: "$",
        title: {
          en: "Median sale price by month (sample)",
          es: "Precio medio de venta por mes (muestra)",
          pt: "Preço médio de venda por mês (amostra)",
        },
        data: [
          { label: "Feb", value: 165000 },
          { label: "Mar", value: 167500 },
          { label: "Apr", value: 169000 },
          { label: "May", value: 171000 },
          { label: "Jun", value: 172500 },
          { label: "Jul", value: 174000 },
        ],
      },
      {
        type: "barChart",
        unit: "",
        title: {
          en: "Active listings by city (sample)",
          es: "Anuncios activos por ciudad (muestra)",
          pt: "Anúncios ativos por cidade (amostra)",
        },
        data: [
          { label: "Scranton", value: 310 },
          { label: "W-Barre", value: 240 },
          { label: "Hazleton", value: 175 },
          { label: "Kingston", value: 120 },
          { label: "Pittston", value: 95 },
        ],
      },
    ],
  },
  {
    slug: "wilkes-barre-market-report-sample",
    section: "market-reports",
    category: "market-report",
    accent: "#274266",
    author: "Real Estate in NEPA Editorial",
    publishedAt: "2026-07-28",
    city: "wilkes-barre-pa",
    county: "Luzerne County",
    tags: ["wilkes-barre", "luzerne-county", "market"],
    isSample: true,
    sources: [{ label: "Sample data — for demonstration only" }],
    title: {
      en: "Wilkes-Barre Market Report (Sample)",
      es: "Informe del Mercado de Wilkes-Barre (Muestra)",
      pt: "Relatório do Mercado de Wilkes-Barre (Amostra)",
    },
    excerpt: {
      en: "A sample city-level report illustrating how Wilkes-Barre market data will be presented.",
      es: "Un informe de muestra a nivel de ciudad que ilustra cómo se presentarán los datos del mercado de Wilkes-Barre.",
      pt: "Um relatório de amostra em nível de cidade que ilustra como os dados do mercado de Wilkes-Barre serão apresentados.",
    },
    body: [
      {
        type: "note",
        text: {
          en: "Sample report — figures are illustrative placeholders, not live statistics.",
          es: "Informe de muestra: las cifras son marcadores ilustrativos, no estadísticas reales.",
          pt: "Relatório de amostra: os números são marcadores ilustrativos, não estatísticas reais.",
        },
      },
      {
        type: "stats",
        items: [
          {
            label: { en: "Median Sale Price", es: "Precio medio de venta", pt: "Preço médio de venda" },
            value: "$168,000",
            change: "+3.0% YoY",
            trend: "up",
          },
          {
            label: { en: "Homes for Sale", es: "Casas en venta", pt: "Casas à venda" },
            value: "240",
            change: "-2.4% YoY",
            trend: "down",
          },
          {
            label: { en: "Days on Market", es: "Días en el mercado", pt: "Dias no mercado" },
            value: "41",
            change: "+3 days",
            trend: "up",
          },
        ],
      },
      {
        type: "lineChart",
        unit: "$",
        title: {
          en: "Wilkes-Barre median price (sample)",
          es: "Precio medio de Wilkes-Barre (muestra)",
          pt: "Preço médio de Wilkes-Barre (amostra)",
        },
        data: [
          { label: "Mar", value: 161000 },
          { label: "Apr", value: 163000 },
          { label: "May", value: 165000 },
          { label: "Jun", value: 166500 },
          { label: "Jul", value: 168000 },
        ],
      },
    ],
  },
  {
    slug: "scranton-market-report-sample",
    section: "market-reports",
    category: "market-report",
    accent: "#1f4d7b",
    author: "Real Estate in NEPA Editorial",
    publishedAt: "2026-07-25",
    city: "scranton-pa",
    county: "Lackawanna County",
    tags: ["scranton", "lackawanna-county", "market"],
    isSample: true,
    sources: [{ label: "Sample data — for demonstration only" }],
    title: {
      en: "Scranton Market Report (Sample)",
      es: "Informe del Mercado de Scranton (Muestra)",
      pt: "Relatório do Mercado de Scranton (Amostra)",
    },
    excerpt: {
      en: "A sample city-level report illustrating how Scranton market data will be presented.",
      es: "Un informe de muestra a nivel de ciudad que ilustra cómo se presentarán los datos del mercado de Scranton.",
      pt: "Um relatório de amostra em nível de cidade que ilustra como os dados do mercado de Scranton serão apresentados.",
    },
    body: [
      {
        type: "note",
        text: {
          en: "Sample report — figures are illustrative placeholders, not live statistics.",
          es: "Informe de muestra: las cifras son marcadores ilustrativos, no estadísticas reales.",
          pt: "Relatório de amostra: os números são marcadores ilustrativos, não estatísticas reais.",
        },
      },
      {
        type: "stats",
        items: [
          {
            label: { en: "Median Sale Price", es: "Precio medio de venta", pt: "Preço médio de venda" },
            value: "$179,000",
            change: "+3.4% YoY",
            trend: "up",
          },
          {
            label: { en: "Homes for Sale", es: "Casas en venta", pt: "Casas à venda" },
            value: "310",
            change: "-1.8% YoY",
            trend: "down",
          },
          {
            label: { en: "Sale-to-List Ratio", es: "Relación venta-precio de lista", pt: "Relação venda/preço anunciado" },
            value: "99.0%",
            change: "+0.4%",
            trend: "up",
          },
        ],
      },
      {
        type: "barChart",
        unit: "",
        title: {
          en: "Closed sales by month (sample)",
          es: "Ventas cerradas por mes (muestra)",
          pt: "Vendas fechadas por mês (amostra)",
        },
        data: [
          { label: "Apr", value: 88 },
          { label: "May", value: 102 },
          { label: "Jun", value: 115 },
          { label: "Jul", value: 121 },
        ],
      },
    ],
  },
  {
    slug: "downtown-mixed-use-development-sample",
    section: "nepa-news",
    category: "development",
    accent: "#245e97",
    author: "Real Estate in NEPA Editorial",
    publishedAt: "2026-08-03",
    city: "scranton-pa",
    county: "Lackawanna County",
    tags: ["development", "scranton", "downtown"],
    isSample: true,
    sources: [{ label: "Sample content — illustrative example, not a real project" }],
    title: {
      en: "Downtown Mixed-Use Development (Sample Story)",
      es: "Desarrollo de Uso Mixto en el Centro (Historia de Muestra)",
      pt: "Empreendimento de Uso Misto no Centro (História de Amostra)",
    },
    excerpt: {
      en: "An example of how NEPA News will cover new residential and commercial development.",
      es: "Un ejemplo de cómo NEPA News cubrirá los nuevos desarrollos residenciales y comerciales.",
      pt: "Um exemplo de como o NEPA News cobrirá novos empreendimentos residenciais e comerciais.",
    },
    body: [
      {
        type: "note",
        text: {
          en: "Sample story — this is an illustrative example, not a report of a real project.",
          es: "Historia de muestra: es un ejemplo ilustrativo, no el reporte de un proyecto real.",
          pt: "História de amostra: é um exemplo ilustrativo, não o relato de um projeto real.",
        },
      },
      {
        type: "paragraph",
        text: {
          en: "NEPA News will track new developments that affect housing and neighborhoods across the region, with clear sourcing for each story.",
          es: "NEPA News dará seguimiento a los nuevos desarrollos que afectan la vivienda y los vecindarios de la región, con fuentes claras para cada historia.",
          pt: "O NEPA News acompanhará novos empreendimentos que afetam a moradia e os bairros da região, com fontes claras para cada matéria.",
        },
      },
      {
        type: "list",
        items: [
          { en: "What is being built and where", es: "Qué se construye y dónde", pt: "O que está sendo construído e onde" },
          { en: "How many housing units are planned", es: "Cuántas unidades de vivienda se planean", pt: "Quantas unidades habitacionais estão planejadas" },
          { en: "Timeline and current status", es: "Cronograma y estado actual", pt: "Cronograma e status atual" },
          { en: "Why it matters for the local market", es: "Por qué importa para el mercado local", pt: "Por que isso importa para o mercado local" },
        ],
      },
    ],
  },
  {
    slug: "mortgage-rate-update-sample",
    section: "nepa-news",
    category: "mortgage",
    accent: "#1d3350",
    author: "Real Estate in NEPA Editorial",
    publishedAt: "2026-07-30",
    tags: ["mortgage", "rates", "buyers"],
    isSample: true,
    sources: [{ label: "Sample content — not financial advice" }],
    title: {
      en: "Mortgage Rate Update (Sample)",
      es: "Actualización de Tasas Hipotecarias (Muestra)",
      pt: "Atualização das Taxas de Financiamento (Amostra)",
    },
    excerpt: {
      en: "A sample of how rate updates and their impact on NEPA buyers will be covered.",
      es: "Una muestra de cómo se cubrirán las actualizaciones de tasas y su impacto en los compradores de NEPA.",
      pt: "Uma amostra de como as atualizações de taxas e seu impacto nos compradores de NEPA serão cobertas.",
    },
    body: [
      {
        type: "note",
        text: {
          en: "Sample content for demonstration. Not financial advice and not a rate quote.",
          es: "Contenido de muestra para demostración. No es asesoría financiera ni una cotización de tasa.",
          pt: "Conteúdo de amostra para demonstração. Não é consultoria financeira nem uma cotação de taxa.",
        },
      },
      {
        type: "paragraph",
        text: {
          en: "Rate coverage will explain how changing mortgage rates affect monthly payments and buying power for people shopping in NEPA — always with a reminder to confirm current figures with a licensed lender.",
          es: "La cobertura de tasas explicará cómo los cambios en las tasas hipotecarias afectan los pagos mensuales y el poder de compra de quienes buscan en NEPA, siempre recordando confirmar las cifras actuales con un prestamista con licencia.",
          pt: "A cobertura de taxas explicará como as mudanças nas taxas de financiamento afetam os pagamentos mensais e o poder de compra de quem procura em NEPA, sempre lembrando de confirmar os valores atuais com um credor licenciado.",
        },
      },
    ],
  },
  {
    slug: "property-tax-note-sample",
    section: "nepa-news",
    category: "policy",
    accent: "#1c3956",
    author: "Real Estate in NEPA Editorial",
    publishedAt: "2026-07-22",
    county: "Luzerne County",
    tags: ["taxes", "policy", "luzerne-county"],
    isSample: true,
    sources: [{ label: "Sample content — verify with county / municipal offices" }],
    title: {
      en: "Property Tax Note (Sample)",
      es: "Nota sobre Impuestos a la Propiedad (Muestra)",
      pt: "Nota sobre Impostos sobre a Propriedade (Amostra)",
    },
    excerpt: {
      en: "A sample explainer on how property-tax topics will be covered for NEPA owners and buyers.",
      es: "Un explicativo de muestra sobre cómo se cubrirán los temas de impuestos a la propiedad para propietarios y compradores de NEPA.",
      pt: "Um explicativo de amostra sobre como os temas de impostos sobre a propriedade serão cobertos para proprietários e compradores de NEPA.",
    },
    body: [
      {
        type: "note",
        text: {
          en: "Sample content. Always verify tax details with the county assessor and your municipality.",
          es: "Contenido de muestra. Verifica siempre los detalles fiscales con el asesor del condado y tu municipio.",
          pt: "Conteúdo de amostra. Sempre verifique os detalhes tributários com o avaliador do condado e o seu município.",
        },
      },
      {
        type: "paragraph",
        text: {
          en: "Property-tax coverage will summarize assessment cycles, millage changes and how they affect the cost of owning a home in NEPA — pointing readers to official county and municipal sources.",
          es: "La cobertura de impuestos a la propiedad resumirá los ciclos de avalúo, los cambios de millage y cómo afectan el costo de tener una casa en NEPA, dirigiendo a los lectores a fuentes oficiales del condado y del municipio.",
          pt: "A cobertura de impostos sobre a propriedade resumirá os ciclos de avaliação, as mudanças de millage e como elas afetam o custo de ter uma casa em NEPA, indicando aos leitores as fontes oficiais do condado e do município.",
        },
      },
    ],
  },
  {
    slug: "rental-market-changes-sample",
    section: "nepa-news",
    category: "housing-news",
    accent: "#345680",
    author: "Real Estate in NEPA Editorial",
    publishedAt: "2026-07-18",
    city: "wilkes-barre-pa",
    county: "Luzerne County",
    tags: ["rental", "wilkes-barre", "housing"],
    isSample: true,
    sources: [{ label: "Sample content — for demonstration only" }],
    title: {
      en: "Rental Market Changes (Sample)",
      es: "Cambios en el Mercado de Renta (Muestra)",
      pt: "Mudanças no Mercado de Aluguel (Amostra)",
    },
    excerpt: {
      en: "A sample story showing how shifts in the NEPA rental market will be reported.",
      es: "Una historia de muestra que muestra cómo se reportarán los cambios en el mercado de renta de NEPA.",
      pt: "Uma matéria de amostra que mostra como as mudanças no mercado de aluguel de NEPA serão reportadas.",
    },
    body: [
      {
        type: "note",
        text: {
          en: "Sample story for demonstration only.",
          es: "Historia de muestra solo para demostración.",
          pt: "Matéria de amostra apenas para demonstração.",
        },
      },
      {
        type: "paragraph",
        text: {
          en: "Rental coverage will look at availability, typical rents and demand across NEPA communities, useful for both renters and investors researching the area.",
          es: "La cobertura de renta analizará la disponibilidad, las rentas típicas y la demanda en las comunidades de NEPA, útil tanto para inquilinos como para inversionistas que investigan la zona.",
          pt: "A cobertura de aluguel analisará a disponibilidade, os aluguéis típicos e a demanda nas comunidades de NEPA, útil tanto para inquilinos quanto para investidores que pesquisam a região.",
        },
      },
    ],
  },
];
