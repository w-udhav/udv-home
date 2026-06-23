"use client";

import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import CursorMergeWrapper from "@/components/ui/cursor-merge-wrapper";

// Usage:
// <Button>Label</Button>
// <Button variant="outlined" startIcon={<Icon />}>Say hi</Button>
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "filled" | "outlined";
  startIcon?: ReactNode;
};

export default function Button({
  variant = "filled",
  startIcon,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <CursorMergeWrapper mergePadding={14}>
      <button
        className={clsx(
          "inline-flex min-h-14 items-center justify-center overflow-hidden px-7 py-0 text-base font-medium font-secondary transition-all duration-300 ease-out",
          "rounded-full border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          {
            "[--cursor-color:rgb(255_255_255/0.16)] border-transparent bg-surface-800 text-foreground hover:bg-surface-900 focus-visible:ring-primary-blue-100":
              variant === "filled",
            "[--cursor-color:rgb(40_40_51/0.5)] border-surface-800 bg-transparent text-foreground hover:border-surface-800 hover:bg-surface-800/45 focus-visible:ring-primary-blue-100":
              variant === "outlined",
          },
          className,
        )}
        {...props}
      >
        {startIcon ? (
          <span className="inline-flex h-4 w-4 items-center justify-center">
            {startIcon}
          </span>
        ) : null}
        <span className="inline-block leading-none -translate-y-[0.02em]">
          {children}
        </span>
      </button>
    </CursorMergeWrapper>
  );
}
