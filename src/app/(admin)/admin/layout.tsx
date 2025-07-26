import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { verifySession } from "@/lib/dal";
import { SessionProvider } from "@/providers/session-provider";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await verifySession();
  if (!session || !session.isValid || session.value.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <SessionProvider value={session.value}>
      <SidebarProvider>
        <AppSidebar />
        <div className='tw:flex tw:w-full tw:h-dvh tw:flex-col'>
          <Navbar userName={session.value.user.fullName} withSearch={false} />
          <div className='tw:h-full tw:px-6 tw:py-10 tw:bg-neutral-100 tw:overflow-y-hidden'>
            {children}
          </div>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
}
