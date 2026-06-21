import Link from "next/link";
import SectionView from "@/components/ui/section-view";

type ProjectNavbarProps = {
  title: string;
};

export default function ProjectNavbar({ title }: ProjectNavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/90 backdrop-blur-sm">
      <SectionView
        fullView
        className="relative mx-auto flex h-20 w-full max-w-[1600px] items-center justify-between px-4 sm:px-8 lg:px-12"
      >
        <div className="surface-grid-lines pointer-events-none absolute inset-0 opacity-40" />
        <p className="relative font-serif text-xl tracking-tight text-zinc-100">
          {title.toLowerCase()}
        </p>
        <Link
          href="/"
          className="relative inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 font-secondary text-sm text-zinc-200 transition-colors duration-200 hover:bg-white/10"
        >
          home <span aria-hidden>→</span>
        </Link>
      </SectionView>
    </header>
  );
}
