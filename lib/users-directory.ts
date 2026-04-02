import type { UserRecord } from "@/graphql/queries/users";

/** Local portraits when the API photo is missing or fails to load (`public/users-avatars/`). */
export const USER_TABLE_AVATAR_PLACEHOLDERS = [
  "/users-avatars/placeholder-1.jpg",
  "/users-avatars/placeholder-2.jpg",
  "/users-avatars/placeholder-3.jpg",
] as const;

function hashUserId(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (Math.imul(31, h) + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/** Deterministic placeholder per user so the same row keeps the same avatar. */
export function userAvatarPlaceholderUrl(userId: string): string {
  const i = hashUserId(userId) % USER_TABLE_AVATAR_PLACEHOLDERS.length;
  return USER_TABLE_AVATAR_PLACEHOLDERS[i];
}

/** First word = given name, remainder = family name (for two-line directory layout). */
export function userTableNameLines(fullName: string): { first: string; last: string } {
  const t = fullName.trim();
  if (!t) return { first: "—", last: "" };
  const i = t.indexOf(" ");
  if (i === -1) return { first: t, last: "" };
  return { first: t.slice(0, i), last: t.slice(i + 1).trim() };
}

/** Tailwind `bg-gradient-to-br` halves for avatar fallbacks (not hex tokens). */
export const USERS_TABLE_AVATAR_GRADIENTS = [
  "from-[#f7d4c7] to-[#8b5e3b]",
  "from-[#f6c85b] to-[#5a3a1f]",
  "from-[#f8d7c8] to-[#6b4a33]",
  "from-[#c7d2fe] to-[#4338ca]",
  "from-[#a7f3d0] to-[#047857]",
] as const;

export function userWebsiteHref(website: string): string {
  const trimmed = website.trim();
  if (!trimmed) return "#";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function userProfilePhotoUrl(user: UserRecord): string | null {
  const first = user.albums?.data?.[0]?.photos?.data?.[0];
  const thumb = first?.thumbnailUrl?.trim() || first?.url?.trim() || "";
  return thumb || null;
}

export function usersEntityConnectionsSum(
  postsTotal: number | null,
  albumsTotal: number | null,
): number | null {
  if (postsTotal == null || albumsTotal == null) return null;
  return postsTotal + albumsTotal;
}
