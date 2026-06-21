import Link from "next/link";
import SectionView from "@/components/ui/section-view";
import { about, links } from "@/utils/constants";

const currentYear = new Date().getFullYear();

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-black/95">
      <div className="surface-grid-lines pointer-events-none absolute inset-0 opacity-30" />

      <SectionView
        fullView
        className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12"
      >
        <div>
          <p className="font-serif text-xl text-zinc-100">{about.name}</p>
          <p className="mt-1 font-secondary text-sm text-zinc-400">
            {about.title} · {currentYear}
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-2 font-secondary text-sm text-zinc-300">
          <Link
            href={`mailto:${links.email}`}
            className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 transition-colors duration-200 hover:bg-white/10"
          >
            Email
          </Link>
          <Link
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 transition-colors duration-200 hover:bg-white/10"
          >
            GitHub
          </Link>
          <Link
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 transition-colors duration-200 hover:bg-white/10"
          >
            LinkedIn
          </Link>
        </nav>
      </SectionView>
    </footer>
  );
}
