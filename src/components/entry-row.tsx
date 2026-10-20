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
      className="row-link -mx-2 flex flex-col px-2 py-2.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
    >
      <span className="min-w-0">
        <span className="type-stat block">{title}</span>
        {description ? (
          <span className="type-caption block">{description}</span>
        ) : null}
      </span>
      {meta ? <span className="type-caption shrink-0">{meta}</span> : null}
    </Link>
  );
}
