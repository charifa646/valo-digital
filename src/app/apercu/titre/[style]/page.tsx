import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Accueil } from "@/components/site/Accueil";
import { HeroEventail, type StyleTitre } from "@/components/site/HeroEventail";
import { NeedsHistoire } from "@/components/site/NeedsHistoire";

/**
 * Three ways to set off the homepage's title, lighter and in navy (Charifa, 13 October 2026: « la police est trop grasse,
 * c'est trop noir… des styles pour surligner ou souligner les titres, qui tapent à l'œil »), on the top with the thrown
 * shapes and squares: /apercu/titre/marqueur, /apercu/titre/trait, /apercu/titre/brillance, and /apercu/titre/selection (her italic selected as in a design tool,
 * 13 October 2026). Not indexed.
 */
const styles: StyleTitre[] = ["marqueur", "trait", "brillance", "selection"];

export const dynamicParams = false;
export const generateStaticParams = () => styles.map((style) => ({ style }));
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Apercu({ params }: { params: { style: string } }) {
  const style = params.style as StyleTitre;
  if (!styles.includes(style)) notFound();
  const Hero = () => <HeroEventail formes carres titre={style} />;
  return <Accueil Hero={Hero} Besoin={NeedsHistoire} scene sansCadre />;
}
