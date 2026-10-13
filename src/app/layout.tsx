import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { contact, fondateur, footer, formations, hero, prestations } from "@/lib/content";
import { INDEXABLE, SITE_NAME, SITE_URL } from "@/lib/site";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { Transitions } from "@/components/site/Transitions";
import { Aimants } from "@/components/site/Aimants";
import "./globals.css";

// Montserrat lives in the repository (variable weights 100 to 900, the latin set: all of French), under the SIL Open
// Font License (fonts/OFL.txt). Fetched from Google at each build, it once came out with a different name in the page
// and in its stylesheet, and phones showed the whole site in a serif font (8 October 2026).
const montserrat = localFont({
  src: [{ path: "./fonts/montserrat-latin.woff2", weight: "100 900", style: "normal" }],
  display: "swap",
  variable: "--font-montserrat",
});

// the same SemiBold without overlapping contours, only for the words drawn in outline (`.contour`): an outline drawn on
// the variable font shows the seams inside the letters
const contour = localFont({
  src: "./fonts/montserrat-600-contour.woff2",
  weight: "600",
  display: "swap",
  preload: false,
  variable: "--font-contour",
});

// Instrument Serif in italic, only for the words set apart in the homepage's title (« levier de croissance. », Charifa's
// choice of a serif face for them, 12 October 2026, after her reference « Travel stress-free… »). SIL Open Font License.
const serif = localFont({
  src: [{ path: "./fonts/instrument-serif-italic-latin.woff2", weight: "400", style: "italic" }],
  display: "swap",
  variable: "--font-serif",
});

const plain = (s: string) => s.replace(/[  ]/g, " ");
const description = plain(hero.lead);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // the trades and the city in the title, as on the « À propos » page (« agence de marketing et de publicité digitale et centre
  // de formation aux métiers du numérique, à Ouagadougou »): what a visitor types into a search engine
  title: `VALO DIGITAL · ${plain(hero.tags[0])} et formation à Ouagadougou`,
  description,
  // the homepage's own address; every other page names its own (`pageMeta`, src/lib/site.ts)
  alternates: { canonical: "/" },
  // out of search engines until the domain is live (`INDEXABLE`, src/lib/site.ts)
  robots: INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    title: `VALO DIGITAL · ${plain(hero.title.join(" "))}`,
    description,
    url: "/",
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: `VALO DIGITAL · ${plain(hero.title.join(" "))}`, description },
};

export const viewport: Viewport = {
  themeColor: "#040B52",
  width: "device-width",
  initialScale: 1,
};

// Only what VALO itself says on the site: its name, its words, its telephone, its address, the names of its services and
// trainings (no price, no opening hours, no network address: none has been given for them, so none is made up).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "VALO DIGITAL",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description,
  telephone: contact.phone.replace(/\s/g, ""),
  email: contact.email,
  address: { "@type": "PostalAddress", streetAddress: "Wemtenga", addressLocality: "Ouagadougou", addressCountry: "BF" },
  founder: { "@type": "Person", name: contact.name, jobTitle: plain(fondateur.roles[0]) },
  areaServed: "Ouagadougou",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "VALO DIGITAL",
    itemListElement: [
      ...prestations.offers.map((o) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: plain(o.name) } })),
      ...formations.items.map((f) => ({ "@type": "Offer", itemOffered: { "@type": "Course", name: plain(f.name), provider: { "@type": "Organization", name: "VALO DIGITAL" } } })),
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${contour.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans">
        {/* for keyboards only: shown on Tab, never on a tap. It lives here, outside the pages, because after a
            change of page Next.js focuses the page's first element, and on a phone that brought it up. */}
        <a
          href="#contenu"
          className="sr-only z-[90] rounded-full bg-sun px-5 py-3 font-bold text-navy focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-3"
        >
          Aller au contenu
        </a>
        {children}
        <RevealObserver />
        <Transitions />
        <Aimants />
      </body>
    </html>
  );
}
