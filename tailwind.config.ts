import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#F5C518",
          "gold-light": "#FFD700",
          "gold-dark": "#B8860B",
          dark: "#0A0A0F",
          "dark-2": "#12121A",
          "dark-3": "#1A1A26",
          "dark-4": "#22223A",
          "dark-card": "#16161F",
          green: "#00C853",
          red: "#FF1744",
          blue: "#2979FF",
          purple: "#7C4DFF",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F5C518 0%, #B8860B 100%)",
        "dark-gradient": "linear-gradient(180deg, #12121A 0%, #0A0A0F 100%)",
        "card-gradient": "linear-gradient(135deg, #1A1A26 0%, #12121A 100%)",
        "hero-gradient":
          "linear-gradient(135deg, #0A0A0F 0%, #12121A 50%, #1A1A26 100%)",
      },
      boxShadow: {
        gold: "0 0 20px rgba(245,197,24,0.3)",
        "gold-lg": "0 0 40px rgba(245,197,24,0.4)",
        card: "0 4px 24px rgba(0,0,0,0.5)",
      },
      animation: {
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
        "spin-slow": "spin 3s linear infinite",
        shimmer: "shimmer 2s linear infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(245,197,24,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(245,197,24,0.6)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
