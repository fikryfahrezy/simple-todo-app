import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = (await verifySession()) as NodewaveServiceAuthzResponseBody;
  // if (!session || session.user.role !== "ADMIN") {
  //   redirect("/login");
  // }

  return (
    // <SessionProvider value={session}>
    <SidebarProvider>
      <AppSidebar />
      <div className='tw:flex tw:w-full tw:h-dvh tw:flex-col'>
        {/* <Navbar userName={session.user.fullName} withSearch={false} /> */}
        <Navbar userName={"test"} withSearch={false} />
        <div className='tw:h-full tw:px-6 tw:py-10 tw:bg-neutral-100 tw:overflow-y-hidden'>
          {children}
        </div>
      </div>
    </SidebarProvider>
    // </SessionProvider>
  );
}
