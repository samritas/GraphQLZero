"use client";

import { useQuery } from "@apollo/client/react";
import {
  ChevronRight,
  FileText,
  Image,
  Images,
  LayoutDashboard,
  ListTodo,
  Loader2,
  MessageSquare,
  Users,
} from "lucide-react";
import Link from "next/link";
import { QueryErrorPanel } from "@/components/ui/query-error-panel";
import { UsersTopMetricCard } from "@/components/ui/users-top-metric-card";
import {
  GET_DASHBOARD_OVERVIEW,
  type DashboardOverviewQueryResult,
} from "@/graphql/queries/dashboard";
import { getErrorMessage } from "@/lib/get-error-message";

type DashboardMetaKey = Exclude<keyof DashboardOverviewQueryResult, "recentPosts">;

function metaCount(data: DashboardOverviewQueryResult | undefined, key: DashboardMetaKey) {
  return data?.[key]?.meta?.totalCount ?? null;
}

function formatRatio(numerator: number, denominator: number): string | null {
  if (denominator <= 0 || !Number.isFinite(numerator) || !Number.isFinite(denominator)) return null;
  const r = numerator / denominator;
  if (!Number.isFinite(r)) return null;
  return r >= 10 ? r.toFixed(1) : r.toFixed(2);
}

const destinations: {
  label: string;
  description: string;
  href: string;
  icon: typeof Users;
}[] = [
  {
    label: "Users",
    description: "Directory, roles, and curator tools",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    label: "Posts",
    description: "Editorial feed and author filters",
    href: "/dashboard/posts",
    icon: FileText,
  },
  {
    label: "Comments",
    description: "Moderation and post associations",
    href: "/dashboard/comments",
    icon: MessageSquare,
  },
  {
    label: "Albums",
    description: "Collections and storage insights",
    href: "/dashboard/albums",
    icon: Images,
  },
  {
    label: "Photos",
    description: "Library, albums, and thumbnails",
    href: "/dashboard/photos",
    icon: Image,
  },
  {
    label: "Todos",
    description: "Tasks, completion filters, charts",
    href: "/dashboard/todos",
    icon: ListTodo,
  },
];

export function DashboardHome() {
  const { data, loading, error, refetch } = useQuery<DashboardOverviewQueryResult>(
    GET_DASHBOARD_OVERVIEW,
    { notifyOnNetworkStatusChange: true },
  );

  const isRefetching = loading && Boolean(data);

  const totalUsers = metaCount(data, "users");
  const totalPosts = metaCount(data, "posts");
  const totalComments = metaCount(data, "comments");
  const totalAlbums = metaCount(data, "albums");
  const totalPhotos = metaCount(data, "photos");
  const totalTodos = metaCount(data, "todos");
  const pendingTodos = metaCount(data, "todosPending");

  const recentPosts = data?.recentPosts?.data ?? [];

  const postsPerUser = formatRatio(totalPosts ?? 0, totalUsers ?? 0);
  const commentsPerPost = formatRatio(totalComments ?? 0, totalPosts ?? 0);
  const commentsPerUser = formatRatio(totalComments ?? 0, totalUsers ?? 0);
  const photosPerAlbum = formatRatio(totalPhotos ?? 0, totalAlbums ?? 0);
  const photosPerUser = formatRatio(totalPhotos ?? 0, totalUsers ?? 0);

  const completedTodos =
    totalTodos != null && pendingTodos != null ? Math.max(0, totalTodos - pendingTodos) : null;

  const showPlaceholder = loading && !data;

  const formatCount = (n: number | null) => {
    if (showPlaceholder && n == null) return "…";
    if (n == null) return "—";
    return n.toLocaleString();
  };

  const usersHelper =
    totalPosts != null && postsPerUser != null
      ? `${totalPosts.toLocaleString()} posts · ${postsPerUser} avg / user`
      : totalPosts != null
        ? `${totalPosts.toLocaleString()} posts in network`
        : undefined;

  const postsHelper =
    totalComments != null && commentsPerPost != null
      ? `${totalComments.toLocaleString()} comments · ${commentsPerPost} avg / post`
      : totalComments != null
        ? `${totalComments.toLocaleString()} comments`
        : undefined;

  const commentsHelper =
    totalPosts != null && commentsPerUser != null
      ? `${totalPosts.toLocaleString()} posts · ${commentsPerUser} comments / user`
      : totalPosts != null
        ? `Across ${totalPosts.toLocaleString()} posts`
        : undefined;

  const albumsHelper =
    totalPhotos != null && photosPerAlbum != null
      ? `${totalPhotos.toLocaleString()} photos · ${photosPerAlbum} avg / album`
      : totalPhotos != null
        ? `${totalPhotos.toLocaleString()} photos catalogued`
        : undefined;

  const photosHelper =
    totalAlbums != null && photosPerUser != null
      ? `${totalAlbums.toLocaleString()} albums · ${photosPerUser} photos / user`
      : totalAlbums != null
        ? `Stored across ${totalAlbums.toLocaleString()} albums`
        : undefined;

  const todosAccent =
    pendingTodos != null && !showPlaceholder ? `${pendingTodos.toLocaleString()} open` : undefined;

  const todosHelper =
    completedTodos != null && totalTodos != null
      ? `${completedTodos.toLocaleString()} completed · ${totalTodos.toLocaleString()} total`
      : undefined;

  const destinationCounts: Record<string, number | null> = {
    "/dashboard/users": totalUsers,
    "/dashboard/posts": totalPosts,
    "/dashboard/comments": totalComments,
    "/dashboard/albums": totalAlbums,
    "/dashboard/photos": totalPhotos,
    "/dashboard/todos": totalTodos,
  };

  return (
    <section className="font-inter px-6 py-8 lg:px-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs text-[#94a3b8]">
            Console <span className="text-[#0053DB]">› Overview</span>
          </p>
          <h1 className="font-title mt-1.5 text-[30px] font-bold leading-tight tracking-tight text-[#2A3439]">
            Dashboard
          </h1>
          <p className="mt-2 max-w-3xl text-[16px] leading-relaxed text-[#64748b]">
            Live counts from GraphQLZero: users, content, media, and tasks in one place. Jump into
            any workspace below—every figure updates from the API.
          </p>
        </div>
        {isRefetching ? (
          <p className="flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-[#64748b] sm:pt-6">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-[#0053DB]" aria-hidden />
            Refreshing…
          </p>
        ) : null}
      </div>

      {error ? (
        <QueryErrorPanel
          title="Could not load dashboard"
          message={getErrorMessage(error)}
          onRetry={() => void refetch()}
        />
      ) : null}

      {!error ? (
        <>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <UsersTopMetricCard
              icon={<Users className="h-4 w-4" strokeWidth={1.9} />}
              title="Users"
              value={formatCount(totalUsers)}
              helper={usersHelper}
            />
            <UsersTopMetricCard
              icon={<FileText className="h-4 w-4" strokeWidth={1.9} />}
              title="Posts"
              value={formatCount(totalPosts)}
              helper={postsHelper}
            />
            <UsersTopMetricCard
              icon={<MessageSquare className="h-4 w-4" strokeWidth={1.9} />}
              title="Comments"
              value={formatCount(totalComments)}
              helper={commentsHelper}
            />
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <UsersTopMetricCard
              icon={<Images className="h-4 w-4" strokeWidth={1.9} />}
              title="Albums"
              value={formatCount(totalAlbums)}
              helper={albumsHelper}
              tone="entity"
            />
            <UsersTopMetricCard
              icon={<Image className="h-4 w-4" strokeWidth={1.9} />}
              title="Photos"
              value={formatCount(totalPhotos)}
              helper={photosHelper}
            />
            <UsersTopMetricCard
              icon={<ListTodo className="h-4 w-4" strokeWidth={1.9} />}
              title="Todos"
              value={formatCount(totalTodos)}
              accent={todosAccent}
              helper={todosHelper}
            />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div>
              <h2 className="font-title text-lg font-bold tracking-tight text-[#2A3439]">
                Workspaces
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-[#64748b]">
                Open any module; counts shown here mirror the sidebar destinations.
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {destinations.map((d) => {
                  const Icon = d.icon;
                  const count = destinationCounts[d.href];
                  const countLabel =
                    showPlaceholder && count == null ? "…" : count != null ? count.toLocaleString() : "—";
                  return (
                    <li key={d.href}>
                      <Link
                        href={d.href}
                        className="group flex items-start gap-3 rounded-xl border border-[#e2e8f0] bg-white p-4 shadow-sm transition hover:border-[#0b57d0]/35 hover:shadow-md"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eef2ff] text-[#0053DB] transition group-hover:bg-[#0053DB]/10">
                          <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-start justify-between gap-2">
                            <span className="font-semibold text-[#1f2937]">{d.label}</span>
                            <span className="shrink-0 text-xs font-bold tabular-nums text-[#0053DB]">
                              {countLabel}
                            </span>
                          </span>
                          <span className="mt-0.5 block text-xs leading-snug text-[#64748b]">
                            {d.description}
                          </span>
                        </span>
                        <ChevronRight
                          className="h-5 w-5 shrink-0 text-[#94a3b8] transition group-hover:translate-x-0.5 group-hover:text-[#0053DB]"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex min-h-0 flex-col">
              <div className="flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5 text-[#0053DB]" strokeWidth={1.75} aria-hidden />
                <h2 className="font-title text-lg font-bold tracking-tight text-[#2A3439]">
                  Latest posts
                </h2>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-[#64748b]">
                Newest rows returned by the API (page 1). Titles link to the posts workspace.
              </p>
              <div className="mt-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-[#e2e8f0] bg-white shadow-sm">
                {showPlaceholder ? (
                  <div className="flex flex-1 items-center justify-center py-16 text-sm text-[#64748b]">
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin text-[#0053DB]" aria-hidden />
                      Loading feed…
                    </span>
                  </div>
                ) : recentPosts.length === 0 ? (
                  <div className="flex flex-1 flex-col justify-center px-5 py-12 text-center">
                    <p className="text-sm font-medium text-[#1f2937]">No posts yet</p>
                    <p className="mt-1 text-xs text-[#64748b]">The API returned an empty list.</p>
                  </div>
                ) : (
                  <ul className="divide-y divide-[#f1f5f9]">
                    {recentPosts.map((post) => (
                      <li key={post.id}>
                        <Link
                          href="/dashboard/posts"
                          className="flex gap-3 px-4 py-3 transition hover:bg-[#f8fafc]"
                        >
                          <span className="min-w-0 flex-1">
                            <span className="line-clamp-2 text-sm font-medium text-[#1f2937]">
                              {post.title}
                            </span>
                            <span className="mt-0.5 block text-xs text-[#64748b]">
                              {post.user?.name?.trim() ? `By ${post.user.name}` : "Unknown author"}
                            </span>
                          </span>
                          <ChevronRight
                            className="h-4 w-4 shrink-0 self-center text-[#cbd5e1]"
                            aria-hidden
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="border-t border-[#f1f5f9] bg-[#f8fafc] px-4 py-3">
                  <Link
                    href="/dashboard/posts"
                    className="text-xs font-semibold text-[#0053DB] transition hover:underline"
                  >
                    View all posts →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}
