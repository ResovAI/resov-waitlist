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
          DEFAULT: "#FE3324",
          hover: "#d92b1f",
          light: "#FEF2F2",
        },
        dark: {
          DEFAULT: "#0A0E17",
          800: "#161D32",
        },
        grey: {
          DEFAULT: "#6B7280",
          light: "#9CA3AF",
        },
        state: {
          error: "#B42318",
        },
        neutral: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
        },
      },
      fontFamily: {
        sans: ["var(--font-rethink)", "sans-serif"],
      },
      boxShadow: {
        card: "0px 4px 24px rgba(0, 0, 0, 0.08)",
        'card-hover': "0px 8px 40px rgba(0, 0, 0, 0.12)",
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
