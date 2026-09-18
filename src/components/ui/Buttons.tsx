import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowDiagonal } from "./Icons";

type PillVariant = "ink" | "accent" | "outline" | "white";

const pillBase =
  "inline-flex items-center gap-[10px] rounded-pill px-[30px] py-4 text-[15px] font-semibold transition-colors duration-[180ms]";

const pillVariants: Record<PillVariant, string> = {
  ink: "bg-ink text-on-dark hover:bg-accent",
  accent: "bg-accent text-white hover:bg-ink",
  outline: "border border-ink text-ink hover:border-accent hover:text-accent",
  white: "bg-white text-ink hover:bg-accent hover:text-white",
};

export function PillLink({
  href,
  variant = "ink",
  withArrow = false,
  className = "",
  children,
  ...props
}: {
  href: string;
  variant?: PillVariant;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link href={href} className={`${pillBase} ${pillVariants[variant]} ${className}`} {...props}>
      {children}
      {withArrow ? <ArrowDiagonal size={16} className="shrink-0" /> : null}
    </Link>
  );
}

/** A text link with the diagonal arrow, colouring to accent on hover. */
export function ArrowLink({
  href,
  children,
  className = "",
  underline = false,
  tone = "ink",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  underline?: boolean;
  tone?: "ink" | "accent" | "on-dark";
}) {
  const tones = {
    ink: "text-ink hover:text-accent",
    accent: "text-accent hover:text-ink",
    "on-dark": "text-accent-soft hover:text-white",
  } as const;

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-[15px] font-semibold transition-colors duration-[180ms] ${
        tones[tone]
      } ${underline ? "border-b border-rule-muted pb-[3px] hover:border-accent" : ""} ${className}`}
    >
      {children}
      <ArrowDiagonal size={16} className="shrink-0" />
    </Link>
  );
}
