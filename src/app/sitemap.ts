import type { MetadataRoute } from "next";
import { industries } from "@/content/industries";
import { services } from "@/content/services";

const BASE_URL = "https://www.sanwei-asia.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/gallery", "/why-sanwei", "/process", "/contact"];

  return [
    ...staticPaths.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      priority: path === "/" ? 1 : 0.8,
    })),
    ...industries.map((industry) => ({
      url: `${BASE_URL}/industries/${industry.slug}`,
      lastModified: new Date(),
      priority: 0.7,
    })),
    ...services.map((service) => ({
      url: `${BASE_URL}/services/${service.slug}`,
      lastModified: new Date(),
      priority: 0.7,
    })),
  ];
}
