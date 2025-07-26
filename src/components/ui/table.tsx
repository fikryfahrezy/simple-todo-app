"use client";

import { cn } from "@/lib/utils";

export function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot='table-container'
      className='tw:relative tw:w-full tw:overflow-x-auto'
    >
      <table
        data-slot='table'
        className={cn("tw:w-full tw:caption-bottom tw:text-sm", className)}
        {...props}
      />
    </div>
  );
}

export function TableHeader({
  className,
  ...props
}: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot='table-header'
      className={cn("tw:[&_tr]:border-b tw:[&_tr]:bg-accent", className)}
      {...props}
    />
  );
}

export function TableBody({
  className,
  ...props
}: React.ComponentProps<"tbody">) {
  return (
    <tbody data-slot='table-body' className={cn("", className)} {...props} />
  );
}

export function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot='table-row'
      className={cn(
        "tw:hover:bg-muted/50 tw:data-[state=selected]:bg-muted tw:border-b tw:transition-colors",
        className,
      )}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot='table-head'
      className={cn(
        "tw:text-base tw:text-foreground tw:h-10 tw:px-2 tw:text-left tw:align-middle tw:font-medium tw:whitespace-nowrap tw:[&:has([role=checkbox])]:pr-0 tw:[&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot='table-cell'
      className={cn(
        "tw:text-base tw:p-2 tw:align-middle tw:whitespace-nowrap tw:[&:has([role=checkbox])]:pr-0 tw:[&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}
