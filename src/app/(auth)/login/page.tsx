"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction } from "@/actions/auth";
import type { LoginFormState } from "@/schemas/login-form-schema";

export default function LoginPage() {
  const [state, action, pending] = useActionState<LoginFormState, FormData>(
    loginAction,
    undefined,
  );
  return (
    <main>
      <form action={action}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            name='email'
            placeholder='Email'
            defaultValue={state?.values?.email}
          />
        </div>
        {state?.fieldErrors?.email && <p>{state.fieldErrors.email}</p>}

        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            defaultValue={state?.values?.password}
          />
        </div>
        {state?.fieldErrors?.password && (
          <div>
            <p>Password must:</p>
            <ul>
              {state?.fieldErrors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
        <button disabled={pending} type='submit'>
          Login
        </button>
      </form>
      <Link href='/register'>Register</Link>
    </main>
  );
}
