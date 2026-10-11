import type { Metadata } from "next";
import { Accueil } from "@/components/site/Accueil";
import { HeroEventail } from "@/components/site/HeroEventail";

/** The homepage with the cards of « De quoi avez-vous besoin » as they were before the story scroll (the doors with a
 * sliding blue light, an index on phones), kept at a hidden address. Not indexed. */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Apercu() {
  return <Accueil Hero={HeroEventail} />;
}
