import { type VariantProps, cva } from "class-variance-authority";
import type { Component, JSX } from "solid-js";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
	"transition-all hover:scale-105 hover:-rotate-1 border-4 border-b-8 border-black rounded-xl",
	{
		variants: {
			variant: {
				cta: "text-6xl bg-pink-400 hover:bg-pink-300 py-5 px-20",
				nav: "text-3xl bg-blue-300 hover:bg-blue-200 py-2 px-5",
			},
		},
	},
);

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonVariants>;

export const Button: Component<ButtonProps> = ({
	variant,
	class: classes,
	...rest
}) => {
	return (
		<button
			type="button"
			class={twMerge(buttonVariants({ variant }), classes)}
			{...rest}
		/>
	);
};

export type ButtonLink = JSX.AnchorHTMLAttributes<HTMLAnchorElement> &
	VariantProps<typeof buttonVariants>;

export const ButtonLink: Component<ButtonLink> = ({
	href,
	variant,
	class: classes,
	...rest
}) => {
	return (
		<a
			href={href}
			class={twMerge(buttonVariants({ variant }), classes)}
			{...rest}
		/>
	);
};
