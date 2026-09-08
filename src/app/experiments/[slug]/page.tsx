import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/page-header";
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
      <PageHeader title={item.title} href="/experiments" />
      <p className="type-caption">
        {item.role}
        {item.dates ? ` · ${item.dates}` : ""}
      </p>
      <p className="type-body">{item.summary}</p>

      <ul className="type-body list-disc space-y-3 pl-5">
        {item.bullets.map((bullet) => (
          <li key={bullet.slice(0, 48)}>{bullet}</li>
        ))}
      </ul>

      <section aria-labelledby="tech-heading">
        <h2 id="tech-heading" className="type-caption mb-3">
          Stack
        </h2>
        <p className="type-body">{item.technologies.join(", ")}</p>
      </section>

      {item.caveats && item.caveats.length > 0 ? (
        <section aria-labelledby="caveats-heading">
          <h2 id="caveats-heading" className="type-caption mb-3">
            Notes
          </h2>
          <ul className="type-body list-disc space-y-2 pl-5">
            {item.caveats.map((caveat) => (
              <li key={caveat}>{caveat}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {item.github ? (
        <p className="type-caption">
          <a
            href={item.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            GitHub ↗
          </a>
        </p>
      ) : null}

      <nav className="flex justify-between gap-6 border-t border-separator pt-6">
        {previous ? (
          <Link
            href={`/experiments/${previous.slug}`}
            className="type-caption hover:text-foreground"
          >
            ← {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/experiments/${next.slug}`}
            className="type-caption hover:text-foreground"
          >
            {next.title} →
          </Link>
        ) : null}
      </nav>
    </SiteShell>
  );
}
