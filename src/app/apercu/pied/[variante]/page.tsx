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
import { Scene } from "@/components/site/pied/Scene";
import { Appel } from "@/components/site/pied/Appel";

/**
 * The feet of the page tried on the whole homepage, at hidden addresses, not indexed: /apercu/pied/trame (the
 * dithered one Charifa chose on 12 October 2026, now the foot of every page), /apercu/pied/nuit (the same in night
 * blue), /apercu/pied/scene (« la scène », A of 7 October, her choice of 8 October until then) and /apercu/pied/appel
 * (« le grand appel », B, kept in reserve).
 */
const NuitTrame = () => <Final ton="nuit" />;
const variantes = { trame: Final, nuit: NuitTrame, scene: Scene, appel: Appel };

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
