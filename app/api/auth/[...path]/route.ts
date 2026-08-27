import { auth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

const unavailable = () =>
  new Response("Authentication is not configured for this deployment.", {
    status: 503,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });

export async function GET(request: Request) {
  const handlers = auth?.handler();
  if (!handlers) return unavailable();
  return handlers.GET(request);
}

export async function POST(request: Request) {
  const handlers = auth?.handler();
  if (!handlers) return unavailable();
  return handlers.POST(request);
}
