import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, ldJson, montantXof, pageMeta } from "@/lib/site";
import { formations, nav } from "@/lib/content";
import { ScrollProvider } from "@/components/site/Scroll";
import { SheetProvider } from "@/components/site/Sheet";
import { Header } from "@/components/site/Header";
import { Final } from "@/components/site/Final";
import { PageTitle } from "@/components/pages/PageTitle";
import { Catalogue } from "@/components/pages/Catalogue";

const plain = (s: string) => s.replace(/[  ]/g, " ");
const title = nav.find((n) => n.id === "formations")!.label;

export const metadata: Metadata = pageMeta({ path: "/formations", title: `${title} au digital à Ouagadougou · VALO DIGITAL`, description: plain(formations.lead) });

/** The trainings as structured data (14 October 2026): only what VALO wrote, name, modules and price in F CFA; no date, no duration, no
 * rating (none was given). Google can show them as courses. */
const cours = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: plain(formations.title.join(" ")),
  itemListElement: formations.items.map((f, i) => {
    const prix = montantXof(f.price);
    return {
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: plain(f.name),
        description: plain(f.modules),
        url: `${SITE_URL}/formations#formation-${f.id}`,
        inLanguage: "fr",
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        ...(prix ? { offers: { "@type": "Offer", price: prix, priceCurrency: "XOF", category: "Paid", url: `${SITE_URL}/formations#formation-${f.id}` } } : {}),
      },
    };
  }),
};

/** The page of all the trainings (7 October 2026): the homepage shows four and leads here; the menu leads to each one. */
export default function Formations() {
  return (
    <ScrollProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(cours) }} />
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
