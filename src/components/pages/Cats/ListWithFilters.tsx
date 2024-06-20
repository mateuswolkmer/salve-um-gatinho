import { type Component } from "solid-js";
import type { Cat } from "../../../../tina/__generated__/types";
import { CatCard } from "../../CatCard";

export type ListWithFiltersProps = { cats?: Cat[] };

export const ListWithFilters: Component<ListWithFiltersProps> = ({
  cats = [],
}) => {
  // const [formOpened, setFormOpened] = createSignal(startOpened);

  return (
    <>
      {/* <div class="flex w-full max-w-5xl justify-between">
        <span>Filtros</span>
        <span>a</span>
      </div> */}
      <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {cats?.map((cat) => (
          <CatCard cat={cat} />
        ))}
      </div>
    </>
  );
};
