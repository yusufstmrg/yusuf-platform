"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";

export function RefreshIntelligenceButton() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  async function refresh() {
    setPending(true); setMessage("");
    try {
      const response = await fetch("/api/intelligence/refresh", { method: "POST" });
      const body = await response.json();
      if (!response.ok || !body.ok) throw new Error(body.error || "refresh_failed");
      setMessage(`${body.count} recommendations refreshed.`);
      window.location.reload();
    } catch (error) {
      setMessage(error instanceof Error ? error.message.replaceAll("_", " ") : "Unable to refresh intelligence.");
    } finally { setPending(false); }
  }

  return <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}><button className="btn btn-dark" type="button" onClick={refresh} disabled={pending}><RefreshCw size={15} style={pending?{animation:"spin 1s linear infinite"}:undefined}/>{pending?"Refreshing…":"Refresh intelligence"}</button>{message && <span style={{fontSize:12,color:"var(--muted)"}}>{message}</span>}<style jsx>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>;
}
