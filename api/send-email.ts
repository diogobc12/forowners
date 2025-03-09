import { Resend } from 'resend';
import { type EmailPayload } from '../src/types';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const payload: EmailPayload = await request.json();
    const { name, email, topic, message } = payload;

    const data = await resend.emails.send({
      from: 'ForOwners <onboarding@resend.dev>',
      to: ['vengesociety@gmail.com'],
      subject: `New Contact Form Submission: ${topic}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Topic:</strong> ${topic}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to send email' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
