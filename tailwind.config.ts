import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem", xl: "2.5rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        // Deep corporate navy — used for dark sections, headers, primary buttons
        navy: {
          50: "#f3f6fa",
          100: "#e2e9f1",
          200: "#c2d1e0",
          300: "#93abc4",
          400: "#5e7ea3",
          500: "#3e608a",
          600: "#2f4b70",
          700: "#263c58",
          800: "#1d2d43",
          900: "#0f1a2c",
          950: "#07101e",
        },
        // Muted sea-blue backgrounds (Siemens-inspired, slightly darker than white)
        sea: {
          50: "#f1f5f7",
          100: "#e8eef1",
          200: "#dbe4e9",
          300: "#c8d4db",
        },
        // Refined steel-blue accent (replaces the bright cyan)
        accent: {
          DEFAULT: "#5b7c8f",   // steel blue
          light: "#7a99ab",
          dark: "#3f5a6a",
        },
        // Brass micro-accent — for eyebrow labels only
        brass: "#b8894a",
        ink: {
          DEFAULT: "#0d1526",
          soft: "#4a5566",
          muted: "#7b8695",
        },
        line: "#cfd8de",
        lineDark: "#1e2b40",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      fontSize: {
        "display": ["clamp(2.5rem, 5.4vw, 4.25rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "h1": ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "h2": ["clamp(1.625rem, 2.8vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.018em" }],
        "h3": ["clamp(1.25rem, 1.9vw, 1.625rem)", { lineHeight: "1.25", letterSpacing: "-0.012em" }],
      },
      boxShadow: {
        card: "0 1px 2px rgba(13, 21, 38, 0.04), 0 8px 24px rgba(13, 21, 38, 0.06)",
        elevated: "0 4px 12px rgba(13, 21, 38, 0.08), 0 20px 48px rgba(13, 21, 38, 0.12)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-up": "fadeUp 0.7s ease-out forwards",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;