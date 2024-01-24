import * as z from "zod";
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
});
