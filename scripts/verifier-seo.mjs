#!/usr/bin/env node
/**
 * Checks what a search engine sees on the site, from outside, page by page (14 October 2026).
 *
 *   node scripts/verifier-seo.mjs                          the real address (https://valodigitalbf.com)
 *   node scripts/verifier-seo.mjs https://valo-digital.vercel.app
 *
 * Reads `robots.txt` first: if it closes the site (« Disallow: / »), it expects every page to say `noindex`; if it opens the
 * site, it expects `index, follow`, a canonical address on this very address, the sitemap, one H1, a title and a
 * description of a sensible length, a share picture that answers, valid structured data. On the real address it also checks
 * that `www.` redirects, that `http` goes to `https`, and that the provisional address is marked `noindex`.
 * Needs Node 18 or later; nothing is installed; it only reads.
 */
const base = (process.argv[2] || "https://valodigitalbf.com").replace(/\/$/, "");
const url = new URL(base);
const pages = ["/", "/services", "/formations", "/a-propos", "/mentions-legales"];
let echecs = 0;
const ok = (m) => console.log("  ok   " + m);
const ko = (m) => {
  echecs++;
  console.log("  FAUX " + m);
};
const verifie = (cond, bon, mauvais) => (cond ? ok(bon) : ko(mauvais));
const get = (u, opts = {}) => fetch(u, { redirect: "manual", headers: { "user-agent": "Mozilla/5.0 (compatible; verifier-seo)" }, ...opts });
const attr = (html, re) => (html.match(re) || [])[1];

console.log(`\nAdresse vérifiée : ${base}\n`);

// robots.txt and the state it announces
let robots = "";
try {
  const r = await get(base + "/robots.txt");
  robots = await r.text();
  verifie(r.status === 200, "robots.txt répond", `robots.txt répond ${r.status}`);
} catch (e) {
  ko("robots.txt injoignable : " + e.message);
}
const ferme = /Disallow:\s*\/\s*$/m.test(robots);
console.log(`\nÉtat annoncé par robots.txt : ${ferme ? "FERMÉ aux moteurs" : "OUVERT aux moteurs"}\n`);
if (!ferme) {
  verifie(new RegExp(`Sitemap:\\s*${base}/sitemap.xml`).test(robots), "robots.txt nomme le plan du site de cette adresse", "robots.txt ne nomme pas le plan du site de cette adresse");
  verifie(/Disallow:\s*\/apercu\//.test(robots) && /Disallow:\s*\/api\//.test(robots), "/apercu/ et /api/ sont interdits aux robots", "/apercu/ ou /api/ ne sont pas interdits aux robots");
}

// the sitemap
let urlsPlan = [];
try {
  const r = await get(base + "/sitemap.xml");
  const xml = await r.text();
  urlsPlan = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  verifie(r.status === 200 && urlsPlan.length >= pages.length, `plan du site : ${urlsPlan.length} adresses`, `plan du site absent ou incomplet (${r.status}, ${urlsPlan.length} adresses)`);
  verifie(urlsPlan.every((u) => u.startsWith(base)), "toutes les adresses du plan sont sur cette adresse", "des adresses du plan sont sur une autre adresse : " + urlsPlan.filter((u) => !u.startsWith(base)).join(", "));
} catch (e) {
  ko("plan du site injoignable : " + e.message);
}

// every page
for (const path of pages) {
  console.log(`\n${path}`);
  let r, html;
  try {
    r = await get(base + path);
    html = await r.text();
  } catch (e) {
    ko("page injoignable : " + e.message);
    continue;
  }
  verifie(r.status === 200, "répond 200", `répond ${r.status}`);
  const robotsMeta = attr(html, /<meta name="robots" content="([^"]*)"/);
  const entete = r.headers.get("x-robots-tag") || "";
  if (ferme) verifie(/noindex/.test(robotsMeta || "") || /noindex/.test(entete), "noindex (site fermé, cohérent)", "le site est fermé mais cette page ne dit pas noindex");
  else verifie(/index/.test(robotsMeta || "") && !/noindex/.test(robotsMeta || "") && !/noindex/.test(entete), "indexable (index, follow)", `la page n'est pas indexable : meta « ${robotsMeta} », en-tête « ${entete} »`);
  const canonique = attr(html, /<link rel="canonical" href="([^"]*)"/);
  const attendue = base + (path === "/" ? "" : path);
  verifie(canonique === attendue, `adresse canonique : ${canonique}`, `adresse canonique « ${canonique} » au lieu de « ${attendue} »`);
  const titre = (attr(html, /<title>([^<]*)<\/title>/) || "").trim();
  verifie(titre.length >= 15 && titre.length <= 70, `titre (${titre.length} signes) : ${titre}`, `titre absent ou hors mesure (${titre.length} signes) : ${titre}`);
  const desc = attr(html, /<meta name="description" content="([^"]*)"/) || "";
  verifie(desc.length >= 50 && desc.length <= 170, `description (${desc.length} signes)`, `description absente ou hors mesure (${desc.length} signes)`);
  verifie((html.match(/<h1[\s>]/g) || []).length === 1, "un seul H1", `${(html.match(/<h1[\s>]/g) || []).length} balises H1`);
  verifie(/<html[^>]*lang="fr"/.test(html), "langue : fr", "langue de la page non déclarée en français");
  const og = attr(html, /<meta property="og:image" content="([^"]*)"/);
  if (og) {
    try {
      const ri = await get(og);
      verifie(ri.status === 200 && /image/.test(ri.headers.get("content-type") || ""), "image de partage répond", `image de partage : ${ri.status}`);
    } catch (e) {
      ko("image de partage injoignable");
    }
  } else ko("pas d'image de partage (og:image)");
  const blocs = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  let valides = 0;
  for (const b of blocs) {
    try {
      JSON.parse(b);
      valides++;
    } catch {
      /* counted below */
    }
  }
  verifie(blocs.length > 0 && valides === blocs.length, `données structurées : ${valides} bloc(s) valide(s)`, `données structurées absentes ou invalides (${valides}/${blocs.length})`);
  const sansAlt = (html.match(/<img(?![^>]*\balt=)[^>]*>/g) || []).length;
  verifie(sansAlt === 0, "toutes les images ont un attribut alt", `${sansAlt} image(s) sans attribut alt`);
}

// the redirects and the provisional address, only on the real address
if (url.hostname !== "localhost" && !url.hostname.endsWith(".vercel.app")) {
  console.log("\nRedirections");
  try {
    const r = await get(`https://www.${url.hostname}/formations?essai=1`);
    verifie(r.status === 308 || r.status === 301, `www redirige (${r.status})`, `www ne redirige pas (${r.status})`);
    verifie((r.headers.get("location") || "").startsWith(base), `vers ${r.headers.get("location")}`, `vers « ${r.headers.get("location")} » au lieu de ${base}`);
  } catch (e) {
    ko("www injoignable : " + e.message);
  }
  try {
    const r = await get(`http://${url.hostname}/`);
    verifie([301, 302, 307, 308].includes(r.status) && (r.headers.get("location") || "").startsWith("https://"), "http renvoie vers https", `http répond ${r.status} (${r.headers.get("location")})`);
  } catch (e) {
    ko("http injoignable : " + e.message);
  }
  try {
    const r = await get("https://valo-digital.vercel.app/");
    verifie(/noindex/.test(r.headers.get("x-robots-tag") || ""), "l'adresse provisoire valo-digital.vercel.app est en noindex", "l'adresse provisoire valo-digital.vercel.app n'est pas en noindex : Google pourrait la lister en double");
  } catch (e) {
    ko("adresse provisoire injoignable : " + e.message);
  }
}

console.log(`\n${echecs === 0 ? "Tout est en ordre." : `${echecs} point(s) à corriger.`}\n`);
process.exit(echecs === 0 ? 0 : 1);
