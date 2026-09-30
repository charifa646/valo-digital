import { ScrollProvider } from "@/components/site/Scroll";
import { SheetProvider } from "@/components/site/Sheet";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Needs } from "@/components/site/Needs";
import { Prestations } from "@/components/site/Prestations";
import { Formations } from "@/components/site/Formations";
import { Solutions } from "@/components/site/Solutions";
import { Methode } from "@/components/site/Methode";
import { Pourquoi } from "@/components/site/Pourquoi";
import { Fondateur } from "@/components/site/Fondateur";
import { Final } from "@/components/site/Final";

/** One page, in the order of the brief: hero, needs, offers, trainings, solutions, method, why, founder, contact, footer. */
export default function Page() {
  return (
    <ScrollProvider>
      <SheetProvider>
        <Header />
        <main id="contenu">
          <Hero />
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
