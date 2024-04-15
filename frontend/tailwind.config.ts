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
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "dark-bg-gr-to-purple": "linear-gradient(106deg, #181823 36.4%, #1D1625 100%)",
        "glassmorphic-gradient": "linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)",
      },
      boxShadow: {
        "glassmorphic": "5px 8px 20px 0 rgba(0, 0, 0, 0.07)"
      },
      opacity: {
        "glassmorphic-bg": "2%"
      },
      // background colors:
      colors: {
        "primaryPink": "#FCBDFF",
      },
    },
  },
  plugins: [],
};
export default config;
