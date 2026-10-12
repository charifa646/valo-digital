import type { Metadata } from "next";
import { Accueil } from "@/components/site/Accueil";
import { HeroEventail } from "@/components/site/HeroEventail";
import { NeedsHistoire } from "@/components/site/NeedsHistoire";

/**
 * The homepage with translucent blue shapes thrown behind its top (Charifa, 12 October 2026, after her visuals: a soft
 * blue wave, blurred blue spheres). Kept at a hidden address until she chooses. Not indexed.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

const HeroFormes = () => <HeroEventail formes />;

export default function Apercu() {
  return <Accueil Hero={HeroFormes} Besoin={NeedsHistoire} scene sansCadre />;
}
