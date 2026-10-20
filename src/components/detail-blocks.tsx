import Link from "next/link";

type Fact = { label: string; value: string };

export function FactTiles({ facts }: { facts: Fact[] }) {
  return (
    <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {facts.map((fact) => (
        <div key={fact.label} className="tile">
          <dt className="type-caption">{fact.label}</dt>
          <dd className="type-stat m-0">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function StackPills({ items }: { items: string[] }) {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-1 p-0">
      {items.map((item) => (
        <li key={item} className="pill pill-active">
          {item}
        </li>
      ))}
    </ul>
  );
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
    <nav aria-label="Pagination" className="grid grid-cols-2 gap-2">
      {previous ? (
        <Link href={previous.href} className="tile row-link">
          <span className="type-caption block">Previous</span>
          <span className="type-stat block">← {previous.label}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href} className="tile row-link text-right">
          <span className="type-caption block">Next</span>
          <span className="type-stat block">{next.label} →</span>
        </Link>
      ) : null}
    </nav>
  );
}
