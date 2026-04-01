import { Database } from "lucide-react";

export function DatabaseWatermark() {
  return (
    <Database
      aria-hidden
      className="pointer-events-none absolute bottom-2 right-2 h-16 w-20 text-[#0048BF] opacity-[0.14]"
      strokeWidth={1.15}
    />
  );
}
