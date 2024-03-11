import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
	theme: {
		fontFamily: {
			body: ["Rubik", ...defaultTheme.fontFamily.sans],
			display: ["Staatliches", ...defaultTheme.fontFamily.sans],
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
			});
		}),
	],
};
