import type { MetadataRoute } from "next";
import { building } from "@/lib/content";

function slugify(value: string) {
  return value.toLowerCase().replace(/×/g, "x").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yusuf-platform.vercel.app";
  const projectUrls = building.map((item) => ({
    url: `${baseUrl}/projects/${slugify(item.title)}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/expertise`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/experience`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/projects`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/insights`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/resume`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.75 },
    ...projectUrls,
  ];
}
