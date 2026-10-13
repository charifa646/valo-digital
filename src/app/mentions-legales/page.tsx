import type { Metadata } from "next";
import { pageMeta } from "@/lib/site";
import { mentions } from "@/lib/content";
import { ScrollProvider } from "@/components/site/Scroll";
import { SheetProvider } from "@/components/site/Sheet";
import { Header } from "@/components/site/Header";
import { Final } from "@/components/site/Final";
import { PageTitle } from "@/components/pages/PageTitle";

export const metadata: Metadata = pageMeta({
  path: "/mentions-legales",
  title: "Mentions légales · VALO DIGITAL",
  description: "Mentions légales de VALO DIGITAL : éditeur du site, hébergeur, données personnelles.",
});

/** The legal notice (12 October 2026), reached from the foot of every page: its title as on the other pages, then the
 * blocks of `mentions` in content.ts, plainly, two columns on computers. */
export default function MentionsLegales() {
  return (
    <ScrollProvider>
      <SheetProvider>
        <Header />
        <main id="contenu">
          <PageTitle title={mentions.title} />
          <section aria-label={mentions.title} className="paper relative">
            <div className="gutter mx-auto max-w-page pb-24 pt-6 lg:pb-32">
              <dl className="grid gap-10 border-t border-hair pt-10 md:grid-cols-2 md:gap-x-16 lg:pt-14">
                {mentions.blocks.map((b) => (
                  <div key={b.h}>
                    <dt className="text-[13px] font-bold uppercase tracking-[0.08em] text-electric">{b.h}</dt>
                    {b.lines.map((l) => (
                      <dd key={l} className="pretty mt-2 max-w-[34rem] text-[15.5px] font-medium leading-relaxed text-body">
                        {l}
                      </dd>
                    ))}
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </main>
        <Final />
      </SheetProvider>
    </ScrollProvider>
  );
}
