import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Facts, Pager, Stack } from "@/components/detail-blocks";
import PageHeader from "@/components/page-header";
import Section from "@/components/section";
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
      <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
        <div className="flex flex-col gap-10 lg:col-span-2">
          <p className="type-body text-foreground">{item.summary}</p>
          <Section id="highlights-heading" title="Highlights">
            <ul className="type-body list-disc space-y-3 pl-5">
              {item.bullets.map((bullet) => (
                <li key={bullet.slice(0, 48)}>{bullet}</li>
              ))}
            </ul>
          </Section>
          {item.caveats && item.caveats.length > 0 ? (
            <Section id="caveats-heading" title="Notes">
              <ul className="type-body list-disc space-y-2 pl-5">
                {item.caveats.map((caveat) => (
                  <li key={caveat}>{caveat}</li>
                ))}
              </ul>
            </Section>
          ) : null}
        </div>
        <aside className="flex flex-col gap-10">
          <Facts
            facts={[
              { label: "Role", value: item.role },
              ...(item.dates ? [{ label: "Dates", value: item.dates }] : []),
            ]}
          />
          <Section id="tech-heading" title="Stack">
            <Stack items={item.technologies} />
          </Section>
          {item.github ? (
            <a
              href={item.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-toggle"
            >
              GitHub ↗
            </a>
          ) : null}
        </aside>
      </div>

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
