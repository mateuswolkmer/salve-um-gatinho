import React from "react";
import type { RenderFunctionInput } from "astro-opengraph-images";
import { twi } from "tw-to-css";

export async function catsOg({
  title,
  document,
}: RenderFunctionInput): Promise<React.ReactNode> {
  // extract the body
  const body = document.querySelector("body")?.textContent ?? "";
  // truncate the body to 50 characters, add ellipsis if truncated
  const bodyTruncated = body.substring(0, 50) + (body.length > 50 ? "..." : "");

  return (
    <div
      style={twi(
        "h-full w-full flex items-start justify-start border border-blue-500 border-[12px] bg-gray-50"
      )}
    >
      <div style={twi("flex items-start justify-start h-full")}>
        <div style={twi("flex flex-col justify-between w-full h-full")}>
          <h1 style={twi("text-[80px] p-20 font-black text-left")}>{title}</h1>
          <div style={twi("text-2xl pb-10 px-20 font-bold mb-0")}>
            {bodyTruncated}
          </div>
        </div>
      </div>
    </div>
  ) as React.ReactNode;
}
