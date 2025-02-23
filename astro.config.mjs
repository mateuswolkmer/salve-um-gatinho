import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import reactJs from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

// import opengraphImages from "astro-opengraph-images";
// import { catsOg } from "./src/og";

// https://astro.build/config
export default defineConfig({
  site: "https://salveumgatinho.org/",
  // output: "server",
  adapter: vercel(),
  integrations: [tailwind(), solidJs(), reactJs(), sitemap()],
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
