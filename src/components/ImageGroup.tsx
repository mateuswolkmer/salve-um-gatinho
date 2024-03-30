import { Component, For, createMemo, createSignal } from "solid-js";

export type ImageGroupProps = {};

export const ImageGroup: Component<ImageGroupProps> = () => {
  const [selected, setSelected] = createSignal(0);

  return (
    <div class="relative w-full h-full">
      {/* //   style={{ "view-transition-name": `picture_${formattedName}` }} */}
      <For each={[0, 1, 2]}>
        {(_v, i) => {
          const state = createMemo(() =>
            selected() === i()
              ? "selected"
              : selected() > i()
              ? "left"
              : "right"
          );

          return (
            <button
              onClick={() => setSelected(0)}
              classList={{
                "bg-gray-200 rounded-xl absolute inset-0 transition-all w-96 h-96":
                  true,
              }}
            ></button>
          );
        }}
      </For>
      <button
        onClick={() => setSelected(0)}
        class="bg-gray-200 rounded-xl absolute inset-0 transition-all w-96 h-96"
      ></button>
      <button
        onClick={() => setSelected(1)}
        class="bg-pink-200 rounded-xl absolute inset-0 transition-all translate-x-20 -translate-y-4 rotate-3 scale-90 w-96 h-96 -z-10"
      ></button>
      <button
        onClick={() => setSelected(2)}
        class="bg-blue-200 rounded-xl absolute inset-0 transition-all -translate-x-20 -translate-y-4 -rotate-6 scale-90 w-96 h-96 -z-10"
      ></button>
    </div>
  );
};
