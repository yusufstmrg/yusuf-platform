import { NextResponse } from "next/server";
import { getDb } from "@/lib/db/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = getDb();
  if (!db) return NextResponse.json({ ok: false, service: "yusuf-public-os", database: "not_configured" }, { status: 503, headers: { "cache-control": "no-store" } });
  try {
    await db`SELECT 1`;
    return NextResponse.json({ ok: true, service: "yusuf-public-os", database: "ok", timestamp: new Date().toISOString() }, { headers: { "cache-control": "no-store" } });
  } catch {
    return NextResponse.json({ ok: false, service: "yusuf-public-os", database: "unavailable" }, { status: 503, headers: { "cache-control": "no-store" } });
  }
}
