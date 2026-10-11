import type { Metadata } from "next";
import { Accueil } from "@/components/site/Accueil";
import { HeroOrbite } from "@/components/site/HeroOrbite";
import { NeedsTrame } from "@/components/site/NeedsTrame";

/**
 * The homepage with the cards of « De quoi avez-vous besoin aujourd'hui ? » given the effect of the dithered footer
 * (Charifa's question of 12 October 2026): kept at a hidden address until she chooses. Not indexed.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Apercu() {
  return <Accueil Hero={HeroOrbite} Besoin={NeedsTrame} />;
}
