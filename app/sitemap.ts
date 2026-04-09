import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dlusrecovery.com";

const ROUTES = [
  "/",
  "/hbot",
  "/red-light-therapy",
  "/pemf",
  "/which",
  "/pricing",
  "/about",
  "/faq",
  "/contact",
  "/book",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
