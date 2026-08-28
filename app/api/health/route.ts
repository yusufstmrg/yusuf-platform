import { NextResponse } from "next/server";
import { getDb } from "@/lib/db/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = getDb();
  if (!db) {
    return NextResponse.json(
      { ok: true, service: "yusuf-public-os", app: "ok", database: "not_configured", degraded: true, timestamp: new Date().toISOString() },
      { headers: { "cache-control": "no-store" } },
    );
  }
  try {
    await db`SELECT 1`;
    return NextResponse.json({ ok: true, service: "yusuf-public-os", app: "ok", database: "ok", degraded: false, timestamp: new Date().toISOString() }, { headers: { "cache-control": "no-store" } });
  } catch {
    return NextResponse.json(
      { ok: true, service: "yusuf-public-os", app: "ok", database: "unavailable", degraded: true, timestamp: new Date().toISOString() },
      { headers: { "cache-control": "no-store" } },
    );
  }
}
