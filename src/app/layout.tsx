import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { contact, fondateur, footer, hero } from "@/lib/content";
import { RevealObserver } from "@/components/ui/RevealObserver";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
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
    <html lang="fr" className={montserrat.variable} suppressHydrationWarning>
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
