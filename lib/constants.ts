/** App-wide constants; group new exports by feature (e.g. posts, albums). */

/** Column labels for the posts data table (not layout/CSS). */
export const POSTS_TABLE_HEADERS = [
  "ID",
  "Content Architecture",
  "Author",
  "Interactions",
  "Actions",
] as const;

/** Default rows-per-page choices for dashboard data tables. */
export const DEFAULT_TABLE_PAGE_SIZE_OPTIONS = [10, 25, 50] as const;

/** Compact page list with ellipsis; shared by table footers. */
export const TABLE_PAGINATION = {
  maxFullRange: 7,
  nearStart: 3,
  nearEndOffset: 2,
} as const;

/** Variables for the author-filter users query. */
export const POSTS_USERS_FILTER_OPTIONS = {
  paginate: { page: 1, limit: 20 },
} as const;

export const POSTS_TITLE_SEARCH_DEBOUNCE_MS = 350;

export const POSTS_DEFAULT_PAGE_SIZE = 10;

/** How many recent posts power the frequency chart, and how many bars to emphasize. */
export const POSTS_POSTING_FREQUENCY = {
  barCount: 7,
  topHighlightCount: 2,
} as const;

export const POSTS_ROW_FALLBACKS = {
  unknownAuthor: "Unknown author",
  empty: "—",
  unknownInitials: "?",
} as const;
