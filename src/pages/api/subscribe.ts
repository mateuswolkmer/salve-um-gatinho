export const prerender = false;
import { Resend } from "resend";

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const email = formData.get("email");

    if (!email) {
      return new Response(
        JSON.stringify({
          message: "Por favor, preencha o seu email.",
        }),
        { status: 400 }
      );
    }

    const resend = new Resend(import.meta.env.RESEND_API_KEY);

    const { data, error } = await resend.contacts.create({
      email: email.toString(),
      audienceId: import.meta.env.RESEND_AUDIENCE_ID,
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
        message: "Cadastrado",
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
