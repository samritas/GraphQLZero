export function todosCompletionPercent(
  totalAll: number | null,
  totalCompleted: number | null,
): number | null {
  if (totalAll == null || totalAll <= 0 || totalCompleted == null) return null;
  return Math.round((totalCompleted / totalAll) * 100);
}

export function todosPendingSharePercent(
  totalAll: number | null,
  totalPending: number | null,
): number | null {
  if (totalAll == null || totalAll <= 0 || totalPending == null) return null;
  return Math.round((totalPending / totalAll) * 100);
}

/** Display metric derived from posts/comments meta (illustrative latency). */
export function todosEstimatedAvgResponseMs(
  postsTotal: number | null,
  commentsTotal: number | null,
): number | null {
  if (postsTotal == null || postsTotal <= 0 || commentsTotal == null) return null;
  return Math.round((commentsTotal / postsTotal) * 25);
}
