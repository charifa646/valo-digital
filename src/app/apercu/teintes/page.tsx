import type { Metadata } from "next";
import { ScrollProvider } from "@/components/site/Scroll";
import { SheetProvider } from "@/components/site/Sheet";
import { Header } from "@/components/site/Header";
import { HeroOrbite } from "@/components/site/HeroOrbite";
import { Confiance } from "@/components/site/Confiance";
import { Needs } from "@/components/site/Needs";
import { Prestations } from "@/components/site/Prestations";
import { Formations } from "@/components/site/Formations";
import { Methode } from "@/components/site/Methode";
import { Fondateur } from "@/components/site/Fondateur";
import { Final } from "@/components/site/Final";
import { Teintes } from "@/components/site/Teintes";

export const metadata: Metadata = { robots: { index: false, follow: false } };

/**
 * The homepage with the colour of the page changing as on instrument.com, from the parts already in colour: the
 * figures' night blue and the last call's blue (8 October 2026), at a hidden address.
 */
export default function ApercuTeintes() {
  return (
    <ScrollProvider>
      <SheetProvider>
        <Header />
        <main id="contenu">
          <HeroOrbite />
          <Confiance />
          <Needs />
          <Prestations />
          <Formations />
          <Methode />
          <Fondateur />
        </main>
        <Final />
        <Teintes />
      </SheetProvider>
    </ScrollProvider>
  );
}
