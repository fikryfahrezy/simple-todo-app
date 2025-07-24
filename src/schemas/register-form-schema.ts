import { z } from "zod";

export const RegisterFormSchema = z.object({
  email: z.email({ message: "email format is invalid" }).trim(),
  fullName: z.string().min(1, { message: "fullname is required" }).trim(),
  password: z.string().min(1, { message: "password is required" }).trim(),
});

export type RegisterFormValues = z.infer<typeof RegisterFormSchema>;

export type RegisterFormState =
  | {
      values?: RegisterFormValues;
      message?: string;
      errors?: string[];
      fieldErrors?: {
        email?: string[];
        fullName?: string[];
        password?: string[];
      };
    }
  | undefined;
