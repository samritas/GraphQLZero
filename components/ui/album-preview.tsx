export type AlbumPreviewProps = {
  palette: [string, string];
};

export function AlbumPreview({ palette }: AlbumPreviewProps) {
  return (
    <div className="relative h-10 w-[68px] overflow-hidden rounded-lg border border-[#dbe3ee] bg-[#e2e8f0]">
      <span
        className="absolute inset-y-0 left-0 w-1/2"
        style={{
          background: `linear-gradient(135deg, ${palette[0]} 0%, #0f172a 100%)`,
        }}
      />
      <span
        className="absolute inset-y-0 right-0 w-1/2"
        style={{
          background: `linear-gradient(135deg, ${palette[1]} 0%, #111827 100%)`,
        }}
      />
      <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full border border-white bg-white/60" />
    </div>
  );
}
