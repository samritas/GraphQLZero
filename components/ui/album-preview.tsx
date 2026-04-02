"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  albumPreviewFallbackUrls,
  albumPreviewPhotoSrc,
} from "@/lib/albums-display";

export type AlbumPreviewPhoto = { thumbnailUrl: string; url: string };

export type AlbumPreviewProps = {
  albumId: string;
  photos: AlbumPreviewPhoto[];
};

/**
 * Stacked 48×48 previews (back tile offset left, front overlapping right) with
 * local fallbacks when URLs are missing or fail to load.
 */
export function AlbumPreview({ albumId, photos }: AlbumPreviewProps) {
  const [fbBack, fbFront] = useMemo(() => albumPreviewFallbackUrls(albumId), [albumId]);

  const backRemote =
    photos.length >= 2 ? albumPreviewPhotoSrc(photos[0]) : "";
  const frontRemote =
    photos.length >= 2
      ? albumPreviewPhotoSrc(photos[1])
      : albumPreviewPhotoSrc(photos[0]);

  const [backFailed, setBackFailed] = useState(false);
  const [frontFailed, setFrontFailed] = useState(false);

  useEffect(() => {
    setBackFailed(false);
    setFrontFailed(false);
  }, [albumId, backRemote, frontRemote]);

  const backSrc =
    !backRemote || backFailed ? fbBack : backRemote;
  const frontSrc =
    !frontRemote || frontFailed ? fbFront : frontRemote;

  return (
    <div
      className="relative h-12 w-[72px] shrink-0"
      role="group"
      aria-label="Album cover previews"
    >
      <div className="absolute left-0 top-1/2 h-12 w-12 -translate-y-1/2 overflow-hidden rounded-lg shadow-sm ring-2 ring-white">
        <Image
          src={backSrc}
          alt=""
          width={48}
          height={48}
          className="h-full w-full object-cover"
          unoptimized
          onError={() => setBackFailed(true)}
        />
      </div>
      <div className="absolute left-[22px] top-1/2 h-12 w-12 -translate-y-1/2 overflow-hidden rounded-lg shadow-sm ring-2 ring-white">
        <Image
          src={frontSrc}
          alt=""
          width={48}
          height={48}
          className="h-full w-full object-cover"
          unoptimized
          onError={() => setFrontFailed(true)}
        />
      </div>
    </div>
  );
}
