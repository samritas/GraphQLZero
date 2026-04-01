import { ListFilter, MoreVertical } from "lucide-react";

export function TodosTableToolbar() {
  return (
    <div className="flex items-center justify-between border-b border-[#edf2f7] px-6 py-4">
      <h3 className="text-[30px] font-semibold tracking-tight text-[#374151]">Entries</h3>
      <div className="flex items-center gap-4 text-[#4b5563]">
        <button type="button" className="hover:text-[#1f2937]" aria-label="Filter entries">
          <ListFilter className="h-4 w-4" strokeWidth={2} />
        </button>
        <button type="button" className="hover:text-[#1f2937]" aria-label="More options">
          <MoreVertical className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
