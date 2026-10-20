import Link from "next/link";

type Props = {
  id: string;
  title: string;
  href?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};

export default function SectionCard({
  id,
  title,
  href,
  action,
  children,
}: Props) {
  return (
    <section aria-labelledby={id} className="card">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 id={id} className="type-subheading">
          {title}
        </h2>
        {href ? (
          <Link href={href} className="pill pill-active">
            All
          </Link>
        ) : (
          action
        )}
      </div>
      {children}
    </section>
  );
}
