import Image from "next/image";
import { IconCheck, IconMovie, IconPlayerPlayFilled } from "@tabler/icons-react";
import { hero } from "@/lib/content";
import { Chip, Panel, PanelHead } from "./kit";

// the production steps of the offer, as the catalogue lists them
const steps: { name: string; state: "done" | "now" | "next" }[] = [
  { name: "Recherche d’idées", state: "done" },
  { name: "Scripts", state: "done" },
  { name: "Tournage ou production", state: "done" },
  { name: "Montage et sous-titrage", state: "now" },
  { name: "Adaptation aux plateformes", state: "next" },
];

/** « Création de vidéos pour votre entreprise »: the vertical video being edited, and where the four videos stand. */
export function Montage() {
  return (
    <div className="flex h-full items-start gap-3 @[420px]:gap-4">
      {/* the video, 9:16, with its subtitles */}
      <div className="relative aspect-[9/16] w-[96px] shrink-0 overflow-hidden rounded-[12px] bg-ink shadow-float @[420px]:w-[128px]">
        <Image src="/images/ui/video-main.webp" alt="" fill sizes="140px" className="object-cover" />
        <span className="absolute left-1.5 top-1.5 rounded-[4px] bg-white/90 px-1 py-[2px] text-[8px] font-bold text-ink">9:16</span>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-2 pb-2 pt-8">
          <p className="text-center text-[7.5px] font-bold leading-[1.25] text-white [text-shadow:0_1px_2px_rgba(0,0,0,.5)] @[420px]:text-[8.5px]">
            {hero.title.join(" ")}
          </p>
          <div className="mt-2 flex items-center gap-1.5">
            <IconPlayerPlayFilled className="h-2.5 w-2.5 shrink-0 text-white" aria-hidden />
            <span className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/35">
              <span className="absolute inset-y-0 left-0 w-[38%] rounded-full bg-white" />
            </span>
          </div>
        </div>
      </div>

      {/* where the series stands */}
      <Panel className="min-w-0 flex-1">
        <PanelHead icon={<IconMovie stroke={2} />} title="Montage">
          <span className="hidden @[300px]:inline-flex">
            <Chip tone="blue">
              <span className="@[420px]:hidden">2 sur 4</span>
              <span className="hidden @[420px]:inline">Vidéo 2 sur 4</span>
            </Chip>
          </span>
        </PanelHead>
        <ul className="space-y-2 px-3 py-3 @[420px]:space-y-[9px] @[420px]:px-3.5">
          {steps.map((s) => (
            <li key={s.name} className="flex items-center gap-2">
              {s.state === "done" ? (
                <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#1FA35B] text-white">
                  <IconCheck className="h-2.5 w-2.5" stroke={3} aria-hidden />
                </span>
              ) : s.state === "now" ? (
                <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 border-electric">
                  <span className="h-1.5 w-1.5 rounded-full bg-electric" />
                </span>
              ) : (
                <span className="h-4 w-4 shrink-0 rounded-full border-2 border-hair" />
              )}
              <span className={`min-w-0 text-[9.5px] font-semibold leading-tight @[420px]:text-[10px] ${s.state === "next" ? "text-mute" : "text-ink"}`}>
                {s.name}
              </span>
              {s.state === "now" && (
                <span className="ml-auto hidden @[400px]:inline-flex">
                  <Chip tone="blue" dot>
                    En cours
                  </Chip>
                </span>
              )}
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-1 border-t border-hair bg-[#FBFCFE] px-3 py-2 @[300px]:flex @[420px]:px-3.5">
          <span className="mr-0.5 text-[8.5px] font-semibold text-mute">Formats</span>
          <Chip tone="gray">9:16</Chip>
          <Chip tone="gray">1:1</Chip>
          <Chip tone="gray">16:9</Chip>
        </div>
      </Panel>
    </div>
  );
}
