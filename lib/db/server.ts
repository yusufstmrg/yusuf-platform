import { neon } from "@neondatabase/serverless";

let client: ReturnType<typeof neon> | null = null;

/**
 * Server-only Neon client. The query builder's generic return union is wider
 * than the row shape we use in the app, so callers intentionally narrow rows
 * at the query boundary.
 */
export function getDb(): ReturnType<typeof neon> | null {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;
  client ??= neon(connectionString);
  return client;
}
