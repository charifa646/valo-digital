import { Accueil } from "@/components/site/Accueil";
import { HeroEventail } from "@/components/site/HeroEventail";
import { BesoinVolets } from "@/components/site/BesoinVolets";

/**
 * The homepage: the composition of `Accueil.tsx` under « l'éventail » (Charifa's choice of 12 October 2026, in place of
 * the light orbit, kept at /apercu/orbite), and the order demo on its dark stage with the phone's fine rim (`scene
 * sansCadre`, her choice « le 3 » of 12 October 2026). Its top has the thrown shapes and the squares, and the title
 * selected as in a design tool (her choice of 13 October 2026; the italic in plain blue on dots is kept at
 * /apercu/eventail). The services stand on a band of electric blue (her choice of 13 October 2026, `servicesBleu`).
 *
 * 14 October 2026: « De quoi avez-vous besoin » as the editorial list with a photo following the cursor (her « version D »
 * of /apercu/propositions; the two photo doors before it stay in `NeedsPortes.tsx`), and the services and the trainings
 * each in a carousel of tall photo cards (« j'aime beaucoup les carousels »).
 */
const Haut = () => <HeroEventail formes carres titre="selection" />;
const Besoin = () => <BesoinVolets look="liste" id="besoin" />;

export default function Page() {
  return <Accueil Hero={Haut} Besoin={Besoin} scene sansCadre servicesBleu servicesCarrousel formationsVariante="carrousel" />;
}
