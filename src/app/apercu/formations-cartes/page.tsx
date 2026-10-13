import type { Metadata } from "next";
import { Accueil } from "@/components/site/Accueil";
import { HeroEventail } from "@/components/site/HeroEventail";
import { NeedsHistoire } from "@/components/site/NeedsHistoire";

/**
 * The homepage as it is, with the training cards redrawn after the DESIGN.md of Airbnb (photo-first cards, badge on the photo),
 * Cal (restraint: lighter weights) and Apple (colour kept for action): a test of the awesome-design-md skill, 13 October 2026.
 * Hidden address until Charifa chooses. Not indexed.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

const Haut = () => <HeroEventail formes carres titre="selection" />;

export default function Apercu() {
  return <Accueil Hero={Haut} Besoin={NeedsHistoire} scene sansCadre servicesBleu formationsVariante="etiquette" />;
}
