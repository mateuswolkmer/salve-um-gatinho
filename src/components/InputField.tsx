import type { Component, JSX } from "solid-js";
import { twMerge } from "tailwind-merge";

export type InputFieldProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  size?: "sm" | "md";
};

export const InputField: Component<InputFieldProps> = ({
  class: classes,
  children,
  size = "md",
  ...rest
}) => {
  return (
    <input
      {...rest}
      class={twMerge(
        "transition-all border-2 border-b-4 focus:border-b-4 transform focus:scale-[102%] border-black hover:scale-[99%] hover:shadow-lg focus:shadow-none rounded-xl !outline-none",
        size === "sm" && "p-1 text-sm",
        size === "md" && "p-2 text-xl",
        classes
      )}
    />
  );
};
