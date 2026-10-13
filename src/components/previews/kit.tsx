import type { CSSProperties, ReactNode } from "react";
import { IconChevronDown } from "@tabler/icons-react";

/**
 * The pieces of the small app windows that show each offer, drawn like a real
 * product: one white window, hairline borders, small type, one blue accent.
 * Every window is decorative (aria-hidden where it is placed): the offer itself
 * is told by the card's title and text.
 */

export function Panel({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`overflow-hidden rounded-[10px] border border-hair bg-white shadow-panel ${className}`}>{children}</div>;
}

export function PanelHead({ icon, title, children }: { icon: ReactNode; title: string; children?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-hair px-3.5 py-2.5">
      <span className="flex min-w-0 items-center gap-2">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-[6px] bg-frost text-electric [&_svg]:h-3.5 [&_svg]:w-3.5">{icon}</span>
        <span className="truncate text-[11.5px] font-bold tracking-[-0.01em] text-ink">{title}</span>
      </span>
      {children && <span className="flex shrink-0 items-center gap-1.5">{children}</span>}
    </div>
  );
}

export function Select({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-[6px] border border-hair bg-white py-[4px] pl-2 pr-1.5 text-[10px] font-semibold text-ink">
      {children}
      <IconChevronDown className="h-3 w-3 text-mute" stroke={2} aria-hidden />
    </span>
  );
}

export function Segmented({ items, active = 0 }: { items: string[]; active?: number }) {
  return (
    <span className="inline-flex rounded-[7px] bg-soft p-[2px] text-[9.5px] font-semibold">
      {items.map((t, i) => (
        <span key={t} className={`rounded-[5px] px-2 py-[3px] ${i === active ? "bg-white text-ink shadow-[0_1px_2px_rgba(11,18,51,.1)]" : "text-mute"}`}>
          {t}
        </span>
      ))}
    </span>
  );
}

type Tone = "green" | "blue" | "amber" | "gray";
const tones: Record<Tone, string> = {
  green: "bg-[#E7F6EE] text-[#12733F]",
  blue: "bg-frost text-electric",
  amber: "bg-[#FFF4D4] text-[#7A5600]",
  gray: "bg-soft text-[#5B6478]",
};
const dots: Record<Tone, string> = { green: "bg-[#1FA35B]", blue: "bg-electric", amber: "bg-[#E2A400]", gray: "bg-mute" };

/** A status, the way an app shows it: a tinted pill, its dot only when it is a state. */
export function Chip({ tone, dot = false, children }: { tone: Tone; dot?: boolean; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-1.5 py-[3px] text-[9px] font-semibold leading-none ${tones[tone]}`}>
      {dot && <span className={`h-[5px] w-[5px] rounded-full ${dots[tone]}`} />}
      {children}
    </span>
  );
}

/**
 * The pointer of the windows that play by themselves (idea 4, 8 October 2026): a small arrow whose tip is the element's
 * top left corner. Each window moves it with its own animation (`className`, `style`) and may add the ring of a click
 * as a child. `data-anim`: it waits off screen and stands still with « reduce motion » (`globals.css`).
 */
export function Curseur({ className = "", style, children }: { className?: string; style?: CSSProperties; children?: ReactNode }) {
  return (
    <span data-anim className={`pointer-events-none absolute left-0 top-0 z-20 block h-4 w-4 ${className}`} style={style}>
      {children}
      <svg viewBox="0 0 16 16" className="relative block h-4 w-4 drop-shadow-[0_2px_3px_rgba(11,18,51,.35)]" aria-hidden>
        <path d="M1.5 1.2v11.6l3.1-3 2.1 4.7 2.1-.9-2.1-4.6h4.4z" fill="#0B1233" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
