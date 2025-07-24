"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerAction } from "@/actions/auth";
import type { RegisterFormState } from "@/schemas/register-form-schema";

export default function RegisterPage() {
  const [state, action, pending] = useActionState<RegisterFormState, FormData>(
    registerAction,
    undefined,
  );
  return (
    <form action={action}>
      <div>
        <label htmlFor='fullName'>Full Name</label>
        <input
          id='fullName'
          name='fullName'
          placeholder='Full Name'
          defaultValue={state?.values?.fullName}
        />
      </div>
      {state?.fieldErrors?.fullName && <p>{state.fieldErrors.fullName}</p>}

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
        Register
      </button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <Link href='/login'>Login</Link>
    </form>
  );
}
