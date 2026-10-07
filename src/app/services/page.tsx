import type { Metadata } from "next";
import { nav, prestations } from "@/lib/content";
import { ScrollProvider } from "@/components/site/Scroll";
import { SheetProvider } from "@/components/site/Sheet";
import { Header } from "@/components/site/Header";
import { Prestations } from "@/components/site/Prestations";
import { Solutions } from "@/components/site/Solutions";
import { Final } from "@/components/site/Final";
import { PageTitle } from "@/components/pages/PageTitle";

const plain = (s: string) => s.replace(/[  ]/g, " ");
const title = nav.find((n) => n.id === "prestations")!.label;

export const metadata: Metadata = {
  title: `${title} · VALO DIGITAL`,
  description: plain(prestations.lead),
};

/**
 * The page of all the services (7 October 2026): the four offers whole, then the three solutions that left the
 * homepage. The homepage shows the first two offers and leads here; the menu leads to each one (/services#…).
 */
export default function Services() {
  return (
    <ScrollProvider>
      <SheetProvider>
        <Header />
        <main id="contenu">
          <PageTitle title={title} />
          <Prestations full />
          <Solutions />
        </main>
        <Final />
      </SheetProvider>
    </ScrollProvider>
  );
}
