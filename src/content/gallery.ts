export type GalleryItem = {
  name: string;
  industry: GalleryIndustry;
  /** Art-direction brief for the part photograph. */
  brief: string;
};

export const galleryIndustries = ["Audio", "Automotive", "Marine", "Other industries"] as const;
export type GalleryIndustry = (typeof galleryIndustries)[number];

export const galleryFilters = ["All parts", ...galleryIndustries] as const;

const definitions: [GalleryIndustry, string[]][] = [
  [
    "Audio",
    [
      "Speaker grille",
      "Driver basket",
      "Amplifier chassis",
      "Heat sink",
      "Volume knob set",
      "Terminal plate",
      "Voice coil former",
      "Enclosure bracket",
      "Trim ring",
      "Cable clamp",
    ],
  ],
  [
    "Automotive",
    [
      "Cam phaser assembly",
      "Engine mount bracket",
      "Turbo elbow casting",
      "Air-flow sensor housing",
      "Intake manifold",
      "Pedal bracket",
      "Battery cooling plate",
      "Wiring clip set",
      "Seat rail stamping",
      "Gearbox cover",
      "Sensor bracket",
      "EV busbar",
    ],
  ],
  [
    "Marine",
    [
      "Impeller housing",
      "Propeller shaft collar",
      "Exhaust riser",
      "Deck fitting",
      "Corrosion-resistant bracket",
      "Cooling manifold",
      "Engine cover trim",
      "Hatch hinge",
      "Fuel filter body",
      "Cleat casting",
    ],
  ],
  [
    "Other industries",
    [
      "Aerospace bracket",
      "Energy enclosure",
      "Hardware hinge",
      "Military connector shell",
      "Instrument bezel",
      "Pump body",
      "Valve block",
      "Sensor mount",
    ],
  ],
];

export const galleryItems: GalleryItem[] = definitions.flatMap(([industry, names]) =>
  names.map((name) => ({ name, industry, brief: name })),
);

export const GALLERY_PER_PAGE = 20;
