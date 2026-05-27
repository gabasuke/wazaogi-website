import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        night: "#0B1728",
        lantern: "#FF9F43",
        island: "#2F7D5E",
        mist: "#E5E5E5"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 34px rgba(255, 159, 67, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
