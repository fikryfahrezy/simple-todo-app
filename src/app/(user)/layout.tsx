import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { SessionProvider } from "@/providers/session-provider";
import type { NodewaveServiceAuthzResponseBody } from "@/services/nodewave-service.types";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession<NodewaveServiceAuthzResponseBody>();
  if (!session || session.user.role !== "USER") {
    redirect("/login");
  }

  return <SessionProvider value={session}>{children}</SessionProvider>;
}
