"use client";

import Image from "next/image";
import { useState } from "react";

const fallbackSrc = "https://github.com/yusufstmrg.png?size=900";

export function HeroPortrait() {
  const [src, setSrc] = useState<string>("/yusuf-portrait.webp");
  const [failed, setFailed] = useState(false);

  return (
    <>
      {!failed ? (
        <Image
          src={src}
          alt="Yusuf B. Situmorang"
          width={1800}
          height={1258}
          priority
          unoptimized
          sizes="(max-width: 900px) 86vw, 42vw"
          onError={() => {
            if (src !== fallbackSrc) setSrc(fallbackSrc);
            else setFailed(true);
          }}
        />
      ) : (
        <div className="portrait-fallback" aria-label="Yusuf B. Situmorang">
          <span>YBS</span>
        </div>
      )}
    </>
  );
}
