import type { Component, JSX } from "solid-js";
import { twMerge } from "tailwind-merge";

export type HighlightProps = JSX.HTMLAttributes<HTMLSpanElement>;

export const Highlight: Component<HighlightProps> = ({
  class: classes,
  children,
}) => {
  return (
    <em
      class={twMerge(
        "relative text-shadow-yellow not-italic after:absolute after:inset-0 after:top-1/3 after:h-1/2 after:bg-yellow-400 after:-z-10 after:-rotate-2 after:scale-[101%]",
        classes
      )}
    >
      {children}
    </em>
  );
};
