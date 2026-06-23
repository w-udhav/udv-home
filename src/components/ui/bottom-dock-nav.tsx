"use client";

import { Icon } from "@iconify/react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import SectionView from "@/components/ui/section-view";
import CursorMergeWrapper from "./cursor-merge-wrapper";

type DockItem = {
  id: "work" | "thinking" | "elsewhere";
  label: string;
  href: string;
  icon: string;
};

const dockItems: DockItem[] = [
  {
    id: "work",
    label: "work",
    href: "/",
    icon: "mdi:briefcase-outline",
  },
  {
    id: "thinking",
    label: "thinking",
    href: "/#thinking",
    icon: "mdi:lightbulb-outline",
  },
  {
    id: "elsewhere",
    label: "elsewhere",
    href: "/#elsewhere",
    icon: "mdi:compass-outline",
  },
];

const DOCK_ITEM_WIDTH_CLASS = "w-24 md:w-28 xl:w-32";

function getActiveItemId(
  pathname: string,
  hash: string,
): DockItem["id"] | null {
  if (pathname === "/projects" || pathname.startsWith("/projects/")) {
    return "work";
  }

  if (pathname !== "/") {
    return null;
  }

  if (hash === "#thinking") {
    return "thinking";
  }

  if (hash === "#elsewhere") {
    return "elsewhere";
  }

  return "work";
}

export default function BottomDockNav() {
  const pathname = usePathname();
  const itemRefs = useRef<Record<DockItem["id"], HTMLAnchorElement | null>>({
    work: null,
    thinking: null,
    elsewhere: null,
  });
  const [hash, setHash] = useState("");
  const [activeSectionId, setActiveSectionId] = useState<DockItem["id"] | null>(
    null,
  );
  const [activeSurface, setActiveSurface] = useState({
    x: 0,
    visible: false,
  });
  const [hoveredItemId, setHoveredItemId] = useState<DockItem["id"] | null>(
    null,
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const syncHash = () => {
      setHash(window.location.hash);
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => {
      window.removeEventListener("hashchange", syncHash);
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/" || typeof window === "undefined") {
      setActiveSectionId(null);
      return;
    }

    const ids = dockItems.map((item) => item.id);
    const ratios: Record<DockItem["id"], number> = {
      work: 0,
      thinking: 0,
      elsewhere: 0,
    };

    const updateActiveFromRatios = () => {
      let bestId: DockItem["id"] = "work";
      let bestRatio = -1;

      for (const id of ids) {
        const ratio = ratios[id];
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      }

      setActiveSectionId(bestRatio > 0 ? bestId : "work");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as DockItem["id"];
          if (!ids.includes(id)) {
            continue;
          }

          ratios[id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        }
        updateActiveFromRatios();
      },
      {
        root: null,
        rootMargin: "-18% 0px -42% 0px",
        threshold: [0, 0.15, 0.3, 0.5, 0.75, 1],
      },
    );

    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, [pathname]);

  const activeItemId = useMemo(
    () => activeSectionId ?? getActiveItemId(pathname, hash),
    [activeSectionId, hash, pathname],
  );

  useEffect(() => {
    const updateSurface = () => {
      if (!activeItemId) {
        setActiveSurface((current) =>
          current.visible ? { ...current, visible: false } : current,
        );
        return;
      }

      const target = itemRefs.current[activeItemId];
      if (!target) {
        return;
      }

      const x = target.offsetLeft;
      setActiveSurface({ x, visible: true });
    };

    updateSurface();
    window.addEventListener("resize", updateSurface);
    return () => {
      window.removeEventListener("resize", updateSurface);
    };
  }, [activeItemId]);

  return (
    <div className="pointer-events-none sticky inset-x-0 bottom-0 z-50">
      <SectionView fullView className="px-3 pb-4 sm:px-6 sm:pb-6">
        <nav className="pointer-events-auto relative mx-auto flex w-fit items-center gap-1 rounded-2xl bg-zinc-900/55 p-1.5 shadow-2xl backdrop-blur-2xl">
          <span
            aria-hidden
            className={clsx(
              "pointer-events-none absolute inset-y-1.5 left-0 rounded-xl bg-white/16 ring-1 ring-white/5 transition-[transform,opacity] duration-300 ease-out",
              DOCK_ITEM_WIDTH_CLASS,
              activeSurface.visible ? "opacity-100" : "opacity-0",
            )}
            style={{
              transform: `translateX(${activeSurface.x}px)`,
            }}
          />
          {dockItems.map((item, index) => {
            const active = activeItemId === item.id;
            const revealIcon = active || hoveredItemId === item.id;

            return (
              <CursorMergeWrapper
                key={`${index}-${String(item.id)}`}
                contentShiftX={6}
                contentShiftY={4}
                mergePadding={0}
              >
                <Link
                  ref={(element) => {
                    itemRefs.current[item.id] = element;
                  }}
                  onMouseEnter={() => setHoveredItemId(item.id)}
                  onMouseLeave={() =>
                    setHoveredItemId((current) =>
                      current === item.id ? null : current,
                    )
                  }
                  href={item.href}
                  className={clsx(
                    "group relative z-10 inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-3.5 py-2.5 font-secondary text-sm transition-all duration-300 ease-out",
                    DOCK_ITEM_WIDTH_CLASS,
                    {
                      "text-zinc-100": active,
                      "text-zinc-300 hover:-translate-y-0.5 hover:bg-white/9 hover:text-zinc-100":
                        !active,
                    },
                  )}
                >
                  <span
                    className={clsx(
                      "inline-flex items-center justify-center overflow-hidden transition-[width,opacity] duration-300 ease-out",
                      revealIcon ? "w-[18px] opacity-100" : "w-0 opacity-0",
                    )}
                  >
                    <Icon
                      icon={item.icon}
                      width={18}
                      height={18}
                      className="scale-105 transition-transform duration-300"
                    />
                  </span>
                  <span className="capitalize tracking-[0.01em]">
                    {item.label}
                  </span>
                </Link>
              </CursorMergeWrapper>
            );
          })}
        </nav>
      </SectionView>
    </div>
  );
}
