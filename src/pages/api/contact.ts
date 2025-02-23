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

    const resend = new Resend(import.meta.env.PUBLIC_RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["delivered@resend.dev"],
      subject: subject.toString(),
      html: `<p>Nome: ${name}</p>
      <p>Email: ${email}</p>
      <p>Assunto: ${subject}</p>
      <p>Mensagem: ${message}</p>`,
    });

    if (error) {
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
    return new Response(
      JSON.stringify({
        error: error?.message || "Internal Server Error",
      }),
      { status: 500 }
    );
  }
};
