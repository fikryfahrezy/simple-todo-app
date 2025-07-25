import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";

export type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root>;

export function Checkbox({ className, ...restProps }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot='checkbox'
      className={cn(
        "tw:[--color:var(--primary-foreground)] tw:[--bg:var(--primary)]",
        "tw:peer tw:border-input tw:dark:bg-input/30 tw:data-[state=checked]:bg-(--bg) tw:data-[state=checked]:text-(--color) tw:data-[state=checked]:border-none tw:dark:data-[state=checked]:bg-primary  tw:focus-visible:border-ring tw:focus-visible:ring-ring/50 tw:aria-invalid:ring-destructive/20 tw:dark:aria-invalid:ring-destructive/40 tw:aria-invalid:border-destructive tw:size-4 tw:shrink-0 tw:rounded-[4px] tw:border tw:shadow-xs tw:transition-shadow tw:outline-none tw:focus-visible:ring-[3px] tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
        className,
      )}
      {...restProps}
    />
  );
}

export type CheckboxIndicatorProps = React.ComponentProps<
  typeof CheckboxPrimitive.Indicator
>;

export function CheckboxIndicator({
  className,
  ...restProps
}: CheckboxIndicatorProps) {
  return (
    <CheckboxPrimitive.Indicator
      data-slot='checkbox-indicator'
      className={cn(
        "tw:flex tw:items-center tw:justify-center tw:text-current tw:transition-none",
        className,
      )}
      {...restProps}
    />
  );
}
