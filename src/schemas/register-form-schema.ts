import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    email: z.email({ message: "email format is invalid" }).trim(),
    firstName: z.string().min(1, { message: "first name is required" }).trim(),
    lastName: z.string().trim().optional(),
    phoneRegion: z.string().trim().optional(),
    phoneNumber: z.string().trim().optional(),
    country: z.string().trim().optional(),
    password: z.string().min(1, { message: "password is required" }).trim(),
    confirmPassword: z
      .string()
      .min(1, { message: "confirm password is required" })
      .trim(),
    about: z.string().trim().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "confirm password don't match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof RegisterFormSchema>;

export type RegisterFormState =
  | {
      values?: RegisterFormValues;
      message?: string;
      errors?: string[];
      fieldErrors?: {
        email?: string[];
        firstName?: string[];
        lastName?: string[];
        phoneRegion?: string[];
        phoneNumber?: string[];
        country?: string[];
        password?: string[];
        confirmPassword?: string[];
        about?: string[];
      };
    }
  | undefined;
