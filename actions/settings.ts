"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/email";
import bcrypt from "bcryptjs";
import { unstable_update } from "@/auth";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const validateFields = SettingsSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }
  const user = await currentUser();
  if (!user) {
    return { error: "User not found" };
  }
  const dbUser = await getUserById(user.id as string);
  if (!dbUser) {
    return { error: "Unauthorized" };
  }
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }
  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use" };
    }
    const verificationEmail = await generateVerificationToken(values.email);
    if (!verificationEmail) {
      return { error: "Failed to send verification email" };
    }
    const response = await sendVerificationEmail(
      verificationEmail.email,
      verificationEmail.token
    );
    if (response.error) {
      return { error: "Failed to send verification email" };
    }
    return { success: "Verification email sent" };
  }
  // update password
  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );
    if (!passwordMatch) {
      return { error: "Incorrect password" };
    }
    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }
  // update user
  const updateUser = await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...values,
    },
  });
  unstable_update({
    user: {
      name: values.name,
      email: values.email,
      isTwoFactorEnabled: updateUser.isTwoFactorEnabled,
      role: values.role,
    },
  });

  return { success: "Settings updated" };
};
