import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://idhanzarkasyah.com";

  const routes = [
    "",
    "/about",
    "/skills",
    "/projects",
    "/experience",
    "/contact",
    "/playground",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
