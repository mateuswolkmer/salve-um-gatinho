export const prerender = false;
import { Resend } from "resend";

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({
          message: "Por favor, preencha todos os campos obrigatórios.",
        }),
        { status: 400 }
      );
    }

    const resend = new Resend(import.meta.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "Site <site@salveumgatinho.org>",
      to: ["site@salveumgatinho.org"],
      subject: "Nova mensagem do site",
      // TODO convert to React using resend/react-email
      html: `
<div>
  <h3>Enviada em: <strong>${new Date().toLocaleString()}</strong></h3>
  <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
    <tr>
      <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Nome</th>
      <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
    </tr>
    <tr>
      <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Email</th>
      <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
    </tr>
    <tr>
      <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Assunto</th>
      <td style="padding: 8px; border: 1px solid #ddd;">${subject}</td>
    </tr>
    <tr>
      <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Mensagem</th>
      <td style="padding: 8px; border: 1px solid #ddd;">${message}</td>
    </tr>
  </table>
</div>`,
    });

    if (error) {
      console.error(error);

      throw new Response(
        JSON.stringify({
          message: error.message,
        }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data,
        message: "Mensagem enviado com sucesso!",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        error: error?.message || "Internal Server Error",
      }),
      { status: 500 }
    );
  }
};
