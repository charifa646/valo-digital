import type { Metadata } from "next";
import { formations, nav } from "@/lib/content";
import { ScrollProvider } from "@/components/site/Scroll";
import { SheetProvider } from "@/components/site/Sheet";
import { Header } from "@/components/site/Header";
import { Final } from "@/components/site/Final";
import { PageTitle } from "@/components/pages/PageTitle";
import { Catalogue } from "@/components/pages/Catalogue";

const plain = (s: string) => s.replace(/[  ]/g, " ");
const title = nav.find((n) => n.id === "formations")!.label;

export const metadata: Metadata = {
  title: `${title} · VALO DIGITAL`,
  description: plain(formations.lead),
};

/** The page of all the trainings (7 October 2026): the homepage shows four and leads here; the menu leads to each one. */
export default function Formations() {
  return (
    <ScrollProvider>
      <SheetProvider>
        <Header />
        <main id="contenu">
          <PageTitle title={title} />
          <Catalogue />
        </main>
        <Final />
      </SheetProvider>
    </ScrollProvider>
  );
}
