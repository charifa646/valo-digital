import type { Metadata } from "next";
import { Accueil } from "@/components/site/Accueil";
import { HeroOrbite } from "@/components/site/HeroOrbite";
import { NeedsHistoire } from "@/components/site/NeedsHistoire";

/**
 * The homepage with the cards of « De quoi avez-vous besoin aujourd'hui ? » as a story scroll (the component Charifa
 * sent on 12 October 2026): kept at a hidden address, next to /apercu/besoin (the dithered cards), until she chooses.
 * Not indexed.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Apercu() {
  return <Accueil Hero={HeroOrbite} Besoin={NeedsHistoire} />;
}
