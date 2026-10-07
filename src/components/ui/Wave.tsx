/**
 * The waves between sections, anchored in them (Charifa, 7 October 2026). No ribbon is drawn between two sections
 * any more: the section that comes next rises over the end of the one before by the height of the wave, and its own
 * top edge is cut as a wave (`waveTop`, a mask written in globals.css). The wave so has that section's white, grain,
 * halo or blue, and no straight line shows under it. The section before ends with the room the wave takes
 * (`WaveSpace`). One wave, three shapes, so no two section ends look the same.
 */
export type WaveShape = "swell" | "rise" | "ripple";

/** `line`: between two light sections, a fine line along the edge of the wave so it reads on every screen. */
export const waveTop = (shape: WaveShape, flip = false, line = false) => `wave-top wave-${shape}${flip ? "-flip" : ""}${line ? " wave-line" : ""}`;

export function WaveSpace() {
  return <div aria-hidden className="wave-space" />;
}

/**
 * The former double wave (a pale wave behind the full one), drawn over the end of a section. Only the blue
 * homepage kept in reserve (`/apercu/orbite-bleue`) still uses it.
 */
const shapes = {
  rise: {
    back: "M0 70C260 78 520 52 760 30C1000 8 1240 14 1440 34V120H0Z",
    front: "M0 96C280 102 560 84 820 64C1060 46 1280 50 1440 66V120H0Z",
  },
};

export function Wave({ front, back, className = "" }: { front: string; back: string; className?: string }) {
  const s = shapes.rise;
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={`pointer-events-none block h-[46px] w-full sm:h-[70px] lg:h-[96px] ${className}`}
    >
      <path d={s.back} className={`fill-current ${back}`} />
      <path d={s.front} className={`fill-current ${front}`} />
    </svg>
  );
}
