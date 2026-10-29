/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FFFFFF",
        alabaster: "#F8FAF9",
        forest: {
          DEFAULT: "#183B2B",
          dark: "#122E21",
          light: "#1F4A37"
        },
        sage: {
          DEFAULT: "#4D7260",
          light: "#EBF2EE",
          border: "#C8DCD0"
        },
        charcoal: "#19201D",
        muted: "#64748B",
        hairline: "#E5E7EB",
        status: {
          available: {
            text: "#183B2B",
            bg: "#EBF2EE",
            border: "#C8DCD0"
          },
          reserved: {
            text: "#B45309",
            bg: "#FEF3C7",
            border: "#FDE68A"
          },
          sold: {
            text: "#6B7280",
            bg: "#F3F4F6",
            border: "#E5E7EB"
          }
        }
      },
      fontFamily: {
        heading: ["Outfit", "sans-serif"],
        display: ["Outfit", "sans-serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        ticker: "ticker 35s linear infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-50%, 0, 0)" },
        }
      }
    },
  },
  plugins: [],
}
