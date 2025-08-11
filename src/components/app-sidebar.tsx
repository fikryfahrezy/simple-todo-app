import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { HouseIcon } from "./icons";

// Note: Hard code the menus just for this simple use case
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <div className='tw:flex'>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className='tw:text-sidebar-accent-foreground tw:text-xl tw:font-bold tw:pointer-events-none tw:opacity-0 tw:group-data-[state=expanded]:opacity-100'>
                TODO App
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarTrigger className='tw:group-data-[state=collapsed]:[&>svg]:rotate-180' />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive>
                <Link href='/admin'>
                  <HouseIcon className='tw:size-4' />
                  <span>To do</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
