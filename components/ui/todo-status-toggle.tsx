export function TodoStatusToggle({ done }: { done: boolean }) {
  return (
    <span
      role="presentation"
      className={`inline-flex h-[20px] w-[36px] shrink-0 items-center rounded-full p-px ${
        done ? "bg-[#2563eb]" : "bg-[#e2e8f0]"
      }`}
    >
      <span
        className={`h-4 w-4 rounded-full bg-white shadow-[0_1px_2px_rgba(15,23,42,0.18)] transition-transform duration-200 ${
          done ? "translate-x-4" : "translate-x-0.5"
        }`}
      />
    </span>
  );
}
