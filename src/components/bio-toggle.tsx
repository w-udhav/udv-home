"use client";

import { useState } from "react";
import { bio } from "@/data/resume";

export default function BioToggle() {
  const [longBio, setLongBio] = useState(false);

  return (
    <section
      aria-labelledby="bio-heading"
      className="border-b border-separator pb-10 sm:pb-12"
    >
      <div className="mb-4 flex items-center gap-5 border-b border-separator pb-2">
        <h2 id="bio-heading" className="type-caption">
          Bio
        </h2>
        <fieldset
          aria-label="Bio length"
          className="m-0 flex items-center gap-4 border-0 p-0"
        >
          <button
            type="button"
            onClick={() => setLongBio(false)}
            className={`type-caption transition-colors ${
              !longBio
                ? "text-foreground underline decoration-foreground/35 underline-offset-[6px]"
                : "hover:text-foreground"
            }`}
          >
            Default
          </button>
          <button
            type="button"
            onClick={() => setLongBio(true)}
            className={`type-caption transition-colors ${
              longBio
                ? "text-foreground underline decoration-foreground/35 underline-offset-[6px]"
                : "hover:text-foreground"
            }`}
          >
            Long
          </button>
        </fieldset>
      </div>
      <div className="type-body space-y-4">
        {longBio ? (
          bio.long.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))
        ) : (
          <p>{bio.short}</p>
        )}
      </div>
    </section>
  );
}
