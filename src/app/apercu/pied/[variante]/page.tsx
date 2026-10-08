import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
import { Appel } from "@/components/site/pied/Appel";

/**
 * The two proposals for the foot of the page (7 October 2026), on the whole homepage, at hidden addresses:
 * /apercu/pied/scene (A, « la scène », chosen on 8 October 2026 and now the foot of every page) and
 * /apercu/pied/appel (B, « le grand appel », kept in reserve). Not indexed.
 */
const variantes = { scene: Final, appel: Appel };

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(variantes).map((variante) => ({ variante }));
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function ApercuPied({ params }: { params: { variante: string } }) {
  const Pied = variantes[params.variante as keyof typeof variantes];
  if (!Pied) notFound();
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
        <Pied />
      </SheetProvider>
    </ScrollProvider>
  );
}
