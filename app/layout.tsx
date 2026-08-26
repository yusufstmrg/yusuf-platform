import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yusuf-platform.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Yusuf B. Situmorang — Finance × Business × AI",
  description:
    "The personal digital headquarters of Yusuf B. Situmorang — finance professional, builder and lifelong learner exploring finance, business, AI and growth.",
  keywords: ["Yusuf B. Situmorang", "Finance", "Accounting", "Tax", "Corporate Finance", "AI", "Business"],
  authors: [{ name: "Yusuf B. Situmorang" }],
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Yusuf B. Situmorang — Finance × Business × AI",
    description: "Finance × Business × AI × Growth.",
    url: siteUrl,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yusuf B. Situmorang — Finance × Business × AI",
    description: "Finance × Business × AI × Growth.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
