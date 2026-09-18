import type { NextConfig } from "next";

/**
 * 301s from the live site's URLs so existing rankings and inbound links
 * survive the move to the new route map.
 */
const legacyRedirects: { source: string; destination: string }[] = [
  { source: "/audio", destination: "/industries/audio" },
  { source: "/automotive", destination: "/industries/automotive" },
  { source: "/marine", destination: "/industries/marine" },
  { source: "/other-industries", destination: "/industries/other-industries" },
  { source: "/customer-service", destination: "/services/customer-service" },
  { source: "/engineering-consulting", destination: "/services/engineering-consulting" },
  { source: "/fluid-technologies", destination: "/services/fluid-technologies" },
  { source: "/manufacturing", destination: "/services/manufacturing" },
  { source: "/project-management", destination: "/services/project-management" },
  { source: "/prototyping", destination: "/services/prototyping" },
  { source: "/quality-control", destination: "/services/quality-control" },
  { source: "/supply-chain-management", destination: "/services/supply-chain-management" },
  { source: "/tooling", destination: "/services/tooling" },
  { source: "/tooling-services", destination: "/services/tooling" },
  { source: "/about-us", destination: "/why-sanwei" },
  { source: "/about", destination: "/why-sanwei" },
  { source: "/our-process", destination: "/process" },
  { source: "/contact-us", destination: "/contact" },
  { source: "/gallery-2", destination: "/gallery" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return legacyRedirects.map(({ source, destination }) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
