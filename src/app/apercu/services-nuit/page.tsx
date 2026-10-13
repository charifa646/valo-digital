import type { Metadata } from "next";
import { Accueil } from "@/components/site/Accueil";
import { HeroEventail } from "@/components/site/HeroEventail";
import { BesoinVolets } from "@/components/site/BesoinVolets";

/**
 * The homepage as it is, with every card of the services' carousel in night blue (proposal B of 14 October 2026, Charifa:
 * « le blanc est trop blanc »); the homepage shows proposal A, the cards in ice blue. Hidden address until she chooses.
 * Not indexed.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

const Haut = () => <HeroEventail formes carres titre="selection" />;
const Besoin = () => <BesoinVolets look="liste" id="besoin" />;

export default function Apercu() {
  return <Accueil Hero={Haut} Besoin={Besoin} scene sansCadre servicesBleu servicesCarrousel servicesTon="nuit" formationsVariante="carrousel" />;
}
