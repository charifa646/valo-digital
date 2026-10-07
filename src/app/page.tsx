import { ScrollProvider } from "@/components/site/Scroll";
import { SheetProvider } from "@/components/site/Sheet";
import { Header } from "@/components/site/Header";
import { HeroOrbite } from "@/components/site/HeroOrbite";
import { Confiance } from "@/components/site/Confiance";
import { Needs } from "@/components/site/Needs";
import { Prestations } from "@/components/site/Prestations";
import { Formations } from "@/components/site/Formations";
import { Solutions } from "@/components/site/Solutions";
import { Methode } from "@/components/site/Methode";
import { Pourquoi } from "@/components/site/Pourquoi";
import { Fondateur } from "@/components/site/Fondateur";
import { Final } from "@/components/site/Final";

/**
 * One page, in the order of the brief: hero, needs, offers, trainings, solutions, method, why, founder, contact,
 * footer. The hero is the light orbit, the client's choice of 7 October 2026.
 */
export default function Page() {
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
          <Solutions />
          <Methode />
          <Pourquoi />
          <Fondateur />
        </main>
        <Final />
      </SheetProvider>
    </ScrollProvider>
  );
}
