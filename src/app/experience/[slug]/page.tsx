import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/page-header";
import SiteShell from "@/components/site-shell";
import { employment, getEmployment, getWorkCase } from "@/data/resume";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return employment.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = getEmployment(slug);
  if (!job) {
    return { title: "Experience" };
  }
  return {
    title: job.company,
    description: `${job.title} at ${job.company}`,
  };
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = getEmployment(slug);
  if (!job) {
    notFound();
  }

  const relatedWork = (job.relatedWork ?? [])
    .map((workSlug) => getWorkCase(workSlug))
    .filter((item) => item != null);

  const index = employment.findIndex((entry) => entry.slug === job.slug);
  const previous = index > 0 ? employment[index - 1] : null;
  const next = index < employment.length - 1 ? employment[index + 1] : null;

  return (
    <SiteShell>
      <PageHeader
        title={job.company}
        crumbs={[
          { label: "Experience", href: "/experience" },
          { label: job.company },
        ]}
      />
      <p className="type-caption">
        {job.title} · {job.type} · {job.dates}
      </p>
      <p className="type-body">{job.summary}</p>

      <section aria-labelledby="work-heading">
        <h2 id="work-heading" className="type-subheading mb-4">
          Work
        </h2>
        <ul className="type-body list-disc space-y-3 pl-5">
          {job.bullets.map((bullet) => (
            <li key={bullet.slice(0, 48)}>{bullet}</li>
          ))}
        </ul>
      </section>

      {job.technologies.length > 0 ? (
        <section aria-labelledby="tech-heading">
          <h2 id="tech-heading" className="type-caption mb-3">
            Stack
          </h2>
          <p className="type-body">{job.technologies.join(", ")}</p>
        </section>
      ) : null}

      {job.notes && job.notes.length > 0 ? (
        <section aria-labelledby="notes-heading">
          <h2 id="notes-heading" className="type-caption mb-3">
            Notes
          </h2>
          <ul className="type-body list-disc space-y-2 pl-5">
            {job.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {relatedWork.length > 0 ? (
        <p className="type-caption">
          Product story:{" "}
          {relatedWork.map((item, i) => (
            <span key={item.slug}>
              {i > 0 ? ", " : null}
              <Link
                href={`/work/${item.slug}`}
                className="hover:text-foreground"
              >
                {item.title}
              </Link>
            </span>
          ))}
        </p>
      ) : null}

      {job.relatedExperiments && job.relatedExperiments.length > 0 ? (
        <p className="type-caption">
          Related:{" "}
          {job.relatedExperiments.map((expSlug, i) => (
            <span key={expSlug}>
              {i > 0 ? ", " : null}
              <Link
                href={`/experiments/${expSlug}`}
                className="hover:text-foreground"
              >
                project page
              </Link>
            </span>
          ))}
        </p>
      ) : null}

      <nav className="flex justify-between gap-6 border-t border-separator pt-6">
        {previous ? (
          <Link
            href={`/experience/${previous.slug}`}
            className="type-caption hover:text-foreground"
          >
            ← {previous.company}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/experience/${next.slug}`}
            className="type-caption hover:text-foreground"
          >
            {next.company} →
          </Link>
        ) : null}
      </nav>
    </SiteShell>
  );
}
