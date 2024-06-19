import { UserRole } from "@prisma/client";
import * as z from "zod";
export const SettingsSchema = z
  .object({
    email: z.optional(z.string().email({ message: "Invalid email" })),
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.optional(z.enum([UserRole.ADMIN, UserRole.USER])),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "New password must be at least 6 characters",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (!data.password && data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Password must be at least 6 characters",
      path: ["password"],
    }
  );
export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export const LoginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be a string",
    })
    .email({
      message: "Email must be a valid email",
    }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be a string",
    })
    .email({
      message: "Email must be a valid email",
    }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  name: z
    .string({
      invalid_type_error: "Name must be a string",
    })
    .min(1, {
      message: "Name is required",
    }),
});

export const ResetSchema = z.object({
  email: z.string({
    invalid_type_error: "Email must be a string",
  }),
});
