import type { Component, JSX } from "solid-js";
import { twMerge } from "tailwind-merge";

export type HighlightProps = JSX.HTMLAttributes<HTMLSpanElement> & {
  bold?: boolean;
};

export const Highlight: Component<HighlightProps> = ({
  class: classes,
  bold,
  children,
}) => {
  return (
    <em
      class={twMerge(
        "relative text-nowrap not-italic after:absolute after:inset-0 after:top-1/3 after:h-1/2 z-10 after:bg-yellow after:-z-10 after:-rotate-2 after:scale-[101%]",
        bold && "font-bold",
        classes
      )}
    >
      {children}
    </em>
  );
};
