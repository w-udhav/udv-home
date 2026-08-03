"use client";

import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import CursorMergeWrapper from "@/components/ui/cursor-merge-wrapper";

// Usage:
// <Button>Label</Button>
// <Button variant="outlined" startIcon={<Icon />}>Say hi</Button>
export const BUTTON_SIZE = {
  SMALL: "small",
  NORMAL: "normal",
  LARGE: "large",
} as const;

export type ButtonSize = (typeof BUTTON_SIZE)[keyof typeof BUTTON_SIZE];

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "filled" | "outlined" | "ghost";
  size?: ButtonSize;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

export default function Button({
  variant = "filled",
  size = BUTTON_SIZE.NORMAL,
  startIcon,
  endIcon,
  className,
  children,
  ...props
}: ButtonProps) {
  const isIconOnly = Boolean(startIcon) && !endIcon && !children;

  const sizeClasses = {
    [BUTTON_SIZE.SMALL]: "min-h-10 px-5 text-sm [--button-icon-size:0.875rem]",
    [BUTTON_SIZE.NORMAL]: "min-h-14 px-7 text-base [--button-icon-size:1rem]",
    [BUTTON_SIZE.LARGE]: "min-h-16 px-8 text-lg [--button-icon-size:1.125rem]",
  } satisfies Record<ButtonSize, string>;

  const iconOnlySizeClasses = {
    [BUTTON_SIZE.SMALL]: "h-10 w-10 [--button-icon-size:0.875rem]",
    [BUTTON_SIZE.NORMAL]: "h-14 w-14 [--button-icon-size:1rem]",
    [BUTTON_SIZE.LARGE]: "h-16 w-16 [--button-icon-size:1.125rem]",
  } satisfies Record<ButtonSize, string>;

  return (
    <CursorMergeWrapper mergePadding={14}>
      <button
        className={clsx(
          "inline-flex items-center justify-center overflow-hidden py-0 font-medium font-secondary transition-all duration-300 ease-out",
          "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          isIconOnly ? "rounded-xl p-0" : "rounded-full",
          isIconOnly ? iconOnlySizeClasses[size] : sizeClasses[size],
          {
            "cursor-merge-color-soft border-transparent bg-surface-800 text-foreground hover:bg-surface-900 focus-visible:ring-primary-blue-100":
              variant === "filled",
            "cursor-merge-color-muted border-surface-800 bg-transparent text-foreground hover:border-surface-800 hover:bg-surface-800/45 focus-visible:ring-primary-blue-100":
              variant === "outlined",
            "cursor-merge-color-muted border-transparent bg-transparent text-foreground hover:bg-surface-800/45 focus-visible:ring-primary-blue-100":
              variant === "ghost",
          },
          className,
        )}
        {...props}
      >
        {startIcon ? (
          <span className="inline-flex h-[--button-icon-size] w-[--button-icon-size] items-center justify-center">
            {startIcon}
          </span>
        ) : null}
        {children ? (
          <span className="inline-block leading-none -translate-y-[0.02em]">
            {children}
          </span>
        ) : null}
        {endIcon ? (
          <span className="inline-flex h-[--button-icon-size] w-[--button-icon-size] items-center justify-center">
            {endIcon}
          </span>
        ) : null}
      </button>
    </CursorMergeWrapper>
  );
}
