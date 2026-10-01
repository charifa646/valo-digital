import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ScrollProvider } from "@/components/site/Scroll";
import { SheetProvider } from "@/components/site/Sheet";
import { Header } from "@/components/site/Header";
import { HeroVague } from "@/components/site/HeroVague";
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

/** Local preview of the two hero proposals, with the trust band's empty slots. Removed before anything goes online. */
/** Charifa's mix: the orbit in the blue of A. */
function HeroOrbiteBleue() {
  return <HeroOrbite blue />;
}

const heroes = { vague: HeroVague, orbite: HeroOrbite, "orbite-bleue": HeroOrbiteBleue };

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(heroes).map((hero) => ({ hero }));
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Apercu({ params }: { params: { hero: string } }) {
  const Hero = heroes[params.hero as keyof typeof heroes];
  if (!Hero) notFound();
  return (
    <ScrollProvider>
      <SheetProvider>
        <Header />
        <main id="contenu">
          <Hero />
          <Confiance preview />
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
