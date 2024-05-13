import { z } from 'zod';

export const registerSchema = z.object({
  userName: z.string({
    required_error: "Username is required",
  }),
  userEmail: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Please enter a valid email address",
    }),
  userPassword: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: 'Password should be at least 6 characters',
    })
});

export const loginSchema = z.object({
  userEmail: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid Email"}),
  userPassword: z
    .string({
      required_error: "Password is required"
    })
    .min(6, {
      message: "Password should be at least 6 characters",
    }),
});