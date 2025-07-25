import "server-only";

import { cache } from "react";
import { verifyToken } from "@/services/nodewave-service";
import type { NodewaveServiceAuthzResponseBody } from "@/services/nodewave-service.types";
import { deleteSession, getSession } from "./session";

export const verifySession = cache(async () => {
  const session = (await getSession()) as NodewaveServiceAuthzResponseBody;
  if (!session) {
    return null;
  }

  const tokenValidation = await verifyToken({
    data: {
      token: session.token,
    },
  });

  if (!tokenValidation.success) {
    await deleteSession();
    return null;
  }

  return session;
});
