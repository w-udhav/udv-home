import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FactTiles, Pager, StackPills } from "@/components/detail-blocks";
import PageHeader from "@/components/page-header";
import SectionCard from "@/components/section-card";
import SiteShell from "@/components/site-shell";
import {
  employment,
  getEmployment,
  getExperiment,
  getWorkCase,
} from "@/data/resume";

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
      <FactTiles
        facts={[
          { label: "Title", value: job.title },
          { label: "Type", value: job.type },
          { label: "Dates", value: job.dates },
        ]}
      />
      <SectionCard id="overview-heading" title="Overview">
        <p className="type-body">{job.summary}</p>
      </SectionCard>

      <SectionCard id="work-heading" title="Work">
        <ul className="type-body list-disc space-y-3 pl-5">
          {job.bullets.map((bullet) => (
            <li key={bullet.slice(0, 48)}>{bullet}</li>
          ))}
        </ul>
      </SectionCard>

      {job.technologies.length > 0 ? (
        <SectionCard id="tech-heading" title="Stack">
          <StackPills items={job.technologies} />
        </SectionCard>
      ) : null}

      {job.notes && job.notes.length > 0 ? (
        <SectionCard id="notes-heading" title="Notes">
          <ul className="type-body list-disc space-y-2 pl-5">
            {job.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </SectionCard>
      ) : null}

      {relatedWork.length > 0 ||
      (job.relatedExperiments && job.relatedExperiments.length > 0) ? (
        <SectionCard id="related-heading" title="Related">
          <div className="flex flex-wrap gap-1">
            {relatedWork.map((item) => (
              <Link
                key={item.slug}
                href={`/work/${item.slug}`}
                className="pill pill-active"
              >
                Product story: {item.title}
              </Link>
            ))}
            {(job.relatedExperiments ?? []).map((expSlug) => (
              <Link
                key={expSlug}
                href={`/experiments/${expSlug}`}
                className="pill pill-active"
              >
                Project: {getExperiment(expSlug)?.title ?? expSlug}
              </Link>
            ))}
          </div>
        </SectionCard>
      ) : null}

      <Pager
        previous={
          previous
            ? { href: `/experience/${previous.slug}`, label: previous.company }
            : null
        }
        next={
          next
            ? { href: `/experience/${next.slug}`, label: next.company }
            : null
        }
      />
    </SiteShell>
  );
}
