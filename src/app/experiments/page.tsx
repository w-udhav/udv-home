import type { Metadata } from "next";
import Link from "next/link";
import EntryRow from "@/components/entry-row";
import PageHeader from "@/components/page-header";
import SiteShell from "@/components/site-shell";
import { experiments } from "@/data/resume";

export const metadata: Metadata = {
  title: "Experiments",
  description:
    "Personal and internship builds — e-commerce, CRM, Writopia, CyHr, hospital management.",
};

export default function ExperimentsPage() {
  return (
    <SiteShell>
      <PageHeader title="Experiments" crumbs={[{ label: "Experiments" }]} />
      <p className="type-body">
        Personal projects and internship builds. Client work is under{" "}
        <Link href="/work" className="note-link">
          Work
        </Link>
        .
      </p>
      <div>
        {experiments.map((item) => (
          <EntryRow
            key={item.slug}
            href={`/experiments/${item.slug}`}
            title={item.title}
            description={item.lede}
            meta={item.dates}
          />
        ))}
      </div>
    </SiteShell>
  );
}
