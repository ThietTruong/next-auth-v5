import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `https://localhost:3000/auth/new-verification?token=${token}`;
  const text = `Click here to confirm your account`;
  const html = `<a href="${confirmLink}">${text}</a>`;

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your account",
    html,
  });

  return { data, error };
};
