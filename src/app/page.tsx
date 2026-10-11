import { Accueil } from "@/components/site/Accueil";
import { HeroEventail } from "@/components/site/HeroEventail";
import { NeedsHistoire } from "@/components/site/NeedsHistoire";

/**
 * The homepage: the composition of `Accueil.tsx` under « l'éventail » (Charifa's choice of 12 October 2026, in place of
 * the light orbit, kept at /apercu/orbite), with the cards of « De quoi avez-vous besoin » as a story scroll (her code
 * of the same day; the index before it is kept at /apercu/besoin/index, the dithered cards at /apercu/besoin), and the
 * order demo on its dark stage with the phone's fine rim (`scene sansCadre`, her choice « le 3 » of 12 October 2026).
 */
export default function Page() {
  return <Accueil Hero={HeroEventail} Besoin={NeedsHistoire} scene sansCadre />;
}
