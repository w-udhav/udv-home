import Link from "next/link";

type Props = {
  id: string;
  title: string;
  href?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export default function Section({
  id,
  title,
  href,
  action,
  className,
  children,
}: Props) {
  return (
    <section aria-labelledby={id} className={className}>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <h2 id={id} className="type-caption">
          {title}
        </h2>
        {href ? (
          <Link href={href} className="text-toggle">
            View all
          </Link>
        ) : (
          action
        )}
      </div>
      {children}
    </section>
  );
}
