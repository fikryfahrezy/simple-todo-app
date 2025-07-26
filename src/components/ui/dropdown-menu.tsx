"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

import { cn } from "@/lib/utils";

export function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot='dropdown-menu' {...props} />;
}

export function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot='dropdown-menu-trigger'
      {...props}
    />
  );
}

export function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot='dropdown-menu-content'
        sideOffset={sideOffset}
        className={cn(
          "tw:bg-popover tw:text-popover-foreground tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:z-50 tw:max-h-(--radix-dropdown-menu-content-available-height) tw:min-w-[8rem] tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-md tw:border tw:p-1 tw:shadow-md",
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}
