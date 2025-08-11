"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { registerAction } from "@/actions/auth";
import { DropdownIcon, NotVisibleIcon, VisibleIcon } from "@/components/icons";
import {
  TypographyH1,
  TypographyMuted,
  TypographyUnorderedList,
} from "@/components/typograhpy";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  InputFloatingLabel,
  InputFloatingTrigger,
  InputRoot,
} from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SelectFloatingLabel,
  SelectFloatingTrigger,
  SelectRoot,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { RegisterFormState } from "@/schemas/register-form-schema";

const EMAIL_DOMAIN = process.env.NEXT_PUBLIC_EMAIL_DOMAIN;

export default function RegisterPage() {
  const [state, action, pending] = useActionState<RegisterFormState, FormData>(
    registerAction,
    undefined,
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword);
  };

  useEffect(() => {
    if (state?.success || !state?.errors) {
      return;
    }

    toast.error(state.message, {
      description: (
        <TypographyUnorderedList>
          {state.errors.map((error) => {
            return <li key={error}>{error}</li>;
          })}
        </TypographyUnorderedList>
      ),
    });
  }, [state?.success, state?.message, state?.errors]);

  const phoneErrors = [];
  if (state?.fieldErrors?.phoneRegion) {
    phoneErrors.push(...state.fieldErrors.phoneRegion);
  }

  if (state?.fieldErrors?.phoneNumber) {
    phoneErrors.push(...state.fieldErrors.phoneNumber);
  }

  return (
    <main>
      <TypographyH1 className='tw:mb-6 tw:text-neutral-700'>
        Register
      </TypographyH1>
      <TypographyMuted className='tw:mb-12 tw:text-center tw:text-base'>
        Let's Sign up first for enter into Square Website. Uh She Up!
      </TypographyMuted>
      <Card className='tw:mb-6 tw:shadow-[3px_-5px_40px_0_rgba(205,205,212,0.10)]'>
        <form action={action} className='tw:space-y-6'>
          <div className='tw:flex tw:gap-6 tw:flex-col tw:lg:flex-row tw:items-start'>
            <div className='tw:w-full'>
              <InputRoot
                placeholder={
                  <InputFloatingLabel htmlFor='firstName'>
                    First Name
                  </InputFloatingLabel>
                }
              >
                <InputFloatingTrigger
                  id='firstName'
                  name='firstName'
                  type='text'
                  required
                  placeholder=' '
                  defaultValue={state?.values?.firstName}
                  aria-invalid={!!state?.fieldErrors?.firstName}
                  dimension='lg'
                />
              </InputRoot>
              {state?.fieldErrors?.firstName && (
                <TypographyUnorderedList className='tw:text-destructive'>
                  {state.fieldErrors.firstName.map((error) => {
                    return <li key={error}>{error}</li>;
                  })}
                </TypographyUnorderedList>
              )}
            </div>

            <div className='tw:w-full'>
              <InputRoot
                placeholder={
                  <InputFloatingLabel htmlFor='lastName'>
                    Last Name
                  </InputFloatingLabel>
                }
              >
                <InputFloatingTrigger
                  id='lastName'
                  name='lastName'
                  type='text'
                  placeholder=' '
                  defaultValue={state?.values?.lastName}
                  aria-invalid={!!state?.fieldErrors?.lastName}
                  dimension='lg'
                />
              </InputRoot>
              {state?.fieldErrors?.lastName && (
                <TypographyUnorderedList className='tw:text-destructive'>
                  {state.fieldErrors.lastName.map((error) => {
                    return <li key={error}>{error}</li>;
                  })}
                </TypographyUnorderedList>
              )}
            </div>
          </div>

          <div>
            <div className='tw:flex tw:gap-6 tw:flex-col tw:lg:flex-row tw:items-start'>
              <div className='tw:w-full'>
                <div className='tw:flex tw:gap-2 tw:flex-row tw:items-start'>
                  <InputFloatingTrigger
                    className='tw:w-fit tw:text-ring'
                    size={4}
                    dimension='lg'
                    defaultValue={state?.values?.phoneRegion || "+62"}
                    aria-invalid={!!state?.fieldErrors?.phoneRegion}
                  />
                  <InputRoot
                    placeholder={
                      <InputFloatingLabel htmlFor='phoneNumber'>
                        Phone Number
                      </InputFloatingLabel>
                    }
                  >
                    <InputFloatingTrigger
                      id='phoneNumber'
                      name='phoneNumber'
                      type='tel'
                      placeholder=' '
                      defaultValue={state?.values?.phoneNumber}
                      aria-invalid={!!state?.fieldErrors?.phoneNumber}
                      dimension='lg'
                    />
                  </InputRoot>
                </div>
                {phoneErrors.length > 0 && (
                  <TypographyUnorderedList className='tw:text-destructive'>
                    {phoneErrors.map((error) => {
                      return <li key={error}>{error}</li>;
                    })}
                  </TypographyUnorderedList>
                )}
              </div>

              <div className='tw:w-full'>
                <SelectRoot
                  placeholder={
                    <SelectFloatingLabel htmlFor='country'>
                      Your Country
                    </SelectFloatingLabel>
                  }
                  endIcon={
                    <DropdownIcon className='tw:size-4 tw:text-placeholder' />
                  }
                >
                  <SelectFloatingTrigger
                    id='country'
                    name='country'
                    defaultValue={state?.values?.country ?? ""}
                    aria-invalid={!!state?.fieldErrors?.country}
                    dimension='lg'
                  >
                    <option value='' disabled hidden></option>
                    <option value='indonesia'>Indonesia</option>
                  </SelectFloatingTrigger>
                </SelectRoot>

                {state?.fieldErrors?.country && (
                  <TypographyUnorderedList className='tw:text-destructive'>
                    {state.fieldErrors.country.map((error) => {
                      return <li key={error}>{error}</li>;
                    })}
                  </TypographyUnorderedList>
                )}
              </div>
            </div>
          </div>

          <div>
            <InputRoot
              placeholder={
                <InputFloatingLabel htmlFor='email'>
                  Mail Address
                </InputFloatingLabel>
              }
              endIcon={<span className='tw:text-sm'>{EMAIL_DOMAIN}</span>}
            >
              <InputFloatingTrigger
                id='email'
                name='email'
                type='text'
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
          <div className='tw:flex tw:gap-6 tw:flex-col tw:lg:flex-row tw:items-start'>
            <div className='tw:w-full'>
              <InputRoot
                placeholder={
                  <InputFloatingLabel htmlFor='password'>
                    Password
                  </InputFloatingLabel>
                }
                endIcon={
                  <Button
                    type='button'
                    variant='ghost'
                    size='none'
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? (
                      <NotVisibleIcon className='tw:size-4 tw:text-placeholder' />
                    ) : (
                      <VisibleIcon className='tw:size-4 tw:text-placeholder' />
                    )}
                  </Button>
                }
              >
                <InputFloatingTrigger
                  id='password'
                  name='password'
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder=' '
                  defaultValue={state?.values?.password}
                  aria-invalid={!!state?.fieldErrors?.password}
                  dimension='lg'
                />
              </InputRoot>
              {state?.fieldErrors?.password && (
                <TypographyUnorderedList className='tw:text-destructive'>
                  {state?.fieldErrors.password.map((error) => {
                    return <li key={error}>{error}</li>;
                  })}
                </TypographyUnorderedList>
              )}
            </div>

            <div className='tw:w-full'>
              <InputRoot
                placeholder={
                  <InputFloatingLabel htmlFor='confirmPassword'>
                    Confirm Password
                  </InputFloatingLabel>
                }
                endIcon={
                  <Button
                    type='button'
                    variant='ghost'
                    size='none'
                    onClick={toggleShowConfirmPassword}
                  >
                    {showConfirmPassword ? (
                      <NotVisibleIcon className='tw:size-4 tw:text-placeholder' />
                    ) : (
                      <VisibleIcon className='tw:size-4 tw:text-placeholder' />
                    )}
                  </Button>
                }
              >
                <InputFloatingTrigger
                  id='confirmPassword'
                  name='confirmPassword'
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder=' '
                  defaultValue={state?.values?.confirmPassword}
                  aria-invalid={!!state?.fieldErrors?.confirmPassword}
                  dimension='lg'
                />
              </InputRoot>
              {state?.fieldErrors?.confirmPassword && (
                <TypographyUnorderedList className='tw:text-destructive'>
                  {state?.fieldErrors.confirmPassword.map((error) => {
                    return <li key={error}>{error}</li>;
                  })}
                </TypographyUnorderedList>
              )}
            </div>
          </div>
          <div className='tw:space-y-4'>
            <Label htmlFor='about'>Tell us about yourself</Label>
            <Textarea
              id='about'
              placeholder='Hello my name...'
              defaultValue={state?.values?.about}
              aria-invalid={!!state?.fieldErrors?.about}
            ></Textarea>
            {state?.fieldErrors?.about && (
              <TypographyUnorderedList className='tw:text-destructive'>
                {state?.fieldErrors.about.map((error) => {
                  return <li key={error}>{error}</li>;
                })}
              </TypographyUnorderedList>
            )}
          </div>
          <div className='tw:w-full tw:mt-16 tw:flex tw:items-center tw:gap-2 tw:flex-col tw:lg:flex-row'>
            <Button
              asChild
              type='button'
              variant='secondary'
              className='tw:w-full tw:lg:w-2/6'
            >
              <Link href='/login'>Login</Link>
            </Button>
            <Button
              disabled={pending}
              type='submit'
              className='tw:w-full tw:lg:w-4/6'
            >
              Register
            </Button>
          </div>
        </form>
      </Card>
    </main>
  );
}
