"use client";

import { Icon } from "@iconify/react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SectionView from "@/components/ui/section-view";

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

function isItemActive(pathname: string, itemId: DockItem["id"]) {
  if (itemId === "work") {
    return pathname === "/" || pathname.startsWith("/projects");
  }

  return false;
}

export default function BottomDockNav() {
  const pathname = usePathname();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50">
      <SectionView fullView className="px-3 pb-4 sm:px-6 sm:pb-6">
        <nav className="pointer-events-auto mx-auto flex w-fit items-center gap-1 rounded-2xl bg-zinc-900/55 p-1.5 shadow-2xl backdrop-blur-2xl">
          {dockItems.map((item) => {
            const active = isItemActive(pathname, item.id);

            return (
              <Link
                key={item.id}
                href={item.href}
                className={clsx(
                  "group inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 font-secondary text-sm transition-all duration-300 ease-out",
                  {
                    "bg-white/16 text-zinc-100 ring-1 ring-white/5": active,
                    "text-zinc-300 hover:-translate-y-0.5 hover:bg-white/9 hover:text-zinc-100":
                      !active,
                  },
                )}
              >
                <Icon
                  icon={item.icon}
                  width={18}
                  height={18}
                  className={clsx("transition-transform duration-300", {
                    "scale-105": active,
                    "group-hover:scale-110": !active,
                  })}
                />
                <span className="capitalize tracking-[0.01em]">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </SectionView>
    </div>
  );
}
