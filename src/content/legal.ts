/**
 * Legal page copy.
 *
 * The privacy policy body is taken from the live site at
 * https://sanwei-asia.com/privacy-policy/. `sections` is the only thing the
 * page reads, so dropping the real headings and paragraphs in here is the
 * whole import — no component change needed. While it is empty the page
 * says so rather than inventing policy text.
 */

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

export const privacyPolicy: { sections: LegalSection[] } = {
  sections: [],
};
