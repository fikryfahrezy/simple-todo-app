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

export type TypographyH3Props = {
  className?: string;
  children?: React.ReactNode;
};

export function TypographyH3({ className, children }: TypographyH3Props) {
  return (
    <h3
      className={cn(
        "tw:scroll-m-20 tw:text-2xl tw:font-semibold tw:tracking-tight",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export type TypographyH4Props = {
  className?: string;
  children?: React.ReactNode;
};

export function TypographyH4({ className, children }: TypographyH4Props) {
  return (
    <h4
      className={cn(
        "tw:scroll-m-20 tw:text-xl tw:font-semibold tw:tracking-tight",
        className,
      )}
    >
      {children}
    </h4>
  );
}

export type TypographyPProps = {
  className?: string;
  children?: React.ReactNode;
};

export function TypographyP({ className, children }: TypographyPProps) {
  return (
    <p className={cn("tw:leading-7 tw:[&:not(:first-child)]:mt-6", className)}>
      {children}
    </p>
  );
}

export type TypographyBlockquoteProps = {
  className?: string;
  children?: React.ReactNode;
};

export function TypographyBlockquote({
  className,
  children,
}: TypographyBlockquoteProps) {
  return (
    <blockquote
      className={cn("tw:mt-6 tw:border-l-2 tw:pl-6 tw:italic", className)}
    >
      {children}
    </blockquote>
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

export type TypographyInlineCodeProps = {
  className?: string;
  children?: React.ReactNode;
};

export function TypographyInlineCode({
  className,
  children,
}: TypographyInlineCodeProps) {
  return (
    <code
      className={cn(
        "tw:bg-muted tw:relative tw:rounded tw:px-[0.3rem] tw:py-[0.2rem] tw:font-mono tw:text-sm tw:font-semibold",
        className,
      )}
    >
      {children}
    </code>
  );
}

export type TypographyLeadProps = {
  className?: string;
  children?: React.ReactNode;
};

export function TypographyLead({ className, children }: TypographyLeadProps) {
  return (
    <p className={cn("tw:text-muted-foreground tw:text-xl", className)}>
      {children}
    </p>
  );
}

export type TypographyLargeProps = {
  className?: string;
  children?: React.ReactNode;
};

export function TypographyLarge({ className, children }: TypographyLargeProps) {
  return (
    <div className={cn("tw:text-lg tw:font-semibold", className)}>
      {children}
    </div>
  );
}

export type TypographySmallProps = {
  className?: string;
  children?: React.ReactNode;
};

export function TypographySmall({ className, children }: TypographySmallProps) {
  return (
    <small
      className={cn("tw:text-sm tw:leading-none tw:font-medium", className)}
    >
      {children}
    </small>
  );
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
