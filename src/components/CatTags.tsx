import { Show, type Component, type JSX } from "solid-js";
import type { Cat } from "../../tina/__generated__/types";
import { twMerge } from "tailwind-merge";
import { Tag } from "./Tag";
import { differenceInDays } from "date-fns";

const today = new Date();

export type CatTagsProps = JSX.HTMLAttributes<HTMLDivElement> & {
  cat?: Cat;
  showOnly?: "new";
};

export const CatTags: Component<CatTagsProps> = ({
  cat: { tags, gender, rescueDate },
  class: classNames,
  showOnly,
  ...rest
}) => {
  return (
    <div class={twMerge("flex gap-2 items-center", classNames)} {...rest}>
      <Show when={rescueDate && differenceInDays(today, rescueDate) <= 30}>
        <Tag special="new">Novo</Tag>
      </Show>
      <Show when={showOnly !== "new"}>
        <Show when={gender === "female"}>
          <Tag special="female">Fêmea</Tag>
        </Show>
        <Show when={gender === "male"}>
          <Tag special="male">Macho</Tag>
        </Show>
        {tags?.map((tag) => (
          <Tag>{tag}</Tag>
        ))}
      </Show>
    </div>
  );
};
