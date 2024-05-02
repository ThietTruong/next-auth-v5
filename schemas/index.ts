import * as z from "zod";
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
