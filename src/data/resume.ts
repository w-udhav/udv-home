/**
 * Canonical career content for this site.
 * Source of truth: /resume-engine profile (FROZEN 2026-08-30).
 * Copied here so udv-home stays independent. Do not invent facts.
 */

export const identity = {
  name: "Udhav Wadhawan",
  handle: "@udhav",
  title: "Software Engineer",
  phone: "+91 7347542936",
  email: "udhavwadhawan@hotmail.com",
  portfolio: "https://www.udhv.space/",
  linkedin: "https://linkedin.com/in/w-udhav",
  github: "https://github.com/w-udhav",
  twitter: "https://x.com/angerastra",
  instagram: "https://www.instagram.com/w_udhav/",
};

export const education = {
  institution: "Chitkara University",
  location: "Punjab, India",
  degree: "B.E. Computer Science & Engineering",
  dates: "2021 – 2025",
};

export const bio = {
  short:
    "Software engineer. I design and build product interfaces and the systems underneath them — currently at Orbitaim, previously at Wendor.",
  long: [
    "I work across product UI and backend systems: React and Next.js on the surface, Node, SQL, and infrastructure underneath. The through-line is making software feel native the first time someone uses it.",
    "At Orbitaim I am a Software Developer Engineer on a pre-launch B2B outreach platform — bulk email, dashboard UI, CMS, and production readiness. Before that, at Wendor, I spent my time on dashboard and API performance for a vending inventory product.",
    "This site is a quiet home for selected work, employment history, and experiments. Reach me by email or LinkedIn.",
  ],
};

export const skills = {
  languages: ["TypeScript", "JavaScript", "SQL"],
  frontend: ["React", "Next.js", "React Query"],
  backend: ["Node.js", "NestJS", "Express", "REST APIs"],
  data: ["PostgreSQL", "Redis", "Prisma"],
  infrastructure: ["AWS", "Docker", "GitHub Actions"],
};

export type Employment = {
  slug: string;
  company: string;
  title: string;
  dates: string;
  status: "current" | "completed";
  type: string;
  summary: string;
  bullets: string[];
  technologies: string[];
  relatedWork?: string[];
  relatedExperiments?: string[];
  notes?: string[];
};

export const employment: Employment[] = [
  {
    slug: "orbitaim",
    company: "Orbitaim",
    title: "Software Developer Engineer",
    dates: "June 2026 – Present",
    status: "current",
    type: "Full-time · small startup",
    summary:
      "AI-powered B2B marketing and sales outreach: lead prospecting, multi-channel campaigns (cold email, bulk email via SES, LinkedIn, WhatsApp), AI content, analytics, and billing. Official launch is upcoming — the product is not launched yet. Work is refactoring, business logic, UI redesign, and pre-launch production readiness on a codebase that predates me.",
    bullets: [
      "Designed and built a bulk-email microservice end to end — SES webhook ingestion, queue-based dispatch, and real-time delivery events into the campaign dashboard — integrated across the API gateway and frontend. Sole owner of the bulk-emailer service.",
      "Implemented a sending-reputation tier system (tiers 0–3) with sliding 24-hour send limits and bounce-based circuit breakers for bulk-email dispatch scheduling. Production status of this system is not confirmed.",
      "Redesigned the authenticated product dashboard with shared table and pagination primitives, design-token alignment, and rebuilt home, news, leads, and settings flows.",
      "Built a Strapi 5 headless CMS from scratch and integrated typed CMS content across the marketing site and dashboard navigation. Schema work was partly joint.",
      "Security-hardened the cold-emailer with ownership authorization middleware, admin queue protection, and an API regression gate.",
    ],
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "BullMQ",
      "Socket.IO",
      "Strapi 5",
      "AWS SES",
      "AWS S3",
      "Docker",
      "GitHub Actions",
    ],
    relatedWork: ["orbitaim"],
  },
  {
    slug: "wendor",
    company: "Wendor Innovations Pvt. Ltd.",
    title: "Software Engineer",
    dates: "June 2025 – April 2026",
    status: "completed",
    type: "Full-time",
    summary:
      "Vending-machine inventory and stock-management SaaS: React/Next.js dashboard, NestJS backend, PostgreSQL on AWS RDS. Focus was API performance, dashboard performance, read-replica routing, and inventory modules.",
    bullets: [
      "Optimized machine-status and order APIs (getAllMachineStatusV4, getAllOrdersServiceV2) by restructuring SQL — window functions, parameterized filters, and parallelized lookups — reducing response time from about 15 seconds to about 3 seconds on large datasets.",
      "Improved dashboard load time by 40–60% by rewriting analytical SQL queries, migrating the frontend data layer to React Query, removing unused queries, and separating operational vs analytical data onto dedicated pages.",
      "Routed client-facing read APIs to PostgreSQL read replicas on AWS RDS, including a separate critical-read tier for high-priority endpoints. Base replica configuration existed; rollout and the critical tier were my work.",
      "Built purchase-order receiving (PO-v2/GRN), warehouse product-ledger tracking, and snapshot-inventory workflows with PostgreSQL indexing.",
      "Led React Query adoption in the dashboard frontend and wrote team engineering guidelines for data-fetching patterns.",
    ],
    technologies: [
      "React",
      "Next.js 13",
      "TypeScript",
      "TanStack React Query",
      "NestJS 8",
      "PostgreSQL",
      "TypeORM",
      "AWS RDS",
      "EKS",
      "ECR",
      "S3",
      "Docker",
    ],
    relatedWork: ["wendor"],
    notes: [
      "Cloudflare was not used at Wendor.",
      "Materialized-view work on weekly_machine_stat was team work from before my tenure — not mine.",
      "Mobile app authorship on stock-app-production is not evidenced.",
    ],
  },
  {
    slug: "fareye",
    company: "FarEye Technologies Pvt. Ltd.",
    title: "Associate Solution Engineer Intern",
    dates: "January 2025 – June 2025",
    status: "completed",
    type: "Internship",
    summary:
      "ERP integration work over REST APIs and enterprise data-exchange workflows, in a logistics context. No repository is available for this role, so the stack beyond REST is not recorded.",
    bullets: [
      "Integrated 8+ enterprise ERP systems over REST APIs for large-scale logistics data-exchange workflows.",
      "Worked with enterprise data exchange and backend integration workflows supporting logistics operations.",
    ],
    technologies: ["REST APIs"],
  },
  {
    slug: "infosys",
    company: "Infosys",
    title: "iOS Developer Intern",
    dates: "May 2024 – June 2024",
    status: "completed",
    type: "Internship · iOS Developer Program — Cohort 1",
    summary:
      "About two months. Primary project: Hospital Management System (vena-ios + vena-server). I built the REST API nearly end-to-end, restructured the SwiftUI app into role-based modules, and stepped in mid-project as team lead of 9. Overlapped with Credanic in May 2024 — Credanic was part-time college work; Infosys was a separate internship.",
    bullets: [
      "Built the hospital management REST API nearly end-to-end: JWT role-based access, a 10-model domain schema, unified multi-role login, and an appointment engine with conflict validation.",
      "Restructured the SwiftUI app into Admin, Doctor, and Patient role-based modules. The initial Xcode boilerplate was a teammate’s — I did not build the iOS app from scratch.",
      "Stepped in mid-project as team lead of 9. The group moved from last to 2nd among participating cohort groups (program ranking).",
    ],
    technologies: [
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "JWT",
      "SwiftUI",
      "URLSession",
    ],
    relatedExperiments: ["hospital-management"],
  },
  {
    slug: "credanic",
    company: "Credanic Pvt. Ltd.",
    title: "Software Developer Engineer Intern",
    dates: "November 2023 – May 2024",
    status: "completed",
    type: "Part-time / freelance-style, during college",
    summary:
      "Part-time work during college. Tournament management for real-time matchmaking and scoring, plus API request and reliability work. Product domain beyond that, and the technology stack, are not on record.",
    bullets: [
      "Developed a tournament management module used for real-time matchmaking and scoring workflows.",
      "Optimized API request pipelining and strengthened integration reliability with structured error handling and retry mechanisms.",
    ],
    technologies: [],
  },
];

export type WorkCase = {
  slug: string;
  title: string;
  eyebrow: string;
  lede: string;
  dates: string;
  role: string;
  summary: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  technologies: string[];
  experienceSlug?: string;
};

export const workCases: WorkCase[] = [
  {
    slug: "wendor",
    title: "Wendor",
    eyebrow: "Product engineering",
    lede: "Faster APIs and a lighter dashboard for vending inventory operations.",
    dates: "June 2025 – April 2026",
    role: "Software Engineer",
    summary:
      "Wendor is a vending-machine inventory and stock-management SaaS. I worked on the dashboard and the NestJS API behind it — SQL, React Query, read replicas, and inventory receiving.",
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "Machine-status and order endpoints were slow on large datasets. The dashboard mixed operational and analytical work on the same pages, and unused queries rode along with the data that operators actually needed.",
        ],
      },
      {
        heading: "What I did",
        paragraphs: [
          "I restructured SQL on getAllMachineStatusV4 and getAllOrdersServiceV2 with window functions, parameterized filters, and parallelized lookups. Response time on those endpoints went from about 15 seconds to about 3 seconds.",
          "On the dashboard I rewrote analytical queries, migrated the data layer to React Query, removed unused queries, and split operational pages from analytical ones. Load time improved 40–60%. I also wrote team guidelines so that pattern stuck.",
          "Read traffic moved off the primary: client-facing read APIs now route to PostgreSQL replicas on AWS RDS, with a critical-read tier for high-priority endpoints. Separately I built PO-v2/GRN receiving, a warehouse product ledger, and snapshot inventory.",
        ],
      },
      {
        heading: "What I will not claim",
        paragraphs: [
          "The 15s → 3s and 40–60% figures are owner-reported; Git does not independently measure them. A weekly_machine_stat materialized view existed from before my tenure and is not my work. Cloudflare was not part of Wendor. Mobile authorship on the field-ops app is not evidenced.",
        ],
      },
    ],
    technologies: [
      "React",
      "Next.js 13",
      "TypeScript",
      "React Query",
      "NestJS",
      "PostgreSQL",
      "AWS RDS",
    ],
    experienceSlug: "wendor",
  },
  {
    slug: "orbitaim",
    title: "Orbitaim",
    eyebrow: "Current",
    lede: "Pre-launch B2B outreach — bulk email, dashboard, CMS, and production readiness.",
    dates: "June 2026 – Present",
    role: "Software Developer Engineer",
    summary:
      "Orbitaim is a small startup building an AI-powered B2B outreach platform. The official launch is upcoming; the product is not launched. The platform predates me. I own listed work: bulk email, dashboard UI, CMS integration, security hardening, and launch prep.",
    sections: [
      {
        heading: "What I own",
        paragraphs: [
          "I designed and built the bulk-email microservice end to end: SES webhook ingestion, BullMQ dispatch, Redis to Socket.IO live events, Docker, and CI/CD — then wired it through the API gateway and the campaign dashboard. I have 100% of commits on that service.",
          "The authenticated dashboard was redesigned across a series of PRs: shared table and pagination primitives, design tokens, and rebuilt home, news, leads, and settings.",
          "I built a Strapi 5 CMS from scratch and integrated typed content into the marketing site and dashboard nav. CMS schemas were partly joint with a teammate.",
        ],
      },
      {
        heading: "Systems work",
        paragraphs: [
          "A sending-reputation tier system (tiers 0–3) applies sliding 24-hour limits and bounce circuit breakers to bulk dispatch. I will not claim that system is live in production — that status is unknown.",
          "On the cold-emailer I added ownership authorization middleware, admin queue protection, and an API regression gate.",
        ],
      },
    ],
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Express",
      "Prisma",
      "PostgreSQL",
      "BullMQ",
      "Redis",
      "Socket.IO",
      "Strapi 5",
      "AWS SES",
    ],
    experienceSlug: "orbitaim",
  },
  {
    slug: "design-360",
    title: "Design 360",
    eyebrow: "Client",
    lede: "Architecture studio site and a custom Sanity studio, built end to end.",
    dates: "July 2026 – August 2026",
    role: "Sole developer",
    summary:
      "Portfolio website and content operations for Design 360, an architecture and interiors studio. Sole-built: Next.js frontend, GSAP motion, Sanity Studio, webhook cache revalidation, and editor tooling.",
    sections: [
      {
        heading: "Site",
        paragraphs: [
          "Next.js 16 App Router with dynamic category and project routes, streaming skeletons, and a GSAP motion system for the hero, project cards, and navigation. Motion respects reduced-motion preferences. A data layer maps Sanity documents through domain types with safe fallbacks.",
        ],
      },
      {
        heading: "CMS",
        paragraphs: [
          "Sanity Studio v6 with seven document types, six singletons, five custom editor inputs, and media-folder automation scripts. Publish webhooks revalidate the Next.js cache. Client name is authorized for public use. Live domain status is not confirmed — a SITE_LIVE gate exists in the codebase.",
        ],
      },
    ],
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "GSAP",
      "Sanity v6",
      "GROQ",
    ],
  },
  {
    slug: "uamore",
    title: "Uamore",
    eyebrow: "Client",
    lede: "D2C fragrance storefront with Razorpay checkout, plus an internal admin.",
    dates: "January 2025 – April 2025",
    role: "Frontend owner",
    summary:
      "E-commerce storefront and operations dashboard for Uamore, a fragrance brand. I built the React storefront (~93% of commits) and the entire admin panel. The REST backend at api.uamore.com was not mine. The current public uamore.com site appears to be Wix — I do not claim the React storefront is live there today.",
    sections: [
      {
        heading: "Storefront",
        paragraphs: [
          "React 18 and Vite SPA: home, catalog, product, cart, checkout, guest checkout, account, blogs, and policy pages. Auth and cart live in context. Axios injects a Bearer token and clears session on 401. Razorpay loads dynamically; orders can be created as guest or authenticated, then verified by signature with the backend.",
        ],
      },
      {
        heading: "Admin",
        paragraphs: [
          "Sole-built dashboard: JWT-gated routes, product and category CRUD, coupons, blog authoring, and an order overview with charts. Shipped for production use; the admin URL is internal and not listed here.",
        ],
      },
    ],
    technologies: [
      "React 18",
      "Vite",
      "Tailwind CSS",
      "Razorpay",
      "Axios",
      "NextUI",
      "Chart.js",
    ],
  },
];

export type Experiment = {
  slug: string;
  title: string;
  lede: string;
  dates?: string;
  role: string;
  summary: string;
  bullets: string[];
  technologies: string[];
  caveats?: string[];
  github?: string;
};

export const experiments: Experiment[] = [
  {
    slug: "ecommerce",
    title: "E-commerce platform",
    lede: "Storefront, admin, and a layered Express API — learning/showcase, not production scale.",
    dates: "2024, revived 2026",
    role: "Primary developer",
    summary:
      "Personal e-commerce system with three apps: shopper storefront, admin panel (products and inventory, including bulk add), and a REST API. JavaScript throughout — not TypeScript, not Prisma. Sequelize on PostgreSQL. Learning and showcase; I do not describe it as production-scale.",
    bullets: [
      "Layered Express backend: controller → service → repository, custom error hierarchy, and centralized error handling.",
      "Sequelize transactions for atomic order creation with inventory deduction. JWT with optional, user, and admin middleware.",
      "React + Vite + Tailwind storefront and admin. Known gaps: out-of-stock UI handling and rate limiting.",
    ],
    technologies: [
      "React",
      "JavaScript",
      "Vite",
      "Tailwind CSS",
      "Express",
      "PostgreSQL",
      "Sequelize",
      "JWT",
    ],
    github: "https://github.com/w-udhav/buy-sell-fullstack",
  },
  {
    slug: "crm",
    title: "Education CRM",
    lede: "Tutoring-business CRM — frontend owner, backend co-developed, maintained 2023–2026.",
    dates: "2023 – 2026",
    role: "Frontend owner; backend collaborator",
    summary:
      "CRM for an education tutoring business: student records, enrollment approvals, calendar scheduling, reviews, bulk email, and a gallery. I led the frontend (59 of 68 commits). The backend was co-developed (18 of 38 commits) — I was not the primary backend owner.",
    bullets: [
      "React admin SPA with Firebase Auth, private routes, paginated student listing, search, appointments, and communications.",
      "Backend is Express and MongoDB on Vercel serverless. I contributed comment, review, appointment, and student-schema work alongside a collaborator.",
    ],
    technologies: [
      "React",
      "JavaScript",
      "Firebase",
      "Express",
      "MongoDB",
      "Vercel",
    ],
    caveats: ["Backend was co-developed — not a solo backend claim."],
    github: "https://github.com/w-udhav/crm-edu",
  },
  {
    slug: "writopia",
    title: "Writopia",
    lede: "Solo blog platform with JWT, RBAC, and email verification.",
    dates: "January 2024",
    role: "Sole developer",
    summary:
      "Blogging platform (also referred to as Quillix): sign-up with email verification, writing, admin category management, and approval before publication. Solo-built frontend and backend over a few weeks. No deployment evidence on record.",
    bullets: [
      "Express API with JWT, bcrypt, role checks, Multer uploads, and Nodemailer verification. Models for users, posts, categories, and comments.",
      "React frontend with auth, admin, and blog route groups.",
    ],
    technologies: [
      "React",
      "Express",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Nodemailer",
    ],
  },
  {
    slug: "cyhr",
    title: "CyHr",
    lede: "SwiftUI recruitment app — models, HR features, and onboarding in a five-person team.",
    dates: "April 2024 – May 2024",
    role: "Contributor (~21% of commits)",
    summary:
      "iOS job portal for cybersecurity professionals: expert profiles, job posting and application, HR-side flows, blogs, and chat. Team of five. My work was data models and controllers, HR and expert integration, blogs, applied jobs, skills, onboarding, and documentation. CoreML candidate-fit scoring was a teammate’s — I do not claim it.",
    bullets: [
      "Models and controllers for jobs, users, experts, hiring managers, companies, and certifications.",
      "HR-side integration, blog create/post, applied-jobs, skills, and onboarding screens.",
    ],
    technologies: ["SwiftUI", "URLSession"],
    caveats: [
      "Team project. CoreML scoring is teammate work.",
      "No App Store or TestFlight evidence in the record.",
    ],
  },
  {
    slug: "hospital-management",
    title: "Hospital management system",
    lede: "Infosys internship deliverable — REST API nearly end-to-end, SwiftUI role modules.",
    dates: "May 2024 – June 2024",
    role: "Backend owner; iOS architecture",
    summary:
      "Same system as the Infosys internship. Role-based hospital app: Express and MongoDB backend, SwiftUI frontend with Admin, Doctor, and Patient modules.",
    bullets: [
      "REST API nearly end-to-end (44 of 56 backend commits): JWT/RBAC, 10 Mongoose schemas, appointment conflict validation, admin operations.",
      "SwiftUI restructured into role-based modules. Initial Xcode boilerplate was a teammate’s.",
      "Eventual team lead of 9; cohort ranking last to 2nd.",
    ],
    technologies: ["Express", "MongoDB", "Mongoose", "JWT", "SwiftUI"],
    caveats: ["Internship team project — not a solo iOS app from scratch."],
  },
];

export const landingSelectedWork = [
  "wendor",
  "orbitaim",
  "design-360",
] as const;

export function getEmployment(slug: string) {
  return employment.find((item) => item.slug === slug);
}

export function getWorkCase(slug: string) {
  return workCases.find((item) => item.slug === slug);
}

export function getExperiment(slug: string) {
  return experiments.find((item) => item.slug === slug);
}
