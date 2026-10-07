import Image from "next/image";
import { IconBrandWhatsapp, IconBuildingStore, IconEye, IconPlus, IconShoppingBag, IconSpeakerphone, IconUserPlus, IconWorld } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { Chip, Panel, PanelHead } from "./kit";

// the three goals the copy names: visibilité, prospects, ventes
const campaigns: { name: string; goal: string; icon: ReactNode; live: boolean }[] = [
  { name: "Nouvelle collection", goal: "Visibilité", icon: <IconEye stroke={2} />, live: true },
  { name: "Demande de devis", goal: "Prospects", icon: <IconUserPlus stroke={2} />, live: true },
  { name: "Boutique en ligne", goal: "Ventes", icon: <IconShoppingBag stroke={2} />, live: false },
];

/** « Campagnes publicitaires pour attirer des clients »: the ad as people will see it, next to the campaigns behind it. */
export function Campagnes() {
  return (
    <div className="relative h-full @[440px]:flex @[440px]:items-start">
      {/* the ad, in the feed (behind the campaigns on small screens, beside them on large ones) */}
      <div className="absolute left-0 top-1 hidden w-[118px] -rotate-[4deg] @[300px]:block overflow-hidden rounded-[12px] border border-hair bg-white shadow-float @[440px]:relative @[440px]:left-auto @[440px]:top-auto @[440px]:z-[1] @[440px]:mt-5 @[440px]:w-[150px] @[440px]:shrink-0 @[440px]:-rotate-[3deg]">
        <div className="flex items-center gap-1.5 px-2 py-1.5">
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink text-white">
            <IconBuildingStore className="h-3 w-3" stroke={2} aria-hidden />
          </span>
          <span className="min-w-0 leading-none">
            <span className="block truncate text-[8.5px] font-bold text-ink">Votre entreprise</span>
            <span className="mt-0.5 flex items-center gap-0.5 text-[7.5px] font-medium text-mute">
              Sponsorisé <IconWorld className="h-2 w-2" stroke={2} aria-hidden />
            </span>
          </span>
        </div>
        <div className="relative aspect-square bg-soft">
          <Image src="/images/ui/ad-produit.webp" alt="" fill sizes="160px" className="object-cover" />
        </div>
        <div className="flex items-center justify-between gap-1 bg-soft px-2 py-1.5">
          <span className="text-[8px] font-bold leading-tight text-ink">Envoyer un message</span>
          <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#25D366] text-white">
            <IconBrandWhatsapp className="h-2.5 w-2.5" stroke={2.2} aria-hidden />
          </span>
        </div>
      </div>

      {/* the campaigns, in the ads manager */}
      <Panel className="relative z-[1] @[300px]:absolute @[300px]:right-0 @[300px]:top-9 @[300px]:w-[calc(100%-84px)] @[440px]:relative @[440px]:right-auto @[440px]:top-auto @[440px]:-ml-4 @[440px]:w-auto @[440px]:min-w-0 @[440px]:flex-1">
        <PanelHead icon={<IconSpeakerphone stroke={2} />} title="Campagnes">
          <span className="inline-flex items-center gap-0.5 rounded-[6px] bg-electric py-[4px] pl-1 pr-2 text-[9.5px] font-bold text-white">
            <IconPlus className="h-3 w-3" stroke={2.4} aria-hidden />
            Créer
          </span>
        </PanelHead>
        <ul className="divide-y divide-hair">
          {campaigns.map((c) => (
            <li key={c.name} className="flex items-center gap-2 py-2 pl-3 pr-2.5 @[440px]:pl-7">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-[6px] bg-soft text-ink [&_svg]:h-3.5 [&_svg]:w-3.5">{c.icon}</span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block truncate text-[9.5px] font-bold text-ink @[440px]:text-[10px]">{c.name}</span>
                <span className="mt-0.5 block truncate text-[8.5px] font-medium text-mute">
                  Objectif : <span className="font-semibold text-ink">{c.goal}</span>
                </span>
              </span>
              <Chip tone={c.live ? "green" : "amber"} dot>
                {c.live ? "Active" : "En revue"}
              </Chip>
            </li>
          ))}
        </ul>
        <div className="hidden flex-wrap items-center gap-1 border-t border-hair bg-[#FBFCFE] py-2 pl-7 pr-2.5 @[440px]:flex">
          <span className="mr-0.5 text-[8.5px] font-semibold text-mute">Ciblage</span>
          <Chip tone="gray">Ouagadougou</Chip>
          <Chip tone="gray">Facebook</Chip>
          <Chip tone="gray">Instagram</Chip>
        </div>
      </Panel>
    </div>
  );
}
