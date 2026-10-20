import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FactTiles, Pager, StackPills } from "@/components/detail-blocks";
import PageHeader from "@/components/page-header";
import SectionCard from "@/components/section-card";
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
      <FactTiles
        facts={[
          { label: "Type", value: item.eyebrow },
          { label: "Role", value: item.role },
          { label: "Dates", value: item.dates },
        ]}
      />
      <SectionCard id="overview-heading" title="Overview">
        <p className="type-body">{item.summary}</p>
      </SectionCard>

      {item.sections.map((section) => (
        <SectionCard
          key={section.heading}
          id={`${item.slug}-${section.heading}`}
          title={section.heading}
        >
          <div className="type-body space-y-4">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </SectionCard>
      ))}

      <SectionCard
        id="tech-heading"
        title="Stack"
        action={
          item.experienceSlug ? (
            <Link
              href={`/experience/${item.experienceSlug}`}
              className="pill pill-active"
            >
              Employment record
            </Link>
          ) : null
        }
      >
        <StackPills items={item.technologies} />
      </SectionCard>

      <Pager
        previous={
          previous
            ? { href: `/work/${previous.slug}`, label: previous.title }
            : null
        }
        next={next ? { href: `/work/${next.slug}`, label: next.title } : null}
      />
    </SiteShell>
  );
}
