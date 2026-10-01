import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ScrollProvider } from "@/components/site/Scroll";
import { SheetProvider } from "@/components/site/Sheet";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
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

/**
 * The other homepage versions, kept at hidden addresses so none is lost:
 * A « la vague » (/apercu/vague), B « l'orbite » in light (/apercu/orbite)
 * and the earlier homepage (/apercu/ancien). The real homepage is C, the
 * orbit in blue. Not indexed.
 */
const heroes = { vague: HeroVague, orbite: HeroOrbite, ancien: Hero };

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
