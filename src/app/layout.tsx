import type { Metadata } from "next";
import { Special_Gothic } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

/**
 * One family across the whole site: display type at 600, everything else at
 * 400. Special Gothic ships no italic, so the italic statement lines render
 * as a synthesised oblique.
 */
const specialGothic = Special_Gothic({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-special-gothic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sanwei-asia.com"),
  title: {
    default: "Sanwei Asia | Part sourcing, manufacturing and project management",
    template: "%s | Sanwei Asia",
  },
  description:
    "Sanwei Technical Ltd is an Asia based part sourcing, project management, engineering and manufacturing company, with a factory in Taiwan and a customer-facing presence in the UK.",
  openGraph: {
    type: "website",
    siteName: "Sanwei Asia",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={specialGothic.variable}>
      <body className="font-sans">
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
