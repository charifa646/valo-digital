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
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
