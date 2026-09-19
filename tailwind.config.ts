import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        primary: {
          DEFAULT: "#1b5e3a", // Forest Green Closed-Loop
          hover: "#14482c",
          light: "#eaf5ef",
          container: "#237346",
        },
        secondary: {
          DEFAULT: "#10b981", // Active Mint Energy
          light: "#ecfdf5",
          accent: "#34d399",
        },
        slate: {
          canvas: "#f8fafc",
          panel: "#f1f5f9",
          border: "#e2e8f0",
          "border-contrast": "#cbd5e1",
          dark: "#0f172a",
          muted: "#64748b",
        },
        fact: {
          DEFAULT: "#1d4ed8",
          bg: "#eff6ff",
          border: "#bfdbfe",
        },
        assumption: {
          DEFAULT: "#b45309",
          bg: "#fffbeb",
          border: "#fde68a",
        },
        danger: {
          DEFAULT: "#dc2626",
          bg: "#fef2f2",
          border: "#fecaca",
        },
      },
      fontFamily: {
        sans: ["'Inter'", "var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["'Inter'", "var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(15, 23, 42, 0.04)",
        sm: "0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)",
        md: "0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.04)",
        lg: "0 10px 15px -3px rgba(15, 23, 42, 0.07), 0 4px 6px -4px rgba(15, 23, 42, 0.04)",
        glow: "0 0 15px -3px rgba(16, 185, 129, 0.35)",
        "glow-red": "0 0 15px -3px rgba(220, 38, 38, 0.35)",
      },
      borderRadius: {
        xs: "0.125rem", // 2px
        sm: "0.25rem",  // 4px
        md: "0.375rem", // 6px
        lg: "0.5rem",   // 8px
        xl: "0.75rem",  // 12px
        "2xl": "1rem",  // 16px
      },
    },
  },
  plugins: [],
};

export default config;
