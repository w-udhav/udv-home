import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectHero from "@/components/projects/project-hero";
import ProjectMetaPanel from "@/components/projects/project-meta-panel";
import ProjectNavbar from "@/components/projects/project-navbar";
import SectionView from "@/components/ui/section-view";
import { getProjectBySlug, getProjectSlugs } from "@/utils/projects";

type ProjectPageParams = {
  slug: string;
};

type ProjectPageProps = {
  params: Promise<ProjectPageParams>;
};

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.subtitle,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <ProjectNavbar title={project.title} />

      <ProjectHero
        title={project.title}
        subtitle={project.subtitle}
        logoImageSrc={project.logoImageSrc}
      />

      <SectionView fullView className="px-4 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1380px] gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            <section>
              <h2 className="font-secondary text-xs uppercase tracking-[0.18em] text-zinc-400">
                Stack Used
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 font-secondary text-sm text-zinc-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            <div className="mt-12 space-y-12">
              {project.sections.map((section) => (
                <section
                  key={section.id}
                  className="border-t border-white/10 pt-8"
                >
                  <h3 className="font-serif text-3xl text-zinc-100 sm:text-4xl">
                    {section.title}
                  </h3>

                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="max-w-3xl font-secondary text-base leading-relaxed text-zinc-300"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {section.bullets ? (
                    <ul className="mt-5 space-y-2">
                      {section.bullets.map((item) => (
                        <li
                          key={item}
                          className="font-secondary text-sm text-zinc-200"
                        >
                          • {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </div>

          <ProjectMetaPanel project={project} />
        </div>
      </SectionView>
    </main>
  );
}
