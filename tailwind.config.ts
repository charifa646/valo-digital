import type { Config } from "tailwindcss";
import containerQueries from "@tailwindcss/container-queries";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // the cover: logo blue, the gradient's deep and mid blues, the yellow
        brand: "#0D16C3",
        electric: "#0714D8",
        deep: "#010BCC",
        mid: "#4C53D8",
        azure: "#3551FF",
        sky: "#0E7CFC",
        sun: "#FDEC05",
        // the catalogue's charte: navy titles, lines, text
        navy: "#071F78",
        night: "#040B52",
        abyss: "#02062E",
        // the ink, between black and night blue (14 October 2026, Charifa: « le noir que tu utilises, j'aime pas. J'ai pas dit
        // de prendre du bleu nuit non plus, trouve un équilibre »): a deep slate blue, 13 to 1 on white. Was #0B1233.
        ink: "#1E2944",
        // softened on 12 October 2026 (« un rendu premium »): 5.6 to 1 on the page, 5.1 on the light blue cards, still easy to read
        body: "#5A6379",
        line: "#DCE3F5",
        mist: "#F3F5FB",
        ice: "#F4F7FF",
        frost: "#E7EDFF",
        // the small app windows that show each offer
        hair: "#E6EAF3",
        mute: "#8A93A6",
        soft: "#F1F3F9",
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
        card: "0 1px 0 rgba(255,255,255,.9) inset, 0 30px 60px -32px rgba(7,20,216,.28), 0 2px 6px -2px rgba(11,18,51,.06)",
        lift: "0 40px 80px -30px rgba(7,20,216,.45)",
        glow: "0 18px 40px -22px rgba(7,20,216,.55)",
        panel: "0 1px 2px rgba(11,18,51,.04), 0 16px 36px -16px rgba(11,18,51,.18)",
        float: "0 2px 4px rgba(11,18,51,.05), 0 28px 50px -22px rgba(11,18,51,.32)",
      },
    },
  },
  plugins: [containerQueries],
};

export default config;
