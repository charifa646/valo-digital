import type { Config } from "tailwindcss";
import containerQueries from "@tailwindcss/container-queries";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // the « glacier » palette of Charifa's ChatGPT mock-up, on the whole site (14 October 2026, carte blanche: « hausser le
      // niveau du reste de la page », « le bleu est trop bleu »): a slate-blue ink, a deep sky blue in the place of the
      // electric one, ice-blue grounds; the logo keeps VALO's own blue (`brand`), the yellow stays as a small touch
      colors: {
        // the cover: logo blue, the gradient's deep and mid blues, the yellow
        brand: "#0D16C3",
        electric: "#0F6FD0",
        deep: "#0B5DB4",
        mid: "#5B8FD4",
        azure: "#3F9AE8",
        sky: "#2A8FF0",
        sun: "#FDEC05",
        // the catalogue's charte: navy titles, lines, text
        navy: "#174863",
        night: "#11364C",
        abyss: "#0B2536",
        // the ink, between black and night blue (14 October 2026, Charifa: « le noir que tu utilises, j'aime pas. J'ai pas dit
        // de prendre du bleu nuit non plus, trouve un équilibre »): a deep slate blue, 13 to 1 on white. Was #0B1233.
        ink: "#10344A",
        // softened on 12 October 2026 (« un rendu premium »): 5.6 to 1 on the page, 5.1 on the light blue cards, still easy to read
        body: "#5C7486",
        line: "#DCE6EC",
        mist: "#F3F8FB",
        ice: "#F0F6FA",
        frost: "#E3EFF8",
        // the small app windows that show each offer
        hair: "#E1EBF0",
        mute: "#7F97A6",
        soft: "#EEF4F8",
      },
      // lighter weights everywhere (14 October 2026, Charifa: « j'aime pas quand la police est trop grasse », after her
      // ChatGPT mock-up): Montserrat is variable, so each name keeps its rank but weighs less
      fontWeight: {
        medium: "470",
        semibold: "560",
        bold: "620",
        extrabold: "680",
      },
      fontFamily: {
        // if the font's variable ever goes missing, the line still falls back to a sans-serif, never to the browser's serif
        sans: ["var(--font-montserrat, Montserrat)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        page: "1180px",
      },
      // square corners for blocks and cards (Charifa, 7 October 2026: an agency site, not a sales page); pills stay round
      borderRadius: {
        xl: "4px",
        "2xl": "4px",
      },
      boxShadow: {
        card: "0 1px 0 rgba(255,255,255,.9) inset, 0 30px 60px -32px rgba(15,111,208,.28), 0 2px 6px -2px rgba(16,52,74,.06)",
        lift: "0 40px 80px -30px rgba(15,111,208,.45)",
        glow: "0 18px 40px -22px rgba(15,111,208,.55)",
        panel: "0 1px 2px rgba(16,52,74,.04), 0 16px 36px -16px rgba(16,52,74,.18)",
        float: "0 2px 4px rgba(16,52,74,.05), 0 28px 50px -22px rgba(16,52,74,.32)",
      },
    },
  },
  plugins: [containerQueries],
};

export default config;
