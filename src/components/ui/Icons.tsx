type P = { className?: string };

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const ArrowRight = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...line}>
    <path d="M4.5 12h14M13 6.5l5.5 5.5-5.5 5.5" />
  </svg>
);

export const ArrowUpRight = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...line}>
    <path d="M7 17L17 7M8.5 7H17v8.5" />
  </svg>
);

export const WhatsApp = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...line} strokeWidth={1.7}>
    <path d="M3.6 20.4l1.2-4.1a8.4 8.4 0 1 1 3.1 3z" />
    <path
      d="M9.1 8.6c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.2-.1.4 0 .5.6 1 1.4 1.8 2.4 2.4.2.1.4.1.5 0l.6-.5c.2-.1.4-.2.6-.1l1.7.7c.3.1.4.3.4.5v.5c0 .3-.1.6-.6.8-.6.3-1.3.4-2 .2-2.6-.7-4.6-2.7-5.3-5.3-.2-.7-.1-1.4.2-2z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

export const Phone = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...line}>
    <path d="M6.6 3.8h2.6l1.4 4.1-2 1.4a11.5 11.5 0 0 0 6.1 6.1l1.4-2 4.1 1.4v2.6c0 1.1-.9 2-2 2A15.9 15.9 0 0 1 4.6 5.8c0-1.1.9-2 2-2z" />
  </svg>
);

export const Mail = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...line}>
    <rect x="3.2" y="5.5" width="17.6" height="13" rx="2.4" />
    <path d="M4 7.2l8 5.8 8-5.8" />
  </svg>
);

export const Pin = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...line}>
    <path d="M12 21s-6.8-6.1-6.8-11.2a6.8 6.8 0 0 1 13.6 0C18.8 14.9 12 21 12 21z" />
    <circle cx="12" cy="9.8" r="2.5" />
  </svg>
);

export const Check = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...line} strokeWidth={2.4}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export const Close = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...line} strokeWidth={2.1}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const Menu = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...line} strokeWidth={2.1}>
    <path d="M4 8h16M8 16h12" />
  </svg>
);

/* the four doors */
export const Cap = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...line}>
    <path d="M2.8 9.2L12 4.8l9.2 4.4L12 13.6z" />
    <path d="M6.6 11.2v4.3c1.4 1.5 3.3 2.3 5.4 2.3s4-.8 5.4-2.3v-4.3M21.2 9.2v5.4" />
  </svg>
);

export const Scan = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...line}>
    <circle cx="10.8" cy="10.8" r="6" />
    <path d="M15.3 15.3l4.9 4.9M8.2 10.8h5.2M10.8 8.2v5.2" />
  </svg>
);

export const Handoff = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...line}>
    <circle cx="8" cy="8.2" r="3" />
    <circle cx="17" cy="9.6" r="2.4" />
    <path d="M2.8 19.2c.6-3 2.7-4.8 5.2-4.8s4.6 1.8 5.2 4.8M14.2 15c.9-.9 1.8-1.3 2.8-1.3 2 0 3.6 1.5 4.1 4" />
  </svg>
);

export const Rocket = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...line}>
    <path d="M13.8 16.6l-6.4-6.4C9.6 5.6 13.4 3.2 20 3.9c.7 6.6-1.7 10.4-6.2 12.7z" />
    <circle cx="15.2" cy="8.8" r="1.7" />
    <path d="M7.4 10.2l-3.1-.5 2.6-3.1 3.6.5M13.8 16.6l.5 3.1 3.1-2.6-.5-3.6M6.4 14.9c-1.3.4-2.3 1.9-2.3 4.9 3-.1 4.5-1 4.9-2.3" />
  </svg>
);

/* the four words of the hero */
export const Megaphone = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...line}>
    <path d="M3.5 10v4h3.3l8 4.8V5.2L6.8 10z" />
    <path d="M18.2 9.3a4.2 4.2 0 0 1 0 5.4M7.3 14.2l1.5 5.3h2.7" />
  </svg>
);

export const Target = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...line}>
    <circle cx="12" cy="12" r="8.3" />
    <circle cx="12" cy="12" r="4.6" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);

export const Cart = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...line}>
    <path d="M3 4.2h2.4l2.3 11h10.6l2-7.6H6.3" />
    <circle cx="9.4" cy="19.2" r="1.3" />
    <circle cx="16.7" cy="19.2" r="1.3" />
  </svg>
);

/* the three pillars */
export const Compass = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...line}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M15.6 8.4l-2 5.2-5.2 2 2-5.2z" />
  </svg>
);

export const Bolt = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...line}>
    <path d="M13.2 2.8L5.2 13.4h6l-1 7.8 8-10.6h-6z" />
  </svg>
);

export const Trend = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...line}>
    <path d="M3.5 17.5l5.6-5.6 3.8 3.8 7.6-7.6M14.8 8.1h5.7v5.7" />
  </svg>
);

export const Play = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path d="M8.5 6.2v11.6c0 .7.8 1.1 1.4.7l8.6-5.8c.5-.4.5-1.1 0-1.5L9.9 5.5c-.6-.4-1.4 0-1.4.7z" fill="currentColor" />
  </svg>
);

/* platforms, drawn as simple glyphs */
export const Facebook = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path d="M13.6 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6V21z" fill="currentColor" />
  </svg>
);

export const Instagram = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...line} strokeWidth={1.8}>
    <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="4.8" />
    <circle cx="12" cy="12" r="3.9" />
    <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
  </svg>
);

export const TikTok = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path d="M16.1 3.4c.4 2.2 1.8 3.7 4 3.9v3a7 7 0 0 1-4-1.3v6.1a5.7 5.7 0 1 1-5.7-5.7l.9.1v3.1a2.7 2.7 0 1 0 1.8 2.5V3.4z" fill="currentColor" />
  </svg>
);

export const YouTube = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path
      d="M21.2 7.6a2.5 2.5 0 0 0-1.8-1.8C17.8 5.4 12 5.4 12 5.4s-5.8 0-7.4.4a2.5 2.5 0 0 0-1.8 1.8C2.4 9.2 2.4 12 2.4 12s0 2.8.4 4.4a2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.4.4 7.4.4s5.8 0 7.4-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.4.4-4.4s0-2.8-.4-4.4zM10.1 14.8V9.2l4.8 2.8z"
      fill="currentColor"
    />
  </svg>
);

export const Heart = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path d="M12 20.2s-7.6-4.5-7.6-10a4.3 4.3 0 0 1 7.6-2.7 4.3 4.3 0 0 1 7.6 2.7c0 5.5-7.6 10-7.6 10z" fill="currentColor" />
  </svg>
);
