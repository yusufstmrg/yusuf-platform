"use client";

import { useState } from "react";

const localSrc = "/yusuf-portrait.webp";
const fallbackSrc = "https://github.com/yusufstmrg.png?size=900";

export function HeroPortrait() {
  const [src, setSrc] = useState(localSrc);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="portrait-media"
      style={{
        backgroundImage: `url("${fallbackSrc}")`,
        backgroundPosition: "center 16%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <img
        src={src}
        alt="Yusuf B. Situmorang"
        width={1800}
        height={1258}
        decoding="async"
        fetchPriority="high"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity .35s ease",
        }}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (src !== fallbackSrc) {
            setLoaded(false);
            setSrc(fallbackSrc);
          }
        }}
      />
    </div>
  );
}
