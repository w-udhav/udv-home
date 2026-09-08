import Link from "next/link";

type Props = {
  href: string;
  title: string;
  meta?: string;
  description?: string;
  external?: boolean;
};

export default function EntryRow({
  href,
  title,
  meta,
  description,
  external,
}: Props) {
  const className =
    "group flex items-baseline justify-between gap-6 py-3 border-b border-separator";

  const body = (
    <>
      <span className="min-w-0">
        <span className="type-body text-foreground transition-colors group-hover:text-accent">
          {title}
        </span>
        {description ? (
          <span className="type-body text-muted"> {description}</span>
        ) : null}
      </span>
      {meta ? <span className="type-caption shrink-0">{meta}</span> : null}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {body}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {body}
    </Link>
  );
}
