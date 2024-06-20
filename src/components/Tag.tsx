import { Show, type Component, type JSX } from "solid-js";
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
        "border-2 border-black rounded-full px-2 text-base relative after:-top-2",
        color === "yellow" && "bg-yellow-100",
        color === "blue" && "bg-blue-100",
        color === "pink" && "bg-pink-100",
        className
      )}
    >
      {children}
      <Show when={Boolean(icon)}>
        <div class="absolute -top-2 -right-2">
          <i
            class={twMerge(
              `ph-${icon} ph-duotone before:!opacity-100 !font-bold`,
              color === "yellow" && "before:!text-yellow-500",
              color === "blue" && "before:!text-blue-500",
              color === "pink" && "before:!text-pink-500"
            )}
          />
        </div>
      </Show>
    </span>
  );
};
