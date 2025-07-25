import { redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";
import { SessionProvider } from "@/providers/session-provider";
import type { NodewaveServiceAuthzResponseBody } from "@/services/nodewave-service.types";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = (await verifySession()) as NodewaveServiceAuthzResponseBody;
  if (!session || session.user.role !== "USER") {
    redirect("/login");
  }

  return <SessionProvider value={session}>{children}</SessionProvider>;
}
