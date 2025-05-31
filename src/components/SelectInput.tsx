import type { Component, JSX } from "solid-js";
import { twMerge } from "tailwind-merge";

export type SelectInputProps = JSX.SelectHTMLAttributes<HTMLSelectElement>;

export const SelectInput: Component<SelectInputProps> = ({
  class: classes,
  children,
  ...rest
}) => {
  return (
    <select
      {...rest}
      class={twMerge(
        "transition-all border-2 border-b-4 focus:border-b-4 transform focus:scale-[102%] border-black hover:scale-[99%] hover:shadow-lg focus:shadow-none rounded-xl p-2 text-xl outline-none!",
        classes
      )}
    >
      {children}
    </select>
  );
};
