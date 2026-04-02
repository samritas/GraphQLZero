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

/** Users directory table (`users-overview` grid). */
export const USERS_TABLE_HEADERS = [
  "ID",
  "Curator / Username",
  "Contact Points",
  "Website",
  "Affiliation & Locale",
  "Engagement",
] as const;

export const USERS_TABLE_GRID =
  "56px minmax(0,1.2fr) minmax(0,1.15fr) minmax(0,0.75fr) minmax(0,1fr) minmax(0,0.8fr)" as const;

export const USERS_DEFAULT_PAGE_SIZE = POSTS_DEFAULT_PAGE_SIZE;

/** Directory search debounce (same cadence as posts title search). */
export const USERS_SEARCH_DEBOUNCE_MS = POSTS_TITLE_SEARCH_DEBOUNCE_MS;

/** Role tabs on the users directory toolbar (IDs are `UsersRoleFilter` in `graphql/queries/users`). */
export const USERS_ROLE_TABS = [
  { id: "all", label: "All Roles" },
  { id: "admins", label: "Admins" },
  { id: "editors", label: "Editors" },
] as const;

/** Todos overview table (aligned with `todos-overview` grid). */
export const TODOS_TABLE_HEADERS = [
  "ID",
  "Title",
  "User ID",
  "Status",
  "Actions",
] as const;

export const TODOS_TABLE_GRID =
  "56px minmax(0,1.25fr) minmax(0,0.65fr) minmax(0,0.85fr) 44px" as const;

export const TODOS_DEFAULT_PAGE_SIZE = POSTS_DEFAULT_PAGE_SIZE;

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

/** Column labels for the comments overview table. */
export const COMMENTS_TABLE_HEADERS = [
  "ID",
  "AUTHOR",
  "EMAIL ADDRESS",
  "EXCERPT",
] as const;

/** Grid template aligned with the comments table layout. */
export const COMMENTS_TABLE_GRID =
  "90px minmax(0,1fr) minmax(0,1.3fr) minmax(0,1.7fr)" as const;

export const COMMENTS_DEFAULT_PAGE_SIZE = POSTS_DEFAULT_PAGE_SIZE;

export const COMMENTS_SEARCH_DEBOUNCE_MS = POSTS_TITLE_SEARCH_DEBOUNCE_MS;

/** Target length for excerpt column (ellipsis added when truncated). */
export const COMMENTS_EXCERPT_MAX_LENGTH = 56;

/** Posts listed in the comments sidebar “Post association” control. */
export const COMMENTS_POST_ASSOCIATION_PAGE = {
  page: 1,
  limit: 100,
} as const;

/** Sample size for sidebar “sentiment” (share of longer bodies). */
export const COMMENTS_SIDEBAR_SAMPLE_LIMIT = 100;

/** Body length at or above this counts as “substantive” for the sentiment stat. */
export const COMMENTS_SUBSTANTIVE_BODY_MIN_CHARS = 100;

/** Fetch window for Unread/Flagged tabs (GraphQLZero has ≤500 comments). */
export const COMMENTS_BULK_FETCH_LIMIT = 500;

/** localStorage keys for inbox filters (API has no read/flag fields). */
export const COMMENTS_READ_IDS_STORAGE_KEY = "graphqlzero.comments.readIds";
export const COMMENTS_FLAGGED_IDS_STORAGE_KEY = "graphqlzero.comments.flaggedIds";

export const COMMENTS_DATE_RANGE_OPTIONS = [
  { id: "24h", label: "Last 24 Hours" },
  { id: "7d", label: "Last 7 Days" },
  { id: "custom", label: "Custom Range" },
] as const;

export type CommentsDatePreset =
  (typeof COMMENTS_DATE_RANGE_OPTIONS)[number]["id"];

export type CommentsInboxTab = "all" | "unread" | "flagged";
