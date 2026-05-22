"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

function isTextHoverTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) {
    return false;
  }

  if (target.closest("input, textarea, [contenteditable='true']")) {
    return true;
  }

  if (
    target.closest(
      "h1, h2, h3, h4, h5, h6, p, span, a, li, label, blockquote, small, strong, em",
    )
  ) {
    return true;
  }

  return window.getComputedStyle(target).cursor === "text";
}

function getTextReferenceElement(target: EventTarget | null): Element | null {
  if (!(target instanceof Element)) {
    return null;
  }

  return (
    target.closest(
      "input, textarea, [contenteditable='true'], h1, h2, h3, h4, h5, h6, p, span, a, li, label, blockquote, small, strong, em",
    ) ?? target
  );
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const isMergedWithButtonRef = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const [textMode, setTextMode] = useState(false);

  useEffect(() => {
    const canUseCustomCursor =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches;

    if (!canUseCustomCursor) {
      return;
    }

    setEnabled(true);

    let rafId = 0;
    let x = 0;
    let y = 0;

    const updateCursorPosition = () => {
      const cursor = cursorRef.current;
      if (cursor) {
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
        cursor.style.opacity = isMergedWithButtonRef.current ? "0" : "1";
      }
      rafId = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;

      if (!rafId) {
        rafId = window.requestAnimationFrame(updateCursorPosition);
      }

      const isButtonMergeTarget =
        event.target instanceof Element &&
        Boolean(event.target.closest("[data-cursor-merge='button']"));

      isMergedWithButtonRef.current = isButtonMergeTarget;

      if (isButtonMergeTarget) {
        setTextMode((current) => (current ? false : current));
        const cursor = cursorRef.current;
        if (cursor) {
          cursor.style.removeProperty("--cursor-text-height");
        }
        return;
      }

      const nextTextMode = isTextHoverTarget(event.target);
      setTextMode((current) =>
        current === nextTextMode ? current : nextTextMode,
      );

      const cursor = cursorRef.current;
      if (!cursor) {
        return;
      }

      if (!nextTextMode) {
        cursor.style.removeProperty("--cursor-text-height");
        return;
      }

      const textElement = getTextReferenceElement(event.target);
      if (!textElement) {
        return;
      }

      const fontSize = Number.parseFloat(
        window.getComputedStyle(textElement).fontSize,
      );

      if (!Number.isNaN(fontSize)) {
        const textHeight = Math.min(Math.max(fontSize, 14), 96);
        cursor.style.setProperty("--cursor-text-height", `${textHeight}px`);
      }
    };

    const onPointerLeave = () => {
      const cursor = cursorRef.current;
      if (cursor) {
        cursor.style.opacity = "0";
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("blur", onPointerLeave);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <div
      aria-hidden
      ref={cursorRef}
      className={clsx("custom-cursor", textMode && "custom-cursor--text")}
    />
  );
}
