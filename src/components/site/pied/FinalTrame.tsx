import type { CSSProperties } from "react";
import Link from "next/link";
import { final, footer, nav } from "@/lib/content";
import { DemandeButton } from "../Sheet";
import { Anchor, NavLink } from "../Scroll";
import { BtnInner, btn } from "@/components/ui/Action";
import { ArrowUp } from "@/components/ui/Icons";
import { Words, count } from "@/components/ui/Words";
import { Colonnes, Contacts, Marque } from "./Liens";
import { Trame } from "./Trame";

/** The last call's title, cut where the catalogue's sentence breaks: « Prêt à faire avancer » / « votre activité ? ». */
const cut = final.title.indexOf("votre");
const line1 = final.title.slice(0, cut).trim();
const line2 = final.title.slice(cut);

/** « VALO »: the first word of the name is what the band of dots leaves clear. */
const nom = footer.name.split(" ")[0];

/**
 * The former foot of every page (12 to 14 October 2026), kept for comparison at /apercu/pied/nuit-trame since the foot after
 * Charifa's ChatGPT mock-up replaced it (`Final.tsx`, 14 October 2026). « La trame », after the « Dithered Footer » of 21st.dev that Charifa chose on 12 October
 * 2026 (it replaced « la scène », kept at /apercu/pied/scene). The last call is a sheet with rounded corners that
 * slides over the page (held in place behind it, as before), as light as the page: its title very large, the way to
 * write to VALO, the numbers written large; then the brand, the services and trainings, and under them a band of
 * dots that thicken towards the bottom with the name VALO left clear in them; then the copyright, the menu and the way
 * back to the top. Only VALO's own words: no newsletter, no social networks (none given). In night blue since 12 October
 * 2026 (her choice), with smaller words in a light grey instead of pure white; `ton="clair"` is the light one, at
 * /apercu/pied/trame.
 */
export function FinalTrame({ ton = "nuit" }: { ton?: "clair" | "nuit" }) {
  const nuit = ton === "nuit";
  return (
    <div data-ton={ton} data-dark={nuit || undefined} className={`feuille pied-trame ${nuit ? "on-dark" : ""}`}>
      <section id="contact" aria-labelledby="contact-title" className="gutter relative mx-auto max-w-page pt-12 sm:pt-16 lg:pt-20">
        <h2 id="contact-title" data-reveal="words" className="text-[clamp(1.8rem,0.8rem+2.4vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.035em]">
          <span className="block">
            <Words>{line1}</Words>
          </span>
          <span className="pied-mot block">
            <Words from={count(line1)}>{line2}</Words>
          </span>
        </h2>
        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          <div data-reveal style={{ ["--d" as string]: "0.35s" } as CSSProperties} className="lg:col-span-5">
            <p className="pretty pied-doux max-w-[26rem] text-[15px] font-medium leading-relaxed sm:text-[16px]">{final.text}</p>
            <DemandeButton className={btn(nuit ? "white" : "electric", "mt-7")}>
              <BtnInner>{final.cta}</BtnInner>
            </DemandeButton>
          </div>
          <Contacts className="lg:col-span-6 lg:col-start-7 lg:pt-1" />
        </div>
      </section>

      <footer className="relative mt-16 sm:mt-20 lg:mt-24">
        <div className="gutter mx-auto max-w-page">
          <div className="pied-trait grid gap-12 border-t pt-12 lg:grid-cols-12 lg:gap-10 lg:pt-14">
            <Marque className="lg:col-span-5" />
            <Colonnes className="lg:col-span-6 lg:col-start-7" />
          </div>
        </div>

        <div className="mt-10 sm:mt-12 lg:mt-14">
          <Trame nom={nom} />
        </div>

        <div className="pied-trait border-t">
          <div className="gutter mx-auto flex max-w-page flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
              <p className="pied-sourd text-[12.5px] font-medium">{footer.copyright}</p>
              <nav aria-label="Pied de page">
                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] font-semibold">
                  {nav.map((n) => (
                    <li key={n.id}>
                      <NavLink item={n} className="pied-menu transition" />
                    </li>
                  ))}
                  <li>
                    <Link href="/mentions-legales" className="pied-menu transition">
                      {footer.legal}
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <Anchor to="top" className="pied-menu group inline-flex items-center gap-3 self-start text-[12.5px] font-semibold transition sm:self-auto">
              <span>Retour en haut</span>
              <span className="pied-trait grid h-9 w-9 place-items-center rounded-full border transition duration-300 group-hover:-translate-y-0.5">
                <ArrowUp className="h-4 w-4" />
              </span>
            </Anchor>
          </div>
        </div>
      </footer>
    </div>
  );
}
