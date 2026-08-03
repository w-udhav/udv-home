"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import type { ShowcaseTile } from "@/utils/showcase-tiles";

type ShowcaseGridProps = {
  tiles: ShowcaseTile[];
};

export default function ShowcaseGrid({ tiles }: ShowcaseGridProps) {
  return (
    <div className="w-full px-3 pb-16 sm:px-6 md:px-8 lg:px-10 lg:pb-24">
      <div className="grid auto-rows-[6.2rem] grid-cols-2 gap-1 sm:auto-rows-[7.2rem] md:grid-cols-6 lg:grid-cols-12 lg:grid-rows-[repeat(4,minmax(0,10.25rem))]">
        {tiles.map((tile) => (
          <Link
            key={tile.id}
            href={`/projects/${tile.slug}`}
            aria-label={`Open project ${tile.label}`}
            data-cursor-no-text="true"
            className={clsx(
              "group relative block overflow-hidden rounded-md bg-zinc-900",
              "transition-transform duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue-100 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              tile.className,
            )}
          >
            {tile.imageSrc ? (
              <Image
                src={tile.imageSrc}
                alt={tile.label}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            ) : (
              <div className="absolute inset-0 bg-zinc-900 transition-colors duration-300 group-hover:bg-zinc-800" />
            )}
            <div className="absolute inset-0 bg-black/18 opacity-100 transition-opacity duration-300 group-hover:bg-black/6" />
            <div className="relative flex h-full items-center justify-center p-3 md:p-4">
              <span className="text-center font-secondary text-sm leading-[1.45] text-white/85 opacity-0 transition-all duration-300 ease-out group-hover:opacity-100">
                {tile.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
