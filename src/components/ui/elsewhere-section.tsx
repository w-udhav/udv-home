import { Icon } from "@iconify/react";
import ButtonLikeContainer from "@/components/ui/button-like-container";
import SectionView from "@/components/ui/section-view";

type ElsewhereItem = {
  id: string;
  title: string;
  meta: string;
  icon: string;
  iconClassName?: string;
};

const elsewhereItems: ElsewhereItem[] = [
  {
    id: "conversational-ui",
    title: "Conversational UI",
    meta: "UX Tokyo, Awwwards",
    icon: "mdi:message-outline",
    iconClassName: "text-zinc-100",
  },
  {
    id: "designing-for-attention",
    title: "Designing for attention",
    meta: "Wix Tel-Aviv, UX Salon",
    icon: "mdi:eye-outline",
    iconClassName: "text-zinc-100",
  },
  {
    id: "meaningful-motion",
    title: "Meaningful Motion",
    meta: "Amuse, Awwwards, Push",
    icon: "mdi:cube-outline",
    iconClassName: "text-zinc-100",
  },
  {
    id: "designing-choice",
    title: "Designing choice",
    meta: "Push 16, Amuse, Web Expo",
    icon: "mdi:dots-vertical",
    iconClassName: "text-zinc-100",
  },
  {
    id: "rethinking-content",
    title: "Rethinking Content Creation",
    meta: "Amuse, Awwwards",
    icon: "mdi:chart-bell-curve-cumulative",
    iconClassName: "text-zinc-100",
  },
];

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
        <p className="max-w-4xl font-secondary text-xl leading-relaxed text-zinc-200">
          I&apos;m passionate about sharing knowledge and meeting new people.
          I&apos;ve had the opportunity to share ideas at various events around
          the globe.
        </p>
      </div>

      <div className="mt-14 grid gap-x-8 gap-y-4 md:grid-cols-2">
        {elsewhereItems.map((item) => (
          <article
            key={item.id}
            className="grid grid-cols-[8.75rem_1fr] items-start gap-5"
          >
            <ButtonLikeContainer
              fullCursorSurface
              data-cursor-no-text="true"
              className="cursor-merge-color-deep flex h-32 w-full items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-surface-900 to-[#0b0f1a]"
            >
              <Icon
                icon={item.icon}
                width={36}
                height={36}
                className={item.iconClassName}
              />
            </ButtonLikeContainer>
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
