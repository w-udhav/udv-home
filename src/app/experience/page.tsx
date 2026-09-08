import type { Metadata } from "next";
import Link from "next/link";
import EntryRow from "@/components/entry-row";
import PageHeader from "@/components/page-header";
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
      <div>
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
      <section aria-labelledby="education-heading">
        <h2 id="education-heading" className="type-caption mb-2">
          Education
        </h2>
        <p className="type-body">
          {education.institution} — {education.degree}
        </p>
        <p className="type-caption">
          {education.location} · {education.dates}
        </p>
      </section>
    </SiteShell>
  );
}
