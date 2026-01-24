import Link from "next/link";
import type * as React from "react";

type ButtonVariant = "primary" | "secondary" | "soft";

const baseClasses =
  "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-colors";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-foreground text-background hover:bg-zinc-800 dark:hover:bg-zinc-200",
  secondary:
    "border border-black/10 text-foreground hover:border-black/20 hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10",
  soft: "bg-black/5 text-foreground hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20",
};

type ButtonBaseProps = {
  variant?: ButtonVariant;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsAnchor = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const cx = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(" ");

const isExternalHref = (href: string) =>
  href.startsWith("http") ||
  href.startsWith("mailto:") ||
  href.startsWith("tel:");

export function Button(props: ButtonProps) {
  const { variant = "primary", className } = props;
  const classes = cx(baseClasses, variantClasses[variant], className);

  if (typeof props.href === "string") {
    const {
      href,
      variant: _variant,
      className: _className,
      ...anchorProps
    } = props;

    if (isExternalHref(href)) {
      return <a className={classes} href={href} {...anchorProps} />;
    }

    return <Link className={classes} href={href} {...anchorProps} />;
  }

  const {
    type,
    variant: _variant,
    className: _className,
    ...buttonProps
  } = props;

  return (
    <button className={classes} type={type ?? "button"} {...buttonProps} />
  );
}
