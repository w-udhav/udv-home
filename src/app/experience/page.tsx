import type { Metadata } from "next";
import Link from "next/link";
import { FactTiles } from "@/components/detail-blocks";
import EntryRow from "@/components/entry-row";
import PageHeader from "@/components/page-header";
import SectionCard from "@/components/section-card";
import SiteShell from "@/components/site-shell";
import { education, employment } from "@/data/resume";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Employment history — Orbitaim, Wendor, FarEye, Infosys, Credanic.",
};

export default function ExperiencePage() {
  return (
    <SiteShell>
      <PageHeader title="Experience" crumbs={[{ label: "Experience" }]} />
      <p className="type-body">
        Full-time and internships, newest first. Product stories for Orbitaim
        and Wendor also live under{" "}
        <Link href="/work" className="note-link">
          Work
        </Link>
        .
      </p>
      <div className="card">
        {employment.map((job) => (
          <EntryRow
            key={job.slug}
            href={`/experience/${job.slug}`}
            title={job.company}
            description={job.title}
            meta={job.status === "current" ? "Current" : job.dates}
          />
        ))}
      </div>
      <SectionCard id="education-heading" title="Education">
        <p className="type-body mb-3">{education.institution}</p>
        <FactTiles
          facts={[
            { label: "Degree", value: education.degree },
            { label: "Location", value: education.location },
            { label: "Dates", value: education.dates },
          ]}
        />
      </SectionCard>
    </SiteShell>
  );
}
