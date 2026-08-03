export type ProjectSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  logoImageSrc?: string;
  stack: string[];
  date: string;
  role: string;
  duration: string;
  repositoryUrl?: string;
  liveUrl?: string;
  sections: ProjectSection[];
};

type ProjectSeed = {
  slug: string;
  title: string;
  subtitle: string;
  stack: string[];
  date: string;
  role: string;
  duration: string;
  repositoryUrl?: string;
  liveUrl?: string;
};

const projectSeeds: ProjectSeed[] = [
  {
    slug: "nod-brand-system",
    title: "Nod Brand System",
    subtitle: "Motion-first identity and interaction framework.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    date: "2026-02-11",
    role: "Frontend Engineer",
    duration: "6 weeks",
  },
  {
    slug: "pulse-interface",
    title: "Pulse Interface",
    subtitle: "An adaptive command center for data-heavy workflows.",
    stack: ["Next.js", "React", "TypeScript", "Recharts"],
    date: "2026-01-20",
    role: "Full Stack Engineer",
    duration: "8 weeks",
  },
  {
    slug: "typescale-engine",
    title: "TypeScale Engine",
    subtitle: "Tokenized typography tooling for product teams.",
    stack: ["Node.js", "TypeScript", "Zod", "pnpm"],
    date: "2025-12-18",
    role: "SDE",
    duration: "4 weeks",
  },
  {
    slug: "ribbon-identity",
    title: "Ribbon Identity",
    subtitle: "Reusable UI primitives for multi-brand surfaces.",
    stack: ["React", "Storybook", "TypeScript", "CSS Variables"],
    date: "2025-11-30",
    role: "UI Engineer",
    duration: "5 weeks",
  },
  {
    slug: "runner-motion",
    title: "Runner Motion",
    subtitle: "Interaction system tuned for retail landing pages.",
    stack: ["Next.js", "GSAP", "TypeScript"],
    date: "2025-10-28",
    role: "Frontend Engineer",
    duration: "3 weeks",
  },
  {
    slug: "autoline-concept",
    title: "AutoLine Concept",
    subtitle: "A performant showcase site for concept launches.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    date: "2025-09-22",
    role: "SDE",
    duration: "4 weeks",
  },
  {
    slug: "g-fabric-system",
    title: "G Fabric System",
    subtitle: "Design token pipeline for rapid visual theming.",
    stack: ["Style Dictionary", "TypeScript", "Figma Tokens"],
    date: "2025-09-10",
    role: "Design Engineer",
    duration: "5 weeks",
  },
  {
    slug: "ambient-assistant",
    title: "Ambient Assistant",
    subtitle: "Voice-led assistant UI with contextual actions.",
    stack: ["React", "TypeScript", "Web Speech API"],
    date: "2025-08-14",
    role: "Frontend Engineer",
    duration: "7 weeks",
  },
  {
    slug: "voice-panel",
    title: "Voice Panel",
    subtitle: "Low-latency command surface for speech workflows.",
    stack: ["React", "TypeScript", "Web Audio API"],
    date: "2025-07-17",
    role: "SDE",
    duration: "4 weeks",
  },
  {
    slug: "orbit-focus",
    title: "Orbit Focus",
    subtitle: "Productivity dashboard optimized for fast triage.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    date: "2025-06-12",
    role: "Full Stack Engineer",
    duration: "8 weeks",
  },
  {
    slug: "spark-loader",
    title: "Spark Loader",
    subtitle: "Micro-interaction library for loading experiences.",
    stack: ["React", "TypeScript", "Motion"],
    date: "2025-05-29",
    role: "UI Engineer",
    duration: "2 weeks",
  },
  {
    slug: "thirtytwo-dashboard",
    title: "ThirtyTwo Dashboard",
    subtitle: "Operational metrics view with real-time modules.",
    stack: ["Next.js", "TypeScript", "WebSocket", "Redis"],
    date: "2025-05-01",
    role: "SDE",
    duration: "9 weeks",
  },
  {
    slug: "dock-mini",
    title: "Dock Mini",
    subtitle: "Smart-home companion UI for glanceable controls.",
    stack: ["React", "TypeScript", "Electron"],
    date: "2025-04-09",
    role: "Frontend Engineer",
    duration: "3 weeks",
  },
  {
    slug: "neon-spectrum",
    title: "Neon Spectrum",
    subtitle: "Experimental gradients and visual motion toolkit.",
    stack: ["Canvas", "TypeScript", "WebGL"],
    date: "2025-03-21",
    role: "Creative Developer",
    duration: "3 weeks",
  },
  {
    slug: "flux-terrain",
    title: "Flux Terrain",
    subtitle: "Procedural visual field rendered for product hero use.",
    stack: ["Three.js", "TypeScript", "GLSL"],
    date: "2025-02-15",
    role: "SDE",
    duration: "4 weeks",
  },
  {
    slug: "desk-display",
    title: "Desk Display",
    subtitle: "Home assistant shell with multimodal card widgets.",
    stack: ["React", "TypeScript", "Next.js", "tRPC"],
    date: "2025-01-28",
    role: "Full Stack Engineer",
    duration: "6 weeks",
  },
];

function buildSections(project: ProjectSeed): ProjectSection[] {
  return [
    {
      id: "problem",
      title: "Problem Statement",
      paragraphs: [
        `${project.title} started from a practical gap: teams needed a polished experience, but the existing implementation was difficult to scale and maintain without visual regressions.`,
        "The old flow also introduced friction in handoffs because design decisions were not mapped to predictable, reusable UI primitives.",
      ],
    },
    {
      id: "solution",
      title: "Solution",
      paragraphs: [
        "I structured the UI and logic around reusable components, stable data contracts, and predictable state transitions so both feature development and iteration speed improved.",
        "The result was a cleaner architecture that made future enhancements and content updates straightforward.",
      ],
      bullets: [
        "Extracted reusable feature primitives and shared patterns",
        "Standardized section-level data model for dynamic rendering",
        "Reduced visual drift with constrained component APIs",
      ],
    },
    {
      id: "implementation",
      title: "What I Did",
      paragraphs: [
        "Implemented the primary frontend architecture, authored component contracts, and connected page-level rendering to dynamic, slug-based project data.",
        "Focused on performance and maintainability by keeping components composable and separating presentation from content sources.",
      ],
      bullets: [
        "Built route-level dynamic project pages",
        "Designed responsive layout with content + metadata sidebar",
        "Created reusable project-specific navbar and hero modules",
      ],
    },
    {
      id: "impact",
      title: "Outcome",
      paragraphs: [
        "The project page now supports a CMS-ready content flow while preserving a developer-focused narrative structure.",
        "New projects can be added with minimal code changes by extending data objects rather than creating new page templates.",
      ],
    },
  ];
}

export const projects: Project[] = projectSeeds.map((project) => ({
  ...project,
  sections: buildSections(project),
}));

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs() {
  return projects.map((project) => project.slug);
}
