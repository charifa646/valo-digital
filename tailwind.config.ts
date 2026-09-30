import type { Config } from "tailwindcss";

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
        ink: "#0B1233",
        body: "#4A536B",
        line: "#DCE3F5",
        mist: "#F3F5FB",
        ice: "#F4F7FF",
        frost: "#E7EDFF",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        page: "1240px",
      },
      boxShadow: {
        card: "0 1px 0 rgba(255,255,255,.9) inset, 0 30px 60px -32px rgba(7,20,216,.28), 0 2px 6px -2px rgba(11,18,51,.06)",
        lift: "0 40px 80px -30px rgba(7,20,216,.45)",
        glow: "0 30px 70px -20px rgba(53,81,255,.75)",
      },
    },
  },
  plugins: [],
};

export default config;
