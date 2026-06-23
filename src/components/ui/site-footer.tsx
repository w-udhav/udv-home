import { Icon } from "@iconify/react";
import clsx from "clsx";
import Link from "next/link";
import SectionView from "@/components/ui/section-view";
import { links } from "@/utils/constants";
import CursorMergeWrapper from "./cursor-merge-wrapper";

type FooterLink = {
  id: string;
  label: string;
  href: string;
  external?: boolean;
};

const footerLinks: FooterLink[] = [
  { id: "email", label: "email", href: `mailto:${links.email}` },
  { id: "github", label: "github", href: links.github, external: true },
  { id: "linkedin", label: "linkedIn", href: links.linkedin, external: true },
  { id: "twitter", label: "twitter", href: links.twitter, external: true },
  {
    id: "instagram",
    label: "instagram",
    href: links.instagram,
    external: true,
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-black/95">
      <SectionView className="relative py-6">
        <div className="flex flex-wrap items-center gap-1">
          <CursorMergeWrapper mergePadding={8}>
            <Link
              href="/"
              aria-label="home"
              className="group inline-flex min-h-10 min-w-10 items-center justify-center overflow-hidden rounded-xl px-3 py-2 text-zinc-300 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/9 hover:text-zinc-100"
            >
              <Icon
                icon="material-symbols-light:home-rounded"
                width={24}
                height={24}
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </CursorMergeWrapper>

          {footerLinks.map((item) => (
            <CursorMergeWrapper key={item.id} mergePadding={8}>
              <Link
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className={clsx(
                  "inline-flex min-h-10 items-center justify-center overflow-hidden rounded-xl px-3.5 py-2 font-secondary text-sm capitalize text-zinc-300 transition-all duration-300 ease-out",
                  "hover:-translate-y-0.5 hover:bg-white/9 hover:text-zinc-100",
                )}
              >
                {item.label}
              </Link>
            </CursorMergeWrapper>
          ))}
        </div>
      </SectionView>
    </footer>
  );
}
