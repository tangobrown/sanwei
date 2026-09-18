export type IndustryStep = {
  label: string;
  title: string;
  body: string;
};

export type Industry = {
  slug: string;
  /** The H1 and the nav label. */
  name: string;
  /** Short label used on the homepage card. */
  cardTitle: string;
  cardBody: string;
  cardImage: string;
  heroSubline: string;
  heroSlides: string[];
  intro: {
    heading: string;
    statement: string;
    paragraphs: string[];
  };
  /** Present on Audio, Automotive and Marine; Other Industries has no such band. */
  whyChooseUs?: {
    heading: string;
    points: string[];
    linkLabel: string;
  };
  /** Only Automotive carries the electrification band. */
  featureBand?: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    ctaLabel: string;
    image: string;
  };
  showcase?: {
    heading: string;
    linkLabel: string;
    images: string[];
  };
  process?: {
    heading: string;
    subline: string;
    steps: IndustryStep[];
  };
  reference: { quote: string; role: string };
  ctaHeading: string;
  /** Other Industries swaps the process band for the specialisms block. */
  showSpecialisms?: boolean;
};

const sharedSteps = (secondLabel: string, thirdLabel: string): IndustryStep[] => [
  {
    label: "Step 1",
    title: "Consultation",
    body: "Get in touch now via email or telephone to discuss your concept. Feel free to enquire about specific products or focus on your project's expected outcomes and end goals.",
  },
  {
    label: "Step 2",
    title: secondLabel,
    body: "Once you've shared a product number or specification with us, we'll conduct a feasibility study and provide strategic recommendations on the most effective way to achieve your project goals. This will involve identifying numerous factors that are unique to **your** project and balancing them perfectly: product and shipping costs, project lead time, location of supplier and recipient, for instance.",
  },
  {
    label: "Step 3",
    title: thirdLabel,
    body: "We'll be on hand for the duration of your project to help ensure that your concept comes to fruition in the most cost-effective way possible, without ever compromising on quality. Seeing our clients' projects come to life and become much more than the sum of their parts gives us massive job satisfaction. We're just as invested in the outcomes as you are.",
  },
];

export const industries: Industry[] = [
  {
    slug: "audio",
    name: "Audio",
    cardTitle: "Audio",
    cardBody: "Components and complex final products for consumer electronic & related industries.",
    cardImage: "Audio components",
    heroSubline: "Amplify your success with clear consultancy and superior audio components.",
    heroSlides: ["Speaker grille / driver, close crop", "Assembly line, audio housings"],
    intro: {
      heading: "Trusted by leading audio manufacturers for decades.",
      statement:
        "Audio and consumer electronics manufacturing require a fine balance between complex precision engineering, quality components and cost-effective processes.",
      paragraphs: [
        "Sanwei's roots as an organisation lie in audio project management, sourcing and manufacturing. With over 30 years of industry experience, we're well versed in delivering a quality of product and service that's in tune with the highest expectations.",
        "We provide industry-leading consultancy across all stages of the audio product development process, from design to manufacture, testing and product launch.",
      ],
    },
    whyChooseUs: {
      heading: "Why choose us to fulfil your audio requirements?",
      points: [
        "Over three decades of industry expertise",
        "Trusted by audio industry leaders",
        "Strategic consultancy with feasibility and profitability at its core",
        "Unwavering focus on quality and value across sourcing *and* manufacturing",
        "Equivalent materials recommendations based on national requirements and specifications",
      ],
      linkLabel: "Talk to our audio team",
    },
    showcase: {
      heading: "Recent product showcase",
      linkLabel: "See more in the audio gallery",
      images: ["Audio part 01", "Audio part 02", "Audio part 03"],
    },
    process: {
      heading: "What is the audio process?",
      subline: "Three steps from first conversation to parts on your dock.",
      steps: sharedSteps("Strategy", "Project"),
    },
    reference: {
      quote:
        "Sanwei's professional & inclusive approach makes you feel like you have your very own Purchasing office in Asia.",
      role: "Supply Chain Director",
    },
    ctaHeading: "Find quality audio components fast.",
  },
  {
    slug: "automotive",
    name: "Automotive",
    cardTitle: "Automotive",
    cardBody: "Precision automotive components and assemblies of the highest quality.",
    cardImage: "Automotive assemblies",
    heroSubline: "Future-proof your automotive manufacturing with support from Sanwei at every stage.",
    heroSlides: ["Automotive assembly line, wide", "Machined automotive component, close crop"],
    intro: {
      heading: "Parts, processes and consultancy to accelerate your project.",
      statement:
        "Automotive product development poses one of the biggest manufacturing challenges in the world, due to both the complexity and sheer number of parts that are often required.",
      paragraphs: [
        "And as the automotive industry moves towards increased electrification and digitalisation of vehicles, the number and intricacy of moving parts involved will only increase.",
        "Our vast experience supporting premium automotive brands on a global scale represents our core offering, and makes Sanwei the smart choice for your automotive product development partner. We provide industry-leading consultancy across every stage of the automotive product development process, from design to manufacture, testing and product launch.",
      ],
    },
    featureBand: {
      eyebrow: "Looking ahead",
      heading: "Battery and cooling technology",
      paragraphs: [
        "Sanwei is also your perfect sourcing partner for the future of automotive manufacturing. Think battery and cooling technology for EV's, electric drive motor tech and much more.",
      ],
      ctaLabel: "Discuss an EV programme",
      image: "Battery pack / cooling assembly",
    },
    whyChooseUs: {
      heading: "Why choose us for your automotive requirements?",
      points: [
        "Unparalleled knowledge of automotive industry trends",
        "Industry-leading strategic consultancy with feasibility and profitability at its core",
        "Unwavering focus on quality and value across sourcing *and* manufacturing",
        "In-depth knowledge of automotive requirements including APQP and PPAP",
        "Equivalent materials recommendations based on national requirements and specifications",
        "IATF16949",
      ],
      linkLabel: "Talk to our automotive team",
    },
    showcase: {
      heading: "Recent product showcase",
      linkLabel: "See more in the automotive gallery",
      images: ["Automotive part 01", "Automotive part 02", "Automotive part 03"],
    },
    process: {
      heading: "What is the automotive process?",
      subline: "Three steps from first conversation to parts on your dock.",
      steps: sharedSteps("Next Step", "Final Step"),
    },
    reference: {
      quote:
        "I have worked with Sanwei for over 10 years. Their total management of the supply chain is handled in a very professional and efficient way, enabling minimal oversight from awarding the business to receiving parts.",
      role: "Purchasing Manager",
    },
    ctaHeading: "Find quality automotive components fast.",
  },
  {
    slug: "marine",
    name: "Marine",
    cardTitle: "Marine",
    cardBody: "Engine components, assemblies & boat parts made to challenging specifications.",
    cardImage: "Marine engine parts",
    heroSubline: "Millions of products and stellar services to propel your marine manufacturing project forward.",
    heroSlides: ["Boat wake at sunset, wide", "Marine engine component, close crop"],
    intro: {
      heading: "Navigate your build with the most effective sourcing consultancy on land or sea.",
      statement:
        "Our knowledge of the marine sector and its specific challenges (e.g. corrosion resistance) runs as deep as the Mariana trench.",
      paragraphs: [
        "We've sourced parts for leading marine industry manufacturers that range from engine components and complex electrical / mechanical assemblies to stunning cosmetic enhancements.",
        "A natural progression from Sanwei's roots in automotive and audio project management, sourcing and manufacturing, our knowledge of the marine sector and its specific challenges (e.g. corrosion resistance) runs as deep as the Mariana trench. We provide industry-leading consultancy across all stages of the marine product development process, from design to manufacture, testing and product launch.",
      ],
    },
    whyChooseUs: {
      heading: "Why choose us to fulfil your marine requirements?",
      points: [
        "Access to a huge range of existing products",
        "Bespoke manufacturing of custom parts to fit your project",
        "Unwavering focus on quality and value across sourcing *and* manufacturing",
        "Trusted by marine industry leaders",
        "Strategic consultancy with feasibility and profitability at its core",
        "Equivalent materials recommendations based on national requirements and specifications",
        "IATF16949",
      ],
      linkLabel: "Talk to our marine team",
    },
    showcase: {
      heading: "Recent product showcase",
      linkLabel: "See more in the marine gallery",
      images: ["Marine part 01", "Marine part 02", "Marine part 03"],
    },
    process: {
      heading: "What is the marine process?",
      subline: "Three steps from first conversation to parts on your dock.",
      steps: sharedSteps("Strategy", "Project"),
    },
    reference: {
      quote:
        "Having been dealing with Sanwei for over 6 years now I can honestly state that their performance levels and continued support are second to none. Great team all round!",
      role: "Supplier Quality Assurance",
    },
    ctaHeading: "Find quality marine components fast.",
  },
  {
    slug: "other-industries",
    name: "Other industries",
    cardTitle: "Other industries",
    cardBody: "Need complex, high-quality parts for your manufacturing project? We can help.",
    cardImage: "Mixed parts, bench shot",
    heroSubline: "Need complex, high-quality parts for your manufacturing project? We can help.",
    heroSlides: ["Engineering team at CAD stations", "Mixed parts, bench shot"],
    intro: {
      heading: "Set your manufacturing project apart with parts from Sanwei.",
      statement:
        "Whatever your industry, our 30+ years of part sourcing, manufacturing and project management experience can help you deliver on time, on budget and to the very highest standard.",
      paragraphs: [
        "Sanwei's roots lie in the automotive and audio industries, but over the years we've helped clients operating in sectors such as aerospace, energy, hardware, the military and many more.",
        "We provide industry-leading consultancy across all stages of the product development process, from design to manufacture, testing and product launch.",
      ],
    },
    showSpecialisms: true,
    reference: {
      quote:
        "The level of service provided is second to none. The team are great to work with and have extensive knowledge & experience across many manufacturing sectors & disciplines. Service is fast and professional with great communication & support when needed, a superb supplier, highly recommended.",
      role: "Managing Director",
    },
    ctaHeading: "Find quality components fast.",
  },
];

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}

/** The three industries shown as cards on the homepage. */
export const homepageIndustries = industries.filter((industry) => industry.slug !== "other-industries");
