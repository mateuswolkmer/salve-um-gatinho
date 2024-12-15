import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import reactJs from "@astrojs/react";
import opengraphImages, { presets } from "astro-opengraph-images";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    solidJs(),
    reactJs(),
    opengraphImages({
      // TODO change to prod when launched
      site: "https://salve-um-gatinho.vercel.app",
      options: {
        fonts: [
          {
            name: "Outfit",
            weight: 400,
            style: "normal",
            data: fs.readFileSync(
              "node_modules/@fontsource-variable/outfit/files/outfit-latin-wght-normal.woff2"
            ),
          },
        ],
      },
      render: presets.blackAndWhite,
    }),
  ],
});
