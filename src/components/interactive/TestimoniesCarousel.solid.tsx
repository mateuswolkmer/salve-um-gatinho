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
import type { Testimony } from "../../../tina/__generated__/types";
import { Button } from "../ui/Button.solid";

export type TestimoniesCarousel = {
  testimonies: Testimony[];
};

export const TestimoniesCarousel: Component<TestimoniesCarousel> = ({
  testimonies = [],
}) => {
  const isEven = testimonies.length % 2 === 0;
  const initialSelected = isEven ? 0 : Math.floor(testimonies.length / 2);

  const [selected, setSelected] = createSignal(initialSelected);
  const [tiltLeft, setTiltLeft] = createSignal(true);
  const toggleTilt = () => setTiltLeft((cur) => !cur);

  const handleSelectIndex = (index: number) => {
    setSelected(index);
    toggleTilt();
  };

  const handleSelectForward = () => {
    setSelected((cur) => (selected() < testimonies.length - 1 ? cur + 1 : 0));
    toggleTilt();
  };

  const handleSelectBackward = () => {
    setSelected((cur) => (selected() > 0 ? cur - 1 : testimonies.length - 1));
    toggleTilt();
  };

  const [messageRefs, setMessageRefs] = createSignal<HTMLParagraphElement[]>(
    []
  );
  const [messagesWrapperRef, setMessagesWrapperRef] =
    createSignal<HTMLDivElement>();

  createEffect(() => {
    const wrapper = messagesWrapperRef();
    if (!isNaN(selected()) && wrapper) {
      const selectedMessageHeight = messageRefs()[selected()].scrollHeight;
      wrapper.style.height = `${selectedMessageHeight}px`;
    }
  });

  return (
    <div class="flex flex-col items-center w-full">
      <div class="w-full rounded-xl flex items-center justify-center px-10 pb-20 pt-24 md:pt-20 relative">
        <div
          class={twMerge(
            "absolute inset-0 rounded-xl bg-blue border-black border-2 transition-all",
            tiltLeft() ? "-rotate-1" : "rotate-1"
          )}
        />
        <span class="absolute -top-22 md:-top-20 md:-left-20 text-blue text-[320px] font-display leading-none motion-preset-oscillate-sm motion-duration-2000">
          “
        </span>
        <span class="hidden md:block absolute -bottom-60 -right-20 text-blue text-[320px] font-display leading-none motion-preset-oscillate-sm motion-duration-2000 motion-delay-500">
          ”
        </span>
        <div ref={setMessagesWrapperRef} class="relative w-full transition-all">
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
                    const newMessageRefs = messageRefs();
                    newMessageRefs[i()] = ref;
                    setMessageRefs(newMessageRefs);
                  }}
                  class={twMerge(
                    "m-auto transition-all duration-300 absolute left-0 right-0 top-0 text-center text-pretty",
                    state() === "selected" && "opacity-100 translate-x-0",
                    state() === "left" && "opacity-0 -translate-x-10",
                    state() === "right" && "opacity-0 translate-x-10"
                  )}
                >
                  {testimony.message}
                </p>
              );
            }}
          </For>
        </div>
      </div>
      <div class="flex flex-col gap-1 items-center -mt-12">
        <div class="flex gap-6 items-center h-24 mb-20 relative">
          <Button
            variant="nav"
            navDirection="backward"
            class="absolute right-20 md:relative md:right-0"
            onClick={handleSelectBackward}
          />
          <For each={testimonies}>
            {(testimony, i) => {
              const isSelected = createMemo(() => selected() === i());

              const { isVisible, isMounted } = createPresence(isSelected, {
                transitionDuration: 500,
              });

              return (
                <div class="absolute md:relative top-0 right-1/2 translate-x-1/2 md:right-0 md:translate-x-0">
                  <button
                    type="button"
                    class={twMerge(
                      "bg-gray-200 rounded-t-[100%] rounded-b-3xl border-2 border-b-4 border-black transition-all duration-500 md:duration-300 size-24 md:size-16 opacity-0 md:opacity-100 overflow-hidden",
                      isSelected()
                        ? "size-24 md:size-24 border-b-2 opacity-100 z-10 motion-preset-pulse-sm motion-duration-2000"
                        : "hover:scale-110 hover:shadow-lg active:scale-90 active:shadow-none active:border-b-2 pointer-events-none md:pointer-events-auto"
                    )}
                    disabled={isSelected()}
                    title={`${isSelected() ? "" : "Selecionar "}${
                      testimony.personName
                    }`}
                    onClick={() => handleSelectIndex(i())}
                  >
                    <img
                      src={testimony.personImage}
                      alt={testimony.personName}
                      class={twMerge(
                        "object-cover min-w-full min-h-full transition-all",
                        !isSelected() ? "saturate-0" : "saturate-100"
                      )}
                      loading="lazy"
                    />
                  </button>
                  <Show when={isMounted()}>
                    <div
                      class={twMerge(
                        "flex flex-col items-center text-center absolute top-28 left-0 right-0 transform origin-top duration-500 transition-all",
                        isVisible()
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-0"
                      )}
                    >
                      <span class="text-nowrap font-medium">
                        {testimony.personName}
                      </span>
                      <Show when={testimony.cat}>
                        <span class="text-lg text-nowrap">
                          adotou {testimony.cat.name}
                          <Show when={testimony.plus}> + {testimony.plus}</Show>
                        </span>
                      </Show>
                    </div>
                  </Show>
                </div>
              );
            }}
          </For>
          <Button
            variant="nav"
            navDirection="forward"
            class="absolute left-20 md:relative md:left-0"
            onClick={handleSelectForward}
          />
        </div>
      </div>
    </div>
  );
};
