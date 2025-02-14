// import { Resend } from "resend";

// TODO enable SSR
// const resend = new Resend(import.meta.env.PUBLIC_RESEND_API_KEY);

export const sendEmail = async (request: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const { name, email, subject, message } = request;

  return new Response(
    JSON.stringify({
      message: "Missing SSR",
    }),
    { status: 400 }
  );

  // if (!name || !email || !subject || !message) {
  //   return new Response(
  //     JSON.stringify({
  //       message: "Missing required fields",
  //     }),
  //     { status: 400 }
  //   );
  // }

  // const { data, error } = await resend.emails.send({
  //   from: "Acme <onboarding@resend.dev>",
  //   to: ["delivered@resend.dev"],
  //   subject: subject,
  //   html: `<p>Nome: ${name}</p>
  //     <p>Email: ${email}</p>
  //     <p>Assunto: ${subject}</p>
  //     <p>Mensagem: ${message}</p>`,
  // });

  // if (error) {
  //   throw new Response(
  //     JSON.stringify({
  //       message: error.message,
  //     }),
  //     { status: 400 }
  //   );
  // }

  // return data;
};
