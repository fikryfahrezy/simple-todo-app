import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import { type Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Pagination({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label='pagination'
      data-slot='pagination'
      className={cn(
        "tw:mx-auto tw:flex tw:w-full tw:justify-center",
        className,
      )}
      {...props}
    />
  );
}

export function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot='pagination-content'
      className={cn("tw:flex tw:flex-row tw:items-center tw:gap-1", className)}
      {...props}
    />
  );
}

export function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot='pagination-item' {...props} />;
}

type PaginationButtonProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"button">;

export function PaginationButton({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationButtonProps) {
  return (
    <button
      aria-current={isActive ? "page" : undefined}
      data-slot='pagination-link'
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "default" : "outline",
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}

export function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) {
  return (
    <PaginationButton
      aria-label='Go to previous page'
      size='default'
      className={cn(
        "tw:gap-1 tw:px-2.5 tw:sm:pl-2.5 tw:mr-1.5 tw:border-0",
        className,
      )}
      {...props}
    >
      <ArrowLeftIcon />
    </PaginationButton>
  );
}

export function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) {
  return (
    <PaginationButton
      aria-label='Go to next page'
      size='default'
      className={cn(
        "tw:gap-1 tw:px-2.5 tw:sm:pr-2.5 tw:ml-1.5 tw:border-0",
        className,
      )}
      {...props}
    >
      <ArrowRightIcon />
    </PaginationButton>
  );
}
