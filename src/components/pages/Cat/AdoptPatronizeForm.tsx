import { createSignal, type Component } from "solid-js";
import { Button } from "../../Button";
import { twMerge } from "tailwind-merge";
import { FormWithSteps } from "./FormWithSteps";

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
  const [hasOpenedAnyForm, setHasOpenedAnyForm] = createSignal<boolean>(false);

  const adoptFormOpened = () => openedForm() === "adopt";
  const patronizeFormOpened = () => openedForm() === "patronize";

  const handleOpenForm = (form: "adopt" | "patronize") => {
    setOpenedForm(form);
    setHasOpenedAnyForm(true);
  };

  const handleCloseForm = () => setOpenedForm("");

  const urlFriendlyName = props.catName?.replaceAll(" ", "+");

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
              "absolute left-0 lg:left-auto lg:right-0 top-0 transition-[transform,colors] z-10",
              !hasOpenedAnyForm() && "motion-preset-slide-up motion-delay-700",
              adoptFormOpened()
                ? "opacity-0 pointer-events-none -z-20"
                : hasOpenedAnyForm() &&
                    "lg:motion-preset-rebound-right motion-opacity-in-100 motion-duration-300"
            )}
            variant="cta"
            onClick={() => handleOpenForm("adopt")}
          >
            Adotar
          </Button>
          <FormWithSteps
            type="adopt"
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
              "absolute left-0 z-10 bg-blue hover:bg-blue-300 active:bg-blue-600 transition-[transform,colors] opacity-100",
              !hasOpenedAnyForm() && "motion-preset-slide-up motion-delay-1000",
              patronizeFormOpened()
                ? "opacity-0 pointer-events-none -z-20"
                : hasOpenedAnyForm() &&
                    "lg:motion-preset-rebound-left motion-opacity-in-100 motion-duration-300"
            )}
            variant="cta"
            onClick={() => handleOpenForm("patronize")}
          >
            Apadrinhar
          </Button>
          <FormWithSteps
            type="patronize"
            catName={urlFriendlyName}
            isOpen={patronizeFormOpened()}
            onClose={handleCloseForm}
          />
        </div>
      )}
    </div>
  );
};
