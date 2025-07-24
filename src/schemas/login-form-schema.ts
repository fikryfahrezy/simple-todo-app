import type { z } from "zod";
import { RegisterFormSchema } from "@/schemas/register-form-schema";

export const LoginFormSchema = RegisterFormSchema.pick({
  email: true,
  password: true,
});

export type LoginFormValues = z.infer<typeof LoginFormSchema>;

export type LoginFormState =
  | {
      values?: LoginFormValues;
      message?: string;
      errors?: string[];
      fieldErrors?: {
        email?: string[];
        password?: string[];
      };
    }
  | undefined;
