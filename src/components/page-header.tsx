import Link from "next/link";
import { identity } from "@/data/resume";

type PageHeaderProps = {
  title: string;
  href?: string;
};

export default function PageHeader({ title, href }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-6">
      <p className="type-caption">
        <Link href="/" className="hover:text-foreground">
          {identity.handle}
        </Link>
        <span className="text-separator"> / </span>
        {href ? (
          <Link href={href} className="hover:text-foreground">
            {title}
          </Link>
        ) : (
          <span className="text-foreground">{title}</span>
        )}
      </p>
      <h1 className="type-heading">{title}</h1>
    </header>
  );
}
