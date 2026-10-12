import { Accueil } from "@/components/site/Accueil";
import { HeroEventail } from "@/components/site/HeroEventail";
import { NeedsHistoire } from "@/components/site/NeedsHistoire";

/**
 * The homepage: the composition of `Accueil.tsx` under « l'éventail » (Charifa's choice of 12 October 2026, in place of
 * the light orbit, kept at /apercu/orbite), with the cards of « De quoi avez-vous besoin » as a story scroll (her code
 * of the same day; the index before it is kept at /apercu/besoin/index, the dithered cards at /apercu/besoin), and the
 * order demo on its dark stage with the phone's fine rim (`scene sansCadre`, her choice « le 3 » of 12 October 2026). Its
 * top has the thrown shapes and the squares, and the title selected as in a design tool (her choice of 13 October 2026;
 * the italic in plain blue on dots is kept at /apercu/eventail). The services stand on a band of electric blue (her
 * choice of 13 October 2026, `servicesBleu`).
 */
const Haut = () => <HeroEventail formes carres titre="selection" />;

export default function Page() {
  return <Accueil Hero={Haut} Besoin={NeedsHistoire} scene sansCadre servicesBleu />;
}
