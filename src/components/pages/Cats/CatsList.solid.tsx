import { type Component, createEffect } from "solid-js";
import type { Cat } from "../../../../tina/__generated__/types";
import { CatCard } from "../../pages/Cat/CatCard.solid";
import { Button, ButtonLink } from "../../ui/Button.solid";

export type CatsListProps = {
  cats?: Cat[];
};

export const CatsList: Component<CatsListProps> = ({ cats }) => {
  let catsListRef: HTMLDivElement | undefined;

  const scrollRight = () => {
    if (catsListRef) (catsListRef as HTMLDivElement).scrollLeft += 350;
  };

  const scrollLeft = () => {
    if (catsListRef) (catsListRef as HTMLDivElement).scrollLeft -= 350;
  };

  let backwardButton: HTMLButtonElement | undefined;
  let forwardButton: HTMLButtonElement | undefined;

  createEffect(() => {
    const onScroll = () => {
      if (!catsListRef || !backwardButton || !forwardButton) return;

      const reachedStart = catsListRef.scrollLeft <= 50;
      const reachedEnd =
        catsListRef.scrollLeft + catsListRef.offsetWidth >=
        catsListRef.scrollWidth - 50;

      backwardButton.disabled = reachedStart;
      forwardButton.disabled = reachedEnd;
    };

    catsListRef?.addEventListener("scroll", onScroll);
    return () => catsListRef?.removeEventListener("scroll", onScroll);
  });

  return (
    <div class="flex flex-col gap-4 items-start -mr-10 intersect:motion-preset-slide-up intersect-once">
      <div class="relative">
        <div
          ref={catsListRef}
          id="cats-list"
          class="flex gap-8 flex-nowrap py-8 w-screen -ml-10 px-10 overflow-y-visible no-scrollbar overflow-x-scroll scroll-smooth"
        >
          {cats?.map((cat) => (
            <CatCard
              variant="vertical"
              cat={cat}
              class="intersect:motion-preset-fade"
            />
          ))}
        </div>
        {/* <div class="absolute top-0 right-0 h-full w-10 bg-linear-to-l from-white to-transparent" /> */}
      </div>
      <div class="flex justify-center gap-4 items-center w-full pr-10">
        <Button
          variant="nav"
          navDirection="backward"
          onClick={scrollLeft}
          ref={backwardButton}
          disabled
        />
        <ButtonLink href="/adotar" variant="nav">
          Ver mais
        </ButtonLink>
        <Button
          variant="nav"
          navDirection="forward"
          onClick={scrollRight}
          ref={forwardButton}
        />
      </div>
    </div>
  );
};
