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
        primary: {
          DEFAULT: "#FFFFFF",
          dark: "#0F0F0F",
        },
        secondary: {
          DEFAULT: "#1A1A1A",
          light: "#2A2A2A",
        },
        accent: {
          DEFAULT: "#B0B0B0",
          silver: "#E0E0E0",
          dim: "#808080",
          light: "#C8C8C8",
        },
        mono: {
          black: "#0F0F0F",
          charcoal: "#1A1A1A",
          grey: {
            50: "#FAFAFA",
            100: "#F5F5F5",
            200: "#E0E0E0",
            300: "#C8C8C8",
            400: "#B0B0B0",
            500: "#808080",
          },
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        tech: ["var(--font-share-tech)", "system-ui", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        gradient: "gradient 8s ease infinite",
        "star-move": "starMove 20s linear infinite",
        "loading-bar": "loadingBar 1.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(192, 192, 192, 0.2)" },
          "100%": { boxShadow: "0 0 40px rgba(192, 192, 192, 0.4)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        starMove: {
          "0%": { transform: "translateZ(0)" },
          "100%": { transform: "translateZ(1000px)" },
        },
        loadingBar: {
          "0%": { width: "0%", marginLeft: "0%" },
          "50%": { width: "60%", marginLeft: "20%" },
          "100%": { width: "0%", marginLeft: "100%" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        noise: "url('/noise.png')",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
