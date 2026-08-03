"use client";

import clsx from "clsx";
import {
  Children,
  type CSSProperties,
  cloneElement,
  isValidElement,
  type PointerEventHandler,
  type ReactElement,
  type ReactNode,
} from "react";

type MergeableElementProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onPointerMove?: PointerEventHandler<HTMLElement>;
  onPointerEnter?: PointerEventHandler<HTMLElement>;
  onPointerLeave?: PointerEventHandler<HTMLElement>;
  "data-cursor-merge"?: string;
};

type CursorMergeWrapperProps = {
  children: ReactElement<MergeableElementProps>;
  contentClassName?: string;
  cursorColor?: string;
  contentShiftX?: number;
  contentShiftY?: number;
  mergePadding?: number;
};

export default function CursorMergeWrapper({
  children,
  contentClassName,
  cursorColor,
  contentShiftX = 10,
  contentShiftY = 8,
  mergePadding = 0,
}: CursorMergeWrapperProps) {
  const onlyChild = Children.only(children);
  if (!isValidElement<MergeableElementProps>(onlyChild)) {
    return null;
  }

  const childProps = onlyChild.props;

  const handlePointerMove: PointerEventHandler<HTMLElement> = (event) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;
    const ratioX = localX / rect.width - 0.5;
    const ratioY = localY / rect.height - 0.5;

    element.style.setProperty("--cursor-x", `${localX}px`);
    element.style.setProperty("--cursor-y", `${localY}px`);
    element.style.setProperty("--content-x", `${ratioX * contentShiftX}px`);
    element.style.setProperty("--content-y", `${ratioY * contentShiftY}px`);
    childProps.onPointerMove?.(event);
  };

  const handlePointerEnter: PointerEventHandler<HTMLElement> = (event) => {
    event.currentTarget.style.setProperty("--cursor-opacity", "1");
    childProps.onPointerEnter?.(event);
  };

  const handlePointerLeave: PointerEventHandler<HTMLElement> = (event) => {
    const element = event.currentTarget;
    element.style.setProperty("--cursor-opacity", "0");
    element.style.setProperty("--content-x", "0px");
    element.style.setProperty("--content-y", "0px");
    childProps.onPointerLeave?.(event);
  };

  const mergedStyle = cursorColor
    ? ({
        ...childProps.style,
        "--cursor-color": cursorColor,
      } as CSSProperties)
    : childProps.style;

  const mergedChild = cloneElement(onlyChild, {
    ...childProps,
    "data-cursor-merge": "true",
    className: clsx("cursor-merge-surface", childProps.className),
    style: mergedStyle,
    onPointerMove: handlePointerMove,
    onPointerEnter: handlePointerEnter,
    onPointerLeave: handlePointerLeave,
    children: (
      <span className={clsx("cursor-merge-content", contentClassName)}>
        {childProps.children}
      </span>
    ),
  });

  if (mergePadding <= 0) {
    return mergedChild;
  }

  const hitboxStyle = {
    "--cursor-merge-padding": `${mergePadding}px`,
  } as CSSProperties;

  const handleHitboxPointerMove: PointerEventHandler<HTMLSpanElement> = (
    event,
  ) => {
    const surface = event.currentTarget.firstElementChild as HTMLElement | null;
    if (!surface) {
      return;
    }

    const rect = surface.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;
    const ratioX = localX / rect.width - 0.5;
    const ratioY = localY / rect.height - 0.5;

    surface.style.setProperty("--cursor-x", `${localX}px`);
    surface.style.setProperty("--cursor-y", `${localY}px`);
    surface.style.setProperty("--content-x", `${ratioX * contentShiftX}px`);
    surface.style.setProperty("--content-y", `${ratioY * contentShiftY}px`);
  };

  const handleHitboxPointerEnter: PointerEventHandler<HTMLSpanElement> = (
    event,
  ) => {
    const surface = event.currentTarget.firstElementChild as HTMLElement | null;
    surface?.style.setProperty("--cursor-opacity", "1");
  };

  const handleHitboxPointerLeave: PointerEventHandler<HTMLSpanElement> = (
    event,
  ) => {
    const surface = event.currentTarget.firstElementChild as HTMLElement | null;
    if (!surface) {
      return;
    }
    surface.style.setProperty("--cursor-opacity", "0");
    surface.style.setProperty("--content-x", "0px");
    surface.style.setProperty("--content-y", "0px");
  };

  return (
    <span
      data-cursor-merge="true"
      className="cursor-merge-hitbox"
      style={hitboxStyle}
      onPointerMove={handleHitboxPointerMove}
      onPointerEnter={handleHitboxPointerEnter}
      onPointerLeave={handleHitboxPointerLeave}
    >
      {mergedChild}
    </span>
  );
}
