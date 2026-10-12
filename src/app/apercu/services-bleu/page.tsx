import type { Metadata } from "next";
import { Accueil } from "@/components/site/Accueil";
import { HeroEventail } from "@/components/site/HeroEventail";
import { NeedsHistoire } from "@/components/site/NeedsHistoire";

/**
 * The homepage as it is, with the services on a band of electric blue (Charifa, 13 October 2026: « casser la neutralité
 * du blanc en mettant la section service en bleu »). Hidden address until she chooses. Not indexed.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

const Haut = () => <HeroEventail formes carres titre="selection" />;

export default function Apercu() {
  return <Accueil Hero={Haut} Besoin={NeedsHistoire} scene sansCadre servicesBleu />;
}
