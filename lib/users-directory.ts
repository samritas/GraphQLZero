import type { UserRecord } from "@/graphql/queries/users";

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
