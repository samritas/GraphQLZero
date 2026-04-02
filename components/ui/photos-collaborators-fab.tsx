"use client";

import { Users } from "lucide-react";

export function PhotosCollaboratorsFab() {
  return (
    <button
      type="button"
      className="fixed bottom-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b57d0] text-white shadow-lg"
      aria-label="Open collaborators"
    >
      <Users className="h-4 w-4" />
    </button>
  );
}
