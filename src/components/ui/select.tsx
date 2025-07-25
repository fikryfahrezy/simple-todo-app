"use client";

import { Slot } from "@radix-ui/react-slot";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function noop() {}

export type SelectRootProps = React.ComponentProps<"div"> & {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  placeholder?: React.ReactNode;
};

export function SelectRoot({
  className,
  startIcon,
  endIcon,
  placeholder,
  children,
  ...props
}: SelectRootProps) {
  return (
    <div className={cn("tw:relative tw:w-full", className)} {...props}>
      {startIcon && (
        <Slot
          data-slot='start-icon'
          className='tw:absolute tw:top-1/2 tw:left-1.5 tw:-translate-y-1/2 tw:transform'
        >
          {startIcon}
        </Slot>
      )}
      <Slot
        data-slot='select'
        className={cn(startIcon && "tw:left-8", endIcon && "tw:right-8")}
      >
        {children}
      </Slot>
      {placeholder}
      {endIcon && (
        <Slot
          data-slot='start-icon'
          className='tw:absolute tw:top-1/2 tw:right-3 tw:-translate-y-1/2 tw:transform'
        >
          {endIcon}
        </Slot>
      )}
    </div>
  );
}

export type SelectProps = React.ComponentProps<"select"> & {
  dimension?: "sm" | "default" | "lg";
};

export function Select({
  value,
  className,
  dimension = "default",
  onChange: onChangeProp = noop,
  ...restProps
}: SelectProps) {
  const [tmpValue, setTmpValue] = useState<string>("");

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTmpValue(event.currentTarget.value);
    onChangeProp(event);
  };

  const selected = value !== undefined || !!tmpValue;

  return (
    <select
      {...restProps}
      data-dimension={dimension}
      data-selected={selected || undefined}
      onChange={onChange}
      className={cn(
        "tw:w-full tw:data-[dimension=lg]:h-11 tw:data-[dimension=default]:h-9 tw:data-[dimension=sm]:h-8 tw:border-input tw:rounded-md tw:border tw:bg-transparent tw:px-3 tw:py-2 tw:text-sm tw:whitespace-nowrap tw:outline-none tw:appearance-none",
        "tw:shadow-xs tw:transition-[color,box-shadow]",
        "tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
        "tw:focus-visible:ring-[3px] tw:focus-visible:ring-ring/50",
        "tw:dark:aria-invalid:ring-destructive/40 tw:dark:bg-input/30 tw:dark:hover:bg-input/50",
        "tw:aria-invalid:ring-destructive/20 tw:aria-invalid:border-destructive",
        className,
      )}
      {...restProps}
    />
  );
}

export function SelectFloatingTrigger({
  className = "",
  ...restProps
}: SelectProps) {
  return (
    <Select
      className={cn(
        "tw:peer",
        "tw:border-border tw:data-[selected]:border-ring ",
        className,
      )}
      {...restProps}
    />
  );
}

export function SelectFloatingLabel({
  className,
  children,
  ...restProps
}: React.ComponentProps<"label">) {
  return (
    <Label
      className={cn(
        "tw:absolute tw:px-2 tw:bg-background tw:transform tw:duration-300 tw:z-10 tw:origin-[0] tw:start-1 tw:pointer-events-none",
        "tw:text-placeholder tw:top-1/2 tw:-translate-y-1/2 tw:scale-100",
        "tw:peer-data-[selected]:text-ring tw:peer-data-[selected]:top-2 tw:peer-data-[selected]:-translate-y-4 tw:peer-data-[selected]:scale-75",
        "tw:peer-aria-invalid:text-destructive",
        className,
      )}
      {...restProps}
    >
      {children}
    </Label>
  );
}
