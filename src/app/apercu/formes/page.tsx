import type { Metadata } from "next";
import { Accueil } from "@/components/site/Accueil";
import { HeroEventail } from "@/components/site/HeroEventail";
import { NeedsHistoire } from "@/components/site/NeedsHistoire";

/**
 * The homepage with translucent blue shapes thrown behind its top (Charifa, 12 October 2026, after her visuals: a soft
 * blue wave, blurred blue spheres), on patches of fine squares, a few filled and out of focus (13 October 2026; the blue menu tried there was set aside). Kept at a hidden address until she chooses. Not indexed.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

const HeroFormes = () => <HeroEventail formes carres />;

export default function Apercu() {
  return <Accueil Hero={HeroFormes} Besoin={NeedsHistoire} scene sansCadre />;
}
