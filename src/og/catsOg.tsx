import type { RenderFunctionInput } from "astro-opengraph-images";
import type React from "react";
import { twi } from "tw-to-css";

const SITE_URL = "https://salve-um-gatinho.vercel.app";

export async function catsOg({
  title,
  // image,
  document,
}: RenderFunctionInput): Promise<React.ReactNode> {
  const titleOg =
    document.querySelector('[data-og="title"]')?.textContent ?? "";
  const image =
    document.querySelector('[data-og="image"]')?.getAttribute("src") ?? "";
  const tags = document.querySelector('[data-og="tags"]')?.textContent ?? "";

  const imageSrc = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  // split tags by capital letters (start of a new tag)
  const splitTags = tags.split(/(?=[A-Z])/);

  return (
    <div style={twi("flex h-full w-full flex items-start justify-start")}>
      <img
        style={twi("absolute inset-0 h-full w-full object-cover")}
        src={imageSrc}
      />
      <h1 style={twi("text-[60px]")}>{titleOg || title}</h1>
      {/* <div
        style={twi("absolute bottom-2 left-2 flex items-start justify-start")}
      >
        <div style={twi("flex flex-col gap-2")}>
          <h1 style={twi("text-[60px] font-black")}>{titleOg || title}</h1>
          <div style={twi("flex flex-row")}>
            {splitTags.map((tag) => (
              <span
                style={twi(
                  "border-2 border-black rounded-full p-2 bg-blue"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  ) as React.ReactNode;
}
