"use client";

import { UserRoundPlus } from "lucide-react";

export function UsersCuratorFab() {
  return (
    <button
      type="button"
      className="fixed bottom-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b57d0] text-white shadow-lg"
      aria-label="Add curator"
    >
      <UserRoundPlus className="h-4.5 w-4.5" />
    </button>
  );
}
