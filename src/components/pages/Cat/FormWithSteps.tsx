import { Show, createSignal, type Component } from "solid-js";
import { twMerge } from "tailwind-merge";
import { Button } from "../../Button";
import type { FormType } from "./AdoptPatronizeForm";

export type FormWithStepsProps = {
  type: FormType;
  catName: string;
  isOpen: boolean;
  onClose: () => void;
};

const forms = {
  adotar: {
    link: (catName) =>
      `https://docs.google.com/forms/d/e/1FAIpQLSdFXyXYE76ebBbVEvE335QyuWtud_WecmjGzrscELjf7OC-5g/viewform?usp=pp_url${
        catName ? `&entry.1570542373=${catName}` : ""
      }`,
    embed: (catName) =>
      `https://docs.google.com/forms/d/e/1FAIpQLSdFXyXYE76ebBbVEvE335QyuWtud_WecmjGzrscELjf7OC-5g/viewform?embedded=true&usp=pp_url${
        catName ? `&entry.1570542373=${catName}` : ""
      }`,
  },
  apadrinhar: {
    link: (catName) =>
      `https://docs.google.com/forms/d/e/1FAIpQLScNEsej6sS06QTzG66525-8H9CO0VGbdkMqDT_6BW0nXOZi3w/viewform?usp=pp_url${
        catName ? `&entry.828023490=${catName}` : ""
      }`,
    embed: (catName) =>
      `https://docs.google.com/forms/d/e/1FAIpQLScNEsej6sS06QTzG66525-8H9CO0VGbdkMqDT_6BW0nXOZi3w/viewform?embedded=true&usp=pp_url${
        catName ? `&entry.828023490=${catName}` : ""
      }`,
  },
};

export const FormWithSteps: Component<FormWithStepsProps> = (props) => {
  const [step, setStep] = createSignal(0);
  const handleStepForward = () => setStep((prev) => prev + 1);

  const [hasAccepted, setHasAccepted] = createSignal(false);
  const isButtonDisabled = () => !hasAccepted();

  return (
    <div
      id={`${props.type}-container`}
      class={twMerge(
        "flex flex-col gap-4 border-2 border-black rounded-xl p-4 md:p-6 overflow-hidden w-full transition-all motion-duration-300",
        props.type === "adotar" && "bg-pink-300",
        props.type === "apadrinhar" && "bg-blue-300",
        props.isOpen
          ? "opacity-1 max-w-full max-h-[40rem] w-full duration-500"
          : "opacity-0 max-h-14 max-w-16 sm:max-w-[16rem] sm:max-h-20 m-4 duration-100",
        props.isOpen &&
          props.type === "adotar" &&
          "motion-preset-rebound-down lg:motion-preset-rebound-left",
        props.isOpen &&
          props.type === "apadrinhar" &&
          "motion-preset-rebound-down lg:motion-preset-rebound-right"
      )}
    >
      <div class="flex flex-row w-full justify-between items-center">
        <h2
          class={twMerge(
            "text-nowrap transition-all duration-300",
            props.isOpen
              ? "text-4xl"
              : "text-5xl sm:text-6xl px-14 -mt-4 -ml-2 -rotate-1"
          )}
        >
          <Show when={props.type === "adotar"}>Adotar</Show>
          <Show when={props.type === "apadrinhar"}>Apadrinhar</Show>
        </h2>
        <button onClick={props.onClose}>
          <i class="ph-x-circle ph-duotone text-3xl" />
        </button>
      </div>
      <Show when={props.isOpen}>
        <Show when={step() === 0}>
          <div class="flex flex-col items-start gap-8">
            <div class="flex flex-col gap-4">
              <Show when={props.type === "adotar"}>
                <p>
                  Levamos a adoção a sério, e será preciso passar por um
                  processo de seleção para garantir que você está apto(a) a
                  receber o gatinho em sua casa.
                </p>
                <p>
                  A primeira etapa consiste em um formulário para conhecermos
                  você melhor.
                </p>
              </Show>
              <Show when={props.type === "apadrinhar"}>
                <p>
                  Apadrinhar é um gesto nobre, mas precisamos garantir que
                  podemos contar com seu apoio mensal para nos organizarmos
                  financeiramente.
                </p>
                <p>
                  Preencha o formulário com seus dados e entraremos em contato!
                </p>
              </Show>

              <div class="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="accept_adopt"
                  class="accent-yellow size-5 min-w-5 min-h-5 relative after:absolute after:inset-0 after:border-black after:border-2 after:rounded-sm"
                  // @ts-expect-error
                  value={hasAccepted()}
                  onChange={(e) => setHasAccepted(e.target.checked)}
                />
                <label for="accept_adopt" class="text-xl">
                  Confirmo que li{" "}
                  <Show when={props.type === "adotar"}>
                    <a
                      target="_blank"
                      href="/faq#adotar"
                      class="font-body font-bold underline"
                    >
                      o que preciso saber antes de adotar
                    </a>
                  </Show>
                  <Show when={props.type === "apadrinhar"}>
                    <a
                      target="_blank"
                      href="/faq#apadrinhar"
                      class="font-body font-bold underline"
                    >
                      o que preciso saber antes de apadrinhar
                    </a>
                  </Show>
                  .
                </label>
              </div>
            </div>
            <Button
              variant="form"
              disabled={isButtonDisabled}
              onClick={handleStepForward}
              data-umami-event="Cat form"
              data-umami-event-form={
                props.type === "adotar" ? "Adopt" : "Patronize"
              }
              data-umami-event-cat-name={props.catName}
            >
              Prosseguir para formulário
            </Button>
          </div>
        </Show>
        <Show when={step() === 1}>
          <div class="flex flex-col items-center gap-4">
            <iframe
              src={forms[props.type].embed(props.catName)}
              width="full"
              height="400"
              class="w-full rounded-xl"
            >
              Carregando formulário...
            </iframe>
            <a href={forms[props.type].link(props.catName)} target="_blank">
              Abrir em nova aba <i class="ph-arrow-square-out ph-duotone" />
            </a>
          </div>
        </Show>
      </Show>
    </div>
  );
};
