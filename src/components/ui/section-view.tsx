import clsx from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type SectionViewProps = ComponentPropsWithoutRef<"section"> & {
  fullView?: boolean;
  children?: ReactNode;
};

export default function SectionView({
  fullView = false,
  className,
  children,
  ...sectionProps
}: SectionViewProps) {
  return (
    <section
      {...sectionProps}
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
