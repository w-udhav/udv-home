import Image from "next/image";
import profileImage from "@/assets/profile.png";
import Activity from "@/components/activity";
import BioToggle from "@/components/bio-toggle";
import EntryRow from "@/components/entry-row";
import Section from "@/components/section";
import SiteShell from "@/components/site-shell";
import {
  education,
  employment,
  experiments,
  getWorkCase,
  identity,
  landingSelectedWork,
  skills,
} from "@/data/resume";

const contactLinks = [
  { label: "Email", href: `mailto:${identity.email}` },
  { label: "GitHub", href: identity.github },
  { label: "LinkedIn", href: identity.linkedin },
  { label: "X", href: identity.twitter },
];

const skillGroups = [
  { label: "Languages", items: skills.languages },
  { label: "Frontend", items: skills.frontend },
  { label: "Backend", items: skills.backend },
  { label: "Data", items: skills.data },
  { label: "Infrastructure", items: skills.infrastructure },
];

export default function Home() {
  const selectedWork = landingSelectedWork
    .map((slug) => getWorkCase(slug))
    .filter((item) => item != null);

  return (
    <SiteShell>
      <div className="grid gap-x-10 gap-y-14 lg:grid-cols-6 lg:gap-y-16">
        <header className="lg:col-span-2">
          <Image
            src={profileImage}
            alt=""
            width={64}
            height={64}
            priority
            className="size-16 rounded-full object-cover"
          />
          <h1 className="type-heading mt-5">{identity.name}</h1>
          <p className="type-body mt-1">
            {identity.title} · {identity.handle}
          </p>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
            {contactLinks.map((link) => {
              const external = !link.href.startsWith("mailto:");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="text-toggle"
                >
                  {link.label}
                </a>
              );
            })}
          </p>
        </header>

        <div className="flex flex-col gap-10 lg:col-span-4">
          <BioToggle />
          <Section id="now-heading" title="Now">
            <p className="type-body">
              Software Developer Engineer at Orbitaim — a B2B outreach platform
              used by clients. Before that, Software Engineer at Wendor, where I
              cut machine-status and order API time from about 15s to about 3s
              and improved dashboard load by 40–60%.
            </p>
          </Section>
        </div>

        <Activity className="lg:col-span-6" />

        <Section
          id="work-heading"
          title="Selected work"
          href="/work"
          className="lg:col-span-3"
        >
          {selectedWork.map((item) => (
            <EntryRow
              key={item.slug}
              href={`/work/${item.slug}`}
              title={item.title}
              description={item.lede}
            />
          ))}
        </Section>

        <Section
          id="experience-heading"
          title="Experience"
          href="/experience"
          className="lg:col-span-3"
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
        </Section>

        <Section
          id="experiments-heading"
          title="Experiments"
          href="/experiments"
          className="lg:col-span-2"
        >
          {experiments.slice(0, 3).map((item) => (
            <EntryRow
              key={item.slug}
              href={`/experiments/${item.slug}`}
              title={item.title}
              description={item.lede}
            />
          ))}
        </Section>

        <Section id="skills-heading" title="Toolbox" className="lg:col-span-2">
          <dl className="m-0 grid gap-2">
            {skillGroups.map((group) => (
              <div key={group.label} className="grid grid-cols-[6.5rem_1fr]">
                <dt className="type-caption">{group.label}</dt>
                <dd className="type-body m-0">{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Section>
        <Section
          id="education-heading"
          title="Education"
          className="lg:col-span-2"
        >
          <p className="type-stat">{education.institution}</p>
          <p className="type-caption">{education.degree}</p>
          <p className="type-caption">
            {education.location} · {education.dates}
          </p>
        </Section>
      </div>
    </SiteShell>
  );
}
