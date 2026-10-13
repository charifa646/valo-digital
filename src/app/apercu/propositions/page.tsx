import type { Metadata } from "next";
import { ScrollProvider } from "@/components/site/Scroll";
import { SheetProvider } from "@/components/site/Sheet";
import { Header } from "@/components/site/Header";
import { Final } from "@/components/site/Final";
import { Propositions } from "@/components/propositions/Propositions";

/**
 * The proposals of 14 October 2026, side by side for Charifa to choose (« les carousels, minimum 3 », « des modèles super
 * stylés sur 21st.dev », « les cartes de quoi avez-vous besoin, c'est vilain », « reprendre la mise en page de ChatGPT pour le
 * mot du fondateur »), with the section titles a little smaller (`.titres-reduits`). Hidden address, not indexed.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Page() {
  return (
    <ScrollProvider>
      <SheetProvider>
        <Header />
        <main id="contenu">
          <Propositions />
        </main>
        <Final />
      </SheetProvider>
    </ScrollProvider>
  );
}
