"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/email";

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { email, password, name } = validatedFields.data;

  const isEmailExist = await getUserByEmail(email);
  if (isEmailExist) {
    return { error: "Email already exists" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });
  const verificationToken = await generateVerificationToken(email);

  if (!verificationToken) {
    return { error: "Failed to send verification email" };
  }

  const response = await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token
  );
  console.log("🚀 ~ register ~ response:", response);

  return { success: "Confirmation email sent" };
}
