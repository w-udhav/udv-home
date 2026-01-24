import { cn } from "@/utils/cn";

export function Section({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) {
  const classes = cn(
    `rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5`,
  );
  return (
    <div id={id} className={classes}>
      <h2 className="font-serif text-xl">{title}</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
        {description}
      </p>
    </div>
  );
}
