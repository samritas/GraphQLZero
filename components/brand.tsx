import Image from "next/image";

/** Same file as favicon (`metadata.icons` in root layout). */
export const BRAND_LOGO_SRC = "/logo.png" as const;

type BrandProps = {
  variant?: "header" | "sidebar";
  /** Pass true when the logo is above the fold (e.g. marketing header). */
  priority?: boolean;
};

export function Brand({ variant = "header", priority = false }: BrandProps) {
  const logo = (
    <Image
      src={BRAND_LOGO_SRC}
      alt="GraphQLZero"
      width={32}
      height={32}
      className="h-8 w-8 rounded-md"
      priority={priority}
    />
  );

  if (variant === "sidebar") {
    return (
      <div className="border-b border-[#1e293b] px-6 py-4">
        <div className="flex items-center gap-3">
          {logo}
          <div>
            <p className="text-[20px] font-bold leading-tight text-white">
              GraphQLZero
            </p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#94a3b8]">
              Admin Console
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {logo}
      <span className="text-[20px] font-semibold tracking-[-0.01em] text-slate-800">
        GraphQLZero
      </span>
    </div>
  );
}
