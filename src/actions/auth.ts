"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createSession, deleteSession } from "@/lib/session";
import {
  LoginFormSchema,
  type LoginFormState,
} from "@/schemas/login-form-schema";
import {
  RegisterFormSchema,
  type RegisterFormState,
} from "@/schemas/register-form-schema";
import { login, register, verifyToken } from "@/services/nodewave-service";

export async function registerAction(
  _: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> {
  // The return from the `formData.get` is either a File or string,
  // in this case it should always be a string, but TypeScript doesn't know that.
  // So we need to cast it to a string.
  const registerForm = {
    fullName: String(formData.get("fullName")),
    email: String(formData.get("email")),
    password: String(formData.get("password")),
  };
  const validatedRegisterForm = RegisterFormSchema.safeParse(registerForm);

  if (!validatedRegisterForm.success) {
    return {
      values: registerForm,
      fieldErrors: z.flattenError(validatedRegisterForm.error).fieldErrors,
    };
  }

  const registerResult = await register({
    data: validatedRegisterForm.data,
  });

  if (!registerResult.success) {
    return {
      values: registerForm,
      message: registerResult.response.message,
      errors: registerResult.response.errors,
    };
  }

  await createSession(registerResult.response.content);
  const verifyTokenResult = await verifyToken({
    data: {
      token: registerResult.response.content.token,
    },
  });

  if (!verifyTokenResult.success) {
    return {
      values: registerForm,
      message: verifyTokenResult.response.message,
      errors: verifyTokenResult.response.errors,
    };
  }

  redirect("/");
}

export async function loginAction(
  _: RegisterFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const loginForm = {
    email: String(formData.get("email")),
    password: String(formData.get("password")),
  };
  const validatedLoginForm = LoginFormSchema.safeParse(loginForm);

  if (!validatedLoginForm.success) {
    return {
      values: loginForm,
      fieldErrors: z.flattenError(validatedLoginForm.error).fieldErrors,
    };
  }

  const loginResult = await login({
    data: validatedLoginForm.data,
  });

  if (!loginResult.success) {
    return {
      values: loginForm,
      message: loginResult.response.message,
      errors: loginResult.response.errors,
    };
  }

  await createSession(loginResult.response.content);
  const verifyTokenResult = await verifyToken({
    data: {
      token: loginResult.response.content.token,
    },
  });

  if (!verifyTokenResult.success) {
    return {
      values: loginForm,
      message: verifyTokenResult.response.message,
      errors: verifyTokenResult.response.errors,
    };
  }

  redirect("/");
}

export async function logoutAction() {
  await deleteSession();
  redirect("/");
}
