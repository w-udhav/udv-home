"use client";

import { useState } from "react";
import SectionCard from "@/components/section-card";
import { bio, identity } from "@/data/resume";

const links = [
  { label: "Email", href: `mailto:${identity.email}` },
  { label: "GitHub", href: identity.github },
  { label: "LinkedIn", href: identity.linkedin },
  { label: "X", href: identity.twitter },
];

export default function BioToggle() {
  const [longBio, setLongBio] = useState(false);

  return (
    <SectionCard
      id="bio-heading"
      title="Bio"
      action={
        <fieldset
          aria-label="Bio length"
          className="m-0 flex items-center gap-1 border-0 p-0"
        >
          {[false, true].map((isLong) => (
            <button
              key={String(isLong)}
              type="button"
              aria-pressed={longBio === isLong}
              onClick={() => setLongBio(isLong)}
              className={`pill ${longBio === isLong ? "pill-active" : ""}`}
            >
              {isLong ? "Long" : "Default"}
            </button>
          ))}
        </fieldset>
      }
    >
      <div className="type-body space-y-4">
        {longBio ? (
          bio.long.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))
        ) : (
          <p>{bio.short}</p>
        )}
      </div>
      <p className="mt-4 flex flex-wrap gap-1">
        {links.map((link) => {
          const external = !link.href.startsWith("mailto:");
          return (
            <a
              key={link.label}
              href={link.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="pill pill-active"
            >
              {link.label}
            </a>
          );
        })}
      </p>
    </SectionCard>
  );
}
