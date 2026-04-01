import type { TodoStatusFilter } from "@/graphql/queries/todos";

function tabClass(active: boolean) {
  return active
    ? "rounded-md bg-white px-5 py-2 text-[14px] font-bold text-[#0b57d0]"
    : "rounded-md px-5 py-2 text-[14px] font-medium text-[#6b7280]";
}

export type TodosStatusTabsProps = {
  value: TodoStatusFilter;
  onChange: (next: TodoStatusFilter) => void;
};

export function TodosStatusTabs({ value, onChange }: TodosStatusTabsProps) {
  return (
    <div className="flex items-center rounded-lg bg-[#eef2f6] p-1">
      <button
        type="button"
        className={tabClass(value === "all")}
        onClick={() => onChange("all")}
      >
        All
      </button>
      <button
        type="button"
        className={tabClass(value === "pending")}
        onClick={() => onChange("pending")}
      >
        Pending
      </button>
      <button
        type="button"
        className={tabClass(value === "completed")}
        onClick={() => onChange("completed")}
      >
        Completed
      </button>
    </div>
  );
}
