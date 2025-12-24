import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  send: defineAction({
    accept: 'form',
    input: z.object({
      fullName: z.string(),
      email: z.string().email(),
      message: z.string(),
    }),
    handler: async ({ fullName, email, message }) => {
      const { data, error } = await resend.emails.send({
        from: 'Memoria Studio - Web Form Docs <onboarding@resend.dev>',
        to: ['wider@memoriastudio.net'],
        subject: `Enviado desde Memoria Docs — New Message from ${fullName}`,
        html: `
                <div style="max-width: 1000px; margin: auto; width: 100%; height: 100%;">
                    <header style="width: 90%; height: auto; margin: auto; background-color: #F7F2FF; border-radius: 30px; text-align: center; padding: 1.25rem; color: #303030;">
                        <img src="https://i.postimg.cc/dtrmzp7Z/bf6769be29ba5bee97139e13a09ab829.png" alt="Logo Memoria Studio" width="150" height="150" />
                        <h1 style="font-size: 40px; font-weight: 600; margin: 12px;">Hi Memoria,</h1>
                        <h2 style="font-size: 28px; text-wrap: balance;">You have received a new message from your web form.</h2>
                    </header>
                    <div style="width: 85%; height: 100%; padding: 2rem; margin: auto;">
                        <div>
                            <p style="color: #303030; font-size: 22px; font-weight: 600; margin-bottom: 16px;">
                                From:&nbsp; <span style="font-size: 16px; font-weight: 500; text-transform: capitalize;">${fullName}</span>
                            </p>
                            <p style="color: #303030; font-size: 22px; font-weight: 600; margin-bottom: 16px;">
                                Mail:&nbsp; <span style="font-size: 16px; font-weight: 500;">${email}</span>
                            </p>
                            <hr style="border-top: 2px solid #cbd5e0; width: 70%; margin: auto;" />
                        </div>
                        <div style="width: 100%; text-align: center; margin-bottom: 16px;">
                            <h2 style="font-size: 1.5rem; font-weight: 600; text-align: center; color: #4b5563; padding-top: 16px;">Message:</h2>
                            <p style="color: #4b5563; font-size: 16px; text-align: center; padding-bottom: 16px;">
                                ${message}
                            </p>
                            <hr style="border-top: 2px solid #cbd5e0; width: 70%; margin: auto; margin-bottom: 20px;" />
                        </div>
                    </div>
                </div>`,
      });

      if (error) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: error.message,
        });
      }

      return data;
    },
  }),
};
