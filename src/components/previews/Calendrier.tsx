import Image from "next/image";
import { IconBrandFacebookFilled, IconBrandInstagram, IconCalendarEvent, IconCopy, IconPlayerPlayFilled, IconPlus } from "@tabler/icons-react";
import { Chip, Curseur, Panel, PanelHead, Segmented } from "./kit";
import s from "./Calendrier.module.css";

type Net = "fb" | "ig";
type Post = {
  day: string;
  date: string;
  img: string;
  time: string;
  net: Net;
  kind: "photo" | "carrousel" | "reel";
  status: "Publié" | "Programmé" | "Brouillon";
};

// one week of a client's calendar; the middle day is today
const week: Post[] = [
  { day: "Lun", date: "6", img: "post-tissu", time: "09:00", net: "ig", kind: "carrousel", status: "Publié" },
  { day: "Mar", date: "7", img: "post-fura", time: "12:30", net: "fb", kind: "photo", status: "Publié" },
  { day: "Mer", date: "8", img: "post-assiette", time: "18:00", net: "ig", kind: "reel", status: "Programmé" },
  { day: "Jeu", date: "9", img: "post-formation", time: "10:00", net: "fb", kind: "photo", status: "Programmé" },
  { day: "Ven", date: "10", img: "post-reseaux", time: "17:30", net: "ig", kind: "reel", status: "Brouillon" },
];
const today = 2;
// Thursday is drawn at every width (three days on a phone, five on a wide card): its post is the one that gets scheduled
const story = 3;
const tone = { Publié: "green", Programmé: "blue", Brouillon: "gray" } as const;

function Network({ net }: { net: Net }) {
  return net === "fb" ? (
    <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#1877F2] text-white">
      <IconBrandFacebookFilled className="h-2.5 w-2.5" aria-hidden />
    </span>
  ) : (
    <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_110%,#FEDA75_0%,#FA7E1E_25%,#D62976_55%,#962FBF_75%,#4F5BD5_100%)] text-white">
      <IconBrandInstagram className="h-2.5 w-2.5" stroke={2.2} aria-hidden />
    </span>
  );
}

/**
 * « Gestion des réseaux sociaux »: the editorial calendar of the Business offer, one week of it. On screen it plays one
 * scheduling (`Calendrier.module.css`): a click in Thursday's empty slot makes its post, a click on its chip schedules
 * it. Still, it is the week as it stands.
 */
export function Calendrier() {
  return (
    <Panel>
      <PanelHead icon={<IconCalendarEvent stroke={2} />} title="Calendrier éditorial">
        <span className="hidden @[400px]:inline-flex">
          <Segmented items={["Semaine", "Mois"]} />
        </span>
        <Network net="fb" />
        <Network net="ig" />
      </PanelHead>
      <div className="grid grid-cols-3 @[440px]:grid-cols-5">
        {week.map((p, i) => {
          const live = i === story;
          return (
            <div
              key={p.day}
              className={`border-r border-hair px-1.5 pb-3 pt-2 last:border-r-0 @[440px]:px-2 ${i === 0 || i === 4 ? "hidden @[440px]:block" : ""} ${i === today ? "bg-[#F7F9FF]" : ""} ${i === 3 ? "border-r-0 @[440px]:border-r" : ""}`}
            >
              <p className="flex items-center gap-1.5 px-0.5 text-[9px] font-semibold uppercase tracking-[0.04em] text-mute">
                {p.day}
                <span
                  className={`grid h-[18px] min-w-[18px] place-items-center rounded-full text-[10.5px] tracking-normal ${i === today ? "bg-electric px-1 text-white" : "text-ink"}`}
                >
                  {p.date}
                </span>
              </p>
              {/* the card's own box: the empty slot, the card and the pointer share it, so the pointer moves in percents of it */}
              <div className="relative mt-2">
                {live && (
                  <span
                    data-anim
                    className={`absolute inset-0 grid place-items-center rounded-[7px] border border-dashed border-[#D3DAEA] bg-[#FAFBFF] ${s.slot}`}
                  >
                    <span className="grid h-5 w-5 place-items-center rounded-[6px] bg-soft text-mute">
                      <IconPlus className="h-3 w-3" stroke={2.2} aria-hidden />
                    </span>
                  </span>
                )}
                <div
                  data-anim={live || undefined}
                  className={`rounded-[7px] border border-hair bg-white p-1 shadow-[0_1px_2px_rgba(11,18,51,.05)] ${live ? `relative ${s.card}` : ""}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-soft">
                    <Image
                      src={`/images/ui/${p.img}.webp`}
                      alt=""
                      fill
                      sizes="120px"
                      data-anim={live || undefined}
                      className={live ? `object-cover ${s.photo}` : "object-cover"}
                    />
                    {p.kind !== "photo" && (
                      <span className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-[4px] bg-black/45 text-white">
                        {p.kind === "reel" ? (
                          <IconPlayerPlayFilled className="h-2.5 w-2.5" aria-hidden />
                        ) : (
                          <IconCopy className="h-2.5 w-2.5" stroke={2.2} aria-hidden />
                        )}
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 flex items-center justify-between px-0.5">
                    <span className="text-[9.5px] font-bold tabular-nums text-ink">{p.time}</span>
                    <Network net={p.net} />
                  </div>
                  <div className="mt-1.5 px-0.5 pb-0.5">
                    {live ? (
                      // the post is a draft first: its chip lies over the real one, and only the loop shows it
                      <span className="relative inline-flex">
                        <span data-anim className={`inline-flex ${s.scheduled}`}>
                          <Chip tone={tone[p.status]} dot>
                            {p.status}
                          </Chip>
                        </span>
                        <span data-anim className={`absolute left-0 top-0 inline-flex ${s.draft}`}>
                          <Chip tone={tone.Brouillon} dot>
                            Brouillon
                          </Chip>
                        </span>
                      </span>
                    ) : (
                      <Chip tone={tone[p.status]} dot>
                        {p.status}
                      </Chip>
                    )}
                  </div>
                </div>
                {live && (
                  // a box the size of the card: moved in percents, it puts the pointer's tip on the same spot of the card at every width
                  <span data-anim className={`pointer-events-none absolute inset-0 z-20 ${s.track}`}>
                    <Curseur className={s.pointer}>
                      <span data-anim className={s.ring} />
                    </Curseur>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
