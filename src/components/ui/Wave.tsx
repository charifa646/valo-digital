/**
 * A wave drawn over the end of a section. The site no longer has any (Charifa, 11 October 2026: « retire les vagues du
 * site, j'aime plus trop »): its sections now meet along a straight edge. Only the blue homepage kept in reserve
 * (`/apercu/orbite-bleue`) still draws this one. The earlier waves, anchored in the next section and cut by a mask
 * (`waveTop`, `WaveSpace` and the `.wave-*` rules of `globals.css`), are in the history of the repository.
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
