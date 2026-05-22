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
  startIcon?: ReactNode;
  className?: string;
};

type ButtonGroupProps = {
  items: ButtonGroupItem[];
  className?: string;
  buttonClassName?: string;
  mergePadding?: number;
};

export default function ButtonGroup({
  items,
  className,
  buttonClassName,
  mergePadding = 14,
}: ButtonGroupProps) {
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
            startIcon,
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
                "inline-flex min-h-14 items-center justify-center overflow-hidden px-7 py-0 text-base font-medium font-secondary transition-all duration-300 ease-out",
                "border border-transparent bg-surface-800 text-foreground hover:bg-surface-900",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue-100 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "[--cursor-color:rgb(255_255_255_/_0.16)]",
                getButtonRadius(index, items.length),
                buttonClassName,
                itemClassName,
              )}
              {...buttonProps}
            >
              {startIcon ? (
                <span className="inline-flex h-4 w-4 items-center justify-center">
                  {startIcon}
                </span>
              ) : null}
              <span className="inline-block leading-none -translate-y-[0.02em]">
                {label}
              </span>
            </button>
          </CursorMergeWrapper>
        ),
      )}
    </div>
  );
}
