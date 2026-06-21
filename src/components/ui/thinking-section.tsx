import SectionView from "@/components/ui/section-view";

const thinkingItems = [
  {
    id: "questions",
    title: "Questions.",
    description:
      "I write to unpack hard product and engineering questions before jumping into implementation.",
  },
  {
    id: "ideas",
    title: "Ideas.",
    description:
      "Early ideas become concrete through small notes, sketches, and technical tradeoff explorations.",
  },
  {
    id: "problems",
    title: "Problems.",
    description:
      "Most entries are practical problem breakdowns from real builds and decisions made under constraints.",
  },
];

export default function ThinkingSection() {
  return (
    <SectionView id="thinking" className="flex flex-col gap-10 py-24">
      <div className="flex flex-col gap-4">
        <h2 className="font-serif text-6xl leading-none text-zinc-100">
          Thinking
        </h2>
        <p className="max-w-3xl font-secondary text-xl leading-relaxed text-zinc-200">
          Questions. Ideas. Problems.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {thinkingItems.map((item) => (
          <article
            key={item.id}
            className="rounded-xl bg-surface-900 p-6 transition-colors duration-200 hover:bg-surface-800"
          >
            <h3 className="font-serif text-3xl text-zinc-100">{item.title}</h3>
            <p className="mt-4 font-secondary text-sm leading-relaxed text-zinc-300">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </SectionView>
  );
}
