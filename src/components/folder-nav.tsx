"use client";

import { Icon } from "@iconify/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import folderIcon from "@/assets/icons/folder.png";
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
                  "nav-orb absolute bottom-16 left-1/2 z-10 flex size-14 flex-col items-center justify-center gap-1 rounded-2xl px-1.5 py-2 transition-colors hover:border-accent/40 hover:text-accent",
                  exiting ? "nav-orb-exit" : "nav-orb-enter",
                );

                const content = (
                  <>
                    <Icon icon={item.icon} width={20} height={20} />
                    <span className="text-[10px] leading-none font-medium tracking-[0.02em] text-muted">
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
            id={labelId}
            className={clsx(
              "folder-trigger relative z-20 flex w-[4.75rem] flex-col items-center gap-1 outline-none transition-transform duration-300 ease-out",
              open && !exiting
                ? "-translate-y-1 scale-105"
                : "hover:-translate-y-0.5 active:scale-[0.97]",
            )}
          >
            <Image
              src={folderIcon}
              alt=""
              width={72}
              height={72}
              priority
              className="pointer-events-none size-[4.5rem] select-none object-contain drop-shadow-[0_10px_24px_rgb(0_0_0_/_0.28)]"
            />
            <span
              className={clsx(
                "max-w-full truncate rounded-md px-1.5 py-0.5 text-center font-serif text-[13px] leading-tight transition-colors",
                open && !exiting
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground",
              )}
            >
              navigate
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
