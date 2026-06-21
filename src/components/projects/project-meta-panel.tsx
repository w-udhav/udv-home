import Link from "next/link";
import type { Project } from "@/utils/projects";

type ProjectMetaPanelProps = {
  project: Project;
};

function formatDate(dateValue: string) {
  const date = new Date(dateValue);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export default function ProjectMetaPanel({ project }: ProjectMetaPanelProps) {
  return (
    <aside className="h-fit rounded-xl border border-white/10 bg-zinc-950/80 p-5 lg:sticky lg:top-28">
      <h3 className="font-secondary text-xs uppercase tracking-[0.18em] text-zinc-400">
        Project Meta
      </h3>

      <dl className="mt-4 space-y-4">
        <div>
          <dt className="font-secondary text-xs uppercase tracking-[0.14em] text-zinc-500">
            Date
          </dt>
          <dd className="mt-1 font-serif text-lg text-zinc-100">
            {formatDate(project.date)}
          </dd>
        </div>

        <div>
          <dt className="font-secondary text-xs uppercase tracking-[0.14em] text-zinc-500">
            Role
          </dt>
          <dd className="mt-1 font-secondary text-sm text-zinc-200">
            {project.role}
          </dd>
        </div>

        <div>
          <dt className="font-secondary text-xs uppercase tracking-[0.14em] text-zinc-500">
            Duration
          </dt>
          <dd className="mt-1 font-secondary text-sm text-zinc-200">
            {project.duration}
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-col gap-2">
        {project.repositoryUrl ? (
          <Link
            href={project.repositoryUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-3 py-2 font-secondary text-sm text-zinc-100 transition-colors duration-200 hover:bg-white/10"
          >
            Repository <span aria-hidden>↗</span>
          </Link>
        ) : null}

        {project.liveUrl ? (
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-3 py-2 font-secondary text-sm text-zinc-100 transition-colors duration-200 hover:bg-white/10"
          >
            Live Link <span aria-hidden>↗</span>
          </Link>
        ) : null}
      </div>
    </aside>
  );
}
