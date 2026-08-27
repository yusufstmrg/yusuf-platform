import { auth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ path: string[] }> };

const unavailable = () =>
  new Response("Authentication is not configured for this deployment.", {
    status: 503,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });

export async function GET(request: Request, context: RouteContext) {
  const handlers = auth?.handler();
  if (!handlers) return unavailable();
  return handlers.GET(request, context);
}

export async function POST(request: Request, context: RouteContext) {
  const handlers = auth?.handler();
  if (!handlers) return unavailable();
  return handlers.POST(request, context);
}
