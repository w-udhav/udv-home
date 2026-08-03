"use client";

import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import CursorMergeWrapper from "@/components/ui/cursor-merge-wrapper";

// Usage:
// <ButtonGroup items={[{ id: "1", label: "First" }, { id: "2", label: "Second" }]} />
export type ButtonGroupItem = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "className"
> & {
  id?: string;
  label: ReactNode;
  leftIcon?: ReactNode;
  startIcon?: ReactNode;
  rightIcon?: ReactNode;
  endIcon?: ReactNode;
  active?: boolean;
  className?: string;
};

export const BUTTON_GROUP_SIZE = {
  SMALL: "small",
  NORMAL: "normal",
  LARGE: "large",
} as const;

export type ButtonGroupSize =
  (typeof BUTTON_GROUP_SIZE)[keyof typeof BUTTON_GROUP_SIZE];

type ButtonGroupProps = {
  items: ButtonGroupItem[];
  size?: ButtonGroupSize;
  className?: string;
  buttonClassName?: string;
  mergePadding?: number;
};

export default function ButtonGroup({
  items,
  size = BUTTON_GROUP_SIZE.NORMAL,
  className,
  buttonClassName,
  mergePadding = 14,
}: ButtonGroupProps) {
  const sizeClasses = {
    [BUTTON_GROUP_SIZE.SMALL]:
      "min-h-10 px-5 text-sm [--button-icon-size:0.875rem]",
    [BUTTON_GROUP_SIZE.NORMAL]:
      "min-h-14 px-7 text-base [--button-icon-size:1rem]",
    [BUTTON_GROUP_SIZE.LARGE]:
      "min-h-16 px-8 text-lg [--button-icon-size:1.125rem]",
  } satisfies Record<ButtonGroupSize, string>;

  const getButtonRadius = (index: number, total: number) => {
    if (total <= 1) {
      return "rounded-[1.1rem]";
    }
    if (index === 0) {
      return "rounded-l-[1.1rem] rounded-r-lg";
    }
    if (index === total - 1) {
      return "rounded-l-lg rounded-r-[1.1rem]";
    }
    return "rounded-lg";
  };

  return (
    <div className={clsx("inline-flex items-center gap-1", className)}>
      {items.map(
        (
          {
            id,
            label,
            leftIcon,
            startIcon,
            rightIcon,
            endIcon,
            active = false,
            className: itemClassName,
            type,
            ...buttonProps
          },
          index,
        ) => (
          <CursorMergeWrapper
            key={id ?? `${index}-${String(label)}`}
            mergePadding={mergePadding}
          >
            <button
              type={type ?? "button"}
              className={clsx(
                "font-serif",
                "inline-flex items-center justify-center overflow-hidden py-0 font-medium font-secondary transition-all duration-300 ease-out",
                "border border-transparent",
                {
                  "bg-primary-blue-100 text-background": active,
                  "bg-surface-800 text-foreground hover:bg-surface-900":
                    !active,
                },
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue-100 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "cursor-merge-color-soft",
                sizeClasses[size],
                getButtonRadius(index, items.length),
                buttonClassName,
                itemClassName,
              )}
              {...buttonProps}
            >
              {(leftIcon ?? startIcon) ? (
                <span className="inline-flex h-[--button-icon-size] w-[--button-icon-size] items-center justify-center">
                  {leftIcon ?? startIcon}
                </span>
              ) : null}
              <span className="inline-block leading-none -translate-y-[0.02em]">
                {label}
              </span>
              {(rightIcon ?? endIcon) ? (
                <span className="inline-flex h-[--button-icon-size] w-[--button-icon-size] items-center justify-center">
                  {rightIcon ?? endIcon}
                </span>
              ) : null}
            </button>
          </CursorMergeWrapper>
        ),
      )}
    </div>
  );
}
