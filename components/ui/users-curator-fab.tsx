"use client";

import { UserRoundPlus } from "lucide-react";

export function UsersCuratorFab() {
  return (
    <button
      type="button"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom,0px))] right-[max(1rem,env(safe-area-inset-right,0px))] z-20 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#0b57d0] text-white shadow-lg sm:bottom-4 sm:right-4 sm:h-10 sm:w-10"
      aria-label="Add curator"
    >
      <UserRoundPlus className="h-4.5 w-4.5" />
    </button>
  );
}
