import { cva, type VariantProps } from "class-variance-authority";
import type { Component, JSX } from "solid-js";
import { twMerge } from "tailwind-merge";
import { Tag } from "./Tag";
import type { Cat } from "../../tina/__generated__/types";

const catCardVariants = cva(
  "transition-all hover:scale-[102%] hover:shadow-lg hover:rotate-1 active:scale-[98%] active:shadow-none active:bg-gray-200 bg-white border-4 border-b-8 active:border-b-4 border-black rounded-xl flex focus:outline-4 focus:outline-offset-2 focus:outline-dashed focus:outline-pink active:outline-none overflow-hidden font-body",
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
    cat?: Cat;
    disableTransition?: boolean;
  };

export const CatCard: Component<CatCardProps> = ({
  cat,
  variant = "big",
  disableTransition,
  class: classes,
  ...rest
}) => {
  if (!cat) {
    return undefined;
  }

  return (
    <a
      href={`/gatos/${cat.slug}`}
      class={twMerge(catCardVariants({ variant }), classes)}
      style={
        disableTransition ? {} : { "view-transition-name": `cat_${cat.slug}` }
      }
      {...rest}
    >
      <div
        class={twMerge(
          "bg-gray-200 rounded-xl w-full h-full overflow-hidden",
          variant === "small" && "w-1/2 h-full"
        )}
        style={{ "view-transition-name": `picture_${cat.slug}` }}
      >
        {cat.image && (
          <img
            src={cat.image}
            alt={cat.name}
            class="object-cover w-full h-full"
          />
        )}
      </div>
      <div class={catCardTitleVariants({ variant })}>
        <span
          class={twMerge(
            "text-3xl font-bold text-ellipsis text-nowrap overflow-y-visible overflow-x-clip",
            variant === "big" && "text-4xl"
          )}
          style={{ "view-transition-name": cat.slug }}
        >
          {cat.name}
        </span>
        <div class="flex gap-2">
          <Tag special="new">Novo</Tag>
        </div>
      </div>
    </a>
  );
};
