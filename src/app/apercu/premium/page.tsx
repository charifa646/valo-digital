import type { Metadata } from "next";
import { Accueil } from "@/components/site/Accueil";
import { HeroEventail } from "@/components/site/HeroEventail";
import { NeedsHistoire } from "@/components/site/NeedsHistoire";

/**
 * The premium pass of the homepage (Charifa, 13 October 2026: « un aspect site web premium élégant au lieu que ce soit
 * beaucoup plus une page de vente », after a reading of her design skills, taste-skill and ui-ux-pro-max): the same
 * words, prices and photos, with fewer devices. The figures as a light bento with a real photo, no page turning night
 * blue, no photo wall; the « besoin » cards in blues only, without numbers; the services with real photos of the team
 * instead of windows drawn in code; the trainings as an editorial list whose photo follows the hand; the method
 * without its numbers nor its large faded word; one rule of corners (round buttons, 8 to 10 px cards). The top of the
 * page is the one she chose. Hidden address until she chooses. Not indexed.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

const Haut = () => <HeroEventail formes carres titre="selection" />;
const Besoin = () => <NeedsHistoire premium />;

export default function Apercu() {
  return <Accueil Hero={Haut} Besoin={Besoin} scene sansCadre servicesBleu formationsVariante="liste" premium />;
}
