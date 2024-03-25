import { createMemo, type Component, onMount } from "solid-js";
import { CatCard } from "./CatCard";
import { Button, ButtonLink } from "./Button";

export type CatsListProps = {
  // TODO add proper types
  cats?: { name: string }[];
};

export const CatsList: Component<CatsListProps> = ({ cats }) => {
  let catsListRef: HTMLDivElement | undefined = undefined;

  const scrollRight = () => {
    if (catsListRef) catsListRef.scrollLeft += 500;
  };

  const scrollLeft = () => {
    if (catsListRef) catsListRef.scrollLeft -= 500;
  };

  return (
    <div class="flex flex-col gap-12 items-start">
      <div
        ref={catsListRef}
        id="cats-list"
        class="flex gap-8 flex-nowrap -mr-20 w-full py-8 overflow-y-visible overflow-x-scroll scroll-smooth"
      >
        {cats?.map((cat) => (
          <CatCard
            variant="vertical"
            cat={cat}
            style={{ "view-transition-name": `cat_${cat.name}` }}
          />
        ))}
      </div>
      <div class="flex justify-between md:justify-center w-full">
        <Button
          variant="nav"
          navDirection="backward"
          class="md:absolute md:left-10"
          onClick={scrollLeft}
        />
        <ButtonLink href="/adote" variant="nav">
          Ver mais
        </ButtonLink>
        <Button
          variant="nav"
          navDirection="forward"
          class="md:absolute md:right-10"
          onClick={scrollRight}
        />
      </div>
    </div>
  );
};
