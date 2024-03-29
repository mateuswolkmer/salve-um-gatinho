import type { Component, JSX } from "solid-js";

export type TagProps = { special?: "new"; children?: JSX.Element };

export const Tag: Component<TagProps> = ({ special, children }) => {
  return (
    <span
      classList={{
        "border-2 border-black rounded-full px-2 text-base bg-gray-200 relative after:-top-2":
          true,
        "after:-right-2 after:absolute after:text-black after:text-3xl after:content-['*'] after:font-bold after:text-shadow-yellow":
          special === "new",
      }}
    >
      {children}
    </span>
  );
};
