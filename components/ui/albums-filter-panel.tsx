"use client";

export type AlbumsFilterPanelProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  ownerUserId: string;
  onOwnerUserIdChange: (userId: string) => void;
  owners: Array<{ id: string; name: string }>;
  ownersLoading: boolean;
};

export function AlbumsFilterPanel({
  searchQuery,
  onSearchChange,
  ownerUserId,
  onOwnerUserIdChange,
  owners,
  ownersLoading,
}: AlbumsFilterPanelProps) {
  return (
    <div className="mt-6 rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-[#374151]">
          Search albums
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Filter by title…"
            className="rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-[13px] font-medium text-[#1f2937] shadow-inner placeholder:text-[#9ca3af] focus:border-[#93c5fd] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-[#374151]">
          Owner
          <select
            value={ownerUserId}
            onChange={(e) => onOwnerUserIdChange(e.target.value)}
            disabled={ownersLoading}
            className="rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[13px] font-semibold text-[#334155] shadow-sm focus:border-[#93c5fd] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 disabled:opacity-60"
          >
            <option value="">All owners</option>
            {owners.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
