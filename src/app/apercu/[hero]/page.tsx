import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Accueil } from "@/components/site/Accueil";
import { Hero } from "@/components/site/Hero";
import { HeroVague } from "@/components/site/HeroVague";
import { HeroOrbite } from "@/components/site/HeroOrbite";

/**
 * The other homepage versions, kept at hidden addresses so none is lost:
 * A « la vague » (/apercu/vague), B « l'orbite » in light (/apercu/orbite,
 * the same as the real homepage since the client chose it on 7 October 2026),
 * C the orbit in blue (/apercu/orbite-bleue) and the earlier homepage (/apercu/ancien). All under the homepage's own
 * composition (`Accueil.tsx`). Not indexed.
 */
const OrbiteBleue = () => <HeroOrbite blue />;
const heroes = { vague: HeroVague, orbite: HeroOrbite, "orbite-bleue": OrbiteBleue, ancien: Hero };

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(heroes).map((hero) => ({ hero }));
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Apercu({ params }: { params: { hero: string } }) {
  const Chosen = heroes[params.hero as keyof typeof heroes];
  if (!Chosen) notFound();
  return <Accueil Hero={Chosen} />;
}
