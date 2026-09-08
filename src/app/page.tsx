import Image from "next/image";
import Link from "next/link";
import profileImage from "@/assets/profile.png";
import BioToggle from "@/components/bio-toggle";
import EntryRow from "@/components/entry-row";
import SiteFooter from "@/components/site-footer";
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
      <header className="flex items-start gap-5">
        <Image
          src={profileImage}
          alt=""
          width={56}
          height={56}
          priority
          className="mt-1 size-14 rounded-full object-cover"
        />
        <div>
          <h1 className="type-heading">{identity.handle}</h1>
          <p className="type-caption mt-2">{identity.title}</p>
        </div>
      </header>

      <BioToggle />

      <section aria-labelledby="now-heading">
        <h2 id="now-heading" className="type-caption mb-3">
          Now
        </h2>
        <p className="type-body">
          Software Developer Engineer at Orbitaim — a pre-launch B2B outreach
          platform. Before that, Software Engineer at Wendor, where I cut
          machine-status and order API time from about 15s to about 3s and
          improved dashboard load by 40–60%.
        </p>
      </section>

      <section aria-labelledby="work-heading">
        <div className="mb-1 flex items-baseline justify-between gap-4">
          <h2 id="work-heading" className="type-subheading">
            Work
          </h2>
          <Link href="/work" className="type-caption hover:text-foreground">
            All
          </Link>
        </div>
        <div>
          {selectedWork.map((item) => (
            <EntryRow
              key={item.slug}
              href={`/work/${item.slug}`}
              title={item.title}
              description={item.lede}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="experience-heading">
        <div className="mb-1 flex items-baseline justify-between gap-4">
          <h2 id="experience-heading" className="type-subheading">
            Experience
          </h2>
          <Link
            href="/experience"
            className="type-caption hover:text-foreground"
          >
            All
          </Link>
        </div>
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
      </section>

      <section aria-labelledby="experiments-heading">
        <div className="mb-1 flex items-baseline justify-between gap-4">
          <h2 id="experiments-heading" className="type-subheading">
            Experiments
          </h2>
          <Link
            href="/experiments"
            className="type-caption hover:text-foreground"
          >
            All
          </Link>
        </div>
        <div>
          {experiments.slice(0, 3).map((item) => (
            <EntryRow
              key={item.slug}
              href={`/experiments/${item.slug}`}
              title={item.title}
              description={item.lede}
            />
          ))}
        </div>
      </section>

      <SiteFooter />
    </SiteShell>
  );
}
