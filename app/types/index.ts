import { z } from "zod";
export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  // .min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string(),

  // .min(8, { message: "Password must be at least 8 characters long" }),
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// });

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  // .min(8, { message: "Password must be at least 8 characters long" }),
});
