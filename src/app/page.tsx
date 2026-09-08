"use client";

import { useState } from "react";
import FolderNav from "@/components/folder-nav";
import { about, links, notes, writings } from "@/utils/constants";

export default function Home() {
  const [longBio, setLongBio] = useState(false);

  return (
    <main id="top" className="page-atmosphere min-h-dvh pb-44">
      <div className="mx-auto w-full max-w-screen-2xl px-6 pt-14 sm:px-10 sm:pt-16 lg:px-14">
        <div className="flex max-w-3xl flex-col gap-10 sm:gap-12">
          <header>
            <h1 className="type-heading">{about.handle}</h1>
          </header>

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
                about.bioLong
                  .split("\n\n")
                  .map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))
              ) : (
                <p>{about.bioShort}</p>
              )}
            </div>
          </section>

          <section id="notes" aria-labelledby="notes-heading">
            <h2 id="notes-heading" className="type-subheading">
              Notes
            </h2>
            <ul className="mt-4 grid max-w-xl grid-cols-1 gap-x-12 gap-y-2 sm:grid-cols-2">
              {notes.map((note) => (
                <li key={note.title} className="flex items-start gap-2.5">
                  <span
                    aria-hidden
                    className="mt-[0.55em] size-1.5 shrink-0 bg-foreground-soft"
                  />
                  <a href={note.href} className="note-link type-body">
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
            <ul className="mt-4 divide-y divide-separator border-y border-separator">
              {writings.map((entry) => (
                <li key={entry.title}>
                  <a
                    href={entry.href}
                    className="group flex items-baseline justify-between gap-8 py-3"
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

          <footer className="flex flex-wrap gap-x-5 gap-y-2 pt-2">
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
      </div>

      <FolderNav />
    </main>
  );
}
