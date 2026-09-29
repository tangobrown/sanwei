# Sanwei Asia

The redesigned sanwei-asia.com, built from the `design_handoff_sanwei_website`
handoff. Next.js (App Router) + TypeScript + Tailwind CSS v4, statically
generated apart from the contact endpoint.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

Copy `.env.example` to `.env.local` and fill in `POSTMARK_SERVER_TOKEN` before
the contact form can deliver anything.

## Routes

| Route | Page |
| --- | --- |
| `/` | Homepage |
| `/industries/[slug]` | Audio, Automotive, Marine, Other Industries |
| `/services/[slug]` | The nine services |
| `/gallery` | Gallery, with `?industry=` and `?page=` in the query |
| `/why-sanwei` | About |
| `/process` | Process |
| `/contact` | Contact |
| `/api/contact` | Postmark route handler |

301s from the live site's old URLs (`/audio`, `/about-us`, `/our-process`, and
the rest) are declared in `next.config.ts`.

## How it is put together

```
src/
  app/          routes, the API handler, sitemap and robots
  components/
    layout/     header (with the mobile panel) and footer
    sections/   the reusable bands: hero, intro splits, hairline lists, CTAs
    ui/         primitives: image slots, icons, buttons, the hairline grid
    gallery/    the filter-and-paginate browser
    about/      the team carousel
    contact/    the form and the office map
  content/      all copy, as typed data
  lib/          the contact schema and small helpers
```

**Design tokens** live in `src/app/globals.css` under `@theme`, so Tailwind
utilities like `bg-ink` and `text-steel` come straight from the handoff's
palette. Display type uses `clamp()` through the `t-*` classes in the same
file rather than per-breakpoint overrides.

**Typography** is one family, Special Gothic: display type at 600 through
`.font-display` and the `t-*` classes, everything else at 400. This replaces
the handoff's Instrument Serif and Archivo pairing. Two consequences worth
knowing:

- Special Gothic ships no italic, so the italic statement lines (hero
  sublines, the accent pull quotes, the "and" on Project Management) render
  as a browser-synthesised oblique rather than drawn italics.
- It sets considerably wider and heavier than the serif it replaced, so the
  large end of the display ramp came down from the handoff's figures: hero
  112px to 82px on the homepage and 104px to 78px on interior pages, page
  title 76px to 68px, major section H2 52px to 48px, and the closing CTA
  heading 66px to 58px. The `vw` term of each `clamp()` came down with the
  maximum so the reduction carries at mid widths rather than only at the cap.
  Every page was re-checked for hero overflow and horizontal scroll at 1440,
  1280, 1024, 768 and 390.

**The content layer** (`src/content/`) holds every piece of copy. It is taken
verbatim from the prototypes, including the house style of no em dashes.
Changing wording means editing those files, not the components.

**Hairline list bands** draw their dividing rules from the grid's own 1px gap
over a rule-coloured ground, with every cell painted opaque, so the rules stay
correct at any column count. `HairlineGrid` adds the filler cells needed to
complete a part-filled last row, which would otherwise show the ground as a
solid block.

## Photography

`src/content/photography.ts` maps each art-direction brief to a supplied
photograph and its alt text. `<ImageSlot>` looks the brief up: a registered
brief renders a real `next/image`, an unregistered one keeps the grey
placeholder with the brief showing, so what is still missing stays visible.

Alt text lives in that one file and describes what is in the frame, not the
shooting note. A brief like "Factory floor, wide" tells a screen reader
nothing, so it is never used as alt text for a supplied image. Set `alt: ""`
for an image that genuinely carries no information, as the stand-in team
silhouettes do.

45 of 108 slots are filled. `docs/photo-brief.md` lists every slot with its
status and is regenerated with:

```bash
npm run photo-brief
```

Two supplied photographs carry another company's branding, small but legible:
a laptop and chair logo in the Customer Service hero, and a hi-vis logo in the
shot used on the Process hero and the Supply Chain intro. Worth swapping
before launch.

## Contact form

The form posts JSON to `/api/contact`, which validates with zod, checks a
honeypot, applies a small per-instance rate limit, and calls Postmark
server-side. The server token is read only inside the route handler and never
reaches the client. With no token configured the endpoint returns an error and
the form shows its error state with the phone numbers as a fallback.

Form states: idle, submitting, success and error, all built.

## Outstanding for the client

1. The 63 remaining photographs (`docs/photo-brief.md`). In priority order:
   portraits of Andy Cobbold and Gareth Taylor, who lead the team carousel and
   currently show a silhouette; anything at all for Prototyping and Quality
   Control, which have none; then the 40 gallery parts. Several supplied images
   are only 800px wide, which is soft for a full-bleed hero at 2x.
2. SVG logos, light and dark. The current PNGs are 165x132 and too small for retina.
3. Destinations for the four footer document links, and for the "code of
   conduct" and "terms and conditions" links on the Quality Control page. They
   point at `/contact` for now.
4. The Postmark server token and the destination address for enquiries.
5. Map provider preference. OpenStreetMap embeds are in place behind
   `OfficeMap`, so swapping to Google or Mapbox is a one-file change. The exact
   UK address is still "Axminster, East Devon".
6. Certification details on the proof strip.
7. Favicon and OG images, which were not designed.

## Notes on the handoff

Two places where the handoff's prose and its prototypes disagree; the
prototypes won, since the handoff states copy is final and verbatim:

- The proof strip reads "20+ Years supplying OEMs" in the prototype, where the
  overview prose says "30+ years".
- The team member is "Andy Cobbold" in the prototype, "Andy Cobbald" in the
  prose.

One place where the prose won: the homepage H1 is set at up to 112px per the
type scale, where the prototype file uses 88px.

The Other Industries page has no "why choose us" band; it goes intro to
industry specialisms, as the prototype does. The three photographs on the
process page are additions, made to satisfy the handoff's "alternating
imagery" note for that page, and are flagged as such in the photo brief.
