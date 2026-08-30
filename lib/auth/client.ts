"use client";

import { createAuthClient } from "@neondatabase/auth/next";

// Keep the browser client disabled until deployment configuration exists so
// public routes remain healthy in local and preview environments.
const authUrl = process.env.NEXT_PUBLIC_AUTH_URL ?? process.env.NEXT_PUBLIC_NEON_AUTH_URL;

export const authClient = authUrl ? createAuthClient() : null;
