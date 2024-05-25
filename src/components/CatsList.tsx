import { type Component, createEffect } from "solid-js";
import { CatCard } from "./CatCard";
import { Button, ButtonLink } from "./Button";
import type { Cat } from "../../tina/__generated__/types";

export type CatsListProps = {
  cats?: Cat[];
  disableTransition?: boolean;
};

export const CatsList: Component<CatsListProps> = ({
  cats,
  disableTransition,
}) => {
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
    <div class="flex flex-col gap-12 items-start">
      <div
        ref={catsListRef}
        id="cats-list"
        class="flex gap-8 flex-nowrap py-8 w-screen -ml-10 px-10 overflow-y-visible no-scrollbar overflow-x-scroll scroll-smooth"
      >
        {cats?.map((cat) => (
          <CatCard
            variant="vertical"
            cat={cat}
            disableTransition={disableTransition}
          />
        ))}
      </div>
      <div class="flex justify-between items-center w-full">
        <Button
          variant="nav"
          navDirection="backward"
          onClick={scrollLeft}
          ref={backwardButton}
          disabled
        />
        <ButtonLink href="/gatos" variant="nav">
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
