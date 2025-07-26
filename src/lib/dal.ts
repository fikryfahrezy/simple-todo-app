import "server-only";

import { cache } from "react";
import { verifyToken } from "@/services/nodewave-service";
import type { NodewaveServiceAuthzResponseBody } from "@/services/nodewave-service.types";
import { getSession } from "./session";

export const verifySession = cache(async () => {
  const value = (await getSession()) as NodewaveServiceAuthzResponseBody;
  if (!value) {
    return null;
  }

  const tokenValidation = await verifyToken({
    data: {
      token: value.token,
    },
  });

  const isValid = tokenValidation.success;

  return { isValid, value };
});
