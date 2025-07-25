import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";

function defaultMaxAge() {
  // 1 day in seconds
  return 24 * 60 * 60;
}

export async function createSession<TData>(
  data: TData,
  expiresAt = defaultMaxAge(),
) {
  // Just use simple bass-64 for now, can be replaced with something more secure later.
  const session = btoa(JSON.stringify(data));

  // Will expire in 1 year to simulate "never expire"
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    maxAge: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export const getSession = cache(async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  if (!session) {
    return null;
  }
  return JSON.parse(atob(session.value));
});
