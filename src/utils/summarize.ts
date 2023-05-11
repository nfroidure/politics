export function summarize(content: string, limit: number): string {
  return (
    (content.length < limit
      ? content
      : content.slice(0, limit).split(/\s/).slice(0, -1).join(" ")) + "…"
  );
}
