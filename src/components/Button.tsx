import { type VariantProps, cva } from "class-variance-authority";
import type { Component, JSX } from "solid-js";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  "transition-all hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-none hover:-rotate-1 border-4 border-b-8 active:border-b-4 active:mb-[4px] border-black rounded-xl flex gap-2 group focus:outline-4 focus:outline-offset-2 focus:outline-dashed focus:outline-pink active:outline-none",
  {
    variants: {
      variant: {
        cta: "text-6xl bg-pink hover:bg-pink-300 active:bg-pink-600 py-5 px-20",
        nav: "text-3xl bg-blue hover:bg-blue-300 active:bg-blue-600 py-2 px-5",
        form: "text-4xl bg-yellow hover:bg-yellow-300 active:bg-yellow-600 py-2 px-6",
      },
    },
  }
);

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button: Component<ButtonProps> = ({
  variant,
  class: classes,
  children,
  ...rest
}) => {
  return (
    <button
      type="button"
      class={twMerge(buttonVariants({ variant }), classes)}
      {...rest}
    >
      {children}
      {variant === "nav" && (
        <span class="text-3xl transition-transform group-hover:scale-125">
          {">"}
        </span>
      )}
    </button>
  );
};

export type ButtonLink = JSX.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonVariants>;

export const ButtonLink: Component<ButtonLink> = ({
  href,
  variant,
  class: classes,
  children,
  ...rest
}) => {
  return (
    <a
      href={href}
      class={twMerge(buttonVariants({ variant }), classes)}
      {...rest}
    >
      {children}
      {/* TODO replace > with icon */}
      {variant === "nav" && (
        <span class="text-3xl transition-transform group-hover:scale-125">
          {">"}
        </span>
      )}
    </a>
  );
};
