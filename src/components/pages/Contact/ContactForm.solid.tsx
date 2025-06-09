import {
  type Component,
  Show,
  Suspense,
  createResource,
  createSignal,
} from "solid-js";
import { twMerge } from "tailwind-merge";
import { Button } from "../../ui/Button.solid";
import { InputField } from "../../ui/InputField.solid";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 100;
const MAX_SUBJECT_LENGTH = 150;
const MAX_MESSAGE_LENGTH = 2000;

const postFormData = async (
  formData: FormData
): Promise<{
  success: boolean;
  message: string;
  data: any;
}> => {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
};

export type ContactFormProps = {};

export const ContactForm: Component<ContactFormProps> = ({}) => {
  const [formData, setFormData] = createSignal<FormData>();
  const [response] = createResource(formData, postFormData);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setFormData(new FormData(e.target as HTMLFormElement));
  };

  return (
    <div class="w-full max-w-xl m-auto intersect:motion-preset-slide-up intersect-once relative">
      <form
        onSubmit={handleSubmit}
        autocomplete="on"
        class="flex flex-col gap-2"
      >
        <fieldset disabled={!!response()} class="flex flex-col gap-2">
          <div class="flex flex-col gap-1">
            <label for="name" class="text-lg font-semibold">
              Nome
            </label>
            <InputField
              id="name"
              name="name"
              type="text"
              placeholder="Maria"
              required
              maxLength={MAX_NAME_LENGTH}
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="email" class="text-lg font-semibold">
              Email
            </label>
            <InputField
              id="email"
              name="email"
              type="email"
              placeholder="maria@gmail.com"
              required
              maxLength={MAX_EMAIL_LENGTH}
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="subject" class="text-lg font-semibold">
              Assunto
            </label>
            <InputField
              id="subject"
              name="subject"
              type="text"
              placeholder="Dúvida"
              required
              maxLength={MAX_SUBJECT_LENGTH}
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="message" class="text-lg font-semibold">
              Mensagem
            </label>
            <textarea
              id="message"
              placeholder="Olá, eu gostaria de tirar uma dúvida..."
              name="message"
              required
              maxLength={MAX_MESSAGE_LENGTH}
              class="transition-all border-2 border-b-4 focus:border-b-4 focus:mb-1 transform focus:scale-[102%] border-black hover:scale-[99%] hover:shadow-lg focus:shadow-none rounded-xl p-2 text-xl"
              rows="3"
            ></textarea>
          </div>
          <div class="mt-4 self-center">
            <Show when={!formData()}>
              <Button variant="form" type="submit">
                Enviar
              </Button>
            </Show>
            {/* TODO improve messages */}
            <Suspense
              fallback={
                <Button variant="form" disabled>
                  Enviando...
                </Button>
              }
            >
              {response() && (
                <div
                  class={twMerge(
                    response().success &&
                      "bg-green-100 border-green-500 text-green-700",
                    !response().success &&
                      "bg-red-100 border-red-500 text-red-700",
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
    </div>
  );
};
