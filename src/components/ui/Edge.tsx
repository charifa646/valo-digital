/**
 * The bottom of a section, cut like growth instead of rounded: the colour of
 * the next section climbs into this one. « steps » rise like the bars of a
 * chart; « rise » is a broken line going up, like a curve of results.
 */
const shapes = {
  steps: "M0 96V74H360V52H720V30H1080V8H1440V96Z",
  rise: "M0 96V72L190 80L380 54L540 64L760 30L920 42L1140 10L1290 20L1440 0V96Z",
};

export function Edge({ variant, className = "" }: { variant: keyof typeof shapes; className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 96"
      preserveAspectRatio="none"
      className={`pointer-events-none block h-[44px] w-full sm:h-[70px] lg:h-[96px] ${className}`}
    >
      <path d={shapes[variant]} fill="currentColor" />
    </svg>
  );
}
