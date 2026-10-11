import { Fragment } from "react";
import Image from "next/image";
import { IconCheck, IconMovie, IconPlayerPlayFilled } from "@tabler/icons-react";
import { hero } from "@/lib/content";
import { Chip, Panel, PanelHead } from "./kit";
import s from "./Montage.module.css";

// the production steps of the offer, as the catalogue lists them
const steps: { name: string; state: "done" | "now" | "next" }[] = [
  { name: "Recherche d’idées", state: "done" },
  { name: "Scripts", state: "done" },
  { name: "Tournage ou production", state: "done" },
  { name: "Montage et sous-titrage", state: "now" },
  { name: "Adaptation aux plateformes", state: "next" },
];

// the subtitle, and its words in three beats for the karaoke: three pieces keep the window light
const caption = "text-center text-[7.5px] font-bold leading-[1.25] @[420px]:text-[8.5px]";
const words = hero.title.join(" ").split(" ");
const beats = [words.slice(0, 3), words.slice(3, 6), words.slice(6)].map((w) => w.join(" "));
const lit = [s.beat1, s.beat2, s.beat3];

// the formats the series is cut for; on screen they turn blue one after the other, as if exported
const formats = ["9:16", "1:1", "16:9"];
const exported = [s.export1, s.export2, s.export3];

/**
 * « Création de vidéos pour votre entreprise »: the vertical video being edited, and where the four videos stand. On
 * screen it plays the edit (`Montage.module.css`): the video runs, its subtitle lights up beat by beat, the current
 * step turns and the formats come out one by one. Still, it is the edit as it stands.
 */
export function Montage() {
  return (
    <div className="flex h-full items-start gap-3 @[420px]:gap-4">
      {/* the video, 9:16, with its subtitles */}
      <div className="relative aspect-[9/16] w-[96px] shrink-0 overflow-hidden rounded-[12px] bg-ink shadow-float @[420px]:w-[128px]">
        <Image src="/images/ui/video-main.webp" alt="" fill sizes="140px" className="object-cover" />
        <span className="absolute left-1.5 top-1.5 rounded-[4px] bg-white/90 px-1 py-[2px] text-[8px] font-bold text-ink">9:16</span>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-2 pb-2 pt-8">
          <div className="relative">
            <p className={`${caption} text-white [text-shadow:0_1px_2px_rgba(0,0,0,.5)]`}>{hero.title.join(" ")}</p>
            {/* the same words laid on top in the same box, so they wrap the same; only the lit beat shows, in yellow */}
            <p aria-hidden className={`absolute inset-0 select-none text-transparent ${caption}`}>
              {beats.map((b, i) => (
                <Fragment key={b}>
                  {i > 0 && " "}
                  <span data-anim className={lit[i]}>
                    {b}
                  </span>
                </Fragment>
              ))}
            </p>
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <IconPlayerPlayFilled className="h-2.5 w-2.5 shrink-0 text-white" aria-hidden />
            <span className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/35">
              {/* a full bar slid to the left: still, 38 % of it shows; on screen it runs the whole track */}
              <span data-anim className={`absolute inset-0 rounded-full bg-white ${s.bar}`} />
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
          {steps.map((step) => (
            <li key={step.name} className="flex items-center gap-2">
              {step.state === "done" ? (
                <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#1FA35B] text-white">
                  <IconCheck className="h-2.5 w-2.5" stroke={3} aria-hidden />
                </span>
              ) : step.state === "now" ? (
                <span className="relative grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 border-electric">
                  <span className="h-1.5 w-1.5 rounded-full bg-electric" />
                  <span data-anim className={s.spin} />
                </span>
              ) : (
                <span className="h-4 w-4 shrink-0 rounded-full border-2 border-hair" />
              )}
              <span className={`min-w-0 text-[9.5px] font-semibold leading-tight @[420px]:text-[10px] ${step.state === "next" ? "text-mute" : "text-ink"}`}>
                {step.name}
              </span>
              {step.state === "now" && (
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
          {formats.map((f, i) => (
            // the blue chip lies over the gray one, the same size: only the loop shows it
            <span key={f} className="relative inline-flex">
              <Chip tone="gray">{f}</Chip>
              <span data-anim className={`absolute left-0 top-0 inline-flex ${exported[i]}`}>
                <Chip tone="blue">{f}</Chip>
              </span>
            </span>
          ))}
        </div>
      </Panel>
    </div>
  );
}
