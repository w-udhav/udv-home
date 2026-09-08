import { identity } from "@/data/resume";

export default function SiteFooter() {
  return (
    <footer className="flex flex-wrap gap-x-5 gap-y-2 pt-2">
      <a
        href={`mailto:${identity.email}`}
        className="type-caption hover:text-foreground"
      >
        Email
      </a>
      <a
        href={identity.github}
        target="_blank"
        rel="noopener noreferrer"
        className="type-caption hover:text-foreground"
      >
        GitHub
      </a>
      <a
        href={identity.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="type-caption hover:text-foreground"
      >
        LinkedIn
      </a>
      <a
        href={identity.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="type-caption hover:text-foreground"
      >
        X
      </a>
    </footer>
  );
}
