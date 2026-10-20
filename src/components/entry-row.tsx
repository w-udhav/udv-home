import Link from "next/link";

type Props = {
  href: string;
  title: string;
  meta?: string;
  description?: string;
};

export default function EntryRow({ href, title, meta, description }: Props) {
  return (
    <Link
      href={href}
      className="group flex flex-col py-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
    >
      <span className="min-w-0">
        <span className="type-stat block underline decoration-transparent decoration-1 underline-offset-4 transition-colors group-hover:decoration-current group-focus-visible:decoration-current">
          {title}
        </span>
        {description ? (
          <span className="type-caption block">{description}</span>
        ) : null}
      </span>
      {meta ? <span className="type-caption shrink-0">{meta}</span> : null}
    </Link>
  );
}
