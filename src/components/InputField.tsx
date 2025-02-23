import type { Component, JSX } from "solid-js";
import { twMerge } from "tailwind-merge";

export type InputFieldProps = JSX.InputHTMLAttributes<HTMLInputElement>;

export const InputField: Component<InputFieldProps> = ({
  class: classes,
  children,
  ...rest
}) => {
  return (
    <input
      {...rest}
      class={twMerge(
        "transition-all border-2 border-b-4 focus:border-b-4 transform focus:scale-[102%] border-black hover:scale-[99%] hover:shadow-lg focus:shadow-none rounded-xl p-2 text-xl ring-0 !outline-none",
        classes
      )}
    />
  );
};
