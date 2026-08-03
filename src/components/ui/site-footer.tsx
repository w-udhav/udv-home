import { Icon } from "@iconify/react";
import SectionView from "@/components/ui/section-view";
import { links } from "@/utils/constants";
import LinkButton from "./link-button";

type FooterLink = {
  id: string;
  label: string;
  href: string;
  external?: boolean;
};

const footerLinks: FooterLink[] = [
  { id: "email", label: "email", href: `mailto:${links.email}` },
  { id: "github", label: "github", href: links.github, external: true },
  { id: "linkedin", label: "linkedIn", href: links.linkedin, external: true },
  { id: "twitter", label: "twitter", href: links.twitter, external: true },
  {
    id: "instagram",
    label: "instagram",
    href: links.instagram,
    external: true,
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative py-10">
      <SectionView className="relative">
        <div className="flex flex-wrap items-center gap-1">
          <LinkButton
            href="/"
            aria-label="home"
            className="group"
            startIcon={
              <Icon
                icon="material-symbols-light:home-rounded"
                width={24}
                height={24}
                className="transition-transform duration-300 group-hover:scale-105"
              />
            }
          />

          {footerLinks.map((item) => (
            <LinkButton
              key={item.id}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="capitalize"
            >
              {item.label}
            </LinkButton>
          ))}
        </div>
      </SectionView>
    </footer>
  );
}
