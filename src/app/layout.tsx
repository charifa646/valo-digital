import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { contact, fondateur, footer, hero } from "@/lib/content";
import { RevealObserver } from "@/components/ui/RevealObserver";
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

const plain = (s: string) => s.replace(/[  ]/g, " ");
const description = plain(hero.lead);

export const metadata: Metadata = {
  title: `VALO DIGITAL · ${plain(footer.tagline)}`,
  description,
  // a test site for the client: kept out of search engines until it is theirs
  robots: { index: false, follow: false },
  openGraph: {
    title: `VALO DIGITAL · ${plain(hero.title.join(" "))}`,
    description,
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#040B52",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "VALO DIGITAL",
  description,
  telephone: contact.phone.replace(/\s/g, ""),
  email: contact.email,
  address: { "@type": "PostalAddress", streetAddress: "Wemtenga", addressLocality: "Ouagadougou", addressCountry: "BF" },
  founder: { "@type": "Person", name: contact.name, jobTitle: plain(fondateur.roles[0]) },
  areaServed: "Ouagadougou",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${contour.variable}`} suppressHydrationWarning>
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
      </body>
    </html>
  );
}
