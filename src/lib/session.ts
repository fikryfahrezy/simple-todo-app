import "server-only";
import { btoa } from "node:buffer";
import { cookies } from "next/headers";

function defaultExpiresAt() {
  return new Date(Date.now() * 24 * 60 * 60 * 1000);
}

export async function createSession<TData>(
  data: TData,
  expiresAt = defaultExpiresAt(),
) {
  // Just use simple bass-64 for now, can be replaced with something more secure later.
  const session = btoa(JSON.stringify(data));

  // Will expire in 1 year to simulate "never expire"
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function getSession<TData>() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  if (!session) {
    return null;
  }
  return JSON.parse(atob(session.value)) as TData;
}
