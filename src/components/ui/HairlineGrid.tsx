import type { ReactNode } from "react";

type Columns = { base: number; sm: number; lg: number };

/**
 * The hairline list pattern: dividing rules are drawn by the grid's own 1px
 * gap over a rule-coloured ground, with every cell painted opaque. That keeps
 * the rules correct at any column count, but it also means a part-filled last
 * row would show the ground as a solid block. This emits just enough opaque
 * filler cells, per breakpoint, to complete that row.
 */
export function HairlineGrid({
  columns,
  className = "",
  children,
}: {
  columns: Columns;
  className?: string;
  children: ReactNode[];
}) {
  const count = children.length;
  const missing = {
    base: (columns.base - (count % columns.base)) % columns.base,
    sm: (columns.sm - (count % columns.sm)) % columns.sm,
    lg: (columns.lg - (count % columns.lg)) % columns.lg,
  };
  const fillerCount = Math.max(missing.base, missing.sm, missing.lg);

  return (
    <div className={`hairline-grid ${className}`}>
      {children}
      {Array.from({ length: fillerCount }, (_, i) => (
        <div key={`filler-${i}`} aria-hidden="true" className={`bg-paper ${fillerClass(i, missing)}`} />
      ))}
    </div>
  );
}

/**
 * Visibility for filler `index`, written with literal class names so Tailwind
 * picks them up.
 */
function fillerClass(index: number, missing: { base: number; sm: number; lg: number }) {
  const visible = [index < missing.base, index < missing.sm, index < missing.lg];

  const classes = [visible[0] ? "block" : "hidden"];
  if (visible[1] !== visible[0]) classes.push(visible[1] ? "sm:block" : "sm:hidden");
  if (visible[2] !== visible[1]) classes.push(visible[2] ? "lg:block" : "lg:hidden");

  return classes.join(" ");
}
