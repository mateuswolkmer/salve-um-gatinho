import type { Component, JSX } from "solid-js";

export type TagProps = {
  special?: "new" | "male" | "female";
  children?: JSX.Element;
};

export const Tag: Component<TagProps> = ({ special, children }) => {
  return (
    <span
      classList={{
        "border-2 border-black rounded-full px-2 text-base relative after:-top-2":
          true,
        "after:-right-2 after:absolute after:text-black after:font-bold":
          special !== undefined,
        // TODO replace after with icons
        "after:content-['*'] after:text-shadow-yellow after:text-3xl bg-yellow-300":
          special === "new",
        "after:content-['♂️']  after:text-shadow-blue after:text-xl bg-blue-300":
          special === "male",
        "after:content-['♀️']  after:text-shadow-pink after:text-xl bg-pink-300":
          special === "female",
      }}
    >
      {children}
    </span>
  );
};
