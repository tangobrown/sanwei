/**
 * Regenerates docs/photo-brief.md from the briefs carried by every ImageSlot
 * in the codebase. Run with `npm run photo-brief` after adding or changing a
 * slot so the list handed to the client stays current.
 */
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "src");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : Promise.resolve([full]);
    }),
  );
  return files.flat();
}

const files = (await walk(SRC)).filter((file) => /\.(tsx?|ts)$/.test(file));
const found = new Map();

for (const file of files) {
  const source = await readFile(file, "utf8");
  const rel = path.relative(ROOT, file);

  const patterns = [
    /brief=\{?"([^"]+)"\}?/g, // <ImageSlot brief="..." />
    /brief:\s*"([^"]+)"/g, // content objects
    /(?:heroSlides|introGallery|images):\s*\[([^\]]+)\]/g, // string arrays
    /(?:cardImage|heroSlide|image):\s*"([^"]+)"/g,
  ];

  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      const raw = match[1];
      const values = raw.includes('", "') || raw.trim().startsWith('"')
        ? [...raw.matchAll(/"([^"]+)"/g)].map((m) => m[1])
        : [raw];
      for (const value of values) {
        if (!value || value.length > 120) continue;
        if (!found.has(value)) found.set(value, new Set());
        found.get(value).add(rel);
      }
    }
  }
}

// The 40 gallery parts are generated from name lists rather than literal
// `brief:` properties, so pick them up from their definitions block.
const galleryFile = path.join(SRC, "content/gallery.ts");
const gallerySource = await readFile(galleryFile, "utf8");
const definitions = gallerySource.slice(
  gallerySource.indexOf("const definitions"),
  gallerySource.indexOf("export const galleryItems"),
);
// The industry names lead each pair; only the part names are photographs.
const galleryIndustryNames = new Set(["Audio", "Automotive", "Marine", "Other industries"]);
for (const match of definitions.matchAll(/"([^"]+)"/g)) {
  const value = match[1];
  if (galleryIndustryNames.has(value)) continue;
  if (!found.has(value)) found.set(value, new Set());
  found.get(value).add("src/content/gallery.ts");
}

const sorted = [...found.entries()].sort(([a], [b]) => a.localeCompare(b));

// Which briefs now have a photograph registered against them.
const registrySource = await readFile(path.join(SRC, "content/photography.ts"), "utf8");
const registryBody = registrySource.slice(registrySource.indexOf("export const photos"));
const filled = new Set();
for (const match of registryBody.matchAll(/^  (?:"([^"]+)"|([A-Za-z][A-Za-z0-9]*)):\s*\{/gm)) {
  filled.add(match[1] ?? match[2]);
}

const lines = [
  "# Photo brief: Sanwei Asia website",
  "",
  "Each row below is the art-direction brief carried by one `<ImageSlot>`.",
  "A brief listed in `src/content/photography.ts` renders a real `next/image`;",
  "one that is not still renders the grey placeholder with its brief showing.",
  "",
  `${sorted.filter(([brief]) => !filled.has(brief)).length} of ${sorted.length} shots are still outstanding.`,
  "",
  "| Shot | Status | Used in |",
  "| --- | --- | --- |",
  ...sorted.map(
    ([brief, where]) =>
      `| ${brief} | ${filled.has(brief) ? "supplied" : "**outstanding**"} | ${[...where].sort().join("<br>")} |`,
  ),
  "",
  "## Notes",
  "",
  "- The gallery needs 40 part photographs, one per item in `src/content/gallery.ts`.",
  "- Prototyping and Quality Control have no photography at all yet; nothing in the",
  "  supplied set depicts prototyping or inspection.",
  "- Real portraits for Andy Cobbold and Gareth Taylor are the highest priority:",
  "  they lead the team carousel and currently show a generic silhouette.",
  "- The three shots on the process page are not in the prototypes; they were added",
  "  to satisfy the handoff's \"alternating imagery\" note for that page. Drop them if",
  "  the client would rather the sequence stayed typographic.",
  "- Team portraits should be near-square and consistently lit across all six people.",
  "- Hero images are used at up to 2560px wide; supply them at 2x.",
  "",
];

await writeFile(path.join(ROOT, "docs/photo-brief.md"), lines.join("\n"));
console.log(`Wrote docs/photo-brief.md with ${sorted.length} shots.`);
