import clsx from "clsx";
import type { ReactNode } from "react";

type SectionViewProps = {
  fullView?: boolean;
  className?: string;
  children?: ReactNode;
};

export default function SectionView({
  fullView = false,
  className,
  children,
}: SectionViewProps) {
  return (
    <section
      className={clsx({
        "w-full": fullView,
        "grid grid-cols-10": !fullView,
      })}
    >
      <div
        className={clsx(
          {
            "w-full": fullView,
            "col-span-6 col-start-3": !fullView,
          },
          className,
        )}
      >
        {children}
      </div>
    </section>
  );
}
