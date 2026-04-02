"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { userAvatarPlaceholderUrl } from "@/lib/users-directory";

export type UserRowAvatarProps = {
  src: string | null;
  name: string;
  userId: string;
  fallbackClass: string;
};

export function UserRowAvatar({ src, name, userId, fallbackClass }: UserRowAvatarProps) {
  const [remoteFailed, setRemoteFailed] = useState(false);
  const [localFailed, setLocalFailed] = useState(false);
  const placeholderSrc = useMemo(() => userAvatarPlaceholderUrl(userId), [userId]);

  useEffect(() => {
    setRemoteFailed(false);
    setLocalFailed(false);
  }, [src, userId]);

  const showRemote = Boolean(src?.trim()) && !remoteFailed;
  const showLocal = !showRemote && !localFailed;

  return (
    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-xl bg-[#eef2f6]">
      {showRemote ? (
        <Image
          src={src!}
          alt={`${name} profile photo`}
          width={32}
          height={32}
          className="h-8 w-8 object-cover"
          unoptimized
          onError={() => setRemoteFailed(true)}
        />
      ) : null}
      {showLocal ? (
        <Image
          src={placeholderSrc}
          alt={`${name} profile photo`}
          width={32}
          height={32}
          className="h-8 w-8 object-cover"
          unoptimized
          onError={() => setLocalFailed(true)}
        />
      ) : null}
      {!showRemote && !showLocal ? (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${fallbackClass}`}
          aria-hidden
        />
      ) : null}
    </div>
  );
}
