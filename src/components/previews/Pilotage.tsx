import { IconBrandInstagram, IconLayoutKanban, IconMovie, IconSpeakerphone } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { Panel, PanelHead, Select } from "./kit";

// the three verbs of the offer become the three phases; the lanes are VALO's own services
const phases = ["Structurer", "Coordonner", "Accélérer"];
const lanes: { name: string; icon: ReactNode; from: number; to: number }[] = [
  { name: "Réseaux sociaux", icon: <IconBrandInstagram stroke={2} />, from: 3, to: 70 },
  { name: "Publicité", icon: <IconSpeakerphone stroke={2} />, from: 28, to: 97 },
  { name: "Content vidéo", icon: <IconMovie stroke={2} />, from: 14, to: 84 },
];
const now = 45; // where today falls on the plan, in %
const done = (l: { from: number; to: number }) => Math.max(0, Math.min(100, ((now - l.from) / (l.to - l.from)) * 100));

/** « Direction marketing externalisée »: one plan that coordinates every channel, phase by phase. */
export function Pilotage() {
  return (
    <Panel>
      <PanelHead icon={<IconLayoutKanban stroke={2} />} title="Plan marketing">
        <Select>Ce trimestre</Select>
      </PanelHead>
      <div className="flex">
        {/* the channels */}
        <div className="w-[98px] shrink-0 @[300px]:w-[106px] @[480px]:w-[152px]">
          <div className="h-8 border-b border-hair" />
          {lanes.map((l) => (
            <div key={l.name} className="flex h-[38px] items-center gap-1.5 border-b border-hair pl-3 pr-1">
              <span className="hidden h-5 w-5 shrink-0 place-items-center rounded-[5px] bg-soft text-ink @[480px]:grid [&_svg]:h-3 [&_svg]:w-3">{l.icon}</span>
              <span className="truncate text-[9px] font-semibold text-ink @[300px]:text-[9.5px] @[480px]:text-[10px]">{l.name}</span>
            </div>
          ))}
          <div className="h-8" />
        </div>

        {/* the plan */}
        <div className="relative min-w-0 flex-1">
          <div className="grid h-8 grid-cols-3 border-b border-hair">
            {phases.map((p) => (
              <span
                key={p}
                className="grid place-items-center px-1 text-[7px] font-bold uppercase text-mute @[300px]:text-[8px] @[300px]:tracking-[0.05em] @[480px]:text-[9px]"
              >
                {p}
              </span>
            ))}
          </div>
          {lanes.map((l) => (
            <div key={l.name} className="relative h-[38px] border-b border-hair">
              <span
                className="absolute top-1/2 h-4 -translate-y-1/2 overflow-hidden rounded-[5px] bg-frost"
                style={{ left: `${l.from}%`, width: `${l.to - l.from}%` }}
              >
                <span className="absolute inset-y-0 left-0 rounded-[5px] bg-electric" style={{ width: `${done(l)}%` }} />
              </span>
            </div>
          ))}
          <div className="h-8" />

          {/* the phases' edges, then today */}
          <div className="pointer-events-none absolute inset-x-0 bottom-8 top-0 grid grid-cols-3">
            <span className="border-l border-hair" />
            <span className="border-l border-hair" />
            <span className="border-l border-hair" />
          </div>
          <span className="absolute bottom-[22px] top-8 w-px bg-electric" style={{ left: `${now}%` }} />
          <span
            className="absolute bottom-[7px] -translate-x-1/2 whitespace-nowrap rounded-full bg-electric px-1.5 py-[3px] text-[8px] font-bold leading-none text-white"
            style={{ left: `${now}%` }}
          >
            Aujourd’hui
          </span>
        </div>
      </div>
    </Panel>
  );
}
