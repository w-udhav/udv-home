"use client";

import { Icon } from "@iconify/react";
import clsx from "clsx";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { links } from "@/utils/constants";

type NavItem = {
  id: string;
  label: string;
  href?: string;
  icon: string;
  external?: boolean;
  action?: "theme";
};

const baseItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    href: "#top",
    icon: "lucide:house",
  },
  {
    id: "notes",
    label: "Notes",
    href: "#notes",
    icon: "lucide:notebook-pen",
  },
  {
    id: "writing",
    label: "Writing",
    href: "#writing",
    icon: "lucide:book-open",
  },
  {
    id: "github",
    label: "GitHub",
    href: links.github,
    icon: "lucide:github",
    external: true,
  },
  {
    id: "theme",
    label: "Theme",
    icon: "lucide:sun",
    action: "theme",
  },
];

/** Equal angular spacing on a circular arc centered on the folder. */
function getArcLayout(count: number, radius = 156, spreadDeg = 108) {
  return Array.from({ length: count }, (_, index) => {
    const t = count === 1 ? 0.5 : index / (count - 1);
    const angleDeg = -spreadDeg / 2 + t * spreadDeg;
    const angleRad = (angleDeg * Math.PI) / 180;

    return {
      x: `${Math.round(Math.sin(angleRad) * radius)}px`,
      y: `${Math.round(-Math.cos(angleRad) * radius)}px`,
    };
  });
}

const orbLayout = getArcLayout(baseItems.length);

export default function FolderNav() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [exiting, setExiting] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const labelId = useId();

  const navItems = baseItems.map((item) =>
    item.action === "theme"
      ? {
          ...item,
          label: theme === "dark" ? "Light" : "Dark",
          icon: theme === "dark" ? "lucide:sun" : "lucide:moon",
        }
      : item,
  );

  const close = useCallback(() => {
    if (!open || exiting) {
      return;
    }
    setExiting(true);
    window.setTimeout(() => {
      setOpen(false);
      setExiting(false);
    }, 220);
  }, [exiting, open]);

  const toggle = useCallback(() => {
    if (exiting) {
      return;
    }
    if (open) {
      close();
      return;
    }
    setOpen(true);
  }, [close, exiting, open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    const onPointer = (event: MouseEvent) => {
      const target = event.target as Node;
      if (rootRef.current && !rootRef.current.contains(target)) {
        close();
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onPointer);
    };
  }, [close, open]);

  const visible = open || exiting;

  return (
    <>
      {visible ? (
        <button
          type="button"
          aria-label="Close navigation"
          className={clsx(
            "folder-nav-scrim fixed inset-0 z-40 transition-opacity duration-300",
            exiting ? "opacity-0" : "opacity-100",
          )}
          onClick={close}
        />
      ) : null}

      <div
        ref={rootRef}
        className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center pb-7 sm:pb-9"
      >
        <div className="pointer-events-auto relative flex h-44 w-80 items-end justify-center">
          {visible
            ? navItems.map((item, index) => {
                const layout = orbLayout[index] ?? orbLayout[0];
                const className = clsx(
                  "nav-orb absolute bottom-16 left-1/2 z-10 flex size-14 flex-col items-center justify-center rounded-2xl transition-colors hover:border-accent/40 hover:text-accent",
                  exiting ? "nav-orb-exit" : "nav-orb-enter",
                );

                const content = (
                  <>
                    <Icon icon={item.icon} width={20} height={20} />
                    <span className="mt-1 text-[10px] font-medium tracking-[0.02em] text-muted">
                      {item.label}
                    </span>
                  </>
                );

                const style = {
                  "--orb-x": layout.x,
                  "--orb-y": layout.y,
                  "--orb-delay": `${index * 40}ms`,
                } as React.CSSProperties;

                if (item.action === "theme") {
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={className}
                      style={style}
                      onClick={() => {
                        toggleTheme();
                      }}
                      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    >
                      {content}
                    </button>
                  );
                }

                if (item.external && item.href) {
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className={className}
                      style={style}
                      onClick={close}
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.id}
                    href={item.href ?? "#"}
                    className={className}
                    style={style}
                    onClick={close}
                  >
                    {content}
                  </Link>
                );
              })
            : null}

          <button
            type="button"
            onClick={toggle}
            aria-expanded={open && !exiting}
            aria-controls={labelId}
            aria-label={open ? "Close menu" : "Open menu"}
            className={clsx(
              "group relative z-20 flex h-[4.35rem] w-[5.6rem] items-end justify-center outline-none transition-transform duration-300 ease-out",
              open && !exiting
                ? "-translate-y-1 scale-[1.04]"
                : "hover:-translate-y-0.5 active:scale-[0.98]",
            )}
          >
            <span className="folder-tab absolute top-0 left-2.5 h-3.5 w-11 rounded-t-[0.45rem]" />
            <span className="folder-face absolute inset-x-0 bottom-0 flex h-[3.4rem] items-end justify-center overflow-hidden rounded-[0.9rem] pb-2">
              <span className="absolute inset-x-0 top-0 h-px bg-white/45" />
              <span
                id={labelId}
                className="relative text-[0.68rem] font-semibold tracking-[0.06em] text-white"
              >
                Menu
              </span>
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
