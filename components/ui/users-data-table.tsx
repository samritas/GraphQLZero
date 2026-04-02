"use client";

import { Fragment } from "react";
import { Globe, Mail, Phone } from "lucide-react";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { UserRowAvatar } from "@/components/ui/user-row-avatar";
import type { UserRecord } from "@/graphql/queries/users";
import { USERS_TABLE_GRID, USERS_TABLE_HEADERS } from "@/lib/constants";
import {
  USERS_TABLE_AVATAR_GRADIENTS,
  userProfilePhotoUrl,
  userTableNameLines,
  userWebsiteHref,
} from "@/lib/users-directory";

export type UsersDataTableProps = {
  rows: UserRecord[];
  totalCount: number | null;
  page: number;
  pageSize: number;
  onPageChange: (nextPage: number) => void;
  onPageSizeChange: (nextSize: number) => void;
};

export function UsersDataTable({
  rows,
  totalCount,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: UsersDataTableProps) {
  return (
    <div className="w-full min-w-0 max-w-full">
      <div
        className="hidden bg-[#eef2f6] px-4 py-4 md:grid md:px-8"
        style={{ gridTemplateColumns: USERS_TABLE_GRID }}
      >
        {USERS_TABLE_HEADERS.map((header) => (
          <p
            key={header}
            className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6b7280]"
          >
            {header}
          </p>
        ))}
      </div>

      <div className="w-full border-b border-[#edf2f7] bg-[#eef2f6] px-4 py-3 md:hidden">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6b7280]">
          Directory
        </p>
      </div>

      {rows.map((row, index) => {
        const idLabel = `#${String(row.id).padStart(3, "0")}`;
        const affiliation = row.company?.name ?? "—";
        const locale = row.address?.city ?? "—";
        const postsCount =
          row.posts?.meta?.totalCount != null ? String(row.posts.meta.totalCount) : "—";
        const albumsCount =
          row.albums?.meta?.totalCount != null ? String(row.albums.meta.totalCount) : "—";
        const avatarBg = USERS_TABLE_AVATAR_GRADIENTS[index % USERS_TABLE_AVATAR_GRADIENTS.length];
        const photoSrc = userProfilePhotoUrl(row);
        const { first: nameFirst, last: nameLast } = userTableNameLines(row.name);
        const isLast = index === rows.length - 1;

        return (
          <Fragment key={row.id}>
            <div
              className={`hidden items-center px-4 py-4 md:grid md:px-8 ${
                isLast ? "" : "border-b border-[#edf2f7]"
              }`}
              style={{ gridTemplateColumns: USERS_TABLE_GRID }}
            >
              <p className="text-[12px] font-semibold text-[#0053DB]">{idLabel}</p>
              <div className="flex min-w-0 items-center gap-3.5">
                <UserRowAvatar
                  src={photoSrc}
                  name={row.name}
                  userId={row.id}
                  fallbackClass={avatarBg}
                />
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-bold leading-[1.2] text-[#1f2937]">
                    {nameFirst}
                  </p>
                  {nameLast ? (
                    <p className="mt-0.5 truncate text-[14px] font-bold leading-[1.2] text-[#1f2937]">
                      {nameLast}
                    </p>
                  ) : null}
                  <p className="mt-0.5 truncate text-[11px] text-[#6b7280]">{row.username}</p>
                </div>
              </div>
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 break-all text-[12px] text-[#374151]">
                  <Mail className="h-3 w-3 shrink-0 text-[#0053DB]" strokeWidth={1.8} />
                  {row.email}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-[11px] text-[#6b7280]">
                  <Phone className="h-3 w-3 shrink-0 text-[#6b7280]" strokeWidth={1.8} />
                  {row.phone}
                </p>
              </div>
              <a
                href={userWebsiteHref(row.website)}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-0 truncate text-[12px] text-[#0053DB] hover:underline"
              >
                {row.website}
              </a>
              <div className="min-w-0">
                <p className="text-[14px] font-semibold leading-[1.2] text-[#374151]">
                  {affiliation}
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-[11px] text-[#6b7280]">
                  <Globe className="h-3 w-3 shrink-0 text-[#6b7280]" strokeWidth={1.8} />
                  {locale}
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-[14px] font-bold leading-none text-[#1f2937]">{postsCount}</p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">
                    Posts
                  </p>
                </div>
                <div>
                  <p className="text-[14px] font-bold leading-none text-[#1f2937]">{albumsCount}</p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">
                    Albums
                  </p>
                </div>
              </div>
            </div>

            <article className="box-border w-full min-w-0 max-w-full border-b border-[#edf2f7] px-4 py-4 md:hidden">
              <p className="text-[12px] font-semibold text-[#0053DB]">{idLabel}</p>
              <div className="mt-2 flex w-full min-w-0 gap-3.5">
                <UserRowAvatar
                  src={photoSrc}
                  name={row.name}
                  userId={row.id}
                  fallbackClass={avatarBg}
                />
                <div className="min-w-0 flex-1">
                  <p className="break-words text-[14px] font-bold leading-snug text-[#1f2937]">
                    {nameFirst}
                  </p>
                  {nameLast ? (
                    <p className="mt-0.5 break-words text-[14px] font-bold leading-snug text-[#1f2937]">
                      {nameLast}
                    </p>
                  ) : null}
                  <p className="mt-0.5 break-words text-[11px] text-[#6b7280]">{row.username}</p>
                </div>
              </div>
              <div className="mt-3 w-full min-w-0 space-y-1.5 border-t border-[#f1f5f9] pt-3">
                <p className="flex w-full min-w-0 items-start gap-1.5 break-all text-[12px] text-[#374151]">
                  <Mail className="mt-0.5 h-3 w-3 shrink-0 text-[#0053DB]" strokeWidth={1.8} />
                  {row.email}
                </p>
                <p className="flex w-full min-w-0 items-center gap-1.5 text-[11px] text-[#6b7280]">
                  <Phone className="h-3 w-3 shrink-0 text-[#6b7280]" strokeWidth={1.8} />
                  {row.phone}
                </p>
                <a
                  href={userWebsiteHref(row.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full min-w-0 items-center gap-1 break-all text-[12px] text-[#0053DB] hover:underline"
                >
                  {row.website}
                </a>
                <div className="pt-1">
                  <p className="text-[14px] font-semibold leading-snug text-[#374151]">
                    {affiliation}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-[11px] text-[#6b7280]">
                    <Globe className="h-3 w-3 shrink-0 text-[#6b7280]" strokeWidth={1.8} />
                    {locale}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex w-full min-w-0 items-end justify-between gap-4 border-t border-[#f1f5f9] pt-3">
                <div>
                  <p className="text-[14px] font-bold leading-none text-[#1f2937]">{postsCount}</p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">
                    Posts
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[14px] font-bold leading-none text-[#1f2937]">{albumsCount}</p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">
                    Albums
                  </p>
                </div>
              </div>
            </article>
          </Fragment>
        );
      })}

      <DataTablePagination
        page={page}
        pageSize={pageSize}
        rowCount={rows.length}
        totalCount={totalCount}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}
