export type ProcessStep = {
  title: string;
  body: string;
};

export const processSteps: ProcessStep[] = [
  {
    title: "Non-disclosure agreement",
    body: "Before getting started, we'll sign an NDA to ensure your part, design and IP are well protected during and after the evaluation.",
  },
  {
    title: "Scope review",
    body: "We evaluate your enquiry, asking key questions that will help to ensure we meet your specific requirements.",
  },
  {
    title: "Engineering assessment",
    body: "We conduct a feasibility study in relation to your query, and offer consultancy on various potential approaches to establish what suits your particular needs.",
  },
  {
    title: "Supply chain assessment",
    body: "We will evaluate multiple possibilities for you in terms of quantity, delivery and location, and advise you on the pros and cons of each.",
  },
  {
    title: "Enquiry feedback & quotation",
    body: "We'll provide a detailed project proposal based on our assessments, including recommendations and a quote.",
  },
  {
    title: "Order & lead-time confirmation",
    body: "Once you've given us the green light, we'll confirm the order, provide lead time and update you on progress regularly.",
  },
  {
    title: "Manufacturing & quality management",
    body: "We will conduct inspections both in-process and before the shipment to ensure the product you receive is up to standard and will meet your needs.",
  },
  {
    title: "Part shipment & delivery",
    body: "We will ensure the delivery of your product is well-managed and take all possible steps to help it arrive on time.",
  },
];
