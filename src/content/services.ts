import { referenceByRole, type ClientReference } from "./site";

export type DetailBlock = {
  image: string;
  /** Serif heading. Rendered italic when `italic` is set. */
  heading?: string;
  italicHeading?: string;
  paragraphs?: string[];
  /** A second heading/paragraph pair inside the same panel. */
  secondary?: { heading: string; paragraphs: string[] };
  listIntro?: string;
  list?: string[];
  /** Renders on the `ink` ground rather than `steel`. */
  tone?: "steel" | "ink";
  ctaLabel?: string;
  ctaHref?: string;
  /** A closing line below the list, with an optional inline link. */
  footnote?: { before: string; linkLabel: string; href: string; after: string };
};

export type Service = {
  slug: string;
  name: string;
  heroSubline: string;
  heroSlide: string;
  /** Project Management alone carries a standfirst above the intro. */
  standfirst?: string;
  intro: {
    heading: string;
    paragraphs: string[];
    image: string;
  };
  /** Tooling shows three further shots beneath its intro. */
  introGallery?: string[];
  /** Project Management's numbered risk-factor band. */
  riskFactors?: { eyebrow: string; points: string[] };
  /** Project Management's "However..." section. */
  however?: { heading: string; paragraphs: string[] };
  /** Project Management's centred "The solution?" band. */
  solution?: {
    heading: string;
    paragraphs: string[];
    first: string;
    conjunction: string;
    second: string;
  };
  /** Quality Control's "Beyond products" section. */
  beyond?: {
    heading: string;
    intro: string;
    columns: {
      title: string;
      lead?: string;
      list?: string[];
      body?: { before: string; linkLabel: string; href: string; after: string };
    }[];
  };
  detail: DetailBlock;
  reference: ClientReference;
};

export const services: Service[] = [
  {
    slug: "customer-service",
    name: "Customer Service",
    heroSubline: "Exceptional service should have a tangible impact on your project's feasibility and profitability.",
    heroSlide: "Support desk / team at screens",
    intro: {
      heading: "We recognise that sourcing/manufacturing is only half of your battle to deliver projects optimally.",
      paragraphs: [
        "We believe that, done right, exceptional service should have a tangible impact on your project's feasibility and profitability.",
        "That's why our 30+ years of experience are so integral to the standard of customer service that Sanwei provides. The vast knowledge base we've accrued allows us to build valuable consultancy into all aspects of our customer interactions and communications.",
        "All of our customers have unlimited access to our resources and in-house skills. Our customer service team offers 24/7 support for technical issues, supply chain management, engineering advice and general project management.",
      ],
      image: "Desk, monitors, hands on keyboard",
    },
    detail: {
      image: "Engineers at a whiteboard",
      listIntro: "We're able to provide expert feedback on:",
      list: [
        "Material selection",
        "Part and tool design",
        "Manufacturing technologies, with the goal of:",
        "Isolating potential problem areas",
        "Optimising product design",
        "Reducing manufacturing costs",
        "Improving manufacturability",
      ],
    },
    reference: referenceByRole.purchasingManager,
  },
  {
    slug: "engineering-consulting",
    name: "Engineering Consulting",
    heroSubline: "Expert advice. Optimal project outcomes.",
    heroSlide: "Engineer at CAD workstation",
    intro: {
      heading: "Consultative approach",
      paragraphs: [
        "At Sanwei we take a truly consultative approach to your project. Ask us anything, from “Will doing X work?” to “What's the best way of achieving Y?”, and we'll be delighted to share the benefits of our considerable engineering experience.",
        "But we won't stop at answering specific questions that you put to us.",
        "As true engineering consultants we stay at the forefront of industry developments, keeping a sharp eye on trends and re-evaluating our processes to ensure they remain optimal. When working with us, you can be confident that we will proactively share our advice on feasibility, materials, tolerances, processes and much more.",
      ],
      image: "CAD model on screen, close crop",
    },
    detail: {
      image: "Engineers reviewing a 3D assembly",
      heading: "How do we do it?",
      paragraphs: [
        "It's not just about fulfilling your brief. It's about doing so whilst providing you with the best possible value service, helping you to save money and streamline projects wherever we can.",
      ],
      ctaLabel: "Get in touch",
      ctaHref: "/contact",
    },
    reference: referenceByRole.director,
  },
  {
    slug: "fluid-technologies",
    name: "Fluid Technologies",
    heroSubline: "High-performance fluid carrying systems for automotive, marine manufacturing and more.",
    heroSlide: "Engine bay, hoses and pipes",
    intro: {
      heading: "Fluid technologies are an integral part of ensuring your project performs optimally.",
      paragraphs: [
        "Whether it's by transferring fuel to the engines at the heart of your build, or simply moving liquids from one place to another.",
        "With our precision-engineered pipe and hose assemblies, you can rest assured that the required amount of fluid you need will end up precisely where you want it to go. And in the most efficient way possible.",
      ],
      image: "Hose and pipe assembly, close crop",
    },
    detail: {
      image: "EV chassis on the line",
      heading: "We've got thousands of litres (tonnes) of experience working with fluid technologies.",
      paragraphs: [
        "Which means that all our products are built not only to perform, but also to withstand the challenges associated with transporting liquids. Rest assured our engineers will recommend the right design and materials to fit your fluid application needs.",
      ],
      listIntro: "Our products in fluid technologies cover:",
      list: [
        "Water & Oil Hoses",
        "Fuel Pipes",
        "Breather Hoses",
        "Turbo Feed / Drain Pipes and Hoses",
        "PAS and HVAC",
        "Flexible and Hard Line combinations",
        "EV Cooling",
      ],
    },
    reference: referenceByRole.director,
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    heroSubline: "Generating quality and value at scale.",
    heroSlide: "Laser cutting sparks, wide",
    intro: {
      heading: "Our specialism lies in complex, technical, high-value products.",
      paragraphs: [
        "So that's what we make or assemble at our Taiwanese factory (a location that has become a byword for the highest quality manufacturing in Asia).",
        "But if our factory isn't best suited to your specific needs, we also have a trusted network of providers across the continent, developed over 30 years of mutual assurance. If you're looking for quality commodity-type parts at Asian costs, we can help with that, too. This combined approach gives us the flexibility to offer you the best solution every time.",
        "Too many manufacturers either provide low quality products or charge unreasonable prices, forcing clients to make an impossible tradeoff. At Sanwei, we guarantee that you'll always receive top manufacturing quality for a fair price.",
      ],
      image: "Welding / laser cutting, close crop",
    },
    detail: {
      image: "Robotic assembly cell",
      heading: "Our Factory",
      paragraphs: [
        "Our factory manufactures precision formed metal products and components, as well as offering added value assembly that saves you time and money. Our assembly services range from fitting simple clips, clamps or plugs to using bespoke tooling to assemble complex products. Following strict quality standards and using our extensive engineering expertise, we can deliver the missing piece of your manufacturing puzzle.",
      ],
      secondary: {
        heading: "Our Engineers",
        paragraphs: [
          "Our engineers are some of Asia's finest. The team has years of experience in all forms of Automotive, Marine, Audio, and EV design. Their expertise means they are perfectly placed to offer the very best solution for your programme.",
        ],
      },
    },
    reference: referenceByRole.globalSupplyManagementDirector,
  },
  {
    slug: "project-management",
    name: "Project Management",
    heroSubline:
      "Take your concept from specification to showroom with Sanwei's comprehensive project management services.",
    heroSlide: "Project review meeting, wide",
    standfirst:
      "We adopt a holistic, end-to-end approach, striving from the outset to provide you with the best available products, technologies, quality, pricing and delivery that Asia can offer.",
    intro: {
      heading: "Product manufacturing and sourcing in Asia can be daunting.",
      paragraphs: [
        "Particularly for the uninitiated. The vastness of the continent, potential language barrier and varying quality standards of factories can lead to a number of serious risk factors.",
        "All of which can severely affect the likelihood of delivering your desired results on time or on budget.",
      ],
      image: "Programme plan / Gantt on screen",
    },
    riskFactors: {
      eyebrow: "The risk factors",
      points: [
        "Overpaying for products",
        "Receiving poor quality components",
        "Misinterpretation of your brief",
        "Expensive supply chain delays and inefficiencies",
        "Slow, sub-optimal shipping processes",
      ],
    },
    however: {
      heading:
        "However, Asia also offers probably the greatest potential on Earth for manufacturing and assembling the exact parts that you need.",
      paragraphs: [
        "To the highest possible standard, and/or sourcing them in the most cost effective way.",
        "But unless you know where to find them, you're playing roulette with your project.",
      ],
    },
    solution: {
      heading: "The solution?",
      paragraphs: [
        "Rather than contacting factories directly, take the stress out of your project by outsourcing the handling of it to us.",
        "We'll work with your design house, procurement team or engineering department to quickly and reliably establish:",
      ],
      first: "Whether the requirements of a particular project can be fulfilled",
      conjunction: "and",
      second: "The most effective strategy for doing so",
    },
    detail: {
      image: "Engineering review, screen and team",
      heading: "Experience you can rely on, guidance you can trust",
      paragraphs: [
        "At Sanwei, we don't believe that part sourcing should be a barrier to innovation. Our aim is to empower your engineering team by providing components that will enhance the overall outcome of your project.",
      ],
      listIntro: "We offer:",
      list: [
        "An unparalleled network of contacts across Asia",
        "Decades of experience working with global clients across a range of industries",
        "Exceptional technical knowledge and understanding",
        "A longstanding reputation for reliability",
        "Stringent quality control standards",
      ],
    },
    reference: referenceByRole.supplyChainDirector,
  },
  {
    slug: "prototyping",
    name: "Prototyping",
    heroSubline: "Taking your project from concept to reality.",
    heroSlide: "Machining a prototype part",
    intro: {
      heading:
        "The moment that your idea becomes a physical reality through prototype development is the moment your project is truly born.",
      paragraphs: [
        "There's a chance it'll arrive kicking, screaming and not fully functional, but we're here to guide you through the rough early stages and iterations until your prototype is refined into a smooth-functioning masterpiece.",
        "Getting things right at the prototyping stage is absolutely critical for overall project success. Issues that are a relatively cheap and easy fix before production begins in earnest can become the budget-draining stuff of manufacturing nightmares if they aren't spotted at this stage.",
      ],
      image: "Prototype part, fully machined from solid",
    },
    detail: {
      image: "CNC milling, close crop",
      heading: "Over the years, it's fair to say that we've seen a prototype or two.",
      paragraphs: [
        "And as independent consultants, we're perfectly placed to identify areas where your prototype could perform better that may have been overlooked during the design process, saving you time, money and ensuring that your product is fit for purpose.",
      ],
    },
    reference: referenceByRole.director,
  },
  {
    slug: "quality-control",
    name: "Quality Control",
    heroSubline: "Our quality control checks are second to none.",
    heroSlide: "CMM probe inspecting a casting",
    intro: {
      heading:
        "After over 30 years in business, we know what it's like for customers to be on the receiving end of sub-par products, and see projects scuppered as a result.",
      paragraphs: [
        "That's why we're determined **never** to let that happen to a Sanwei client.",
        "Our quality control checks are second to none. In fact, we're often trusted by long standing customers to audit, monitor and manage their proprietary supply bases in Asia, such is the level of confidence in our systems, work ethic and integrity.",
        "Our entire supplier network is thoroughly vetted by Sanwei, and is ISO 9000 and ISO 14000 quality assurance certified as a minimum. For machinery and items where product certification applies, our suppliers must apply industry standard quality control checks and retain all appropriate technical files.",
      ],
      image: "Robotic inspection arm on a part",
    },
    beyond: {
      heading: "Beyond products",
      intro:
        "At Sanwei, we recognise that quality control extends beyond the products themselves. We also care deeply about:",
      columns: [
        {
          title: "Environmental considerations",
          lead: "We insist that our suppliers:",
          list: [
            "Comply with all applicable environmental laws and regulations",
            "Recognise that environmental responsibility is integral to producing high quality products",
            "Minimise adverse effects on the environment and natural resources",
            "Commit to a culture of continuous improvement, to conserve resources, prevent pollution, and minimise adverse impacts to people and communities",
          ],
        },
        {
          title: "Ethical considerations",
          body: {
            before:
              "Sanwei is committed to conducting business in accordance with the highest ethical standards and in compliance with all applicable laws. More information can be found in our ",
            linkLabel: "code of conduct",
            href: "/contact",
            after: ".",
          },
        },
      ],
    },
    detail: {
      image: "Laser measurement on an engine block",
      heading: "We ensure that our dedicated quality control team performs rigorous checks on all orders, including:",
      list: [
        "Incoming material inspection",
        "Quality checks on all processes",
        "First article approval",
        "Small batch production to check quality consistency",
        "Pre-shipment inspection",
        "After sale warranty",
        "Quality auditing to IATF16949 (where applicable)",
        "Using APQP, FMEA, SPC and Poka-Yoke process",
      ],
      footnote: {
        before: "For a full breakdown of our quality control checks and procedures, please see our ",
        linkLabel: "terms and conditions",
        href: "/contact",
        after: ".",
      },
    },
    reference: referenceByRole.director,
  },
  {
    slug: "supply-chain-management",
    name: "Supply Chain Management",
    heroSubline: "Synchronising supply with demand.",
    heroSlide: "Warehouse aisle, wide",
    intro: {
      heading: "We recognise that sourcing/manufacturing is only half of your battle to deliver projects optimally.",
      paragraphs: [
        "Even a perfectly engineered product is of little use if it arrives later than scheduled, falls foul of regulations, or is shipped at a premium that impacts profitability.",
        "As an Asia-based organisation with three decades of experience working closely with world class customers, we have developed a competitive supply chain infrastructure by incorporating worldwide logistics, synchronizing supply with demand and measuring performance.",
        "We use SAP business management system to control purchase orders, invoices, works orders, quality control and much more. This allows us to ensure that your products are shipped on time at the best possible cost, whilst adhering to all the relevant regulations and requirements.",
      ],
      image: "Warehouse stock check with tablet",
    },
    detail: {
      image: "Port, freight and logistics montage",
      heading: "We can add value to your supply chain by:",
      list: [
        "Conducting assembly work that reduces labour requirements upon receipt",
        "Shipping to an intermediate country of your choice",
      ],
    },
    reference: referenceByRole.supplyChainManagingDirector,
  },
  {
    slug: "tooling",
    name: "Tooling",
    heroSubline: "Building the best parts to build your parts.",
    heroSlide: "Tool room / press tooling, wide",
    intro: {
      heading: "The quality and performance of parts and components is totally dependent on the tools that produce them.",
      paragraphs: [
        "This is what makes tooling such a vital step in the manufacturing process, overall project success is dependent on it.",
        "Not just for quality, either. Overall efficiency and manufacturing costs are also significantly influenced by tooling. Simply put, if you want your project to be a success, you need to get tooling right.",
        "We can help you do just that. Our decades of engineering and manufacturing experience mean we've encountered just about every kind of tool you can imagine, so we don't just know what works. We know what will work best for you.",
      ],
      image: "Tool design model, exploded view",
    },
    introGallery: ["Tool design, CAD view", "Finished tool in the factory", "Tool packed for shipment"],
    detail: {
      image: "Laser cutting sparks, close crop",
      heading:
        "Irrespective of the complexity, we will supply tools that match your demand and exceed your quality and delivery expectations.",
      listIntro: "We can recommend and provide tooling for a wide range of functions including:",
      list: [
        "An unparalleled network of contacts across Asia",
        "Decades of experience working with global clients across a range of industries",
        "Exceptional technical knowledge and understanding",
        "A longstanding reputation for reliability",
        "Stringent quality control standards",
      ],
    },
    reference: referenceByRole.director,
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
