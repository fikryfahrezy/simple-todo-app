import { z } from "zod";
import { RegisterFormSchema } from "@/schemas/register-form-schema";

export const LoginFormSchema = RegisterFormSchema.pick({
  email: true,
  password: true,
}).extend({
  rememberMe: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof LoginFormSchema>;

export type LoginFormState =
  | {
      success: boolean;
      values?: LoginFormValues;
      message?: string;
      errors?: string[];
      fieldErrors?: {
        email?: string[];
        password?: string[];
      };
    }
  | undefined;
