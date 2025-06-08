import { type Component, createSignal, onMount } from "solid-js";
import { twMerge } from "tailwind-merge";
import { Button } from "../../ui/Button";
import { FormWithSteps } from "./FormWithSteps";

export type FormType = "adotar" | "apadrinhar" | "";

export type AdoptPatronizeFormProps = {
  catName: string;
  startOpenedForm?: FormType;
  hideAdoptButton?: boolean;
  hidePatronizeButton?: boolean;
};

export const AdoptPatronizeForm: Component<AdoptPatronizeFormProps> = (
  props
) => {
  const [openedForm, setOpenedForm] = createSignal<FormType>(
    props.startOpenedForm
  );
  const [hasOpenedAnyForm, setHasOpenedAnyForm] = createSignal<boolean>(
    Boolean(props.startOpenedForm)
  );

  const adoptFormOpened = () => openedForm() === "adotar";
  const patronizeFormOpened = () => openedForm() === "apadrinhar";

  const handleOpenForm = (form: "adotar" | "apadrinhar") => {
    setOpenedForm(form);
    setHasOpenedAnyForm(true);
  };

  const handleCloseForm = () => setOpenedForm("");

  const urlFriendlyName = props.catName?.replaceAll(" ", "+");

  onMount(() => {
    if (props.startOpenedForm) {
      document
        .getElementById(`${props.startOpenedForm}-container`)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
    }
  });

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
              "absolute left-0 lg:left-auto lg:right-0 top-0 transition-all z-10",
              !hasOpenedAnyForm() && "motion-preset-slide-up motion-delay-700",
              adoptFormOpened()
                ? "opacity-0 pointer-events-none -z-20"
                : hasOpenedAnyForm() &&
                    "lg:motion-preset-rebound-right motion-opacity-in-100 motion-duration-300"
            )}
            variant="cta"
            onClick={() => handleOpenForm("adotar")}
            data-umami-event="Cat action"
            data-umami-event-action="Adopt"
            data-umami-event-cat-name={props.catName}
          >
            Adotar
          </Button>
          <FormWithSteps
            type="adotar"
            catName={urlFriendlyName}
            isOpen={adoptFormOpened()}
            onClose={handleCloseForm}
          />
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
              "absolute left-0 z-10 bg-blue hover:bg-blue active:bg-blue transition-[transform,colors] opacity-100",
              !hasOpenedAnyForm() && "motion-preset-slide-up motion-delay-1000",
              patronizeFormOpened()
                ? "opacity-0 pointer-events-none -z-20"
                : hasOpenedAnyForm() &&
                    "lg:motion-preset-rebound-left motion-opacity-in-100 motion-duration-300"
            )}
            variant="cta"
            onClick={() => handleOpenForm("apadrinhar")}
            data-umami-event="Cat action"
            data-umami-event-action="Patronize"
            data-umami-event-cat-name={props.catName}
          >
            Apadrinhar
          </Button>
          <FormWithSteps
            type="apadrinhar"
            catName={urlFriendlyName}
            isOpen={patronizeFormOpened()}
            onClose={handleCloseForm}
          />
        </div>
      )}
    </div>
  );
};
