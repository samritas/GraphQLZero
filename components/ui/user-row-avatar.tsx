"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type UserRowAvatarProps = {
  src: string | null;
  name: string;
  fallbackClass: string;
};

export function UserRowAvatar({ src, name, fallbackClass }: UserRowAvatarProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const showImg = Boolean(src) && !failed;

  return (
    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md bg-[#eef2f6]">
      {showImg ? (
        <Image
          src={src!}
          alt={`${name} profile photo`}
          width={32}
          height={32}
          className="h-8 w-8 object-cover"
          unoptimized
          onError={() => setFailed(true)}
        />
      ) : null}
      {!showImg ? (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${fallbackClass}`}
          aria-hidden
        />
      ) : null}
    </div>
  );
}
