/* eslint-disable @typescript-eslint/no-explicit-any */
import { neon } from "@neondatabase/serverless";

let client: ReturnType<typeof neon> | null = null;

/** Server-only Neon client used by the Personal OS data layer. */
export function getDb(): any {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;
  client ??= neon(connectionString);
  return client as any;
}
