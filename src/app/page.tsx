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

/**
 * One page, kept to the essential (Charifa, 7 October 2026): hero, clients and figures, needs, the first offers and
 * the first trainings (the others behind a blur, on /services and /formations), method, the beginning of the
 * founder's letter (the whole of it on /a-propos), contact, footer. « Pourquoi VALO » moved to « À propos », the
 * specialised solutions to /services. The hero is the light orbit, the client's choice of 7 October 2026.
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
          <Methode />
          <Fondateur />
        </main>
        <Final />
        <Teintes />
      </SheetProvider>
    </ScrollProvider>
  );
}
