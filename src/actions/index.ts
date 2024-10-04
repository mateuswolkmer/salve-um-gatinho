import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const server = {
  sendEmail: defineAction({
    accept: "form",
    input: z.object({
      name: z.string(),
      email: z.string().email(),
      subject: z.string(),
      message: z.string(),
    }),
    handler: async ({ name, email, subject, message }) => {
      console.log("Sending email from ", name, "...");

      const res = await resend.emails.send({
        from: "site@salveumgatinho.org",
        to: "site@salveumgatinho.org",
        subject: "[CONTATO] " + subject,
        html: `
          <h3>Nova mensagem do formulário de contato do site.</h3> 
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Assunto:</strong> ${subject}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${message}</p>
        `,
      });

      console.log("Email response:", res);

      if (res.error) {
        throw new ActionError({
          message: "Erro",
          code: "INTERNAL_SERVER_ERROR",
        });
      }

      return { message: "Enviado" };
    },
  }),
};
