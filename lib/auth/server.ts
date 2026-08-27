import { createNeonAuth } from "@neondatabase/auth/next/server";

const baseUrl = process.env.NEON_AUTH_BASE_URL;
const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET;

/**
 * Auth is configured only when the production environment provides the Neon
 * Auth endpoint and cookie secret. This keeps local/build environments safe
 * while the deployment gate is being completed.
 */
export const auth =
  baseUrl && cookieSecret
    ? createNeonAuth({
        baseUrl,
        cookies: { secret: cookieSecret, sessionDataTtl: 300 },
      })
    : null;
