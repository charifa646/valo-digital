import type { Metadata } from "next";
import { Accueil } from "@/components/site/Accueil";
import { HeroCiel } from "@/components/site/HeroCiel";
import { BesoinVolets } from "@/components/site/BesoinVolets";

/**
 * The homepage as it is, under the top « ciel », her title above the photo (version A) (after Charifa's ChatGPT mock-up, the parrot replaced by a woman, 14
 * October 2026). Hidden address until she chooses. Not indexed.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

const Besoin = () => <BesoinVolets look="liste" id="besoin" />;

export default function Apercu() {
  return <Accueil Hero={HeroCiel} Besoin={Besoin} scene sansCadre servicesBleu servicesCarrousel formationsVariante="carrousel" />;
}
