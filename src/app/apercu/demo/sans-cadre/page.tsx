import type { Metadata } from "next";
import { Accueil } from "@/components/site/Accueil";
import { HeroEventail } from "@/components/site/HeroEventail";
import { NeedsHistoire } from "@/components/site/NeedsHistoire";

/**
 * The order demo on its blue stage, the phone's frame reduced to a fine light rim (Charifa's question of 11 October
 * 2026: take the phone off and keep the Instrument version?). Hidden until she chooses. Not indexed.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Apercu() {
  return <Accueil Hero={HeroEventail} Besoin={NeedsHistoire} scene sansCadre />;
}
