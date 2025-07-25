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

const EMAIL_DOMAIN = process.env.NEXT_PUBLIC_NODEWAVE_EMAIL_DOMAIN;

export async function registerAction(
  _: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> {
  // The return from the `formData.get` is either a File or string,
  // in this case it should always be a string, but TypeScript doesn't know that.
  // So we need to cast it to a string.
  //
  // Add fallback to empty strin in-case the field not provided
  // to prevent handling `null` value
  const registerForm = {
    email: String(formData.get("email") ?? ""),
    firstName: String(formData.get("firstName") ?? ""),
    lastName: String(formData.get("lastName") ?? ""),
    phoneRegion: String(formData.get("phoneRegion") ?? ""),
    phoneNumber: String(formData.get("phoneNumber") ?? ""),
    country: String(formData.get("country") ?? ""),
    password: String(formData.get("password") ?? ""),
    confirmPassword: String(formData.get("confirmPassword") ?? ""),
  };
  const emailWithDomain = `${registerForm.email}${EMAIL_DOMAIN}`;
  const validatedRegisterForm = RegisterFormSchema.safeParse({
    ...registerForm,
    email: emailWithDomain,
  });

  if (!validatedRegisterForm.success) {
    return {
      success: false,
      values: registerForm,
      fieldErrors: z.flattenError(validatedRegisterForm.error).fieldErrors,
    };
  }

  const registerResult = await register({
    data: {
      fullName: `${validatedRegisterForm.data.firstName} ${validatedRegisterForm.data.lastName}`,
      email: emailWithDomain,
      password: validatedRegisterForm.data.password,
    },
  });

  if (!registerResult.success) {
    return {
      success: false,
      values: registerForm,
      message: registerResult.response.message,
      errors: registerResult.response.errors,
    };
  }

  const verifyTokenResult = await verifyToken({
    data: {
      token: registerResult.response.content.token,
    },
  });

  await createSession(registerResult.response.content);

  if (!verifyTokenResult.success) {
    return {
      success: false,
      values: registerForm,
      message: verifyTokenResult.response.message,
      errors: verifyTokenResult.response.errors,
    };
  }

  redirect("/");
}

export async function loginAction(
  _: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const loginForm = {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    rememberMe: formData.get("rememberMe") === "on",
  };
  const validatedLoginForm = LoginFormSchema.safeParse(loginForm);

  if (!validatedLoginForm.success) {
    return {
      success: false,
      values: loginForm,
      fieldErrors: z.flattenError(validatedLoginForm.error).fieldErrors,
    };
  }

  const loginResult = await login({
    data: {
      email: validatedLoginForm.data.email,
      password: validatedLoginForm.data.password,
    },
  });

  if (!loginResult.success) {
    return {
      success: false,
      values: loginForm,
      message: loginResult.response.message,
      errors: loginResult.response.errors,
    };
  }

  const verifyTokenResult = await verifyToken({
    data: {
      token: loginResult.response.content.token,
    },
  });

  await createSession(
    loginResult.response.content,
    loginForm.rememberMe
      ? // Make the session expire in long time, 1 year in seconds
        365 * 24 * 60 * 60
      : undefined,
  );

  if (!verifyTokenResult.success) {
    return {
      success: false,
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
