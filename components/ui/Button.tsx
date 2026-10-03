import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  withArrow = false,
  type,
  disabled,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-navy-900 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants: Record<Variant, string> = {
    primary: "bg-navy-900 text-white hover:bg-navy-800 shadow-sm hover:shadow-md",
    secondary:
      "bg-white text-navy-900 border border-line hover:border-navy-300 hover:bg-surface",
    outline:
      "bg-transparent text-navy-900 border border-navy-900/20 hover:border-navy-900/50",
    ghost: "text-navy-900 hover:bg-surface",
  };

  const sizes: Record<Size, string> = {
    sm: "text-sm px-4 py-2 rounded-md",
    md: "text-[0.9375rem] px-5 py-3 rounded-md",
    lg: "text-base px-6 py-3.5 rounded-md",
  };

  const cls = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} disabled={disabled} className={cls}>
      {content}
    </button>
  );
}