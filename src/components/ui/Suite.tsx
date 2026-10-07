import type { CSSProperties, ReactNode } from "react";

/**
 * The beginning of what comes next, seen through a blur that thickens towards the bottom and fades into the section,
 * with the button that leads to the whole of it laid on top (after « Progressive Blur », Magic UI and 21st.dev;
 * Charifa, 7 October 2026). The homepage stays short and the visitor still sees there is more.
 *
 * What lies under the blur is only a glimpse: hidden from screen readers, out of reach of the mouse and the keyboard
 * (`inert`), and drawn without its buttons by the sections that use it. `className` sets how much of it shows.
 */
const layers = [
  { blur: 1, from: 0, to: 30 },
  { blur: 3, from: 18, to: 58 },
  { blur: 7, from: 42, to: 84 },
  { blur: 14, from: 64, to: 100 },
];

const fade = "linear-gradient(180deg, #000 25%, transparent 96%)";

// a text is blurred as a whole instead, lightly then more, while it fades: layers of blur over sharp letters leave
// them smudged, as if in bold with a shadow
const softText = "linear-gradient(180deg, rgba(0,0,0,.9) 0%, rgba(0,0,0,.7) 30%, transparent 58%)";
const blurText = "linear-gradient(180deg, transparent 30%, rgba(0,0,0,.55) 50%, transparent 80%)";

// React 18 writes `inert` only as a string attribute (its types expect a boolean, which it would drop)
const inert = { inert: "" } as unknown as { inert: boolean };

const masked = (m: string) => ({ WebkitMaskImage: m, maskImage: m, WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat" }) as CSSProperties;

export function Suite({
  children,
  action,
  className = "h-[220px] sm:h-[260px]",
  text = false,
}: {
  children: ReactNode;
  action: ReactNode;
  className?: string;
  /** the glimpse of a text: a little blurred, then more, then gone, and the button under it at the start of the line */
  text?: boolean;
}) {
  return (
    <div className="relative">
      {text ? (
        <div aria-hidden {...inert} className={`pointer-events-none relative select-none overflow-hidden ${className}`}>
          {/* each mask on a layer the size of the window, so its fade is measured on what shows, not on the whole text */}
          <div className="absolute inset-0" style={masked(softText)}>
            <div style={{ filter: "blur(1.6px)" }}>{children}</div>
          </div>
          <div className="absolute inset-0" style={masked(blurText)}>
            <div style={{ filter: "blur(4.5px)" }}>{children}</div>
          </div>
        </div>
      ) : (
        <div aria-hidden {...inert} className={`pointer-events-none relative select-none overflow-hidden ${className}`} style={masked(fade)}>
          {children}
          {layers.map((l) => (
            <div
              key={l.blur}
              className="absolute inset-0"
              style={{
                ...masked(`linear-gradient(180deg, transparent ${l.from}%, #000 ${l.to}%)`),
                backdropFilter: `blur(${l.blur}px)`,
                WebkitBackdropFilter: `blur(${l.blur}px)`,
              }}
            />
          ))}
        </div>
      )}
      <div className={`relative z-[1] flex ${text ? "-mt-4 justify-start" : "-mt-14 justify-center sm:-mt-16"}`}>{action}</div>
    </div>
  );
}
