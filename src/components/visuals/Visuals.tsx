import type { CSSProperties } from "react";
import { Facebook, Heart, Instagram, Play, TikTok } from "@/components/ui/Icons";

/*
 * Small animated scenes for the cards. Decorative only (aria-hidden), made of
 * shapes rather than words or figures, so nothing is added to the copy. They
 * only run while their card is on screen (.play-when-in).
 */

const anim = (animation: string, delay = 0, extra: CSSProperties = {}): CSSProperties => ({ animation, animationDelay: `${delay}s`, ...extra });

const Bar = ({ className = "" }: { className?: string }) => <span className={`block h-2 rounded-full ${className}`} />;

/** Gestion des réseaux sociaux: a feed that fills itself, the platforms, a like. */
export function SocialGrid() {
  const tiles = [
    "from-electric to-azure",
    "from-sun to-[#ffe24a]",
    "from-[#8fa3ff] to-[#c8d2ff]",
    "from-night to-electric",
    "from-azure to-[#8fa3ff]",
    "from-frost to-[#c8d2ff]",
    "from-sky to-azure",
    "from-electric to-night",
    "from-[#c8d2ff] to-[#8fa3ff]",
  ];
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="dots absolute inset-0 opacity-70" />
      <div className="absolute left-[7%] top-[11%] w-[min(290px,60%)] rotate-[-5deg] rounded-[10px] bg-white p-3 shadow-lift">
        <div className="mb-3 flex items-center gap-2 px-1">
          <span className="h-7 w-7 rounded-full bg-gradient-to-br from-electric to-[#8fa3ff]" />
          <Bar className="w-20 bg-ink/15" />
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {tiles.map((t, i) => (
            <span
              key={i}
              data-anim
              className={`relative grid aspect-square place-items-center rounded-[10px] bg-gradient-to-br ${t}`}
              style={anim("pop-in .8s var(--ease) both", 0.15 + i * 0.09)}
            >
              {i === 4 && <Play className="ml-0.5 h-5 w-5 text-white" />}
            </span>
          ))}
        </div>
      </div>
      <div className="glass absolute right-[7%] top-[13%] flex gap-1.5 rounded-full p-1.5">
        {[Facebook, Instagram, TikTok].map((I, i) => (
          <span key={i} className="grid h-9 w-9 place-items-center rounded-full bg-electric text-white">
            <I className="h-[18px] w-[18px]" />
          </span>
        ))}
      </div>
      <div className="glass absolute bottom-[12%] right-[8%] flex items-center gap-3 rounded-[10px] p-2.5 pr-4">
        <span data-anim className="grid h-10 w-10 place-items-center rounded-full bg-electric/10 text-electric" style={anim("float 2.6s ease-in-out infinite")}>
          <Heart className="h-5 w-5" />
        </span>
        <span className="grid gap-1.5">
          <Bar className="w-20 bg-ink/15" />
          <Bar className="w-12 bg-ink/10" />
        </span>
      </div>
    </div>
  );
}

/** Publicité Facebook & Instagram: the ad, the target, the results rising. */
export function AdTarget() {
  const bars = [30, 44, 38, 56, 68, 88];
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="dots absolute inset-0 opacity-70" />
      <div className="absolute left-[8%] top-[9%] w-[54%] max-w-[230px] rotate-[-4deg] rounded-[10px] bg-white p-3 shadow-lift">
        <div className="flex items-center gap-2 px-1 pb-2.5">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-electric text-white">
            <Facebook className="h-3.5 w-3.5" />
          </span>
          <Bar className="w-16 bg-ink/15" />
        </div>
        <div className="relative h-[86px] overflow-hidden rounded-[8px] bg-gradient-to-br from-electric via-azure to-[#8fa3ff]">
          <span className="absolute -right-5 -top-7 h-20 w-20 rounded-full bg-sun" />
          <span className="absolute bottom-3 left-3 h-2.5 w-16 rounded-full bg-white/75" />
        </div>
        <div className="mt-3 grid gap-1.5 px-1">
          <Bar className="w-4/5 bg-ink/15" />
          <Bar className="w-3/5 bg-ink/10" />
        </div>
        <div className="mt-3 flex justify-end px-1">
          <span className="h-7 w-24 rounded-full bg-electric" />
        </div>
      </div>
      <div className="absolute right-[9%] top-[11%] h-[118px] w-[118px] sm:h-[132px] sm:w-[132px]">
        <span data-anim className="absolute inset-0 rounded-full border-2 border-electric/40" style={anim("ping-ring 2.6s ease-out infinite")} />
        <span className="absolute inset-0 rounded-full border-2 border-electric/15" />
        <span className="absolute inset-[18%] rounded-full border-2 border-electric/25" />
        <span className="absolute inset-[34%] rounded-full border-2 border-electric/45 bg-electric/10" />
        <span className="absolute inset-[45%] rounded-full bg-electric" />
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-electric/25" />
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-electric/25" />
      </div>
      <div className="glass absolute bottom-[10%] right-[8%] flex h-[92px] items-end gap-1.5 rounded-[10px] px-3.5 pb-3 pt-4">
        {bars.map((h, i) => (
          <span
            key={i}
            data-anim
            className={`block w-3 origin-bottom rounded-full ${i === bars.length - 1 ? "bg-electric" : "bg-electric/25"}`}
            style={anim("grow-y 1.2s var(--ease) both", 0.25 + i * 0.1, { height: `${h}%` })}
          />
        ))}
      </div>
    </div>
  );
}

/** Content vidéo: a vertical video playing, and the four that come with it. */
export function VideoFour() {
  const thumbs = ["from-electric to-azure", "from-night to-electric", "from-azure to-[#8fa3ff]", "from-sky to-electric"];
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="dots absolute inset-0 opacity-70" />
      <div className="absolute left-1/2 top-[7%] w-[30%] max-w-[132px] -translate-x-1/2 rotate-[3deg]">
        <div className="relative aspect-[9/16] overflow-hidden rounded-[10px] border-[5px] border-white bg-night shadow-lift">
          <div
            data-anim
            className="absolute inset-0 bg-[linear-gradient(120deg,#040b52,#0714d8,#3551ff,#8fa3ff,#0714d8)] bg-[length:300%_300%]"
            style={anim("pan 5s ease-in-out infinite alternate")}
          />
          <span className="glass-dark absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full">
            <Play className="ml-0.5 h-5 w-5 text-white" />
          </span>
          <span className="absolute bottom-7 left-1/2 h-2 w-3/5 -translate-x-1/2 rounded-full bg-white/80" />
          <span className="absolute bottom-3 left-3 right-3 h-1 overflow-hidden rounded-full bg-white/25">
            <span data-anim className="block h-full w-full origin-left rounded-full bg-sun" style={anim("grow-x 4s linear infinite")} />
          </span>
        </div>
      </div>
      <div className="absolute bottom-[9%] left-1/2 flex -translate-x-1/2 gap-2 rounded-[10px] bg-white p-2 shadow-card">
        {thumbs.map((t, i) => (
          <span key={i} className={`relative block aspect-[9/16] w-8 rounded-[6px] bg-gradient-to-br ${t}`}>
            <span data-anim className="absolute -inset-[3px] rounded-[7px] border-2 border-sun" style={anim("cycle 4s linear infinite", i, { opacity: 0 })} />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Direction marketing externalisée: a cockpit, the curve, the dials, the team linked up. */
export function PilotBoard() {
  const dials = [0.72, 0.5, 0.86];
  const c = 2 * Math.PI * 15;
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="dots-dark absolute inset-0 opacity-60" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(60%_80%_at_50%_100%,rgba(53,81,255,.45),transparent)]" />
      <div className="glass-dark absolute left-[7%] right-[7%] top-[11%] rounded-[10px] p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <Bar className="w-24 bg-white/30" />
          <span className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-sun" />
            <span className="h-2 w-2 rounded-full bg-white/30" />
            <span className="h-2 w-2 rounded-full bg-white/30" />
          </span>
        </div>
        <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-4 sm:gap-6">
          <svg viewBox="0 0 300 110" className="h-[100px] w-full overflow-visible sm:h-[112px]">
            <defs>
              <linearGradient id="pilot-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#8fa3ff" stopOpacity=".45" />
                <stop offset="1" stopColor="#8fa3ff" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[28, 56, 84].map((y) => (
              <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="rgba(255,255,255,.1)" strokeDasharray="3 6" />
            ))}
            <path d="M0 96C40 92 58 74 90 76S150 54 182 56 244 24 300 16V110H0Z" fill="url(#pilot-area)" />
            <path
              data-anim
              d="M0 96C40 92 58 74 90 76S150 54 182 56 244 24 300 16"
              fill="none"
              stroke="#fff"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeDasharray="420"
              style={anim("draw 2.4s var(--ease) both", 0.2, { ["--len" as string]: 420 })}
            />
            <circle cx="300" cy="16" r="5.5" fill="#FDEC05" />
          </svg>
          <div className="grid gap-2.5">
            {dials.map((v, i) => (
              <svg key={i} viewBox="0 0 40 40" className="h-9 w-9 -rotate-90 sm:h-10 sm:w-10">
                <circle cx="20" cy="20" r="15" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="4.5" />
                <circle
                  data-anim
                  cx="20"
                  cy="20"
                  r="15"
                  fill="none"
                  stroke={i === 2 ? "#FDEC05" : "#fff"}
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeDasharray={c}
                  strokeDashoffset={c * (1 - v)}
                  style={anim("draw 1.8s var(--ease) both", 0.4 + i * 0.15, { ["--len" as string]: c })}
                />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-[9%] left-[7%] flex items-center">
        {["from-electric to-azure", "from-azure to-[#8fa3ff]", "from-sky to-electric", "from-[#8fa3ff] to-frost"].map((t, i) => (
          <span key={i} className={`-ml-2 h-9 w-9 rounded-full border-[3px] border-night bg-gradient-to-br first:ml-0 ${t}`} />
        ))}
        <span className="ml-3 h-px w-12 bg-gradient-to-r from-white/60 to-transparent" />
      </div>
    </div>
  );
}

/** Diagnostic digital: the scan looks for what is stuck. */
export function ScanRadar({ dark = false }: { dark?: boolean }) {
  const line = dark ? "border-white/25" : "border-electric/20";
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className={`${dark ? "dots-dark" : "dots"} absolute inset-0 opacity-70`} />
      <div className={`absolute left-1/2 top-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full border ${line}`}>
        <span className={`absolute inset-[18%] rounded-full border ${line}`} />
        <span className={`absolute inset-[36%] rounded-full border ${line}`} />
        <span
          data-anim
          className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(53,81,255,.45),rgba(53,81,255,0)_30%)]"
          style={anim("spin 3.2s linear infinite")}
        />
        <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric" />
        {[
          ["left-[22%] top-[26%]", 0],
          ["left-[68%] top-[40%]", 1.1],
          ["left-[40%] top-[72%]", 2.1],
        ].map(([pos, d]) => (
          <span
            key={pos as string}
            data-anim
            className={`absolute h-2.5 w-2.5 rounded-full bg-sun ${pos}`}
            style={anim("blink 3.2s ease-in-out infinite", d as number)}
          />
        ))}
      </div>
    </div>
  );
}

/** Accompagnement business & croissance: the path climbs, step by step. */
export function GrowthPath() {
  const pts: [number, number][] = [
    [26, 146],
    [118, 110],
    [204, 70],
    [296, 24],
  ];
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="dots-dark absolute inset-0 opacity-60" />
      <svg viewBox="0 0 320 170" className="absolute inset-x-[6%] top-[12%] h-[76%] w-[88%] overflow-visible">
        <path d="M26 146C70 146 82 116 118 110S176 78 204 70 262 30 296 24" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="10" strokeLinecap="round" />
        <path
          data-anim
          d="M26 146C70 146 82 116 118 110S176 78 204 70 262 30 296 24"
          fill="none"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="340"
          style={anim("draw 2.6s var(--ease) both", 0.2, { ["--len" as string]: 340 })}
        />
        {pts.map(([x, y], i) => (
          <g key={i} data-anim style={anim("pop-in .7s var(--ease) both", 0.5 + i * 0.45, { transformOrigin: `${x}px ${y}px` })}>
            <circle cx={x} cy={y} r={i === pts.length - 1 ? 11 : 8} fill={i === pts.length - 1 ? "#FDEC05" : "#fff"} />
            <circle cx={x} cy={y} r={i === pts.length - 1 ? 18 : 14} fill="none" stroke="rgba(255,255,255,.35)" />
          </g>
        ))}
      </svg>
    </div>
  );
}

/** Content vidéo (solution): a timeline being cut, the playhead running. */
export function Timeline() {
  const tracks = [
    ["w-[26%] bg-electric", "w-[18%] bg-azure", "w-[30%] bg-[#8fa3ff]"],
    ["w-[40%] bg-sun", "w-[22%] bg-electric"],
    ["w-[14%] bg-[#c8d2ff]", "w-[34%] bg-azure", "w-[20%] bg-electric"],
  ];
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="dots absolute inset-0 opacity-70" />
      <div className="absolute inset-x-[8%] top-1/2 -translate-y-1/2 rounded-[10px] bg-white p-3.5 shadow-card">
        <div className="mb-3 flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-electric text-white">
            <Play className="ml-0.5 h-3.5 w-3.5" />
          </span>
          <Bar className="w-16 bg-ink/15" />
        </div>
        <div className="relative grid gap-2">
          {tracks.map((row, r) => (
            <div key={r} className="flex gap-1.5">
              {row.map((c, i) => (
                <span key={i} className={`h-5 rounded-[6px] ${c}`} />
              ))}
            </div>
          ))}
          <span data-anim className="absolute -bottom-1 -top-1 left-0 w-full" style={anim("slide-x 3.6s linear infinite", 0, { ["--to" as string]: "100%" })}>
            <span className="absolute inset-y-0 left-0 w-0.5 rounded-full bg-ink" />
            <span className="absolute -left-[5px] -top-1.5 h-3 w-3 rounded-full bg-ink" />
          </span>
        </div>
      </div>
    </div>
  );
}
