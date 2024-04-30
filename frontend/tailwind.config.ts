import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "dark-bg-gr-to-purple":
          "linear-gradient(106deg, #181823 36.4%, #1D1625 100%)",
        "glassmorphic-gradient":
          "linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)",
        strongGlass:
          "linear-gradient(348deg, rgba(255, 255, 255, 0.05) 1.16%, rgba(255, 255, 255, 0.02) 106.53%)",
        "glassmorphic-gradient-hover":
          "linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.04) 100%)",
        glassmorphicPrimary:
          "linear-gradient(180deg, rgba(255, 109, 170, 0.07) 0%, rgba(221, 87, 255, 0.03) 100%)",
      },
      boxShadow: {
        glassmorphic: "5px 8px 20px 0 rgba(0, 0, 0, 0.1)",
        "glassmorphic-hover": "7px 10px 30px 0 rgba(0, 0, 0, 0.15)",
        innerShadow: "0px 0px 7.8px 0px rgba(0, 0, 0, 0.39) inset",
        strongGlass: "4px 4px 20px 0px rgba(0, 0, 0, 0.20)",
      },
      dropShadow: {
        glassmorphic: "drop-shadow(5 8px 20px rgb(0 0 0 / 0.05))",
      },
      opacity: {
        "glassmorphic-bg": "2%",
      },
      // background colors:
      colors: {
        primaryPink: "#FCBDFF",
        goalYellow: "#F8C032",
        softPink: "#E19E6D",
      },
      borderWidth: {
        "1.5": "1.5px",
      },
    },
  },
  plugins: [],
};
export default config;
