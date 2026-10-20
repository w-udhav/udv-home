import Link from "next/link";

type Fact = { label: string; value: string };

export function Facts({ facts }: { facts: Fact[] }) {
  return (
    <dl className="m-0 grid gap-3">
      {facts.map((fact) => (
        <div key={fact.label}>
          <dt className="type-caption">{fact.label}</dt>
          <dd className="type-stat m-0">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Stack({ items }: { items: string[] }) {
  return <p className="type-body m-0">{items.join(" · ")}</p>;
}

type PagerLink = { href: string; label: string } | null;

export function Pager({
  previous,
  next,
}: {
  previous: PagerLink;
  next: PagerLink;
}) {
  return (
    <nav aria-label="Pagination" className="grid grid-cols-2 gap-6 pt-4">
      {previous ? (
        <Link href={previous.href} className="group">
          <span className="type-caption block">Previous</span>
          <span className="type-stat block group-hover:underline">
            ← {previous.label}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href} className="group text-right">
          <span className="type-caption block">Next</span>
          <span className="type-stat block group-hover:underline">
            {next.label} →
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
