import type { ComponentType } from "react";
import { ScrollProvider } from "@/components/site/Scroll";
import { SheetProvider } from "@/components/site/Sheet";
import { Header } from "@/components/site/Header";
import { Confiance } from "@/components/site/Confiance";
import { Needs } from "@/components/site/Needs";
import { Prestations } from "@/components/site/Prestations";
import { Formations } from "@/components/site/Formations";
import { DemoCommande } from "@/components/site/DemoCommande";
import { Methode } from "@/components/site/Methode";
import { Fondateur } from "@/components/site/Fondateur";
import { Final } from "@/components/site/Final";
import { Teintes } from "@/components/site/Teintes";

/**
 * One page, kept to the essential (Charifa, 7 October 2026): hero, clients and figures, needs, the first offers and
 * the first trainings (the others behind a blur, on /services and /formations), then an order played on a phone
 * (after the offers and trainings, Charifa, 8 October 2026), method, the beginning of the founder's letter (the whole
 * of it on /a-propos), contact, footer. « Pourquoi VALO » moved to « À propos », the specialised solutions to
 * /services. The hero is the light orbit, the client's choice of 7 October 2026. The homepage and the hidden versions
 * of its hero (`/apercu/...`) share this composition: only the hero changes. `scene`: the order demo on a blue stage, shown
 * at /apercu/demo; `sansCadre`: with the phone's frame reduced to a fine rim, at /apercu/demo/sans-cadre; `Besoin`: the
 * cards of « De quoi avez-vous besoin » with the dithered band of the foot, at /apercu/besoin.
 */
export function Accueil({
  Hero,
  Besoin = Needs,
  scene = false,
  sansCadre = false,
}: {
  Hero: ComponentType;
  Besoin?: ComponentType;
  scene?: boolean;
  sansCadre?: boolean;
}) {
  return (
    <ScrollProvider>
      <SheetProvider>
        <Header />
        <main id="contenu">
          <Hero />
          <Confiance />
          <Besoin />
          <Prestations />
          <Formations />
          <DemoCommande scene={scene} sansCadre={sansCadre} />
          <Methode />
          <Fondateur />
        </main>
        <Final />
        <Teintes />
      </SheetProvider>
    </ScrollProvider>
  );
}
