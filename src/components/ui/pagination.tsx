import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisIcon,
} from "@/components/icons";
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

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

export function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot='pagination-link'
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
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
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label='Go to previous page'
      size='default'
      className={cn("tw:gap-1 tw:px-2.5 tw:sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className='tw:hidden tw:sm:block'>Previous</span>
    </PaginationLink>
  );
}

export function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label='Go to next page'
      size='default'
      className={cn("tw:gap-1 tw:px-2.5 tw:sm:pr-2.5", className)}
      {...props}
    >
      <span className='tw:hidden tw:sm:block'>Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

export function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot='pagination-ellipsis'
      className={cn(
        "tw:flex tw:size-9 tw:items-center tw:justify-center",
        className,
      )}
      {...props}
    >
      <EllipsisIcon className='tw:size-4' />
      <span className='tw:sr-only'>More pages</span>
    </span>
  );
}
