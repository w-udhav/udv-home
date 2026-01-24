import Image from "next/image";
import avatar from "@/assets/profile.png";
import { cn } from "@/utils/cn";
import { about } from "@/utils/constants";

const baseClassParagraph = "max-w-2xl text-lg text-zinc-600 dark:text-zinc-300";

export default function Home() {
  return (
    <main className="bg-background text-foreground flex w-full min-h-dvh max-h-dvh items-end">
      <div className="flex max-w-4xl flex-col gap-5 px-4 py-4 sm:px-10">
        <header className="space-y-5">
          <Image
            src={avatar}
            alt="Udhav Wadhawan"
            width={90}
            height={90}
            className="rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h1
              className={cn(
                baseClassParagraph,
                "font-serif text-2xl! sm:text-5xl! leading-tight",
              )}
            >
              {about.name}
            </h1>
            <p className={baseClassParagraph}>{about.title}</p>
          </div>
        </header>
        <section>
          <div>
            <p className={baseClassParagraph}>
              Systems · Architecture · Product
            </p>
            <p className={baseClassParagraph}>Structure over chaos</p>
          </div>
        </section>
        <section>
          <div>
            <p className={baseClassParagraph}>
              Exploring the world of software development and architecture.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
