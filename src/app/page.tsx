"use client";

import { useState } from "react";
import FolderNav from "@/components/folder-nav";
import { about, links, notes, writings } from "@/utils/constants";

export default function Home() {
  const [longBio, setLongBio] = useState(false);

  return (
    <main id="top" className="page-atmosphere min-h-dvh pb-44">
      <div className="mx-auto flex max-w-2xl flex-col gap-14 px-6 pt-16 sm:px-8 sm:pt-20">
        <header>
          <h1 className="type-heading">{about.handle}</h1>
          <p className="type-caption mt-3 max-w-md">{about.title}</p>
        </header>

        <section aria-labelledby="bio-heading">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h2 id="bio-heading" className="type-caption">
              Bio
            </h2>
            <fieldset
              aria-label="Bio length"
              className="m-0 inline-flex rounded-full border-0 bg-surface p-0.5 ring-1 ring-border"
            >
              <button
                type="button"
                onClick={() => setLongBio(false)}
                className={`rounded-full px-3 py-1 type-caption transition-colors ${
                  !longBio
                    ? "bg-surface-elevated text-foreground shadow-sm"
                    : "hover:text-foreground"
                }`}
              >
                Default
              </button>
              <button
                type="button"
                onClick={() => setLongBio(true)}
                className={`rounded-full px-3 py-1 type-caption transition-colors ${
                  longBio
                    ? "bg-surface-elevated text-foreground shadow-sm"
                    : "hover:text-foreground"
                }`}
              >
                Long
              </button>
            </fieldset>
          </div>
          <p className="type-body">
            {longBio ? about.bioLong : about.bioShort}
          </p>
        </section>

        <section id="notes" aria-labelledby="notes-heading">
          <h2 id="notes-heading" className="type-subheading">
            Notes
          </h2>
          <ul className="mt-5 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {notes.map((note) => (
              <li key={note.title}>
                <a href={note.href} className="accent-underline type-body">
                  {note.title}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="writing" aria-labelledby="writing-heading">
          <h2 id="writing-heading" className="type-subheading">
            Writing
          </h2>
          <ul className="mt-5 divide-y divide-separator border-y border-separator">
            {writings.map((entry) => (
              <li key={entry.title}>
                <a
                  href={entry.href}
                  className="group flex items-baseline justify-between gap-6 py-3.5"
                >
                  <span className="type-body transition-colors group-hover:text-accent">
                    {entry.title}
                  </span>
                  <time className="type-caption shrink-0">{entry.date}</time>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <footer className="flex flex-wrap gap-x-5 gap-y-2">
          <a
            href={`mailto:${links.email}`}
            className="type-caption hover:text-foreground"
          >
            Email
          </a>
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="type-caption hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="type-caption hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href={links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="type-caption hover:text-foreground"
          >
            X
          </a>
        </footer>
      </div>

      <FolderNav />
    </main>
  );
}
