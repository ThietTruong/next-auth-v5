import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
// import NextAuth from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
// import authConfig from "./auth.config";

// const prisma = new PrismaClient();

// export const {
//   handlers: { GET, POST },
//   auth,
// } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   session: { strategy: "jwt" },
//   ...authConfig,
// });
