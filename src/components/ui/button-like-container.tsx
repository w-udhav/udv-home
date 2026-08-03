"use client";

import clsx from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import CursorMergeWrapper from "@/components/ui/cursor-merge-wrapper";

type ButtonLikeContainerProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children"
> & {
  children: ReactNode;
  mergePadding?: number;
  contentShiftX?: number;
  contentShiftY?: number;
  fullCursorSurface?: boolean;
};

export default function ButtonLikeContainer({
  children,
  className,
  mergePadding = 0,
  contentShiftX = 10,
  contentShiftY = 8,
  fullCursorSurface = false,
  ...props
}: ButtonLikeContainerProps) {
  return (
    <CursorMergeWrapper
      mergePadding={mergePadding}
      contentShiftX={contentShiftX}
      contentShiftY={contentShiftY}
    >
      <div
        className={clsx(
          "inline-flex min-h-14 items-center justify-center overflow-hidden rounded-2xl border border-transparent px-5 py-3 font-secondary transition-all duration-300 ease-out",
          "cursor-merge-color-soft",
          fullCursorSurface && "cursor-merge-surface--full",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </CursorMergeWrapper>
  );
}
