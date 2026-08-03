"use client";

import clsx from "clsx";
import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import CursorMergeWrapper from "@/components/ui/cursor-merge-wrapper";

export const LINK_BUTTON_VARIANT = {
  DEFAULT: "default",
  FADED: "faded",
  OUTLINED: "outlined",
  FILLED: "filled",
} as const;

export type LinkButtonVariant =
  (typeof LINK_BUTTON_VARIANT)[keyof typeof LINK_BUTTON_VARIANT];

type LinkButtonProps = LinkProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className" | "children"
  > & {
    children?: ReactNode;
    className?: string;
    variant?: LinkButtonVariant;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    mergePadding?: number;
  };

export default function LinkButton({
  children,
  className,
  variant = LINK_BUTTON_VARIANT.DEFAULT,
  startIcon,
  endIcon,
  mergePadding = 8,
  ...props
}: LinkButtonProps) {
  const isIconOnly = Boolean(startIcon) && !children && !endIcon;

  return (
    <CursorMergeWrapper mergePadding={mergePadding}>
      <Link
        className={clsx(
          "inline-flex items-center justify-center overflow-hidden rounded-xl border font-secondary text-sm transition-all duration-300 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue-100 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          isIconOnly
            ? "min-h-10 min-w-10 px-3 py-2 [--button-icon-size:1.25rem]"
            : "min-h-10 px-3.5 py-2 [--button-icon-size:1rem]",
          {
            "cursor-merge-color-soft border-transparent bg-transparent text-zinc-300 hover:-translate-y-0.5 hover:bg-white/9 hover:text-zinc-100":
              variant === LINK_BUTTON_VARIANT.DEFAULT,
            "cursor-merge-color-soft border-transparent bg-white/6 text-zinc-300 hover:-translate-y-0.5 hover:bg-white/9 hover:text-zinc-100":
              variant === LINK_BUTTON_VARIANT.FADED,
            "cursor-merge-color-muted border-surface-800 bg-transparent text-foreground hover:border-surface-800 hover:bg-surface-800/45":
              variant === LINK_BUTTON_VARIANT.OUTLINED,
            "cursor-merge-color-soft border-transparent bg-surface-800 text-foreground hover:bg-surface-900":
              variant === LINK_BUTTON_VARIANT.FILLED,
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
      </Link>
    </CursorMergeWrapper>
  );
}
