import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yusuf-platform.vercel.app";
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/os", "/login", "/auth", "/api/"] },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
