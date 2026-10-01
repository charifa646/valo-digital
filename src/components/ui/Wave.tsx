/**
 * The bottom of a section, as a soft double wave in the colour of what comes
 * next: a pale wave behind, the full one in front. Three shapes, so no two
 * section ends look the same.
 */
const shapes = {
  swell: {
    back: "M0 58C200 22 430 12 690 40C950 68 1190 84 1440 46V120H0Z",
    front: "M0 88C240 54 500 50 760 76C1010 101 1230 108 1440 78V120H0Z",
  },
  rise: {
    back: "M0 70C260 78 520 52 760 30C1000 8 1240 14 1440 34V120H0Z",
    front: "M0 96C280 102 560 84 820 64C1060 46 1280 50 1440 66V120H0Z",
  },
  ripple: {
    back: "M0 52C180 76 360 80 540 60C720 40 900 20 1080 34C1230 46 1340 62 1440 54V120H0Z",
    front: "M0 82C200 100 400 102 600 86C800 70 1000 56 1200 68C1300 74 1380 82 1440 80V120H0Z",
  },
};

export function Wave({
  shape = "swell",
  front,
  back,
  flip = false,
  className = "",
}: {
  shape?: keyof typeof shapes;
  front: string;
  back: string;
  flip?: boolean;
  className?: string;
}) {
  const s = shapes[shape];
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={`pointer-events-none block h-[46px] w-full sm:h-[70px] lg:h-[96px] ${flip ? "-scale-x-100" : ""} ${className}`}
    >
      <path d={s.back} className={`fill-current ${back}`} />
      <path d={s.front} className={`fill-current ${front}`} />
    </svg>
  );
}
