import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "./data/user";
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          return null;
        }
        const { email, password } = validatedFields.data;
        const user = await getUserByEmail(email);
        if (!user || !user.password) {
          return null;
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          return null;
        }
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
