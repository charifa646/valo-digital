import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * The pages worth listing: the real ones only (never the hidden previews under /apercu). No « last modified » dates: they
 * would be made up, and a wrong date does a sitemap more harm than none.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/formations", priority: 0.9 },
    { path: "/a-propos", priority: 0.7 },
    { path: "/mentions-legales", priority: 0.2 },
  ];
  return pages.map((p) => ({ url: `${SITE_URL}${p.path === "/" ? "" : p.path}`, priority: p.priority }));
}
