import reactJs from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// import opengraphImages from "astro-opengraph-images";
// import { catsOg } from "./src/og";

// https://astro.build/config
export default defineConfig({
  site: "https://salveumgatinho.org/",
  // output: "server",
  adapter: vercel(),
  integrations: [solidJs(), reactJs(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  // TODO bring back to improved OG images later
  // opengraphImages({
  //   options: {
  //     fonts: [
  //       {
  //         name: "Staatliches",
  //         weight: 400,
  //         style: "normal",
  //         data: fs.readFileSync(
  //           "node_modules/@fontsource/staatliches/files/staatliches-latin-400-normal.woff"
  //         ),
  //       },
  //     ],
  //   },
  //   render: catsOg,
  // }),
});
