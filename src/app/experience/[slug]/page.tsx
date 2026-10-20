import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Facts, Pager, Stack } from "@/components/detail-blocks";
import PageHeader from "@/components/page-header";
import Section from "@/components/section";
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
      <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
        <div className="flex flex-col gap-10 lg:col-span-2">
          <p className="type-body text-foreground">{job.summary}</p>
          <Section id="work-heading" title="What I did">
            <ul className="type-body list-disc space-y-3 pl-5">
              {job.bullets.map((bullet) => (
                <li key={bullet.slice(0, 48)}>{bullet}</li>
              ))}
            </ul>
          </Section>
          {job.notes && job.notes.length > 0 ? (
            <Section id="notes-heading" title="Notes">
              <ul className="type-body list-disc space-y-2 pl-5">
                {job.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </Section>
          ) : null}
        </div>
        <aside className="flex flex-col gap-10">
          <Facts
            facts={[
              { label: "Title", value: job.title },
              { label: "Type", value: job.type },
              { label: "Dates", value: job.dates },
            ]}
          />
          {job.technologies.length > 0 ? (
            <Section id="tech-heading" title="Stack">
              <Stack items={job.technologies} />
            </Section>
          ) : null}
          {relatedWork.length > 0 ||
          (job.relatedExperiments && job.relatedExperiments.length > 0) ? (
            <Section id="related-heading" title="Related">
              <div className="flex flex-col items-start gap-1">
                {relatedWork.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/work/${item.slug}`}
                    className="text-toggle"
                  >
                    Product story: {item.title} →
                  </Link>
                ))}
                {(job.relatedExperiments ?? []).map((expSlug) => (
                  <Link
                    key={expSlug}
                    href={`/experiments/${expSlug}`}
                    className="text-toggle"
                  >
                    Project: {getExperiment(expSlug)?.title ?? expSlug} →
                  </Link>
                ))}
              </div>
            </Section>
          ) : null}
        </aside>
      </div>

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
