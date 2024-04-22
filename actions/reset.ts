"use server";
import { getUserByEmail } from "@/data/user";
import { ResetSchema } from "@/schemas";
import * as z from "zod";
import { sendPasswordResetEmail } from "@/lib/email";
import { generatePasswordResetToken } from "@/lib/tokens";

export async function reset(value: z.infer<typeof ResetSchema>) {
  const validatedFields = ResetSchema.safeParse(value);
  if (!validatedFields.success) {
    return { error: "Invalid email" };
  }
  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) return { error: "Email not found" };

  const passwordResetToken = await generatePasswordResetToken(email);
  if (!passwordResetToken) {
    return { error: "Failed to send password reset email" };
  }
  const response = await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Email sent" };
}
