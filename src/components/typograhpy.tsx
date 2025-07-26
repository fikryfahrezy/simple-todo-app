import { cn } from "@/lib/utils";

export type TypographyH1Props = {
  className?: string;
  children?: React.ReactNode;
};

export function TypographyH1({ className, children }: TypographyH1Props) {
  return (
    <h1
      className={cn(
        "tw:scroll-m-20 tw:text-center tw:text-4xl tw:font-extrabold tw:tracking-wide tw:text-balance tw:lg:text-6xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export type TypographyH2Props = {
  className?: string;
  children?: React.ReactNode;
};

export function TypographyH2({ className, children }: TypographyH2Props) {
  return (
    <h2
      className={cn(
        "tw:scroll-m-20 tw:pb-2 tw:text-3xl tw:font-semibold tw:tracking-tight tw:first:mt-0",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export type TypographyUnorderedListProps = {
  className?: string;
  children?: React.ReactNode;
};

export function TypographyUnorderedList({
  className,
  children,
}: TypographyUnorderedListProps) {
  return <ul className={cn(" tw:ml-6 tw:list-disc", className)}>{children}</ul>;
}

export type TypographyMutedProps = {
  className?: string;
  children?: React.ReactNode;
};

export function TypographyMuted({ className, children }: TypographyMutedProps) {
  return (
    <p className={cn("tw:text-muted-foreground tw:text-sm", className)}>
      {children}
    </p>
  );
}
