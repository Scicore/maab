import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Card({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "bg-white border border-line rounded-lg p-6 sm:p-7 shadow-card",
        interactive &&
          "transition-all duration-300 hover:shadow-elevated hover:-translate-y-0.5 hover:border-navy-200",
        className
      )}
    >
      {children}
    </div>
  );
}