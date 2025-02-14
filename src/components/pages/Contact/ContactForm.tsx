import { type Component, createSignal } from "solid-js";
import { Button } from "../../Button";
import { sendEmail } from "../../../api/contact";
import { twMerge } from "tailwind-merge";
import { sanitize } from "../../../utils";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 100;
const MAX_SUBJECT_LENGTH = 150;
const MAX_MESSAGE_LENGTH = 2000;

export type ContactFormProps = {};

export const ContactForm: Component<ContactFormProps> = ({}) => {
  const [formStatus, setFormStatus] = createSignal<{
    success?: string;
    error?: string;
  }>({});

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setFormStatus({});
    // const form = e.currentTarget as HTMLFormElement;
    // const formData = new FormData(form);

    // // Get raw inputs and convert null to empty strings
    // const rawName = formData.get("name")?.toString() || "";
    // const rawEmail = formData.get("email")?.toString() || "";
    // const rawSubject = formData.get("subject")?.toString() || "";
    // const rawMessage = formData.get("message")?.toString() || "";

    // // Sanitize user inputs
    // const name = sanitize(rawName, MAX_NAME_LENGTH);
    // const email = sanitize(rawEmail, MAX_EMAIL_LENGTH);
    // const subject = sanitize(rawSubject, MAX_SUBJECT_LENGTH);
    // const message = sanitize(rawMessage, MAX_MESSAGE_LENGTH);

    // if (!name || !email || !message) {
    //   setFormStatus({
    //     error: "Por favor, preencha todos os campos obrigatórios.",
    //   });
    //   return;
    // }

    // try {
    //   const response = await sendEmail({ name, email, subject, message });

    //   setFormStatus({ success: "Mensagem enviada com sucesso!" });
    //   form.reset();

    //   return response;
    // } catch (error) {
    //   if (error instanceof Error) {
    //     setFormStatus({ error: `Erro ao enviar mensagem: ${error.message}` });
    //     console.error(`error: ${error.message}`);
    //   }
    // }
  };

  return (
    <div class="w-full max-w-xl m-auto intersect:motion-preset-slide-up intersect-once relative">
      <span class="absolute inset-0 bottom-10 flex items-center justify-center text-5xl font-display text-shadow-yellow motion-preset-seesaw-sm">
        EM BREVE
      </span>

      <div
        class={twMerge(
          "bg-green-100 border-green-500 text-green-700 rounded-xl transition-all",
          formStatus().success
            ? "max-h-[100px] px-4 py-3 border-2 motion-preset-pop mb-4"
            : "max-h-[0px]"
        )}
      >
        {formStatus().success}
      </div>

      {formStatus().error && (
        <div
          class={twMerge(
            "bg-red-100  border-red-500 text-red-700 rounded-xl transition-all",
            formStatus().error
              ? "max-h-[100px] px-4 py-3 border-2 motion-preset-pop mb-4"
              : "max-h-[0px]"
          )}
        >
          {formStatus().error}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        autocomplete="on"
        class="flex flex-col gap-2 opacity-25"
      >
        <fieldset disabled={true} class="flex flex-col gap-2">
          {/* <fieldset disabled={!!formStatus().success} class="flex flex-col gap-2"> */}
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
              maxLength={MAX_NAME_LENGTH}
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
              maxLength={MAX_EMAIL_LENGTH}
              class="transition-all border-2 border-b-4 focus:border-b-4 focus:mb-1 transform focus:scale-[102%] border-black hover:scale-[99%] hover:shadow-lg focus:shadow-none rounded-xl p-2 text-xl"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="subject" class="text-lg font-semibold">
              Assunto
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="Dúvida"
              required
              maxLength={MAX_SUBJECT_LENGTH}
              class="transition-all border-2 border-b-4 focus:border-b-4 focus:mb-1 transform focus:scale-[102%] border-black hover:scale-[99%] hover:shadow-lg focus:shadow-none rounded-xl p-2 text-xl"
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
          <Button variant="form" class="self-center mt-4" type="submit">
            Enviar
          </Button>
        </fieldset>
      </form>
    </div>
  );
};
