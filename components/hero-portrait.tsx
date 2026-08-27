"use client";

import { useState } from "react";

const localSrc = "/yusuf-professional-portrait.webp";

export function HeroPortrait() {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className="portrait-media" aria-label="Yusuf B. Situmorang portrait">
      {!failed ? (
        <img
          src={localSrc}
          alt="Yusuf B. Situmorang"
          width={800}
          height={1140}
          decoding="async"
          fetchPriority="high"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity .25s ease" }}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="portrait-fallback" aria-hidden="true">
          <span>YBS</span>
        </div>
      )}
    </div>
  );
}
