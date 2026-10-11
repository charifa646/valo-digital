import { Accueil } from "@/components/site/Accueil";
import { HeroOrbite } from "@/components/site/HeroOrbite";

/** The homepage: the composition of `Accueil.tsx` under the light orbit, the client's choice of 7 October 2026. */
export default function Page() {
  return <Accueil Hero={HeroOrbite} />;
}
