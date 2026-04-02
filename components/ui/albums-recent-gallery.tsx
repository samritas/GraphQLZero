"use client";

import Image from "next/image";
import type { GalleryPhotoRecord } from "@/graphql/queries/albums";
import { galleryPhotoImageSrc } from "@/lib/albums-display";

export type AlbumsRecentGalleryProps = {
  photos: GalleryPhotoRecord[];
  showPlaceholder: boolean;
};

export function AlbumsRecentGallery({ photos, showPlaceholder }: AlbumsRecentGalleryProps) {
  const cells: Array<GalleryPhotoRecord | null> = [
    photos[0] ?? null,
    photos[1] ?? null,
    photos[2] ?? null,
    photos[3] ?? null,
  ];

  const cell = (
    item: GalleryPhotoRecord | null,
    key: string,
    layoutClass: string,
    sizes: string,
    overlay: { title: string; subtitle: string } | null,
  ) => (
    <article
      key={key}
      className={`relative overflow-hidden rounded-[2rem] shadow-sm ring-1 ring-black/5 ${layoutClass}`}
    >
      {item && galleryPhotoImageSrc(item) ? (
        <Image
          src={galleryPhotoImageSrc(item)}
          alt={item.title || "Gallery"}
          fill
          className="object-cover"
          sizes={sizes}
          priority={false}
        />
      ) : (
        <div
          className={`h-full min-h-[inherit] w-full bg-[#e2e8f0] ${showPlaceholder ? "animate-pulse" : ""}`}
        />
      )}
      {overlay ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent pt-20 pb-5 pl-5 pr-5">
          <p className="text-lg font-bold text-white">{overlay.title}</p>
          <p className="mt-1 text-sm font-medium text-white/75">{overlay.subtitle}</p>
        </div>
      ) : null}
    </article>
  );

  return (
    <section className="mt-8" aria-labelledby="recent-gallery-heading">
      <h2
        id="recent-gallery-heading"
        className="mb-6 text-xl font-bold tracking-tight text-[#111827]"
      >
        Recent Gallery Activity
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,2fr)] lg:items-stretch">
        {cell(
          cells[0],
          "g0",
          "min-h-[200px] lg:min-h-[240px]",
          "(max-width: 1024px) 100vw, 28vw",
          cells[0]
            ? {
                title: cells[0].album?.title?.trim() || cells[0].title || "Album",
                subtitle: cells[0].album?.user?.name
                  ? `Curated by ${cells[0].album.user.name}`
                  : "From the live gallery feed",
              }
            : null,
        )}
        {cell(
          cells[1],
          "g1",
          "min-h-[220px] sm:min-h-[260px] lg:min-h-[240px]",
          "(max-width: 1024px) 50vw, 14vw",
          null,
        )}
        {cell(
          cells[2],
          "g2",
          "min-h-[220px] sm:min-h-[260px] lg:min-h-[240px]",
          "(max-width: 1024px) 50vw, 14vw",
          null,
        )}
        {cell(
          cells[3],
          "g3",
          "min-h-[200px] lg:min-h-[240px]",
          "(max-width: 1024px) 100vw, 28vw",
          cells[3]
            ? {
                title: cells[3].album?.title?.trim() || cells[3].title || "Album",
                subtitle: cells[3].album?.user?.name
                  ? cells[3].album.user.name
                  : "Recent upload",
              }
            : null,
        )}
      </div>
    </section>
  );
}
