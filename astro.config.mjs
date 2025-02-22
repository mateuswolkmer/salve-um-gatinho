import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import reactJs from "@astrojs/react";
// import umami from "@yeskunall/astro-umami";

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
    // umami({ id: "b0ecec58-ff13-4ab2-b41d-1ceac7e8b7b4" }),
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
