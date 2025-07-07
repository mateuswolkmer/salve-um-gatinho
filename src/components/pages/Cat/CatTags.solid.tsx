import type { Component, JSX } from "solid-js";
import { twMerge } from "tailwind-merge";
import type { Cat } from "../../../../tina/__generated__/types";
import {
  getCatAppearenceTags,
  getCatGeneralTags,
} from "../../../utils/catUtils";
import { Tag } from "../../ui/Tag.solid";

export type CatTagsProps = JSX.HTMLAttributes<HTMLDivElement> & {
  cat?: Cat;
  showOnly?: "Novo" | string;
  type?: "general" | "appearence";
};

export const CatTags: Component<CatTagsProps> = ({
  cat,
  class: classNames,
  showOnly,
  type = "general",
  ...rest
}) => {
  const getTags =
    type === "appearence" ? getCatAppearenceTags : getCatGeneralTags;

  const tags = getTags(cat).filter(
    (tag) => !showOnly || tag.label === showOnly
  );

  return (
    <div class={twMerge("flex gap-2 items-center", classNames)} {...rest}>
      {tags?.map(({ label, tagProps = {} }) => (
        <Tag {...tagProps}>{label}</Tag>
      ))}
    </div>
  );
};
