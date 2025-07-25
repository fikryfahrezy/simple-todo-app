import { Slot } from "@radix-ui/react-slot";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type InputRootProps = React.ComponentProps<"div"> & {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  placeholder?: React.ReactNode;
};

export function InputRoot({
  className,
  startIcon,
  endIcon,
  placeholder,
  children,
  ...props
}: InputRootProps) {
  return (
    <div
      className={cn("tw:relative tw:flex tw:w-full tw:items-center", className)}
      {...props}
    >
      {startIcon && (
        <Slot
          data-slot='start-icon'
          className='tw:absolute tw:top-1/2 tw:left-1.5 tw:-translate-y-1/2 tw:transform'
        >
          {startIcon}
        </Slot>
      )}
      <Slot
        data-slot='input'
        className={cn(startIcon && "tw:pl-8", endIcon && "tw:pr-8")}
      >
        {children}
      </Slot>
      {placeholder}
      {endIcon && (
        <Slot
          data-slot='end-icon'
          className='tw:absolute tw:top-1/2 tw:right-3 tw:-translate-y-1/2 tw:transform'
        >
          {endIcon}
        </Slot>
      )}
    </div>
  );
}

export type InputProps = React.ComponentProps<"input"> & {
  dimension?: "sm" | "default" | "lg" | "xl";
  border?: "all" | "bottom";
};

export function Input({
  className,
  type,
  dimension = "default",
  border = "all",
  ...props
}: InputProps) {
  console.log(className);
  return (
    <input
      type={type}
      data-slot='input'
      data-dimension={dimension}
      className={cn(
        "tw:flex tw:w-full tw:min-w-0 tw:px-3 tw:py-1 tw:bg-transparent tw:text-base tw:outline-none",
        "tw:placeholder:text-placeholder",
        "tw:md:text-sm",
        "tw:data-[dimension=sm]:h-8",
        "tw:data-[dimension=default]:h-9",
        "tw:data-[dimension=lg]:h-11",
        "tw:data-[dimension=xl]:h-12 tw:data-[dimension=xl]:md:text-2xl",
        "tw:transition-[color,box-shadow] tw:placeholder:text-muted-foreground tw:selection:bg-primary tw:selection:text-primary-foreground tw:shadow-xs",
        "tw:focus-visible:border-ring tw:focus-visible:ring-ring/50 tw:focus-visible:ring-[3px]",
        "tw:disabled:pointer-events-none tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
        "tw:file:text-foreground tw:file:inline-flex tw:file:h-7 tw:file:border-0 tw:file:bg-transparent tw:file:text-sm tw:file:font-medium",
        "tw:dark:bg-input/30",
        "tw:aria-invalid:ring-destructive/20 tw:dark:aria-invalid:ring-destructive/40 tw:aria-invalid:border-destructive",
        border === "all" && "tw:border tw:border-input tw:rounded-md",
        border === "bottom" && "tw:border-0 tw:border-b-2",
        className,
      )}
      {...props}
    />
  );
}

export function InputFloatingTrigger({ className, ...restProps }: InputProps) {
  return (
    <Input
      {...restProps}
      className={cn(
        "tw:peer",
        "tw:border-ring tw:placeholder-shown:border-border",
        className,
      )}
      {...restProps}
    />
  );
}

export function InputFloatingLabel({
  className,
  children,
  ...restProps
}: React.ComponentProps<"label">) {
  return (
    <Label
      className={cn(
        "tw:absolute tw:px-2 tw:bg-background tw:transform tw:duration-300 tw:z-10 tw:origin-[0] tw:start-1",
        "tw:text-ring tw:top-2 tw:-translate-y-4 tw:scale-75 ",
        "tw:peer-focus:text-ring tw:peer-focus:top-2 tw:peer-focus:-translate-y-4 tw:peer-focus:scale-75",
        "tw:peer-placeholder-shown:text-placeholder tw:peer-placeholder-shown:top-1/2 tw:peer-placeholder-shown:-translate-y-1/2 tw:peer-placeholder-shown:scale-100",
        "tw:peer-aria-invalid:text-destructive",
        className,
      )}
      {...restProps}
    >
      {children}
    </Label>
  );
}
