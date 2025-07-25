import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot='textarea'
      className={cn(
        "tw:border-input tw:placeholder:text-placeholder tw:flex tw:field-sizing-content tw:min-h-16 tw:w-full tw:rounded-md tw:border tw:bg-transparent tw:px-3 tw:py-2 tw:text-base tw:shadow-xs tw:transition-[color,box-shadow] tw:outline-none",
        "tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
        "tw:focus-visible:border-ring tw:focus-visible:ring-ring/50 tw:focus-visible:ring-[3px]",
        "tw:dark:aria-invalid:ring-destructive/40 tw:dark:bg-input/30",
        "tw:aria-invalid:ring-destructive/20 tw:aria-invalid:border-destructive",
        "tw:md:text-sm",
        className,
      )}
      {...props}
    />
  );
}
