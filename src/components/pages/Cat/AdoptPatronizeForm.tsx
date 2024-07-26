import { createSignal, type Component, createEffect, Show } from "solid-js";
import { Button, ButtonLink } from "../../Button";
import { twMerge } from "tailwind-merge";

export type AdoptPatronizeFormProps = {
  catName: string;
  startOpened?: boolean;
  hideAdoptButton?: boolean;
  hidePatronizeButton?: boolean;
};

export const AdoptPatronizeForm: Component<AdoptPatronizeFormProps> = (
  props
) => {
  const [openedForm, setOpenedForm] = createSignal<"" | "adopt" | "patronize">(
    ""
  );
  const adoptFormOpened = () => openedForm() === "adopt";
  const patronizeFormOpened = () => openedForm() === "patronize";

  return (
    <div class="flex flex-col lg:flex-row items-start justify-center w-full gap-4">
      {!props.hideAdoptButton && (
        <div
          class={twMerge(
            "relative transition-all",
            adoptFormOpened() ? "w-full max-w-3xl" : "max-w-lg"
          )}
        >
          <Button
            class={twMerge(
              "absolute right-0 top-0 transition-[transform,colors] z-10",
              adoptFormOpened() && "opacity-0 pointer-events-none -z-20"
            )}
            variant="cta"
            onClick={() => setOpenedForm("adopt")}
          >
            Adotar
          </Button>
          <div
            class={twMerge(
              "flex flex-col gap-4 border-2 border-black rounded-xl bg-pink-300 p-4 md:p-6 overflow-hidden w-full transition-all",
              adoptFormOpened()
                ? "max-w-full max-h-[40rem] w-full duration-500"
                : "max-h-14 max-w-16 sm:max-w-[16rem] sm:max-h-20 m-4 duration-100"
            )}
          >
            <div class="flex flex-row w-full justify-between items-center">
              <h2
                class={twMerge(
                  "text-nowrap transition-all duration-300",
                  adoptFormOpened()
                    ? "text-4xl"
                    : "text-5xl sm:text-6xl px-14 -mt-4 -ml-2 -rotate-1"
                )}
              >
                Adotar
              </h2>
              <button onClick={() => setOpenedForm("")}>
                <i class="ph-x-circle ph-duotone text-3xl" />
              </button>
            </div>
            <Show when={adoptFormOpened()}>
              <div class="flex flex-col items-center gap-4">
                <iframe
                  src={`https://docs.google.com/forms/d/e/1FAIpQLSffiIKJw6gupaE4XUlPBfHTxGpWjen57Tk2hlfyRMLlN_baSw/viewform?embedded=true&usp=pp_url&entry.828023490=${props.catName}`}
                  width="full"
                  height="400"
                  class="w-full rounded-xl"
                >
                  Carregando formulário...
                </iframe>
                <a
                  href={`https://docs.google.com/forms/d/e/1FAIpQLSffiIKJw6gupaE4XUlPBfHTxGpWjen57Tk2hlfyRMLlN_baSw/viewform?usp=pp_url&entry.828023490=${props.catName}`}
                  target="_blank"
                >
                  Abrir em nova aba <i class="ph-arrow-square-out ph-duotone" />
                </a>
              </div>
            </Show>
          </div>
        </div>
      )}
      {!props.hidePatronizeButton && (
        <div
          class={twMerge(
            "relative transition-all",
            patronizeFormOpened() ? "w-full max-w-3xl" : "max-w-lg"
          )}
        >
          <Button
            class={twMerge(
              "absolute left-0 z-10 bg-blue hover:bg-blue-300 active:bg-blue-600 transition-[transform,colors] opacity-100",
              patronizeFormOpened() && "opacity-0 pointer-events-none -z-20"
            )}
            variant="cta"
            onClick={() => setOpenedForm("patronize")}
          >
            Apadrinhar
          </Button>
          <div
            class={twMerge(
              "flex flex-col gap-4 border-2 border-black rounded-xl bg-blue-300 p-4 md:p-6 overflow-hidden w-full transition-all",
              patronizeFormOpened()
                ? "max-w-full max-h-[40rem] w-full duration-500"
                : "max-h-14 max-w-20 sm:max-w-[16rem] sm:max-h-20 m-4 duration-100"
            )}
          >
            <div class="flex flex-row w-full justify-between items-center">
              <h2
                class={twMerge(
                  "text-nowrap transition-all duration-300",
                  patronizeFormOpened()
                    ? "text-4xl"
                    : "text-5xl sm:text-6xl px-14 -mt-4 -ml-2 -rotate-1"
                )}
              >
                Apadrinhar
              </h2>
              <button onClick={() => setOpenedForm("")}>
                <i class="ph-x-circle ph-duotone text-3xl" />
              </button>
            </div>
            <Show when={patronizeFormOpened()}>
              <div class="flex flex-col items-center gap-4">
                {/* FIXME adjust apadrinhar links */}
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSffiIKJw6gupaE4XUlPBfHTxGpWjen57Tk2hlfyRMLlN_baSw/viewform?embedded=true"
                  width="full"
                  height="400"
                  class="w-full rounded-xl"
                >
                  Carregando formulário...
                </iframe>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSffiIKJw6gupaE4XUlPBfHTxGpWjen57Tk2hlfyRMLlN_baSw"
                  target="_blank"
                >
                  Abrir em nova aba <i class="ph-arrow-square-out ph-duotone" />
                </a>
              </div>
            </Show>
          </div>
        </div>
      )}
    </div>
  );
};
