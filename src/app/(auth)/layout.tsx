import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import type { NodewaveServiceAuthzResponseBody } from "@/services/nodewave-service.types";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession<NodewaveServiceAuthzResponseBody>();
  if (session && session.user.role === "USER") {
    redirect("/");
  }

  if (session && session.user.role === "ADMIN") {
    redirect("/admin");
  }

  return children;
}
