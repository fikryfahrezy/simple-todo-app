"use client";

import { SessionContext } from "@/contexts/session-context";

export type SessionProviderProps<TValue extends object> = {
  value: TValue;
  children: React.ReactNode;
};

export function SessionProvider<TValue extends object>({
  value,
  children,
}: SessionProviderProps<TValue>) {
  return <SessionContext value={value}>{children}</SessionContext>;
}
