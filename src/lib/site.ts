import type { Metadata } from "next";

/**
 * Where the site lives, in one place (13 to 14 October 2026, Charifa: « on va maintenant connecter le domaine, et puis aussi,
 * faut commencer les référencements »). `SITE_URL` is the absolute address that canonical links, the sitemap, shared links
 * and the structured data use; `INDEXABLE` says whether search engines may list the site.
 *
 * TO GO LIVE, once https://valodigitalbf.com answers over https (its two DNS lines set in Cloudflare, the domain added in
 * Vercel): set `SITE_URL` to "https://valodigitalbf.com" and `INDEXABLE` to true, in this file and nowhere else. Until
 * then the site is still the Vercel address and stays out of search engines, so that Google never lists the provisional
 * address and then the real one as two copies.
 */
export const SITE_URL = "https://valo-digital.vercel.app";
export const INDEXABLE = false;

export const SITE_NAME = "VALO DIGITAL";

/** The picture shown when a link to the site is shared (`opengraph-image.jpg`, 1200 by 630): named on every page, because a
 * page that names its own Open Graph card loses the one the root gives. Its text is the one of `opengraph-image.alt.txt`. */
const partage = { url: "/opengraph-image.jpg", width: 1200, height: 630, alt: "VALO DIGITAL · Faites du digital un véritable levier de croissance." };

/** The title, description and address of a page, the same way for every page: canonical link, Open Graph (the image is the
 * one of `opengraph-image.jpg`, shared by every page) and Twitter card. */
export function pageMeta({ path, title, description, ogTitle }: { path: string; title: string; description: string; ogTitle?: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: { title: ogTitle ?? title, description, url: path, siteName: SITE_NAME, locale: "fr_FR", type: "website", images: [partage] },
    twitter: { card: "summary_large_image", title: ogTitle ?? title, description, images: [partage.url] },
  };
}

/** The amount in F CFA written in a price (« 75 000 F CFA », « À partir de 150 000 F CFA / mois »), as a number, or nothing for
 * « Tarif selon format ». For the structured data: never a price that VALO did not write. */
export function montantXof(prix: string): number | undefined {
  const m = prix.match(/(\d[\d\s\u00a0\u202f]*)\s*F\s*CFA/i);
  return m ? Number(m[1].replace(/\D/g, "")) : undefined;
}

/** A page's structured data as a script tag's content. */
export const ldJson = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");

/** The host the site answers on, without its scheme: what the robots header and the www redirect compare with. */
export const SITE_HOST = new URL(SITE_URL).host;
