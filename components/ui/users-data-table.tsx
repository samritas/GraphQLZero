"use client";

import { Globe, Mail, Phone } from "lucide-react";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { UserRowAvatar } from "@/components/ui/user-row-avatar";
import type { UserRecord } from "@/graphql/queries/users";
import { USERS_TABLE_GRID, USERS_TABLE_HEADERS } from "@/lib/constants";
import {
  USERS_TABLE_AVATAR_GRADIENTS,
  userProfilePhotoUrl,
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
    <>
      <div
        className="grid bg-[#eef2f6] px-2 py-3.5"
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
        return (
          <div
            key={row.id}
            className={`grid items-center px-2 py-4 ${
              index === rows.length - 1 ? "" : "border-b border-[#edf2f7]"
            }`}
            style={{ gridTemplateColumns: USERS_TABLE_GRID }}
          >
            <p className="text-[12px] font-semibold text-[#0053DB]">{idLabel}</p>
            <div className="flex min-w-0 items-center gap-2.5">
              <UserRowAvatar src={photoSrc} name={row.name} fallbackClass={avatarBg} />
              <div className="min-w-0">
                <p className="text-[14px] font-bold leading-[1.2] text-[#1f2937]">{row.name}</p>
                <p className="mt-0.5 truncate text-[11px] text-[#6b7280]">{row.username}</p>
              </div>
            </div>
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 break-all text-[12px] text-[#374151]">
                <Mail className="h-3 w-3 shrink-0 text-[#6b7280]" strokeWidth={1.8} />
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
              <p className="text-[14px] font-semibold leading-[1.2] text-[#374151]">{affiliation}</p>
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
    </>
  );
}
