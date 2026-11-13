import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-accent text-accent-fg hover:bg-ink",
  secondary: "border border-line-strong bg-surface text-ink hover:bg-elevated",
  ghost: "bg-transparent text-ink hover:bg-line",
} as const;

export function buttonClass(variant: keyof typeof variants = "primary", className?: string) {
  return cn(
    "tap inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-4 text-sm font-medium",
    "transition-colors duration-150 ease-out",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    className,
  );
}

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof variants }) {
  return <button type={type} className={buttonClass(variant, className)} {...props} />;
}

export function Panel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("rounded-xl border border-line bg-surface p-4 transition-colors duration-200 ease-out", className)}>
      {children}
    </section>
  );
}
