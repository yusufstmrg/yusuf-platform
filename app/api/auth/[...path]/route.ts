import { auth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request, context: { params: Promise<{ path: string[] }> }) {
  if (!auth) return new Response("Authentication is not configured.", { status: 503 });
  const handler = auth.handler();
  return handler.GET(request, context);
}

export async function POST(request: Request, context: { params: Promise<{ path: string[] }> }) {
  if (!auth) return new Response("Authentication is not configured.", { status: 503 });
  const handler = auth.handler();
  return handler.POST(request, context);
}
