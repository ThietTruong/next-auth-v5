"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

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
  return { success: true };
}
