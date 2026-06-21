import Image from "next/image";

type ProjectHeroProps = {
  title: string;
  subtitle: string;
  logoImageSrc?: string;
};

export default function ProjectHero({
  title,
  subtitle,
  logoImageSrc,
}: ProjectHeroProps) {
  return (
    <section className="relative flex min-h-[100svh] w-full items-end overflow-hidden border-b border-white/10 bg-black">
      {logoImageSrc ? (
        <Image
          src={logoImageSrc}
          alt={`${title} logo`}
          fill
          priority
          className="object-cover"
        />
      ) : (
        <div className="project-hero-fallback absolute inset-0" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

      <div className="relative z-10 w-full px-4 pb-10 pt-32 sm:px-8 lg:px-12 lg:pb-14">
        <h1 className="max-w-5xl font-serif text-4xl leading-[0.95] text-zinc-100 sm:text-6xl lg:text-8xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl font-secondary text-sm text-zinc-300 sm:text-base">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
