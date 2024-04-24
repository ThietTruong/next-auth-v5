import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);
const resend = new Resend("re_ESsy3Cmx_GVzMte3V9yta1xPKjs5q63HB");

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
  const text = `Click here to reset your password`;
  const html = `<a href="${resetLink}">${text}</a>`;

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your account",
    html,
  });
  return { data, error };
};
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
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
