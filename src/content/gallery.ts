/**
 * The parts gallery.
 *
 * The categories, the photographs and their grouping all come from the
 * supplied Gallery folder. Several parts were filed under more than one
 * category there, so an item carries a list rather than a single industry and
 * appears once in the grid whichever filter is showing.
 *
 * `name` doubles as the alt text, so it describes the part as the photograph
 * shows it rather than naming a product code.
 */

export const galleryCategories = ["Audio", "Automotive", "Fluid Tech", "Marine"] as const;
export type GalleryCategory = (typeof galleryCategories)[number];

export const galleryFilters = ["All parts", ...galleryCategories] as const;

export type GalleryItem = {
  /** File under `public/gallery`. */
  file: string;
  name: string;
  categories: GalleryCategory[];
};

export const galleryItems: GalleryItem[] = [
  // Audio
  { file: "sw-21.jpg", name: "Oval perforated speaker grille", categories: ["Audio"] },
  {
    file: "sw-48.jpg",
    name: "Speaker grilles, domes and dust caps",
    categories: ["Audio", "Automotive", "Marine"],
  },
  { file: "sw-52.jpg", name: "Drive units, grilles and mounting rings", categories: ["Audio"] },
  { file: "sw-53.jpg", name: "Brushed trim plates, bezel ring and badges", categories: ["Audio"] },
  { file: "sw-56.jpg", name: "Wiring looms with moulded connectors", categories: ["Audio"] },
  { file: "sw-57.jpg", name: "Compact drive units and tweeter assemblies", categories: ["Audio"] },
  { file: "sw-74.jpg", name: "Moulded trim rail with fixings", categories: ["Audio"] },
  { file: "sw-75.jpg", name: "Zinc-plated housing with bearing seat", categories: ["Audio"] },
  { file: "sw-76.jpg", name: "Machined cone spike and locking collar", categories: ["Audio"] },
  { file: "sw-77.jpg", name: "Moulded cone flares", categories: ["Audio"] },
  { file: "sw-22.jpg", name: "Moulded teardrop speaker pod with mesh grille", categories: ["Audio"] },
  { file: "sw-59.jpg", name: "Braided speaker loom with inline connectors", categories: ["Audio"] },
  { file: "sw-65.jpg", name: "Moulded driver frame ring", categories: ["Audio"] },
  { file: "sw-67.jpg", name: "Dome tweeter with honeycomb mesh and lead", categories: ["Audio"] },
  { file: "sw-68.jpg", name: "Tweeter housing with moulded faceplate", categories: ["Audio"] },
  { file: "sw-69.jpg", name: "Round honeycomb mesh grille", categories: ["Audio"] },
  { file: "sw-70.jpg", name: "Compact driver with plated magnet shield", categories: ["Audio"] },
  { file: "sw-71.jpg", name: "Mid-range driver with woven cone", categories: ["Audio"] },
  { file: "sw-72.jpg", name: "Moulded driver basket", categories: ["Audio"] },
  { file: "sw-73.jpg", name: "Moulded surround ring", categories: ["Audio"] },
  { file: "sw-94-2.jpg", name: "Compact tweeter with braided lead", categories: ["Audio"] },
  { file: "sw-951.jpg", name: "Mid-bass driver with white cone", categories: ["Audio"] },
  { file: "sw-961.jpg", name: "Coaxial speaker module on a sealed enclosure", categories: ["Audio"] },
  { file: "sw-971.jpg", name: "Speaker module with hinged tweeter mount", categories: ["Audio"] },
  { file: "sw-981.jpg", name: "Moulded speaker pod with tweeter and loom", categories: ["Audio"] },

  // Automotive
  { file: "sw-23.jpg", name: "Chromed badges and emblems", categories: ["Automotive"] },
  { file: "sw-42.jpg", name: "Cast alloy covers and mounting brackets", categories: ["Automotive", "Marine"] },
  { file: "sw-44.jpg", name: "Seals, grommets and fixings", categories: ["Automotive"] },
  {
    file: "sw-45.jpg",
    name: "Machined alloy brackets and bearing housings",
    categories: ["Automotive", "Marine"],
  },
  { file: "sw-46.jpg", name: "Pressed brackets and mounting plates", categories: ["Automotive", "Marine"] },
  {
    file: "sw-47.jpg",
    name: "Moulded ducting, Y-pieces and grille panel",
    categories: ["Automotive", "Marine"],
  },
  {
    file: "sw-49.jpg",
    name: "Moulded coolant hose set",
    categories: ["Automotive", "Fluid Tech", "Marine"],
  },
  { file: "sw-50.jpg", name: "Full component kit for a single programme", categories: ["Automotive"] },

  // Fluid Tech
  { file: "sw-4.jpg", name: "Silicone hoses and coupler", categories: ["Fluid Tech"] },
  { file: "sw-5.jpg", name: "Moulded coolant hose with alloy fitting", categories: ["Fluid Tech"] },
  { file: "sw-7.jpg", name: "Branched fuel line with quick connectors", categories: ["Fluid Tech"] },
  { file: "sw-9.jpg", name: "Formed hose loop with retaining clip", categories: ["Fluid Tech"] },
  { file: "sw-10.jpg", name: "Formed hose assembly with inline clamps", categories: ["Fluid Tech"] },
  { file: "sw-11.jpg", name: "Braided oil feed line with banjo ends", categories: ["Fluid Tech"] },
  { file: "sw-12.jpg", name: "Formed steel oil line with banjo fittings", categories: ["Fluid Tech"] },
  { file: "sw-14.jpg", name: "Formed steel line with eyelet end", categories: ["Fluid Tech"] },
  { file: "sw-17.jpg", name: "Bent tube elbow with flared ends", categories: ["Fluid Tech"] },
  { file: "sw-19.jpg", name: "Machined steel sleeve", categories: ["Fluid Tech"] },
  { file: "sw-20.jpg", name: "Machined alloy flange housing", categories: ["Fluid Tech"] },
  { file: "sw-41.jpg", name: "Formed steel pipe and line set", categories: ["Fluid Tech", "Marine"] },
  { file: "sw-51.jpg", name: "Extruded tubing in production colours", categories: ["Fluid Tech"] },
  { file: "sw-54.jpg", name: "Hose assemblies and convoluted conduit", categories: ["Fluid Tech"] },
  { file: "sw-58.jpg", name: "Fuel line set with quick connectors", categories: ["Fluid Tech"] },
  { file: "sw-78.jpg", name: "Formed vapour line with quick connectors", categories: ["Fluid Tech"] },
  { file: "sw-79.jpg", name: "Single-run fuel line with sealed connectors", categories: ["Fluid Tech"] },
  { file: "sw-80.jpg", name: "Branched vapour line assembly", categories: ["Fluid Tech"] },
  { file: "sw-81.jpg", name: "Long-run line with moulded elbow", categories: ["Fluid Tech"] },
  { file: "sw-82.jpg", name: "Moulded hose with protective sleeve", categories: ["Fluid Tech"] },
  { file: "sw-89.jpg", name: "Convoluted conduit with moulded ends", categories: ["Fluid Tech"] },
  { file: "sw-90.jpg", name: "Convoluted conduit, long run", categories: ["Fluid Tech"] },
  { file: "sw-91.jpg", name: "Flexible conduit with moulded couplers", categories: ["Fluid Tech"] },
  { file: "sw-92.jpg", name: "Moulded breather hose with quick connector", categories: ["Fluid Tech"] },
  { file: "sw-93.jpg", name: "Breather hose with conduit sleeve and alloy tube", categories: ["Fluid Tech"] },
];

export const GALLERY_PER_PAGE = 20;
