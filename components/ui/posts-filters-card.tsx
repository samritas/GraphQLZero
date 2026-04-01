export type PostsFiltersCardProps = {
  titleQuery: string;
  onTitleQueryChange: (value: string) => void;
  authorUserId: string;
  onAuthorUserIdChange: (userId: string) => void;
  authors: Array<{ id: string; name: string }>;
  authorsLoading: boolean;
  titleFieldLabel?: string;
  searchPlaceholder?: string;
  authorFieldLabel?: string;
  allAuthorsOptionLabel?: string;
};

export function PostsFiltersCard({
  titleQuery,
  onTitleQueryChange,
  authorUserId,
  onAuthorUserIdChange,
  authors,
  authorsLoading,
  titleFieldLabel = "Title Query",
  searchPlaceholder = "Search post titles...",
  authorFieldLabel = "Author Entity",
  allAuthorsOptionLabel = "All Users",
}: PostsFiltersCardProps) {
  return (
    <div className="box-border flex h-[127px] w-full flex-col justify-center rounded-[16px] border border-[#e2e8f0] bg-[#F0F4F7] p-6">
      <div className="grid h-full w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-0">
        <label className="flex min-h-0 min-w-0 w-full flex-col justify-center gap-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#64748b]">
            {titleFieldLabel}
          </p>
          <input
            type="search"
            value={titleQuery}
            onChange={(e) => onTitleQueryChange(e.target.value)}
            placeholder={searchPlaceholder}
            autoComplete="off"
            className="h-10 w-full min-w-0 rounded-lg border border-[#e2e8f0] bg-white px-4 text-sm  shadow-sm placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
          />
        </label>
        <label className="flex min-h-0 min-w-0 w-full flex-col justify-center gap-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#64748b]">
            {authorFieldLabel}
          </p>
          <div className="relative min-w-0 w-full">
            <select
              value={authorUserId}
              onChange={(e) => onAuthorUserIdChange(e.target.value)}
              disabled={authorsLoading}
              className="h-10 w-full min-w-0 appearance-none rounded-lg border border-[#e2e8f0] bg-white px-4 pr-10 text-sm text-[#334155] shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value="">{allAuthorsOptionLabel}</option>
              {authors.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
            <span
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8]"
              aria-hidden
            >
              ⌄
            </span>
          </div>
        </label>
      </div>
    </div>
  );
}
