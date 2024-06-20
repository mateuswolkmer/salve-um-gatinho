import { cva, type VariantProps } from "class-variance-authority";
import type { Component, JSX } from "solid-js";
import { twMerge } from "tailwind-merge";
import { CatTags } from "./CatTags";
import type { Cat } from "../../tina/__generated__/types";

const catCardVariants = cva(
  "transition-all hover:scale-[102%] hover:shadow-lg hover:rotate-1 active:scale-[98%] active:shadow-none active:bg-gray-200 bg-white border-2 border-b-4 active:border-b-2 border-black rounded-xl flex focus:outline-2 focus:outline-offset-2 focus:outline-dashed focus:outline-pink active:outline-none overflow-hidden font-body",
  {
    variants: {
      variant: {
        small: "flex-row items-end h-40 w-80",
        vertical: "flex-col h-[30rem] w-80 min-w-80",
        big: "flex-col h-72 md:h-80 xl:h-96 w-full",
      },
    },
  }
);

const catCardTitleVariants = cva("flex border-black relative gap-4", {
  variants: {
    variant: {
      small: "p-3 flex-col-reverse gap-2 w-1/2 h-full border-l-2",
      vertical: "p-4 flex-row items-center justify-between flex-1 border-t-2",
      big: "p-4 flex-row items-center justify-between flex-1 border-t-2",
    },
  },
});

export type CatCardProps = JSX.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof catCardVariants> & {
    cat?: Cat;
  };

export const CatCard: Component<CatCardProps> = ({
  cat,
  variant = "big",
  class: classes,
  ...rest
}) => {
  if (!cat) {
    return undefined;
  }

  return (
    <a href={`/${cat.slug}`} {...rest}>
      <div
        class={twMerge(catCardVariants({ variant }), classes)}
        style={{ "view-transition-name": `cat_${cat.slug}` }}
      >
        <div
          class={twMerge(
            "bg-gray-200 w-full h-full overflow-hidden",
            variant === "small" && "w-1/2 h-full"
          )}
        >
          {cat.image && (
            <img
              src={cat.image}
              alt={cat.name}
              class="object-cover w-full h-full"
              loading="lazy"
              style={{
                "view-transition-name": `picture_${cat.slug}`,
              }}
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
          <CatTags
            cat={cat}
            showOnly={variant === "small" ? "new" : undefined}
          />
          <div class="absolute h-full w-4 bg-gradient-to-l from-white to-transparent right-0" />
        </div>
      </div>
    </a>
  );
};
