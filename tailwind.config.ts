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
          dark: "#0D0D1F",
          "dark-2": "#13133A",
          "dark-3": "#1A1A46",
          "dark-4": "#22225A",
          "dark-card": "#181840",
          "dark-sidebar": "#0F0F2E",
          green: "#00C853",
          red: "#FF1744",
          blue: "#2979FF",
          purple: "#7C4DFF",
          "purple-2": "#5B3FD8",
          "purple-light": "#9C6FFF",
          teal: "#00BFA5",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F5C518 0%, #B8860B 100%)",
        "dark-gradient": "linear-gradient(180deg, #13133A 0%, #0D0D1F 100%)",
        "card-gradient": "linear-gradient(135deg, #1A1A46 0%, #13133A 100%)",
        "hero-gradient": "linear-gradient(135deg, #0D0D1F 0%, #13133A 50%, #1A1A46 100%)",
        "purple-gradient": "linear-gradient(135deg, #7C4DFF 0%, #5B3FD8 100%)",
        "green-gradient": "linear-gradient(135deg, #00C853 0%, #00897B 100%)",
        "promo-cashback": "linear-gradient(135deg, #1A1A46 0%, #2D1B69 100%)",
        "promo-earn": "linear-gradient(135deg, #0D3B1E 0%, #1A5C36 100%)",
        "promo-refer": "linear-gradient(135deg, #1A2D4A 0%, #0D1F35 100%)",
      },
      boxShadow: {
        gold: "0 0 20px rgba(245,197,24,0.3)",
        "gold-lg": "0 0 40px rgba(245,197,24,0.4)",
        card: "0 4px 24px rgba(0,0,0,0.5)",
        purple: "0 0 20px rgba(124,77,255,0.3)",
        "purple-lg": "0 0 40px rgba(124,77,255,0.4)",
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
