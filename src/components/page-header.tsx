import Link from "next/link";
import { identity } from "@/data/resume";

export type Crumb = {
  label: string;
  href?: string;
};

type PageHeaderProps = {
  title: string;
  crumbs: Crumb[];
};

export default function PageHeader({ title, crumbs }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-6">
      <nav aria-label="Breadcrumb" className="type-caption">
        <ol className="flex flex-wrap items-center gap-x-1.5">
          <li>
            <Link href="/" className="hover:text-foreground">
              {identity.handle}
            </Link>
          </li>
          {crumbs.map((crumb) => (
            <li
              key={`${crumb.href ?? ""}-${crumb.label}`}
              className="flex items-center gap-x-1.5"
            >
              <span aria-hidden className="text-muted">
                /
              </span>
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-foreground">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-foreground">{crumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <h1 className="type-heading">{title}</h1>
    </header>
  );
}
