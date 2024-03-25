import { createPresence } from "@solid-primitives/presence";
import {
  type Component,
  For,
  Show,
  createEffect,
  createMemo,
  createSignal,
} from "solid-js";
import { twMerge } from "tailwind-merge";

export type Testimony = {
  image: string;
  name: string;
  adopted: string;
  comment: string;
  adoptedPlus?: number;
};

export type TestimoniesCarousel = {
  testimonies: Testimony[];
};

export const TestimoniesCarousel: Component<TestimoniesCarousel> = ({
  testimonies = [],
}) => {
  const isEven = testimonies.length % 2 === 0;
  const initialSelected = isEven ? 0 : Math.floor(testimonies.length / 2);

  const [selected, setSelected] = createSignal(initialSelected);
  const selectedTestimony = createMemo(() => testimonies[selected()]);

  const [commentRefs, setCommentRefs] = createSignal<HTMLParagraphElement[]>(
    []
  );
  const [commentsWrapperRef, setCommentsWrapperRef] =
    createSignal<HTMLDivElement>();

  createEffect(() => {
    const wrapper = commentsWrapperRef();
    if (selected() && wrapper) {
      const selectedCommentHeight = commentRefs()[selected()].scrollHeight;
      wrapper.style.height = `${selectedCommentHeight}px`;
    }
  });

  return (
    <div class="flex flex-col items-center w-full">
      <div class="w-full bg-blue-200 rounded-xl border-4 border-black flex items-center justify-center px-10 py-20 relative">
        <span class="absolute -top-[5.5rem] left:0 right:0 md:-top-20 md:-left-20 text-blue text-[400px] font-display leading-none">
          “
        </span>
        <span class="hidden md:block absolute -bottom-72 -right-20 text-blue text-[400px] font-display leading-none">
          ”
        </span>
        <div ref={setCommentsWrapperRef} class="relative w-full transition-all">
          <For each={testimonies}>
            {(testimony, i) => {
              const state = createMemo(() =>
                selected() === i()
                  ? "selected"
                  : selected() > i()
                  ? "left"
                  : "right"
              );

              return (
                <p
                  ref={(ref) => {
                    const newCommentRefs = commentRefs();
                    newCommentRefs[i()] = ref;
                    setCommentRefs(newCommentRefs);
                  }}
                  class={twMerge(
                    "m-auto transition-all duration-300 absolute left-0 right-0 top-0 text-center",
                    state() === "selected" && "opacity-1 translate-x-0",
                    state() === "left" && "opacity-0 -translate-x-10",
                    state() === "right" && "opacity-0 translate-x-10"
                  )}
                >
                  {testimony.comment}
                </p>
              );
            }}
          </For>
        </div>
      </div>
      {/* FIXME make responsive, add buttons to go to next or previous testimony on mobile, centered on middle */}
      <div class="flex flex-col gap-1 items-center -mt-12">
        <div class="flex gap-6 items-center h-24 mb-20">
          <For each={testimonies}>
            {(testimony, i) => {
              const isSelected = createMemo(() => selected() === i());

              const { isVisible, isMounted } = createPresence(isSelected, {
                transitionDuration: 500,
              });

              return (
                <div class="relative">
                  <button
                    type="button"
                    class={twMerge(
                      "bg-gray-200 rounded-t-[100%] rounded-b-3xl border-4 border-b-8 border-black transition-all transform size-16",
                      isSelected()
                        ? "size-24 border-b-4"
                        : "hover:scale-110 hover:shadow-lg active:scale-90 active:shadow-none active:border-b-4"
                    )}
                    disabled={isSelected()}
                    title={`${isSelected() ? "" : "Selecionar "}${
                      testimony.name
                    }`}
                    onClick={() => setSelected(i)}
                  />
                  <Show when={isMounted()}>
                    <div
                      class={twMerge(
                        "flex flex-col items-center text-center absolute top-28 left-0 right-0 transform origin-top duration-500 transition-all",
                        isVisible()
                          ? "opacity-1 scale-100"
                          : "opacity-0 scale-0"
                      )}
                    >
                      <span class="text-nowrap font-medium">
                        {testimony.name}
                      </span>
                      <span class="text-lg text-nowrap">
                        adotou {testimony.adopted}
                        <Show when={testimony.adoptedPlus}>
                          {" "}
                          + {testimony.adoptedPlus}
                        </Show>
                      </span>
                    </div>
                  </Show>
                </div>
              );
            }}
          </For>
        </div>
      </div>
    </div>
  );
};
