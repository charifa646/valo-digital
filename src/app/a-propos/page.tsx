import type { Metadata } from "next";
import { apropos } from "@/lib/content";
import { ScrollProvider } from "@/components/site/Scroll";
import { Header } from "@/components/site/Header";
import { Final } from "@/components/site/Final";
import { AproposHero } from "@/components/apropos/AproposHero";
import { QuiSuisJe } from "@/components/apropos/QuiSuisJe";
import { Parcours } from "@/components/apropos/Parcours";
import { Competences } from "@/components/apropos/Competences";
import { Equipe } from "@/components/apropos/Equipe";
import { Terrain } from "@/components/apropos/Terrain";
import { References } from "@/components/apropos/References";

const plain = (s: string) => s.replace(/[  ]/g, " ");

export const metadata: Metadata = {
  title: "À propos · VALO DIGITAL",
  description: plain(apropos.meta),
};

/**
 * The « À propos » page, from the portfolio: the agency, its founder, his
 * path, his skills, the team, the moments in the field and the references,
 * then the same last call and footer as the homepage.
 */
export default function APropos() {
  return (
    <ScrollProvider>
      <Header />
      <main id="contenu">
        <AproposHero />
        <QuiSuisJe />
        <Parcours />
        <Competences />
        <Equipe />
        <Terrain />
        <References />
      </main>
      <Final />
    </ScrollProvider>
  );
}
