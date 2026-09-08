import type { Metadata } from "next";
import Link from "next/link";
import EntryRow from "@/components/entry-row";
import PageHeader from "@/components/page-header";
import SiteShell from "@/components/site-shell";
import { workCases } from "@/data/resume";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected product work — Wendor, Orbitaim, Design 360, and Uamore.",
};

export default function WorkPage() {
  return (
    <SiteShell>
      <PageHeader title="Work" />
      <p className="type-body">
        Selected product stories. Employment history lives on{" "}
        <Link href="/experience" className="note-link">
          Experience
        </Link>
        . Personal builds live on{" "}
        <Link href="/experiments" className="note-link">
          Experiments
        </Link>
        .
      </p>
      <div>
        {workCases.map((item) => (
          <EntryRow
            key={item.slug}
            href={`/work/${item.slug}`}
            title={item.title}
            description={item.lede}
            meta={item.dates}
          />
        ))}
      </div>
    </SiteShell>
  );
}
