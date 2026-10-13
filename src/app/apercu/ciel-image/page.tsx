import type { Metadata } from "next";
import { Accueil } from "@/components/site/Accueil";
import { HeroCiel } from "@/components/site/HeroCiel";
import { BesoinVolets } from "@/components/site/BesoinVolets";

/**
 * The homepage as it is, under the top « ciel », the photo first and the title at the foot as in the mock-up (version B) (after Charifa's ChatGPT mock-up, the parrot replaced by a woman, 14
 * October 2026). Hidden address until she chooses. Not indexed.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

const Haut = () => <HeroCiel ordre="image" />;
const Besoin = () => <BesoinVolets look="liste" id="besoin" />;

export default function Apercu() {
  return <Accueil Hero={Haut} Besoin={Besoin} scene sansCadre servicesBleu servicesCarrousel formationsVariante="carrousel" />;
}
