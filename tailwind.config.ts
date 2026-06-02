import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          dark: "#0a0e1a",
          mid: "#111827",
          light: "#1a2332",
        },
        teal: {
          primary: "#00d4aa",
          secondary: "#00b894",
          glow: "rgba(0, 212, 170, 0.3)",
        },
        offwhite: {
          DEFAULT: "#f8fafc",
          muted: "#94a3b8",
        },
        gray: {
          muted: "#64748b",
          dark: "#334155",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
    },
  },
} satisfies Config;
