import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Container } from "./Container";

export function Section({
  children,
  className,
  containerSize = "default",
  id,
}: {
  children: ReactNode;
  className?: string;
  containerSize?: "default" | "tight" | "wide";
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-28", className)}>
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "eyebrow-line text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-4",
            align === "center" && "inline-block"
          )}
        >
          {eyebrow}
        </div>
      )}
      <h2 className="text-h2 mb-4">{title}</h2>
      {description && (
        <p className="text-ink-soft text-lg leading-relaxed">{description}</p>
      )}
    </div>
  );
}