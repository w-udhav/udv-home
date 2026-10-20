"use client";

import { useState } from "react";
import Section from "@/components/section";
import { bio } from "@/data/resume";

export default function BioToggle({ className }: { className?: string }) {
  const [longBio, setLongBio] = useState(false);

  return (
    <Section
      id="bio-heading"
      title="Bio"
      className={className}
      action={
        <fieldset
          aria-label="Bio length"
          className="m-0 flex items-center gap-4 border-0 p-0"
        >
          {[false, true].map((isLong) => (
            <button
              key={String(isLong)}
              type="button"
              aria-pressed={longBio === isLong}
              onClick={() => setLongBio(isLong)}
              className="text-toggle"
            >
              {isLong ? "Long" : "Short"}
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
    </Section>
  );
}
