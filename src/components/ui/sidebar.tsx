"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextProps | null>(null);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = useState(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // This sets the cookie to keep the sidebar state.
      // biome-ignore lint/suspicious/noDocumentCookie: this should be fine as it's generated code by shadcn/ui.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open],
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen]);

  // Adds a keyboard shortcut to toggle the sidebar.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed";

  const contextValue = useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot='sidebar-wrapper'
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "tw:group/sidebar-wrapper tw:has-data-[variant=inset]:bg-sidebar tw:flex tw:min-h-svh tw:w-full",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

export function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        data-slot='sidebar'
        className={cn(
          "tw:bg-sidebar tw:text-sidebar-foreground tw:flex tw:h-full tw:w-(--sidebar-width) tw:flex-col",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar='sidebar'
          data-slot='sidebar'
          data-mobile='true'
          className='tw:bg-sidebar tw:text-sidebar-foreground tw:w-(--sidebar-width) tw:p-0 tw:[&>button]:hidden'
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className='tw:sr-only'>
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className='tw:flex tw:h-full tw:w-full tw:flex-col'>
            {children}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className='tw:group tw:peer tw:text-sidebar-foreground tw:hidden tw:md:block'
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot='sidebar'
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot='sidebar-gap'
        className={cn(
          "tw:relative tw:w-(--sidebar-width) tw:bg-transparent tw:transition-[width] tw:duration-200 tw:ease-linear",
          "tw:group-data-[collapsible=offcanvas]:w-0",
          "tw:group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "tw:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "tw:group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
        )}
      />
      <div
        data-slot='sidebar-container'
        className={cn(
          "tw:fixed tw:inset-y-0 tw:z-10 tw:hidden tw:h-svh tw:w-(--sidebar-width) tw:transition-[left,right,width] tw:duration-200 tw:ease-linear tw:md:flex",
          side === "left"
            ? "tw:left-0 tw:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "tw:right-0 tw:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "tw:p-2 tw:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "tw:group-data-[collapsible=icon]:w-(--sidebar-width-icon) tw:group-data-[side=left]:border-r tw:group-data-[side=right]:border-l",
          className,
        )}
        {...props}
      >
        <div
          data-sidebar='sidebar'
          data-slot='sidebar-inner'
          className='tw:bg-sidebar tw:group-data-[variant=floating]:border-sidebar-border tw:flex tw:h-full tw:w-full tw:flex-col tw:group-data-[variant=floating]:rounded-lg tw:group-data-[variant=floating]:border tw:group-data-[variant=floating]:shadow-sm'
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar='trigger'
      data-slot='sidebar-trigger'
      variant='ghost'
      size='icon'
      className={cn("tw:size-7", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <svg
        width='14'
        height='14'
        viewBox='0 0 14 14'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <title>Double Arrow Left Icon</title>
        <path
          d='M7.48542 0.888444C7.00818 0.411209 6.23443 0.411209 5.75719 0.888444L0.510324 6.13531C0.0330169 6.61262 0.0330169 7.38649 0.510324 7.8638L5.75719 13.1107C6.23443 13.5879 7.00818 13.5879 7.48542 13.1107C7.96265 12.6334 7.96265 11.8597 7.48542 11.3824L3.96677 7.8638C3.48946 7.38649 3.48946 6.61262 3.96677 6.13531L7.48542 2.61667C7.96265 2.13943 7.96265 1.36568 7.48542 0.888444Z'
          fill='#4C4E64'
          fillOpacity='0.68'
        />
        <path
          d='M11.8683 0.888444L6.62141 6.13531C6.1441 6.61262 6.1441 7.38649 6.62141 7.8638L11.8683 13.1107C12.3455 13.5879 13.1193 13.5879 13.5965 13.1107C14.0737 12.6334 14.0737 11.8597 13.5965 11.3824L10.0779 7.8638C9.60055 7.38649 9.60055 6.61262 10.0779 6.13531L13.5965 2.61667C14.0737 2.13943 14.0737 1.36568 13.5965 0.888444C13.1193 0.411209 12.3455 0.411209 11.8683 0.888444Z'
          fill='#4C4E64'
          fillOpacity='0.38'
        />
      </svg>

      <span className='tw:sr-only'>Toggle Sidebar</span>
    </Button>
  );
}

export function SidebarRail({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar='rail'
      data-slot='sidebar-rail'
      aria-label='Toggle Sidebar'
      tabIndex={-1}
      onClick={toggleSidebar}
      title='Toggle Sidebar'
      className={cn(
        "tw:hover:after:bg-sidebar-border tw:absolute tw:inset-y-0 tw:z-20 tw:hidden tw:w-4 tw:-translate-x-1/2 tw:transition-all tw:ease-linear tw:group-data-[side=left]:-right-4 tw:group-data-[side=right]:left-0 tw:after:absolute tw:after:inset-y-0 tw:after:left-1/2 tw:after:w-[2px] tw:sm:flex",
        "tw:in-data-[side=left]:cursor-w-resize tw:in-data-[side=right]:cursor-e-resize",
        "tw:[[data-side=left][data-state=collapsed]_&]:cursor-e-resize tw:[[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "tw:hover:group-data-[collapsible=offcanvas]:bg-sidebar tw:group-data-[collapsible=offcanvas]:translate-x-0 tw:group-data-[collapsible=offcanvas]:after:left-full",
        "tw:[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "tw:[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className,
      )}
      {...props}
    />
  );
}

export function SidebarHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='sidebar-header'
      data-sidebar='header'
      className={cn("tw:flex tw:flex-col tw:gap-2 tw:p-2", className)}
      {...props}
    />
  );
}

export function SidebarContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='sidebar-content'
      data-sidebar='content'
      className={cn(
        "tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-2 tw:overflow-auto tw:group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

export function SidebarGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='sidebar-group'
      data-sidebar='group'
      className={cn(
        "tw:relative tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:p-2",
        className,
      )}
      {...props}
    />
  );
}

export function SidebarMenu({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot='sidebar-menu'
      data-sidebar='menu'
      className={cn(
        "tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:gap-1",
        className,
      )}
      {...props}
    />
  );
}

export function SidebarMenuItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot='sidebar-menu-item'
      data-sidebar='menu-item'
      className={cn("tw:group/menu-item tw:relative", className)}
      {...props}
    />
  );
}

const sidebarMenuButtonVariants = cva(
  "tw:peer/menu-button tw:flex tw:w-full tw:items-center tw:gap-2 tw:overflow-hidden tw:rounded-md tw:p-2 tw:text-left tw:text-sm tw:outline-hidden tw:ring-sidebar-ring tw:transition-[width,height,padding] tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:active:bg-sidebar-accent tw:active:text-sidebar-accent-foreground tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:group-has-data-[sidebar=menu-action]/menu-item:pr-8 tw:aria-disabled:pointer-events-none tw:aria-disabled:opacity-50 tw:data-[active=true]:bg-sidebar-accent tw:data-[active=true]:font-medium tw:data-[active=true]:text-sidebar-accent-foreground tw:data-[state=open]:hover:bg-sidebar-accent tw:data-[state=open]:hover:text-sidebar-accent-foreground tw:group-data-[collapsible=icon]:size-8! tw:group-data-[collapsible=icon]:p-2! tw:[&>span:last-child]:truncate tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground",
        outline:
          "tw:bg-background tw:shadow-[0_0_0_1px_hsl(var(--sidebar-border))] tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "tw:h-8 tw:text-sm",
        sm: "tw:h-7 tw:text-xs",
        lg: "tw:h-12 tw:text-sm tw:group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      data-slot='sidebar-menu-button'
      data-sidebar='menu-button'
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side='right'
        align='center'
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  );
}
