import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "tight" | "wide";
}) {
  const sizes = {
    tight: "container-tight",
    default: "container",
    wide: "container-wide",
  };
  return <div className={cn(sizes[size], className)}>{children}</div>;
}