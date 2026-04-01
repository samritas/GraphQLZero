/** Truncate comment body for table excerpt column. */
export function excerptCommentBody(body: string, maxLen: number): string {
  const singleLine = body.replace(/\s+/g, " ").trim();
  if (singleLine.length <= maxLen) return singleLine;
  return `${singleLine.slice(0, maxLen).trimEnd()}…`;
}

export function formatCommentId(id: string): string {
  return `#${id}`;
}

/** Short author-style label from email local-part (`name` from API is often a title). */
export function authorDisplayFromEmail(email: string, fallbackName: string): string {
  const local = email.split("@")[0]?.trim();
  if (!local) return fallbackName;
  const parts = local.split(/[._-]+/).filter(Boolean);
  if (parts.length === 0) return fallbackName;
  return parts
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    .join(" ");
}

export function avgCommentsPerPostDisplay(
  commentsTotal: number | null | undefined,
  postsTotal: number | null | undefined,
): string {
  if (commentsTotal == null || postsTotal == null || postsTotal < 1) return "—";
  return (commentsTotal / postsTotal).toFixed(1);
}

export function substantiveSharePercent(
  bodies: Array<{ body: string }>,
  minChars: number,
): string {
  if (bodies.length === 0) return "—";
  let n = 0;
  for (const { body } of bodies) {
    if (body.replace(/\s+/g, "").length >= minChars) n += 1;
  }
  return `${Math.round((100 * n) / bodies.length)}%`;
}
