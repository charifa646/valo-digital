import type { Metadata } from "next";
import { Accueil } from "@/components/site/Accueil";
import { HeroEventail } from "@/components/site/HeroEventail";
import { NeedsHistoire } from "@/components/site/NeedsHistoire";

/**
 * The same as /apercu/couleur with the top on a soft sky blue instead of the electric blue (Charifa, 12 October 2026).
 * Hidden address, not indexed.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

const HeroCiel = () => <HeroEventail ton="ciel" />;

export default function Apercu() {
  return <Accueil Hero={HeroCiel} Besoin={NeedsHistoire} scene sansCadre couleur />;
}
