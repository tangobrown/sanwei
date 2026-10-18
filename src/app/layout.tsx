import type { Metadata } from "next";
import { Archivo, Instrument_Serif } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { offices } from "@/content/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

/** Display face. Always weight 400; the italic carries the statement lines. */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sanwei-asia.com"),
  title: {
    default: "Sanwei Asia | Part sourcing, manufacturing and project management",
    template: "%s | Sanwei Asia",
  },
  description:
    "Sanwei Technical Ltd sources, manufactures and project manages high value parts from a factory in Taiwan and a supplier network across Asia, with a UK presence.",
  openGraph: {
    type: "website",
    siteName: "Sanwei Asia",
    locale: "en_GB",
    images: [{ url: "/og-cover.png", width: 1200, height: 630, alt: "Sanwei" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

/**
 * Organization data for search engines: the two offices, how to reach each,
 * and the group company. Rendered once, in the layout, so every page carries
 * it. Values come from the content file so they cannot drift from the footer.
 */
const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sanwei Asia",
  legalName: "Sanwei Technical Ltd",
  url: "https://www.sanwei-asia.com",
  logo: "https://www.sanwei-asia.com/brand/sanwei-logo.png",
  description:
    "Asia based part sourcing, project management, engineering and manufacturing, with a factory in Taiwan and a customer facing presence in the UK.",
  sameAs: ["https://honjeh.com"],
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "24F, No. 161 Song De Road",
      addressLocality: "Taipei",
      addressRegion: "Xinyi District",
      postalCode: "110032",
      addressCountry: "TW",
    },
    { "@type": "PostalAddress", addressLocality: "Axminster", addressRegion: "East Devon", addressCountry: "GB" },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: offices.asia.phone,
      email: offices.asia.email,
      areaServed: "Asia",
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: offices.uk.phone,
      email: offices.uk.email,
      areaServed: "GB",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${instrumentSerif.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          // The object is ours, not user input, so there is nothing to escape.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-pill focus:bg-ink focus:px-6 focus:py-3 focus:text-[15px] focus:font-semibold focus:text-on-dark"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
