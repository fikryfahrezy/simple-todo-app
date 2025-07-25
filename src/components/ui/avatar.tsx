"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

export function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot='avatar'
      className={cn(
        "tw:relative tw:flex tw:size-8 tw:shrink-0 tw:rounded-full",
        className,
      )}
      {...props}
    />
  );
}

export function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot='avatar-image'
      className={cn("tw:aspect-square tw:size-full", className)}
      {...props}
    />
  );
}

export function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot='avatar-fallback'
      className={cn(
        "tw:bg-muted tw:flex tw:size-full tw:items-center tw:justify-center tw:rounded-full",
        className,
      )}
      {...props}
    />
  );
}

export function AvatarOnline() {
  return (
    <span className='tw:absolute tw:flex tw:size-4 tw:items-center tw:justify-center tw:-right-1 tw:-bottom-1 tw:rounded-full tw:bg-background'>
      <span className='tw:size-2 tw:bg-[#72E128] tw:rounded-full'></span>
    </span>
  );
}
