import { type Component, type JSX, Show } from "solid-js";
import { twMerge } from "tailwind-merge";

export type TagProps = JSX.HTMLAttributes<HTMLSpanElement> & {
  children?: JSX.Element;
  icon?: string;
  color?: "yellow" | "blue" | "pink";
};

export const Tag: Component<TagProps> = ({
  children,
  icon,
  color,
  class: className,
}) => {
  return (
    <span
      class={twMerge(
        "border-2 border-black rounded-full px-2 text-base relative after:-top-2 bg-white whitespace-nowrap",
        color === "yellow" && "bg-yellow",
        color === "blue" && "bg-blue",
        color === "pink" && "bg-pink",
        className
      )}
    >
      {children}
      <Show when={Boolean(icon)}>
        <div class="absolute -top-2 -right-2">
          <i
            class={twMerge(
              `ph-${icon} ph-duotone before:opacity-100! font-bold!`,
              color === "yellow" && "before:text-yellow!",
              color === "blue" && "before:text-blue!",
              color === "pink" && "before:text-pink!",
              !color && "before:text-white!"
            )}
          />
        </div>
      </Show>
    </span>
  );
};
