import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    fontFamily: {
      body: ["Outfit Variable", ...defaultTheme.fontFamily.sans],
      display: ["Staatliches", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      spacing: {
        header: "100px",
        footer: "400px",
      },
      colors: {
        pink: {
          100: "#f6ecf4",
          200: "#eed9e9",
          300: "#e5c5df",
          400: "#ddb2d4",
          500: "#d49fc9",
          DEFAULT: "#d49fc9",
          600: "#aa7fa1",
          700: "#7f5f79",
          800: "#554050",
          900: "#2a2028",
        },
        blue: {
          100: "#eff8f8",
          200: "#dff2f2",
          300: "#ceebeb",
          400: "#bee5e5",
          500: "#aedede",
          DEFAULT: "#aedede",
          600: "#8bb2b2",
          700: "#688585",
          800: "#465959",
          900: "#232c2c",
        },
        yellow: {
          100: "#fef9e4",
          200: "#fcf3c8",
          300: "#fbecad",
          400: "#f9e691",
          500: "#f8e076",
          DEFAULT: "#f8e076",
          600: "#c6b35e",
          700: "#958647",
          800: "#635a2f",
          900: "#322d18",
        },
      },
    },
    keyframes: {
      "move-right": {
        "0%": { transform: "translateX(-100%)" },
        "100%": { transform: "translateX(100%)" },
      },
    },
    animation: {
      "carousel-item": "move-right 10s linear infinite",
    },
  },
  plugins: [
    plugin(({ addBase, addUtilities, theme }) => {
      addBase({
        h1: { fontFamily: theme("fontFamily.display") },
        h2: { fontFamily: theme("fontFamily.display") },
        h3: { fontFamily: theme("fontFamily.display") },
        h4: { fontFamily: theme("fontFamily.display") },
        h5: { fontFamily: theme("fontFamily.display") },
        h6: { fontFamily: theme("fontFamily.display") },
        button: { fontFamily: theme("fontFamily.display") },
        a: { fontFamily: theme("fontFamily.display") },
        p: { fontSize: theme("fontSize.2xl") },
        span: { fontSize: theme("fontSize.2xl") },
      });
      addUtilities({
        ".text-shadow-pink-sm": {
          "text-shadow": `-1px -1px 0 #FFF, 1px -1px 0 #FFF, -1px 1px 0 #FFF, 1px 1px 0 #FFF, 3px 3px 0 ${theme(
            "colors.pink.DEFAULT"
          )}`,
        },
        ".text-shadow-blue-sm": {
          "text-shadow": `-1px -1px 0 #FFF, 1px -1px 0 #FFF, -1px 1px 0 #FFF, 1px 1px 0 #FFF, 3px 3px 0 ${theme(
            "colors.blue.DEFAULT"
          )}`,
        },
        ".text-shadow-yellow-sm": {
          "text-shadow": `-1px -1px 0 #FFF, 1px -1px 0 #FFF, -1px 1px 0 #FFF, 1px 1px 0 #FFF, 3px 3px 0 ${theme(
            "colors.yellow.DEFAULT"
          )}`,
        },
        ".text-shadow-pink": {
          "text-shadow": `-1px -1px 0 #FFF, 1px -1px 0 #FFF, -1px 1px 0 #FFF, 1px 1px 0 #FFF, 6px 6px 0 ${theme(
            "colors.pink.DEFAULT"
          )}`,
        },
        ".text-shadow-blue": {
          "text-shadow": `-1px -1px 0 #FFF, 1px -1px 0 #FFF, -1px 1px 0 #FFF, 1px 1px 0 #FFF, 6px 6px 0 ${theme(
            "colors.blue.DEFAULT"
          )}`,
        },
        ".text-shadow-yellow": {
          "text-shadow": `-1px -1px 0 #FFF, 1px -1px 0 #FFF, -1px 1px 0 #FFF, 1px 1px 0 #FFF, 6px 6px 0 ${theme(
            "colors.yellow.DEFAULT"
          )}`,
        },
      });
    }),
  ],
};
