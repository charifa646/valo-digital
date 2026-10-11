import type { Metadata } from "next";
import { Accueil } from "@/components/site/Accueil";
import { HeroOrbite } from "@/components/site/HeroOrbite";

/**
 * The homepage with its order demo shown on a blue stage, the way Instrument shows its work (Charifa's question of
 * 11 October 2026): kept at a hidden address until she chooses. Not indexed.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Apercu() {
  return <Accueil Hero={HeroOrbite} scene />;
}
