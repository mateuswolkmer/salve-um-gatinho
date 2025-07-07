import { type VariantProps, cva } from "class-variance-authority";
import type { Component, JSX } from "solid-js";
import { Show, createSignal } from "solid-js";
import { twMerge } from "tailwind-merge";
import type { Cat } from "../../../../tina/__generated__/types";
import { CatTags } from "../Cat/CatTags.solid";

const catCardVariants = cva(
  "transition-all hover:scale-[102%] hover:shadow-lg hover:rotate-1 active:scale-[98%] active:shadow-none active:bg-gray-200 bg-white border-2 border-b-4 active:border-b-2 border-black rounded-xl flex focus:outline-2 focus:outline-offset-2 focus:outline-dashed focus:outline-pink active:outline-none overflow-hidden font-body",
  {
    variants: {
      variant: {
        small: "flex-row items-end h-40 w-80",
        vertical: "flex-col h-120 w-80 min-w-80",
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

export type CatCardProps = JSX.HTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof catCardVariants> & {
    cat?: Cat;
    disableViewTransition?: boolean;
  };

export const CatCard: Component<CatCardProps> = ({
  cat,
  variant = "big",
  class: classes,
  disableViewTransition = false,
  ...rest
}) => {
  if (!cat) {
    return undefined;
  }

  const [imgLoaded, setImgLoaded] = createSignal(false);

  return (
    <a href={`/${cat.slug}`} {...rest}>
      <div
        class={twMerge(catCardVariants({ variant }), classes)}
        style={{
          "view-transition-name": disableViewTransition
            ? undefined
            : `cat_${cat.slug}`,
        }}
      >
        <div
          class={twMerge(
            "relative bg-gray-200 w-full h-full overflow-hidden",
            variant === "small" && "w-1/2 h-full"
          )}
        >
          {cat.image && (
            <img
              src={cat.image}
              alt={cat.name}
              class={twMerge(
                "object-cover w-full h-full transition",
                !imgLoaded() && "opacity-0"
              )}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              style={{
                "view-transition-name": `picture_${cat.slug}`,
              }}
            />
          )}
          <Show when={!imgLoaded()}>
            <div class="absolute inset-0 flex items-center justify-center bg-gray-200">
              <svg
                class="animate-spin w-6 h-6 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            </div>
          </Show>
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
            showOnly={variant === "small" ? "Novo" : undefined}
          />
          <div class="absolute h-full w-4 bg-linear-to-l from-white to-transparent right-0" />
        </div>
      </div>
    </a>
  );
};
