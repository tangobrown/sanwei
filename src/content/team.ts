export type TeamMember = {
  name: string;
  role: string;
  bio: string[];
  education: string;
  /** Art-direction brief for the portrait. */
  brief: string;
};

/** Order is fixed: Andy Cobbold first, Gareth Taylor second, then the rest. */
export const team: TeamMember[] = [
  {
    name: "Andy Cobbold",
    role: "Sales Manager",
    bio: [
      "Andy has been working in the automotive industry for 40+ years and is a qualified motor engineer.",
      "As Sales Manager for Sanwei, Andy is responsible for all commercial and technical enquiries, managing an internal team of sales and project engineers to deliver customer cost expectations and projects on time and within budget.",
      "Andy is able to draw on 35 years of successful automotive / defence / manufacturing OEM & consumer sales experience, both technical and managerial.",
    ],
    education: "Education: City & Guilds – Light Vehicle Engineering (Distinction)",
    brief: "Andy Cobbold",
  },
  {
    name: "Gareth Taylor",
    role: "Operations Manager",
    bio: [
      "Gareth is a fully qualified manufacturing systems engineer with over 25 years of experience working in the automotive and consumer industry. He specialises in supply chain, manufacturing and product management.",
      "As Operations Manager for Sanwei, Gareth leads a cross-functional team, managing the supply chain and new product introduction process between Europe and Asia. His track record for transforming customers’ ideas into a high-quality manufactured reality, on time and within budget is second to none.",
      "Gareth has an in-depth knowledge of business in Europe and in Asia, having spent just under 10 years living and working in Taiwan. He also has an exceptional appreciation for the complex nature of the industry, great communication skills, a working knowledge of different engineering disciplines and how they relate to one another, and an aptitude for managing risk.",
    ],
    education: "Education: BEng Hons",
    brief: "Gareth Taylor",
  },
  {
    name: "Tiny Lee",
    role: "Quality Assurance Specialist",
    bio: [
      "Tiny has more than 10 years working experience in the Automotive Industry. Her expertise includes IATF 16949 Quality Requirements, GD&T, 8D, VDA 6.3 Auditing and an unsurpassed eye for detail.",
    ],
    education: "Education: Master of Engineering Management, UTS Australia",
    brief: "Tiny Lee",
  },
  {
    name: "Michael Ling",
    role: "Technical Support",
    bio: [
      "Michael has 20 years of experience in consumer electronics and automotive industries. His specialisms include energy storage materials, industrial manufacturing process and design, and project management.",
    ],
    education: "Education: ME (Hons), PMP, PhD",
    brief: "Michael Ling",
  },
  {
    name: "Moulder Chen",
    role: "Mechanical Engineer",
    bio: [
      "Moulder is a Mechanical Engineer with more than 12 years of development experience in the field of mechanical structure and automotive parts. His expertise includes a deep understanding of manufacturing methods & processes. Moulder seeks the most suitable solutions for every project based on customer needs and product characteristics.",
    ],
    education: "Education: Bachelor of Mechanical Engineering and Associate of Industrial Engineering and Management",
    brief: "Moulder Chen",
  },
  {
    name: "Sam Cheng",
    role: "Supply Chain Manager",
    bio: [
      "Sam has 14 years combined experience in the International Trade, Logistics and Supply Chain fields.",
    ],
    education: "Education: B.S.Bus (Bachelor of Science in Business)",
    brief: "Sam Cheng",
  },
];
