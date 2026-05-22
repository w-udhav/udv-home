"use client";

import clsx from "clsx";
import type { ButtonHTMLAttributes, PointerEvent, ReactNode } from "react";

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
  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;
    const ratioX = localX / rect.width - 0.5;
    const ratioY = localY / rect.height - 0.5;

    button.style.setProperty("--cursor-x", `${localX}px`);
    button.style.setProperty("--cursor-y", `${localY}px`);
    button.style.setProperty("--content-x", `${ratioX * 10}px`);
    button.style.setProperty("--content-y", `${ratioY * 8}px`);
  };

  const handlePointerEnter = (event: PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.style.setProperty("--cursor-opacity", "1");
  };

  const handlePointerLeave = (event: PointerEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    button.style.setProperty("--cursor-opacity", "0");
    button.style.setProperty("--content-x", "0px");
    button.style.setProperty("--content-y", "0px");
  };

  return (
    <button
      data-cursor-merge="button"
      className={clsx(
        "squircle-btn inline-flex items-center justify-center overflow-hidden px-5 py-2.5 text-sm font-medium font-secondary transition-all duration-300 ease-out",
        "rounded-[1.1rem] border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        "disabled:cursor-not-allowed disabled:opacity-50",
        {
          "[--cursor-color:rgb(0_0_0_/_0.14)] border-transparent bg-white text-black hover:bg-white/90 focus-visible:ring-white":
            variant === "filled",
          "[--cursor-color:rgb(255_255_255_/_0.2)] border-white/70 bg-transparent text-white hover:border-white hover:bg-white/10 focus-visible:ring-white":
            variant === "outlined",
        },
        className,
      )}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      <span className="squircle-btn__content">
        {startIcon ? (
          <span className="inline-flex h-4 w-4 items-center justify-center">
            {startIcon}
          </span>
        ) : null}
        <span>{children}</span>
      </span>
    </button>
  );
}
