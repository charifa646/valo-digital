import type { Metadata } from "next";
import { Accueil } from "@/components/site/Accueil";
import { HeroEventail } from "@/components/site/HeroEventail";
import { NeedsHistoire } from "@/components/site/NeedsHistoire";

/**
 * The homepage with more colour (Charifa, 12 October 2026: « le site est terne en terme de couleur… un effet
 * glassmorphism à certaines cartes… le header peut prendre une couleur bleue bien dosée »): the blue header, glass cards
 * and colour at the edges of two parts. Kept at a hidden address until she chooses. Not indexed.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Apercu() {
  return <Accueil Hero={HeroEventail} Besoin={NeedsHistoire} scene sansCadre couleur />;
}
