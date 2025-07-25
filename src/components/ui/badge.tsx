import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "tw:inline-flex tw:items-center tw:justify-center tw:rounded-full tw:border tw:px-2 tw:py-0.5 tw:text-xs tw:font-medium tw:w-fit tw:whitespace-nowrap tw:shrink-0 tw:[&>svg]:size-3 tw:gap-1 tw:[&>svg]:pointer-events-none tw:focus-visible:border-ring tw:focus-visible:ring-ring/50 tw:focus-visible:ring-[3px] tw:aria-invalid:ring-destructive/20 tw:dark:aria-invalid:ring-destructive/40 tw:aria-invalid:border-destructive tw:transition-[color,box-shadow] tw:overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "tw:border-transparent tw:bg-primary tw:text-primary-foreground tw:[a&]:hover:bg-primary/90",
        secondary:
          "tw:border-transparent tw:bg-secondary tw:text-secondary-foreground tw:[a&]:hover:bg-secondary/90",
        destructive:
          "tw:border-transparent tw:bg-destructive tw:text-white tw:[a&]:hover:bg-destructive/90 tw:focus-visible:ring-destructive/20 tw:dark:focus-visible:ring-destructive/40 tw:dark:bg-destructive/60",
        success:
          "tw:border-transparent tw:bg-success tw:text-white tw:[a&]:hover:bg-success/90 tw:focus-visible:ring-success/20 tw:dark:focus-visible:ring-success/40 tw:dark:bg-success/60",
        outline:
          "tw:text-foreground tw:[a&]:hover:bg-accent tw:[a&]:hover:text-accent-foreground",
      },
      size: {
        default: "tw:h-6 tw:px-2 tw:py-2",
        lg: "tw:h-8 tw:px-4 tw:py-2",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  },
);

export function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot='badge'
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}
