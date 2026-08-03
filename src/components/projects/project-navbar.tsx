import { Icon } from "@iconify/react";
import LinkButton from "@/components/ui/link-button";
import SectionView from "@/components/ui/section-view";

type ProjectNavbarProps = {
  title: string;
};

export default function ProjectNavbar({ title }: ProjectNavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/90 backdrop-blur-sm">
      <SectionView className="relative flex h-16 items-center justify-between">
        <div className="surface-grid-lines pointer-events-none absolute inset-0 opacity-40" />
        <p className="relative font-serif text-xl tracking-tight text-zinc-100">
          {title.toLowerCase()}
        </p>
        <LinkButton
          href="/"
          startIcon={<Icon icon="line-md:arrow-left" />}
          variant="faded"
          className="capitalize"
        >
          back to site
        </LinkButton>
      </SectionView>
    </header>
  );
}
