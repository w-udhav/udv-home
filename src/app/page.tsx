import Image from "next/image";
import profileImage from "@/assets/profile.png";
import ActivityCard from "@/components/activity-card";
import BioToggle from "@/components/bio-toggle";
import EntryRow from "@/components/entry-row";
import SectionCard from "@/components/section-card";
import SiteShell from "@/components/site-shell";
import {
  employment,
  experiments,
  getWorkCase,
  identity,
  landingSelectedWork,
} from "@/data/resume";

export default function Home() {
  const selectedWork = landingSelectedWork
    .map((slug) => getWorkCase(slug))
    .filter((item) => item != null);

  return (
    <SiteShell>
      <header className="mb-2 flex items-center gap-4 sm:mb-4">
        <Image
          src={profileImage}
          alt=""
          width={56}
          height={56}
          priority
          className="size-14 rounded-full object-cover"
        />
        <div>
          <h1 className="type-heading">{identity.handle}</h1>
          <p className="type-caption mt-1">{identity.title}</p>
        </div>
      </header>

      <BioToggle />

      <SectionCard id="now-heading" title="Now">
        <p className="type-body">
          Software Developer Engineer at Orbitaim — a B2B outreach platform used
          by clients. Before that, Software Engineer at Wendor, where I cut
          machine-status and order API time from about 15s to about 3s and
          improved dashboard load by 40–60%.
        </p>
      </SectionCard>

      <ActivityCard />

      <SectionCard id="work-heading" title="Work" href="/work">
        {selectedWork.map((item) => (
          <EntryRow
            key={item.slug}
            href={`/work/${item.slug}`}
            title={item.title}
            description={item.lede}
          />
        ))}
      </SectionCard>

      <SectionCard
        id="experience-heading"
        title="Experience"
        href="/experience"
      >
        {employment.map((job) => (
          <EntryRow
            key={job.slug}
            href={`/experience/${job.slug}`}
            title={job.company}
            description={job.title}
            meta={job.status === "current" ? "Current" : job.dates}
          />
        ))}
      </SectionCard>

      <SectionCard
        id="experiments-heading"
        title="Experiments"
        href="/experiments"
      >
        {experiments.slice(0, 3).map((item) => (
          <EntryRow
            key={item.slug}
            href={`/experiments/${item.slug}`}
            title={item.title}
            description={item.lede}
          />
        ))}
      </SectionCard>
    </SiteShell>
  );
}
