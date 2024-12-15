import { OGImageRoute } from "astro-og-canvas";
import { getAllCats } from "../../api/cats";

const cats = await getAllCats();

const catPages = cats.reduce((acc, cat) => {
  acc[cat.slug] = cat;
  return acc;
}, []);

console.log("catPages", catPages);

export const { getStaticPaths, GET } = OGImageRoute({
  param: "route",

  pages: catPages,

  getImageOptions: (path, cat) => ({
    title: cat.name,
    description: `Adote ${cat.gender === "female" ? "a" : "o"} ${cat.name}!`,
    logo: {
      path: "./favicon-32x32.png",
    },
    bgImage: {
      path: cat.image,
    },
  }),
});
