import { type VariantProps, cva } from "class-variance-authority";
import type { Component, JSX } from "solid-js";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  "transition-all [&:not(:disabled)]:hover:scale-105 [&:not(:disabled)]:hover:shadow-lg [&:not(:disabled)]:hover:-rotate-1 [&:not(:disabled)]:active:scale-95 [&:not(:disabled)]:active:shadow-none border-2 [&:not(:disabled)]:border-b-4 [&:not(:disabled)]:active:border-b-2 disabled:hover:animate-no border-black rounded-xl flex gap-2 group focus:outline-2 focus:outline-offset-2 focus:outline-dashed focus:outline-pink [&:not(:disabled)]:active:outline-none disabled:bg-gray-300",
  {
    variants: {
      variant: {
        cta: "text-5xl sm:text-6xl bg-pink hover:bg-pink-300 active:bg-pink-600 py-4 sm:py-5 px-16 sm:px-20",
        nav: "text-3xl bg-blue hover:bg-blue-300 active:bg-blue-600 py-2 px-5",
        form: "text-4xl bg-yellow hover:bg-yellow-300 active:bg-yellow-600 py-2 px-6",
        icon: "bg-yellow hover:bg-yellow-300 active:bg-yellow-600 items-center justify-center rounded-full w-14 h-14 p-2",
      },
    },
  }
);

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    navDirection?: "forward" | "backward";
  };

export const Button: Component<ButtonProps> = (props) => {
  const { navDirection = "" } = props;
  return (
    <button
      type="button"
      {...props}
      class={twMerge(buttonVariants({ variant: props.variant }), props.class)}
    >
      {props.variant === "nav" && navDirection === "backward" && (
        <span class="text-3xl transition-transform group-hover:scale-125">
          {"<"}
        </span>
      )}
      {props.children}
      {props.variant === "nav" && navDirection === "forward" && (
        <span class="text-3xl transition-transform group-hover:scale-125">
          {">"}
        </span>
      )}
    </button>
  );
};

export type ButtonLink = JSX.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonVariants> & {
    navDirection?: "forward" | "backward";
  };

export const ButtonLink: Component<ButtonLink> = ({
  href,
  variant,
  navDirection = "",
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
      {variant === "nav" && navDirection === "backward" && (
        <span class="text-3xl transition-transform group-hover:scale-125">
          {"<"}
        </span>
      )}
      {children}
      {variant === "nav" && navDirection === "forward" && (
        <span class="text-3xl transition-transform group-hover:scale-125">
          {">"}
        </span>
      )}
    </a>
  );
};
