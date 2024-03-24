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
        section: "theme(spacing.24) theme(spacing.10)",
      },
      colors: {
        pink: {
          100: "#f6ecf4",
          200: "#eed9e9",
          300: "#e5c5df",
          400: "#ddb2d4",
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
          DEFAULT: "#f8e076",
          600: "#c6b35e",
          700: "#958647",
          800: "#635a2f",
          900: "#322d18",
        },
      },
    },
  },
  plugins: [
    plugin(({ addBase, theme }) => {
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
    }),
  ],
};
