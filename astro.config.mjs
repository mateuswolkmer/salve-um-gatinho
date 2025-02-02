import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import reactJs from "@astrojs/react";
// import vercel from "@astrojs/vercel";

// import opengraphImages from "astro-opengraph-images";
// import { catsOg } from "./src/og";

// https://astro.build/config
export default defineConfig({
  // TODO change to prod when launched
  site: "https://salve-um-gatinho.vercel.app/",
  // output: "server",
  // adapter: vercel(),
  integrations: [
    tailwind(),
    solidJs(),
    reactJs(),
    // TODO come back to improved RTE images later
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
  ],
});
