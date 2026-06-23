import SectionView from "@/components/ui/section-view";

type ElsewhereItem = {
  id: string;
  title: string;
  meta: string;
  icon: "square" | "cube" | "wave" | "eye" | "dots";
};

const elsewhereItems: ElsewhereItem[] = [
  {
    id: "conversational-ui",
    title: "Conversational UI",
    meta: "UX Tokyo, Awwwards",
    icon: "square",
  },
  {
    id: "designing-for-attention",
    title: "Designing for attention",
    meta: "Wix Tel-Aviv, UX Salon",
    icon: "eye",
  },
  {
    id: "meaningful-motion",
    title: "Meaningful Motion",
    meta: "Amuse, Awwwards, Push",
    icon: "cube",
  },
  {
    id: "designing-choice",
    title: "Designing choice",
    meta: "Push 16, Amuse, Web Expo",
    icon: "dots",
  },
  {
    id: "rethinking-content",
    title: "Rethinking Content Creation",
    meta: "Amuse, Awwwards",
    icon: "wave",
  },
];

function TalkIcon({ icon }: { icon: ElsewhereItem["icon"] }) {
  if (icon === "square") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden className="h-8 w-8 text-zinc-100/85">
        <title>Square talk icon</title>
        <rect
          x="9"
          y="10"
          width="42"
          height="42"
          rx="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="52" cy="52" r="8" fill="var(--color-primary-blue-100)" />
      </svg>
    );
  }

  if (icon === "cube") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden className="h-8 w-8 text-zinc-100/85">
        <title>Cube talk icon</title>
        <path
          d="M12 24 28 10h24v24L36 48H12Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M28 10v24M12 24h24M36 24h16"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="23"
          y="24"
          width="18"
          height="18"
          fill="var(--color-primary-blue-100)"
        />
      </svg>
    );
  }

  if (icon === "eye") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden className="h-8 w-8 text-zinc-100/9">
        <title>Eye talk icon</title>
        <path
          d="M6 32c7-9 15-14 26-14s19 5 26 14c-7 9-15 14-26 14S13 41 6 32Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="32" cy="32" r="7" fill="var(--color-primary-blue-100)" />
      </svg>
    );
  }

  if (icon === "dots") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden className="h-8 w-8 text-zinc-100/9">
        <title>Dots talk icon</title>
        <circle
          cx="32"
          cy="16"
          r="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="32"
          cy="32"
          r="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="32"
          cy="48"
          r="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden className="h-8 w-8 text-zinc-100/9">
      <title>Wave talk icon</title>
      <path
        d="M12 50V14m0 18c9 0 10-10 20-10s11 20 20 20 10-12 10-20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M12 50V14"
        stroke="var(--color-primary-blue-100)"
        strokeWidth="3"
      />
    </svg>
  );
}

export default function ElsewhereSection() {
  return (
    <SectionView
      id="elsewhere"
      className="surface-grid-lines py-24 [--grid-line-opacity:5%]"
    >
      <div className="flex flex-col gap-4">
        <h2 className="font-serif text-6xl leading-none text-zinc-100">
          Speak
        </h2>
        <p className="max-w-4xl font-secondary text-2xl leading-relaxed text-zinc-200">
          I&apos;m passionate about sharing knowledge and meeting new people.
          I&apos;ve had the opportunity to share ideas at various events around
          the globe.
        </p>
      </div>

      <div className="mt-14 grid gap-x-8 gap-y-4 md:grid-cols-2">
        {elsewhereItems.map((item) => (
          <article
            key={item.id}
            className="grid grid-cols-[8.75rem_1fr] items-center gap-5"
          >
            <div className="flex h-20 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-surface-900 to-[#0b0f1a]">
              <TalkIcon icon={item.icon} />
            </div>
            <div>
              <h3 className="font-secondary text-[1.45rem] leading-tight text-zinc-100">
                {item.title}
              </h3>
              <p className="mt-2 font-secondary text-[1.05rem] text-zinc-500">
                {item.meta}
              </p>
            </div>
          </article>
        ))}
      </div>
    </SectionView>
  );
}
