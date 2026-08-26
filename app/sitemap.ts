import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yusuf-platform.vercel.app";
  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/projects`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/insights`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/resume`, changeFrequency: "monthly", priority: 0.7 },
  ];
}
