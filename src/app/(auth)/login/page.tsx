"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { loginAction } from "@/actions/auth";
import {
  TypographyH1,
  TypographyMuted,
  TypographyUnorderedList,
} from "@/components/typograhpy";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputFloatingLabel,
  InputFloatingTrigger,
  InputRoot,
} from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LoginFormState } from "@/schemas/login-form-schema";

export default function LoginPage() {
  const [state, action, pending] = useActionState<LoginFormState, FormData>(
    loginAction,
    undefined,
  );

  useEffect(() => {
    if (!state?.errors) {
      return;
    }
    toast.error("An error occurred. Please try again.", {
      description: (
        <TypographyUnorderedList>
          {state.errors.map((error) => {
            return <li key={error}>{error}</li>;
          })}
        </TypographyUnorderedList>
      ),
    });
  }, [state?.errors]);

  return (
    <main>
      <TypographyH1 className='tw:mb-6 tw:text-neutral-700'>
        Sign In
      </TypographyH1>
      <TypographyMuted className='tw:mb-12 tw:text-center tw:text-base'>
        Let's Sign in first for enter into Square Website. Uh She Up!
      </TypographyMuted>
      <Card className='tw:mb-6 tw:shadow-[3px_-5px_40px_0_rgba(205,205,212,0.10)]'>
        <form action={action} className='tw:space-y-6'>
          <div>
            <InputRoot
              placeholder={
                <InputFloatingLabel htmlFor='email'>
                  Your Email / Username
                </InputFloatingLabel>
              }
            >
              <InputFloatingTrigger
                id='email'
                name='email'
                type='email'
                required
                placeholder=' '
                defaultValue={state?.values?.email}
                aria-invalid={!!state?.fieldErrors?.email}
                dimension='lg'
              />
            </InputRoot>
            {state?.fieldErrors?.email && (
              <TypographyUnorderedList className='tw:text-destructive'>
                {state.fieldErrors.email.map((error) => {
                  return <li key={error}>{error}</li>;
                })}
              </TypographyUnorderedList>
            )}
          </div>
          <div>
            <InputRoot
              placeholder={
                <InputFloatingLabel htmlFor='password'>
                  Enter Password
                </InputFloatingLabel>
              }
            >
              <InputFloatingTrigger
                id='password'
                name='password'
                type='password'
                required
                placeholder=' '
                defaultValue={state?.values?.password}
                aria-invalid={!!state?.fieldErrors?.password}
                dimension='lg'
              />
            </InputRoot>
            {state?.fieldErrors?.password && (
              <TypographyUnorderedList className='tw:text-destructive'>
                {state.fieldErrors.password.map((error) => {
                  return <li key={error}>{error}</li>;
                })}
              </TypographyUnorderedList>
            )}
          </div>
          <div className='tw:flex  tw:items-center tw:justify-between tw:flex-row'>
            <div className='tw:flex tw:gap-2'>
              <Checkbox
                id='rememberMe'
                name='rememberMe'
                className='tw:data-[state=checked]:bg-ring'
                key={state?.values?.rememberMe ? "checked" : "unchecked"}
                defaultChecked={state?.values?.rememberMe}
              />
              <Label
                htmlFor='rememberMe'
                className='tw:text-secondary-foreground'
              >
                Remember Me
              </Label>
            </div>
            <Button asChild variant='link' className='tw:text-ring tw:w-fit'>
              <Link href='/register'>Forgot Password</Link>
            </Button>
          </div>
          <Button disabled={pending} type='submit' className='tw:w-full'>
            Login
          </Button>
        </form>
      </Card>
      <Button
        asChild
        variant='link'
        className='tw:block tw:w-fit tw:mx-auto tw:text-center'
      >
        <Link href='/register'>Doesn't have an Square account? Register</Link>
      </Button>
    </main>
  );
}
