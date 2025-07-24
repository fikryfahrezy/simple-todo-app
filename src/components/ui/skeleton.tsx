import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='skeleton'
      className={cn("tw:bg-accent tw:animate-pulse tw:rounded-md", className)}
      {...props}
    />
  );
}
