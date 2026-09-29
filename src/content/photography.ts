/**
 * Real photography, keyed by the art-direction brief carried by each
 * `<ImageSlot>`. A slot with an entry here renders a `next/image`; a slot
 * without one still renders the grey placeholder with its brief showing, so
 * what is still outstanding stays visible.
 *
 * Alt text describes what is actually in the frame and why it is there. It
 * deliberately does not repeat the brief, which is a shooting note ("wide",
 * "close crop") and tells a screen reader nothing.
 */
export type Photo = {
  src: string;
  /** Empty string marks a decorative image that adds nothing to the page. */
  alt: string;
  /**
   * CAD renders sit on a white ground and lose their subject when cropped, so
   * they are fitted rather than covered.
   */
  fit?: "cover" | "contain";
};

export const photos: Record<string, Photo> = {
  // Homepage hero
  "Factory floor, wide": {
    src: "/photography/line-overview.jpg",
    alt: "Production data on a handheld tablet, with robotic welding arms working an engine assembly on the line beyond.",
  },
  "Press shop / tooling": {
    src: "/photography/grinding-sparks.jpg",
    alt: "Sparks arc away from an angle grinder as a steel section is cut to size.",
  },
  "Inspection / metrology": {
    src: "/photography/car-chassis-rig.jpg",
    alt: "A sports car stripped to its carbon fibre tub, clamped on a test rig in a development bay.",
  },

  // Industry cards and specialism tiles
  "Audio components": {
    src: "/photography/audio-mixing-desk.jpg",
    alt: "A hand adjusting a fader on an audio mixing console.",
  },
  "Automotive assemblies": {
    src: "/photography/body-in-white-line.jpg",
    alt: "A car body in white on a robotic assembly line.",
  },
  "Marine engine parts": {
    src: "/photography/vessel-at-quay.jpg",
    alt: "An ice-class vessel moored alongside a quay at dusk.",
  },
  Audio: {
    src: "/photography/audio-mixing-desk.jpg",
    alt: "A hand adjusting a fader on an audio mixing console.",
  },
  Automotive: {
    src: "/photography/body-in-white-line.jpg",
    alt: "A car body in white on a robotic assembly line.",
  },
  Marine: {
    src: "/photography/vessel-at-quay.jpg",
    alt: "An ice-class vessel moored alongside a quay at dusk.",
  },

  // Audio
  "Speaker grille / driver, close crop": {
    src: "/photography/audio-mixing-desk.jpg",
    alt: "A hand adjusting a fader on an audio mixing console.",
  },
  "Assembly line, audio housings": {
    src: "/photography/speaker-test-rig.jpg",
    alt: "An engineer works at a laptop beside a test rig carrying a loudspeaker driver and its wiring loom.",
  },

  // Automotive
  "Automotive assembly line, wide": {
    src: "/photography/car-chassis-rig.jpg",
    alt: "A sports car stripped to its carbon fibre tub, clamped on a test rig in a development bay.",
  },
  "Machined automotive component, close crop": {
    src: "/photography/body-in-white-line.jpg",
    alt: "A car body in white on a robotic assembly line in a converted brick-built factory.",
  },
  "Battery pack / cooling assembly": {
    src: "/photography/ev-skateboard-chassis.jpg",
    alt: "An electric vehicle skateboard chassis on a development floor, an engineer reviewing it on a tablet.",
  },

  // Marine
  "Boat wake at sunset, wide": {
    src: "/photography/vessel-at-quay.jpg",
    alt: "An ice-class vessel moored alongside a quay at dusk.",
  },
  "Marine engine component, close crop": {
    src: "/photography/container-ship-aerial.jpg",
    alt: "A container ship under way at sea seen from directly above, a pilot boat alongside.",
  },

  // Other industries
  "Engineering team at CAD stations": {
    src: "/photography/cad-workstation.jpg",
    alt: "An engineer working in CAD on a machined bracket, with analysis results on a second screen.",
  },

  // Customer Service
  "Support desk / team at screens": {
    src: "/photography/client-meeting.jpg",
    alt: "A client talks through a project at a meeting table, colleagues and a wall of planning notes behind.",
  },
  "Desk, monitors, hands on keyboard": {
    src: "/photography/project-engineer-desk.jpg",
    alt: "A project engineer working at a desk with a monitor and laptop in an open plan office.",
  },
  "Engineers at a whiteboard": {
    src: "/photography/whiteboard-process.jpg",
    alt: "An engineer sketching a process diagram on a whiteboard.",
  },

  // Engineering Consulting
  "Engineer at CAD workstation": {
    src: "/photography/cad-motor-assembly.jpg",
    alt: "An engineer examining a 3D model of a motor assembly in CAD software.",
  },
  "CAD model on screen, close crop": {
    src: "/photography/cad-workstation.jpg",
    alt: "A machined bracket modelled in CAD, with analysis results on a second screen.",
  },
  "Engineers reviewing a 3D assembly": {
    src: "/photography/engineering-office.jpg",
    alt: "An engineering office, a designer modelling a machined part in CAD across two screens.",
  },

  // Fluid Technologies
  "Engine bay, hoses and pipes": {
    src: "/photography/engine-bay-hoses.jpg",
    alt: "A close view of an engine bay, showing coolant hoses, clips and the expansion tank cap.",
  },
  "EV chassis on the line": {
    src: "/photography/ev-skateboard-chassis.jpg",
    alt: "An electric vehicle skateboard chassis on a development floor, an engineer reviewing it on a tablet.",
  },

  // Manufacturing
  "Laser cutting sparks, wide": {
    src: "/photography/grinding-sparks.jpg",
    alt: "Sparks arc away from an angle grinder as a steel section is cut to size.",
  },
  "Welding / laser cutting, close crop": {
    src: "/photography/machining-hall.jpg",
    alt: "A machining hall seen from above, gantry cranes running over two rows of part-built assemblies.",
  },
  "Robotic assembly cell": {
    src: "/photography/body-in-white-line.jpg",
    alt: "A robotic arm working on a car body in white on the assembly line.",
  },

  // Project Management
  "Project review meeting, wide": {
    src: "/photography/project-workshop.jpg",
    alt: "A project team at a workshop, one member arranging planning notes on the wall.",
  },
  "Programme plan / Gantt on screen": {
    src: "/photography/programme-gantt.jpg",
    alt: "A project manager studying a programme plan, its Gantt bars spanning seven weeks.",
  },
  "Engineering review, screen and team": {
    src: "/photography/engineers-test-bench.jpg",
    alt: "Two engineers discuss a part beside a test rig fitted with a steering wheel and dashboard components.",
  },

  // Supply Chain Management
  "Warehouse aisle, wide": {
    src: "/photography/warehouse-stock-check.jpg",
    alt: "A supply chain manager checking stock on a tablet in a warehouse aisle.",
  },
  "Warehouse stock check with tablet": {
    src: "/photography/drawing-review.jpg",
    alt: "Two colleagues reviewing a large technical drawing spread across a table.",
  },
  "Port, freight and logistics montage": {
    src: "/photography/global-logistics.jpg",
    alt: "A composite of global logistics: freight aircraft, container ships, port cranes and delivery lorries.",
  },

  // Tooling
  "Tool room / press tooling, wide": {
    src: "/photography/machining-hall.jpg",
    alt: "A machining hall seen from above, gantry cranes running over two rows of part-built assemblies.",
  },
  "Tool design model, exploded view": {
    src: "/photography/tool-exploded-cad.jpg",
    alt: "An exploded CAD view of an injection mould tool, its plates, slides and ejectors colour coded.",
    fit: "contain",
  },
  "Tool design, CAD view": {
    src: "/photography/tool-assembled-cad.jpg",
    alt: "A CAD render of the assembled injection mould tool, showing its guide pillars and actuator.",
    fit: "contain",
  },
  "Finished tool in the factory": {
    src: "/photography/tool-finished.jpg",
    alt: "The finished steel mould tool on its stand in the factory, hydraulic core pulls fitted.",
  },
  "Tool packed for shipment": {
    src: "/photography/tool-crated.jpg",
    alt: "The completed tool shrink wrapped and crated for shipment.",
  },
  "Laser cutting sparks, close crop": {
    src: "/photography/grinding-sparks.jpg",
    alt: "Sparks arc away from an angle grinder as a steel section is cut to size.",
  },

  /*
   * Decorative backdrop behind the client references band. It is blurred and
   * held at low opacity over the ink ground, so it carries no information and
   * takes empty alt text.
   */
  "Client references backdrop": {
    src: "/photography/client-meeting.jpg",
    alt: "",
  },

  // Why Sanwei?
  "Sanwei team on site, wide": {
    src: "/photography/engineering-office.jpg",
    alt: "An engineering office, a designer modelling a machined part in CAD across two screens.",
  },

  // Process
  "Inspection bench / metrology, wide": {
    src: "/photography/drawing-review.jpg",
    alt: "Two colleagues reviewing a large technical drawing spread across a table.",
  },

  // Team portraits. The name alone is the useful alt text: the role sits in
  // the card text directly beneath it.
  "Tiny Lee": { src: "/photography/team-tiny-lee.jpg", alt: "Tiny Lee" },
  "Michael Ling": { src: "/photography/team-michael-ling.jpg", alt: "Michael Ling" },
  "Moulder Chen": { src: "/photography/team-moulder-chen.jpg", alt: "Moulder Chen" },
  "Sam Cheng": { src: "/photography/team-sam-cheng.jpg", alt: "Sam Cheng" },
  // Generic silhouettes standing in until real portraits arrive. They carry
  // no information, so they are marked decorative.
  "Andy Cobbold": { src: "/photography/team-portrait-pending.jpg", alt: "" },
  "Gareth Taylor": { src: "/photography/team-portrait-pending.jpg", alt: "" },
};

export function getPhoto(brief: string): Photo | undefined {
  return photos[brief];
}
