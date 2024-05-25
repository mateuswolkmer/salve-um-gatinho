import { createSignal, type Component, createEffect, Show } from "solid-js";
import { Button } from "../../Button";
import { Highlight } from "../../Highlight";

export type AdoptFormProps = { startOpened?: boolean };

export const AdoptForm: Component<AdoptFormProps> = ({
  startOpened = false,
}) => {
  const [formOpened, setFormOpened] = createSignal(startOpened);

  // FIXME setting opacity class based on signal change didn't work
  let buttonRef: HTMLButtonElement | undefined;
  createEffect(() => {
    if (formOpened() && buttonRef) {
      buttonRef.style.transition = "none";
      buttonRef.style.opacity = "0";
      buttonRef.style.pointerEvents = "none";
      buttonRef.style.zIndex = "-1";
    }
  });

  return (
    <div class="flex flex-col items-start gap-4 relative">
      <Button
        ref={buttonRef}
        class="absolute left-0 top-0 transition-all z-10"
        variant="cta"
        onClick={() => setFormOpened(true)}
      >
        Me adote
      </Button>
      <div
        classList={{
          "border-2 border-black rounded-xl bg-pink-300 p-4 md:p-6 overflow-hidden w-full transition-all duration-300":
            true,
          "max-h-14 max-w-64 sm:max-w-[20rem] sm:max-h-20 m-4": !formOpened(),
          "max-w-full max-h-[40rem]": formOpened(),
        }}
      >
        <h2
          classList={{
            "text-nowrap transition-all duration-300 mb-4 -z-10": true,
            "text-5xl sm:text-6xl px-14 -mt-4 -ml-2 -rotate-1": !formOpened(),
            "text-4xl": formOpened(),
          }}
        >
          Me adote
        </h2>
        <Show when={formOpened()}>
          <form
            method="post"
            autocomplete="on"
            class="flex flex-col gap-4 w-full"
          >
            <p class="mt-4 text-lg font-semibold">
              Por favor, preencha com seus dados básicos.
            </p>
            <div class="flex flex-col gap-2">
              <div class="flex flex-col gap-1">
                <label for="name" class="text-lg font-semibold">
                  Nome
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Maria"
                  required
                  class="transition-all border-2 border-b-4 focus:border-b-4 focus:mb-1 transform focus:scale-[102%] border-black hover:scale-[99%] hover:shadow-lg focus:shadow-none rounded-xl p-2 text-xl"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label for="email" class="text-lg font-semibold">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="maria@gmail.com"
                  required
                  class="transition-all border-2 border-b-4 focus:border-b-4 focus:mb-1 transform focus:scale-[102%] border-black hover:scale-[99%] hover:shadow-lg focus:shadow-none rounded-xl p-2 text-xl"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label for="subject" class="text-lg font-semibold">
                  Já adotou pelo Salve?
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Sim/Não"
                  class="transition-all border-2 border-b-4 focus:border-b-4 focus:mb-1 transform focus:scale-[102%] border-black hover:scale-[99%] hover:shadow-lg focus:shadow-none rounded-xl p-2 text-xl"
                />
              </div>
            </div>
            <p class="text-lg font-semibold">
              Após o envio, <Highlight bold>entraremos em contato</Highlight>{" "}
              com informações dos próximos passos.
            </p>
            <Button variant="form" class="self-start" type="submit">
              Enviar
            </Button>
          </form>
        </Show>
      </div>
    </div>
  );
};
