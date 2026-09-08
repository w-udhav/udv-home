import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/page-header";
import SiteShell from "@/components/site-shell";
import { getWorkCase, workCases } from "@/data/resume";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return workCases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkCase(slug);
  if (!item) {
    return { title: "Work" };
  }
  return { title: item.title, description: item.lede };
}

export default async function WorkCasePage({ params }: Props) {
  const { slug } = await params;
  const item = getWorkCase(slug);
  if (!item) {
    notFound();
  }

  const index = workCases.findIndex((entry) => entry.slug === item.slug);
  const previous = index > 0 ? workCases[index - 1] : null;
  const next = index < workCases.length - 1 ? workCases[index + 1] : null;

  return (
    <SiteShell>
      <PageHeader
        title={item.title}
        crumbs={[{ label: "Work", href: "/work" }, { label: item.title }]}
      />
      <p className="type-caption">
        {item.eyebrow} · {item.role} · {item.dates}
      </p>
      <p className="type-body">{item.summary}</p>

      {item.sections.map((section) => (
        <section
          key={section.heading}
          aria-labelledby={`${item.slug}-${section.heading}`}
        >
          <h2
            id={`${item.slug}-${section.heading}`}
            className="type-subheading mb-3"
          >
            {section.heading}
          </h2>
          <div className="type-body space-y-4">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </section>
      ))}

      <section aria-labelledby="tech-heading">
        <h2 id="tech-heading" className="type-caption mb-3">
          Stack
        </h2>
        <p className="type-body">{item.technologies.join(", ")}</p>
      </section>

      {item.experienceSlug ? (
        <p className="type-caption">
          Employment record:{" "}
          <Link
            href={`/experience/${item.experienceSlug}`}
            className="hover:text-foreground"
          >
            {item.title} on Experience
          </Link>
        </p>
      ) : null}

      <nav className="flex justify-between gap-6 border-t border-separator pt-6">
        {previous ? (
          <Link
            href={`/work/${previous.slug}`}
            className="type-caption hover:text-foreground"
          >
            ← {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className="type-caption hover:text-foreground"
          >
            {next.title} →
          </Link>
        ) : null}
      </nav>
    </SiteShell>
  );
}
