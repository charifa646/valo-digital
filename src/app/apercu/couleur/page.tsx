import type { Metadata } from "next";
import { Accueil } from "@/components/site/Accueil";
import { HeroEventail } from "@/components/site/HeroEventail";
import { NeedsHistoire } from "@/components/site/NeedsHistoire";

/**
 * The homepage with its top on an electric blue ground, and glass cards and colour at the edges of two parts (Charifa,
 * 12 October 2026: « le site est terne en terme de couleur… le bleu dont je parlais c'était même le header »). The same
 * on a soft sky blue is at /apercu/couleur-ciel. Kept at a hidden address until she chooses. Not indexed.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

const HeroBleu = () => <HeroEventail ton="bleu" />;

export default function Apercu() {
  return <Accueil Hero={HeroBleu} Besoin={NeedsHistoire} scene sansCadre couleur />;
}
