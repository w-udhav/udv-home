import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FactTiles, Pager, StackPills } from "@/components/detail-blocks";
import PageHeader from "@/components/page-header";
import SectionCard from "@/components/section-card";
import SiteShell from "@/components/site-shell";
import { experiments, getExperiment } from "@/data/resume";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return experiments.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getExperiment(slug);
  if (!item) {
    return { title: "Experiments" };
  }
  return { title: item.title, description: item.lede };
}

export default async function ExperimentDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getExperiment(slug);
  if (!item) {
    notFound();
  }

  const index = experiments.findIndex((entry) => entry.slug === item.slug);
  const previous = index > 0 ? experiments[index - 1] : null;
  const next = index < experiments.length - 1 ? experiments[index + 1] : null;

  return (
    <SiteShell>
      <PageHeader
        title={item.title}
        crumbs={[
          { label: "Experiments", href: "/experiments" },
          { label: item.title },
        ]}
      />
      <FactTiles
        facts={[
          { label: "Role", value: item.role },
          ...(item.dates ? [{ label: "Dates", value: item.dates }] : []),
        ]}
      />
      <SectionCard
        id="overview-heading"
        title="Overview"
        action={
          item.github ? (
            <a
              href={item.github}
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill-active"
            >
              GitHub ↗
            </a>
          ) : null
        }
      >
        <p className="type-body">{item.summary}</p>
        <ul className="type-body mt-4 list-disc space-y-3 pl-5">
          {item.bullets.map((bullet) => (
            <li key={bullet.slice(0, 48)}>{bullet}</li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard id="tech-heading" title="Stack">
        <StackPills items={item.technologies} />
      </SectionCard>

      {item.caveats && item.caveats.length > 0 ? (
        <SectionCard id="caveats-heading" title="Notes">
          <ul className="type-body list-disc space-y-2 pl-5">
            {item.caveats.map((caveat) => (
              <li key={caveat}>{caveat}</li>
            ))}
          </ul>
        </SectionCard>
      ) : null}

      <Pager
        previous={
          previous
            ? { href: `/experiments/${previous.slug}`, label: previous.title }
            : null
        }
        next={
          next ? { href: `/experiments/${next.slug}`, label: next.title } : null
        }
      />
    </SiteShell>
  );
}
