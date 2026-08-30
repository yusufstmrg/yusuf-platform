import { NextResponse } from "next/server";
import { getDb } from "@/lib/db/server";
import { auth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = getDb();
  if (!db || !auth) {
    return NextResponse.json(
      {
        ok: false,
        service: "yusuf-public-os",
        app: "ok",
        database: db ? "ok" : "not_configured",
        auth: auth ? "ok" : "not_configured",
        degraded: true,
        timestamp: new Date().toISOString(),
      },
      { status: 503, headers: { "cache-control": "no-store" } },
    );
  }
  try {
    await db`SELECT 1`;
    return NextResponse.json(
      { ok: true, service: "yusuf-public-os", app: "ok", database: "ok", auth: "ok", degraded: false, timestamp: new Date().toISOString() },
      { headers: { "cache-control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { ok: false, service: "yusuf-public-os", app: "ok", database: "unavailable", auth: "ok", degraded: true, timestamp: new Date().toISOString() },
      { status: 503, headers: { "cache-control": "no-store" } },
    );
  }
}
