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
