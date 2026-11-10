import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gilgilhillsschools.co.ke";

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1
    }
  ];
}
