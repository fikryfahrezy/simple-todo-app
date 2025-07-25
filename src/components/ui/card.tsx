import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='card'
      className={cn(
        "tw:bg-card tw:text-card-foreground tw:flex tw:flex-col tw:gap-6 tw:rounded-xl tw:p-6",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='card-header'
      className={cn(
        "tw:@container/card-header tw:grid tw:auto-rows-min tw:grid-rows-[auto_auto] tw:items-start tw:gap-1.5 tw:px-6 tw:has-data-[slot=card-action]:grid-cols-[1fr_auto] tw:[.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='card-title'
      className={cn("tw:leading-none tw:font-semibold", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='card-description'
      className={cn("tw:text-muted-foreground tw:text-sm", className)}
      {...props}
    />
  );
}

export function CardAction({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='card-action'
      className={cn(
        "tw:col-start-2 tw:row-span-2 tw:row-start-1 tw:self-start tw:justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='card-content'
      className={cn("tw:px-6", className)}
      {...props}
    />
  );
}

export function CardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='card-footer'
      className={cn(
        "tw:flex tw:items-center tw:px-6 tw:[.border-t]:pt-6",
        className,
      )}
      {...props}
    />
  );
}
