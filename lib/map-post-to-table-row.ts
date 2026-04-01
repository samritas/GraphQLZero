import type { PostsDataTableRowData } from "@/components/ui/posts-data-table";
import type { PostsPage } from "@/graphql/queries/posts";
import { POSTS_ROW_FALLBACKS } from "@/lib/constants";

const AVATAR_PALETTES = [
  { initialsBg: "#dbeafe", initialsColor: "#1d4ed8" },
  { initialsBg: "#ede9fe", initialsColor: "#6d28d9" },
  { initialsBg: "#cffafe", initialsColor: "#0e7490" },
  { initialsBg: "#ffedd5", initialsColor: "#c2410c" },
] as const;

export function mapPostToTableRow(
  post: PostsPage["data"][number],
  index: number,
): PostsDataTableRowData {
  const name = post.user?.name ?? POSTS_ROW_FALLBACKS.unknownAuthor;
  const email = post.user?.email ?? POSTS_ROW_FALLBACKS.empty;
  const initials =
    name
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("")
      .slice(0, 2) || POSTS_ROW_FALLBACKS.unknownInitials;
  const palette = AVATAR_PALETTES[index % AVATAR_PALETTES.length];
  const commentTotal = post.comments?.meta?.totalCount;

  return {
    postId: String(post.id),
    id: `#${String(post.id).padStart(3, "0")}`,
    title: post.title,
    excerpt: post.body.replace(/\n/g, " ").trim(),
    author: name,
    email,
    initials,
    initialsBg: palette.initialsBg,
    initialsColor: palette.initialsColor,
    interactions:
      commentTotal != null ? String(commentTotal) : POSTS_ROW_FALLBACKS.empty,
  };
}
