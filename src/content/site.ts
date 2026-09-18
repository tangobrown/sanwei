/**
 * Site-wide content: navigation, offices, footer and the shared client
 * references. Copy is taken verbatim from the design prototypes.
 */

export type NavLink = {
  label: string;
  href: string;
};

export const industryLinks: NavLink[] = [
  { label: "Audio", href: "/industries/audio" },
  { label: "Automotive", href: "/industries/automotive" },
  { label: "Marine", href: "/industries/marine" },
  { label: "Other Industries", href: "/industries/other-industries" },
];

export const serviceLinks: NavLink[] = [
  { label: "Customer Service", href: "/services/customer-service" },
  { label: "Engineering Consulting", href: "/services/engineering-consulting" },
  { label: "Fluid Technologies", href: "/services/fluid-technologies" },
  { label: "Manufacturing", href: "/services/manufacturing" },
  { label: "Project Management", href: "/services/project-management" },
  { label: "Prototyping", href: "/services/prototyping" },
  { label: "Quality Control", href: "/services/quality-control" },
  { label: "Supply Chain Management", href: "/services/supply-chain-management" },
  { label: "Tooling", href: "/services/tooling" },
];

/** The services list as it is ordered on the homepage and service pages. */
export const serviceListOrder: NavLink[] = [
  { label: "Project Management", href: "/services/project-management" },
  { label: "Manufacturing", href: "/services/manufacturing" },
  { label: "Customer Service", href: "/services/customer-service" },
  { label: "Quality Control", href: "/services/quality-control" },
  { label: "Supply Chain Management", href: "/services/supply-chain-management" },
  { label: "Fluid Technologies", href: "/services/fluid-technologies" },
  { label: "Engineering Consulting", href: "/services/engineering-consulting" },
  { label: "Tooling Services", href: "/services/tooling" },
  { label: "Prototyping", href: "/services/prototyping" },
];

export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Industries", href: "/industries/audio", children: industryLinks },
  { label: "Services", href: "/services/project-management", children: serviceLinks },
  { label: "Gallery", href: "/gallery" },
  { label: "Why Sanwei?", href: "/why-sanwei" },
  { label: "Process", href: "/process" },
] as const;

export const offices = {
  asia: {
    name: "Asia Office",
    shortName: "Taipei, Taiwan",
    addressLines: ["24F, No. 161 Song De Road", "Xinyi District 110032", "Taipei, Taiwan"],
    phone: "+886-2-23466368",
    phoneHref: "tel:+886223466368",
    email: "support@sanwei-asia.com",
    /** Marker at 25.0325, 121.5718. */
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=121.556%2C25.023%2C121.588%2C25.042&layer=mapnik&marker=25.0325%2C121.5718",
    mapLink: "https://www.openstreetmap.org/?mlat=25.0325&mlon=121.5718#map=16/25.0325/121.5718",
  },
  uk: {
    name: "UK Office",
    shortName: "Axminster, UK",
    addressLines: ["Axminster, East Devon", "United Kingdom"],
    phone: "+44-1297-631-306",
    phoneHref: "tel:+441297631306",
    email: "uk_office@sanwei-asia.com",
    /** Marker at 50.7826, -2.9962. */
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=-3.020%2C50.770%2C-2.960%2C50.800&layer=mapnik&marker=50.7826%2C-2.9962",
    mapLink: "https://www.openstreetmap.org/?mlat=50.7826&mlon=-2.9962#map=15/50.7826/-2.9962",
  },
} as const;

export const salesEmail = "sales@sanwei-asia.com";

/** Destinations are TBC by the client; they resolve to the contact page for now. */
export const footerDocuments: NavLink[] = [
  { label: "Terms & Conditions", href: "/contact" },
  { label: "Code of Conduct", href: "/contact" },
  { label: "一般採購條款與條件", href: "/contact" },
  { label: "供應商行為規範", href: "/contact" },
];

export const groupBlurb = {
  text: "HonJeh is a manufacturing plant specialising in metal stampings, metal grilles and assemblies.",
  linkLabel: "honjeh.com",
  linkHref: "https://honjeh.com",
};

export type ClientReference = {
  quote: string;
  role: string;
};

export const clientReferences: ClientReference[] = [
  {
    quote:
      "Sanwei's professional & inclusive approach makes you feel like you have your very own Purchasing office in Asia.",
    role: "Supply Chain Director",
  },
  {
    quote:
      "I have worked with Sanwei for over 10 years. Their total management of the supply chain is handled in a very professional and efficient way, enabling minimal oversight from awarding the business to receiving parts.",
    role: "Purchasing Manager",
  },
  {
    quote:
      "Having been dealing with Sanwei for over 6 years now I can honestly state that their performance levels and continued support are second to none. Great team all round!",
    role: "Supplier Quality Assurance",
  },
  {
    quote:
      "I have had nothing but good experiences with Sanwei since the beginning of my company's working relationship with them, approx. 22 years ago. Any question or new design idea I have has always been dealt with professionally and in good time.",
    role: "Managing Director",
  },
];

export const referenceByRole = {
  supplyChainDirector: clientReferences[0],
  purchasingManager: clientReferences[1],
  supplierQualityAssurance: clientReferences[2],
  managingDirector: {
    quote:
      "The level of service provided is second to none. The team are great to work with and have extensive knowledge & experience across many manufacturing sectors & disciplines. Service is fast and professional with great communication & support when needed, a superb supplier, highly recommended.",
    role: "Managing Director",
  },
  director: {
    quote:
      "The level of service provided is second to none. The team are great to work with and have extensive knowledge & experience across many manufacturing sectors & disciplines. Service is fast and professional with great communication & support when needed, a superb supplier, highly recommended.",
    role: "Director",
  },
  globalSupplyManagementDirector: {
    quote:
      "A very professional business with the ability to support development and design of components, right through to mass production volumes. With a high level of knowledge within their team of multiple types of manufacturing processes.",
    role: "Global Supply Management Director",
  },
  supplyChainManagingDirector: {
    quote:
      "I have had nothing but good experiences with Sanwei since the beginning of my company's working relationship with them, approx. 22 years ago. Any question or new design idea I have has always been dealt with professionally and in good time. They are always prepared to bend over backwards to make things clear, and their technical documentation is always to a high standard.",
    role: "Managing Director",
  },
} satisfies Record<string, ClientReference>;

/** The closing call to action, shared by nearly every page. */
export const defaultCta = {
  heading: "Find quality components fast.",
  body: "Get in touch with our team now for stress-free sourcing advice or a no-obligation quote.",
};

/** The three linked industry cards plus the five named sectors. */
export const industrySpecialisms = {
  heading: "Industry specialisms",
  subline: "Select an industry to find out more about how Sanwei can help you.",
  cards: [
    { label: "Audio", href: "/industries/audio", slot: "Audio" },
    { label: "Automotive", href: "/industries/automotive", slot: "Automotive" },
    { label: "Marine", href: "/industries/marine", slot: "Marine" },
  ],
  tiles: [
    { label: "Energy", href: "/industries/other-industries" },
    { label: "Aerospace", href: "/industries/other-industries" },
    { label: "Hardware", href: "/industries/other-industries" },
    { label: "Military", href: "/industries/other-industries" },
    { label: "And more…", href: "/industries/other-industries" },
  ],
};

/** The two tall promo cards that sit on every service page. */
export const promoCards = [
  {
    title: "Industry leading expertise developed over decades",
    body: "Our professional consultancy, grounded in years of experience, means cost-effective manufacturing for your project. Guaranteed.",
    linkLabel: "More about us",
    href: "/why-sanwei",
  },
  {
    title: "An established system with quality at its core",
    body: "Find out more about the steps we take to ensure your project is a success.",
    linkLabel: "Our process",
    href: "/process",
  },
];
