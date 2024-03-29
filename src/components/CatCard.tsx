import { cva, type VariantProps } from "class-variance-authority";
import type { Component, JSX } from "solid-js";
import { twMerge } from "tailwind-merge";

const catCardVariants = cva(
  "transition-all hover:scale-[102%] hover:shadow-lg hover:rotate-1 active:scale-[98%] active:shadow-none active:bg-gray-200 border-4 border-b-8 active:border-b-4 border-black rounded-xl flex focus:outline-4 focus:outline-offset-2 focus:outline-dashed focus:outline-pink active:outline-none overflow-hidden font-body",
  {
    variants: {
      variant: {
        small: "p-3 gap-3 flex-row items-end h-40 w-80",
        vertical: "p-4 gap-4 flex-col h-[30rem] w-80 min-w-80",
        big: "p-4 gap-4 flex-col h-72 md:h-80 xl:h-96 w-full",
      },
    },
  }
);

const catCardTitleVariants = cva("flex", {
  variants: {
    variant: {
      small: "flex-col-reverse gap-2 w-1/2",
      vertical: "flex-row items-center justify-between flex-1",
      big: "flex-row items-center justify-between flex-1",
    },
  },
});

export type CatCardProps = JSX.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof catCardVariants> & {
    cat?: any;
  };

export const CatCard: Component<CatCardProps> = ({
  cat = {},
  variant = "big",
  class: classes,
  ...rest
}) => {
  const formattedName = cat.name
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/\s+/g, "_");
  return (
    <a
      href={`gatos/${formattedName}`}
      class={twMerge(catCardVariants({ variant }), classes)}
      style={{ "view-transition-name": `cat_${formattedName}` }}
    >
      <div
        class={twMerge(
          "bg-gray-200 rounded-xl w-full h-full",
          variant === "small" && "w-1/2 h-full"
        )}
        style={{ "view-transition-name": `picture_${formattedName}` }}
      ></div>
      <div class={catCardTitleVariants({ variant })}>
        <span
          class={twMerge(
            "text-3xl font-bold text-ellipsis text-nowrap overflow-y-visible overflow-x-clip",
            variant === "big" && "text-4xl"
          )}
          style={{ "view-transition-name": formattedName }}
        >
          {cat.name}
        </span>
        <div class="flex gap-2">
          <span class="border-2 border-black rounded-full px-2 text-base bg-gray-200 relative after:-top-2 after:-right-2 after:absolute after:text-black after:text-3xl after:content-['*'] after:font-bold after:text-shadow-yellow">
            Novo
          </span>
        </div>
      </div>
    </a>
  );
};
