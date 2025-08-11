import "server-only";

import { cache } from "react";
import { verifyToken } from "@/services/todo-service";
import type { TodoServiceAuthzResponseBody } from "@/services/todo-service.types";
import { getSession } from "./session";

export const verifySession = cache(async () => {
  const value = (await getSession()) as TodoServiceAuthzResponseBody;
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
