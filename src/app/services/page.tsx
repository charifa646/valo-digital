import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, ldJson, montantXof, pageMeta } from "@/lib/site";
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

export const metadata: Metadata = pageMeta({ path: "/services", title: `${title} de marketing digital à Ouagadougou · VALO DIGITAL`, description: plain(prestations.lead) });

/** The services as structured data (14 October 2026): name, VALO's sentence and the amount it states (« à partir de »); no rating,
 * no review, nothing that was not given. */
const offres = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: plain(prestations.title),
  itemListElement: prestations.offers.map((o, i) => {
    const prix = montantXof(o.price);
    return {
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: plain(o.name),
        description: plain(o.text),
        url: `${SITE_URL}/services#${o.id}`,
        areaServed: "Ouagadougou",
        provider: { "@type": "ProfessionalService", name: SITE_NAME, url: SITE_URL },
        ...(prix
          ? { offers: { "@type": "Offer", priceCurrency: "XOF", priceSpecification: { "@type": "PriceSpecification", minPrice: prix, priceCurrency: "XOF" }, url: `${SITE_URL}/services#${o.id}` } }
          : {}),
      },
    };
  }),
};

/**
 * The page of all the services (7 October 2026): the four offers whole, then the three solutions that left the
 * homepage. The homepage shows the first two offers and leads here; the menu leads to each one (/services#…).
 */
export default function Services() {
  return (
    <ScrollProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(offres) }} />
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
