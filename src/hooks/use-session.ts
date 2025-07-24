import { use } from "react";
import { SessionContext } from "@/contexts/session-context";

export function useSession<TSession>() {
  const session = use(SessionContext);
  return session as TSession;
}
