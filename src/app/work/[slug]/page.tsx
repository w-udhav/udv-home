import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Facts, Pager, Stack } from "@/components/detail-blocks";
import PageHeader from "@/components/page-header";
import Section from "@/components/section";
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
      <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
        <div className="flex flex-col gap-10 lg:col-span-2">
          <p className="type-body text-foreground">{item.summary}</p>
          {item.sections.map((section) => (
            <Section
              key={section.heading}
              id={`${item.slug}-${section.heading}`}
              title={section.heading}
            >
              <div className="type-body space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </Section>
          ))}
        </div>
        <aside className="flex flex-col gap-10">
          <Facts
            facts={[
              { label: "Type", value: item.eyebrow },
              { label: "Role", value: item.role },
              { label: "Dates", value: item.dates },
            ]}
          />
          <Section id="tech-heading" title="Stack">
            <Stack items={item.technologies} />
          </Section>
          {item.experienceSlug ? (
            <Link
              href={`/experience/${item.experienceSlug}`}
              className="text-toggle"
            >
              Employment record →
            </Link>
          ) : null}
        </aside>
      </div>

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
