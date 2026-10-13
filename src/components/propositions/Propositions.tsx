"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { formations, prestations } from "@/lib/content";
import { useSheet } from "@/components/site/Sheet";
import { GrandTitre } from "@/components/ui/GrandTitre";
import { BtnInner, btn } from "@/components/ui/Action";
import { formationPhotos } from "@/lib/photos";
import { Carrousel, type CarteCarrousel } from "@/components/site/Carrousel";
import { BesoinVolets } from "@/components/site/BesoinVolets";
import { photoService } from "@/components/site/Prestations";
import { FondateurMaquette } from "./FondateurMaquette";

/** A thin band naming each proposal on the hidden page (not part of any design). */
function Etiquette({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="sticky top-0 z-30 border-y border-[#F2C94C] bg-[#FFF6D6] px-4 py-2 text-center text-[12.5px] font-semibold text-[#6B5700]">
      Proposition {n} · {children}
    </div>
  );
}

export function Propositions() {
  const { open } = useSheet();
  const services: CarteCarrousel[] = prestations.offers.map((o) => ({
    id: o.id,
    img: photoService[o.id]?.img ?? "/images/formations/cm.webp",
    pos: photoService[o.id]?.pos,
    label: "",
    title: o.name,
    text: o.text,
    price: `${o.price}${o.note && o.note.startsWith("/") ? ` ${o.note}` : ""}`,
    onOpen: () => (o.sheet ? open(o.sheet) : open("demande-prestation", "responsable")),
  }));
  const cours: CarteCarrousel[] = formations.items.map((f) => ({
    id: f.id,
    img: `/images/formations/${formationPhotos[f.id] ?? f.id}.webp`,
    label: f.format,
    title: f.name,
    text: f.modules,
    price: f.price,
    onOpen: () => open("formations", f.id),
  }));

  const blocServices = (look: "apple" | "galerie") => (
    <section className="on-dark services-bleu relative isolate overflow-hidden text-white">
      <div className="gutter mx-auto max-w-page pb-20 pt-16 lg:pb-28 lg:pt-24">
        <GrandTitre id={`services-${look}`} clair>
          {prestations.grand}
        </GrandTitre>
        <div className="mt-8 max-w-[40rem] lg:mt-12">
          <h3 className="h2 balance text-white">{prestations.title}</h3>
          <p className="pretty mt-4 text-[16.5px] leading-relaxed text-white/80 lg:text-[17.5px]">{prestations.lead}</p>
        </div>
        <div className="mt-10 lg:mt-14">
          <Carrousel items={services} look={look} label={prestations.grand} />
        </div>
        <div className="mt-10 flex justify-center">
          <Link href="/services" className={btn("white")}>
            <BtnInner>{prestations.all}</BtnInner>
          </Link>
        </div>
      </div>
    </section>
  );
  const blocFormations = (look: "apple" | "galerie") => (
    <section className="paper relative bg-white">
      <div className="gutter mx-auto max-w-page pb-20 pt-16 lg:pb-28 lg:pt-24">
        <GrandTitre id={`formations-${look}`}>{formations.grand}</GrandTitre>
        <div className="mt-8 max-w-[40rem] lg:mt-12">
          <h3 className="h2 balance text-ink">
            {formations.title.slice(0, 2).join(" ")} <span className="text-electric">{formations.title[2]}</span>
          </h3>
          <p className="pretty mt-4 text-[16.5px] leading-relaxed text-body lg:text-[17.5px]">{formations.lead}</p>
        </div>
        <div className="mt-10 lg:mt-14">
          <Carrousel items={cours} look={look} label={formations.grand} />
        </div>
        <div className="mt-10 flex justify-center">
          <Link href="/formations" className={btn("electric")}>
            <BtnInner>{formations.cta}</BtnInner>
          </Link>
        </div>
      </div>
    </section>
  );

  return (
    <div className="titres-reduits">
      <Etiquette n="A">Carrousel « cartes hautes » (d’après Aceternity), services</Etiquette>
      {blocServices("apple")}
      <Etiquette n="A">Carrousel « cartes hautes », formations</Etiquette>
      {blocFormations("apple")}
      <Etiquette n="B">Carrousel « galerie » (d’après Shadcnblocks), services</Etiquette>
      {blocServices("galerie")}
      <Etiquette n="B">Carrousel « galerie », formations</Etiquette>
      {blocFormations("galerie")}
      <Etiquette n="C">De quoi avez-vous besoin : deux volets photo qui s’élargissent</Etiquette>
      <BesoinVolets look="volets" />
      <Etiquette n="D">De quoi avez-vous besoin : liste éditoriale, photo au survol</Etiquette>
      <BesoinVolets look="liste" />
      <Etiquette n="E">Mot du fondateur, mise en page de la maquette</Etiquette>
      <FondateurMaquette />
    </div>
  );
}
