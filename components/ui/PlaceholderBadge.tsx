export function PlaceholderBadge({
  children = "Placeholder",
}: {
  children?: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-ink-muted bg-surface border border-line px-2 py-0.5 rounded">
      {children}
    </span>
  );
}