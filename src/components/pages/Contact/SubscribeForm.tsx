import type { Component } from "solid-js";
import { Show, Suspense, createResource, createSignal } from "solid-js";
import { twMerge } from "tailwind-merge";
import { Button } from "../../ui/Button";
import { InputField } from "../../ui/InputField";

const postSubscribeData = async (
  formData: FormData
): Promise<{ success: boolean; message: string; data: any }> => {
  const response = await fetch("/api/subscribe", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
};

export const SubscribeForm: Component = () => {
  const [formData, setFormData] = createSignal<FormData>();
  const [response] = createResource(formData, postSubscribeData);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    setFormData(new FormData(e.target as HTMLFormElement));
  };

  return (
    <form onSubmit={handleSubmit} autocomplete="on" class="flex flex-col gap-2">
      <fieldset disabled={!!response()} class="flex flex-col gap-2">
        <div class="flex flex-col gap-1">
          <InputField
            type="email"
            name="email"
            placeholder="Digite seu email"
            required
            size="sm"
          />
        </div>
        <div class="w-full">
          <Show when={!formData()}>
            <Button type="submit" variant="form-mini" class="w-full">
              Inscreva-se
            </Button>
          </Show>
          {/* TODO improve messages */}
          <Suspense
            fallback={
              <Button variant="form-mini" disabled>
                Enviando...
              </Button>
            }
          >
            {response() && (
              <div
                class={twMerge(
                  response().success
                    ? "bg-green-100 border-green-500 text-green-700"
                    : "bg-red-100 border-red-500 text-red-700",
                  "rounded-xl transition-all max-h-[100px] px-4 py-3 border-2 motion-preset-pop mb-4"
                )}
              >
                {response().message}
              </div>
            )}
          </Suspense>
        </div>
      </fieldset>
    </form>
  );
};
