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
        icon: "bg-yellow hover:bg-yellow-300 active:bg-yellow-600 items-center justify-center rounded-full size-12 p-2",
        link: "relative after:transition-all after:h-0.5 after:bg-black after:absolute after:bottom-0 after:left-0 after:max-w-0 hover:after:max-w-full after:w-full border-none",
      },
    },
  }
);

export type ButtonProps = Omit<
  JSX.ButtonHTMLAttributes<HTMLButtonElement>,
  "disabled"
> &
  VariantProps<typeof buttonVariants> & {
    navDirection?: "forward" | "backward";
    onClickToClipboard?: string;
    disabled?: boolean | (() => boolean);
  };

export const Button: Component<ButtonProps> = (props) => {
  const {
    navDirection = "",
    onClickToClipboard,
    onClick,
    disabled,
    variant,
    children,
    ...rest
  } = props;

  const handleOnClick = (
    e: MouseEvent & {
      currentTarget: HTMLButtonElement;
      target: HTMLButtonElement;
    }
  ) => {
    if (typeof onClick === "function") {
      onClick?.(e);
    }
    if (onClickToClipboard) {
      navigator.clipboard.writeText(onClickToClipboard);
    }
  };

  return (
    <button
      type="button"
      disabled={typeof disabled === "function" ? disabled() : disabled}
      {...rest}
      onclick={handleOnClick}
      class={twMerge(buttonVariants({ variant }), props.class)}
    >
      {variant === "nav" && navDirection === "backward" && (
        <span class="text-3xl transition-transform group-hover:scale-125">
          {"<"}
        </span>
      )}
      {props.children}
      {variant === "nav" && navDirection === "forward" && (
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
