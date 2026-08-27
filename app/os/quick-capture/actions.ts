"use server";

import { auth } from "@/lib/auth/server";
import { getDb } from "@/lib/db/server";
import { revalidatePath } from "next/cache";

export async function createQuickCapture(formData: FormData) {
  if (!auth) return { ok: false, message: "Authentication is not configured yet." };

  const { session, user } = await auth.getSession();
  if (!session || !user) return { ok: false, message: "Please sign in again." };

  const rawText = String(formData.get("raw_text") ?? "").trim();
  if (!rawText) return { ok: false, message: "Write something to capture first." };
  if (rawText.length > 5000) return { ok: false, message: "Capture is too long. Keep it under 5,000 characters." };

  const db = getDb();
  if (!db) return { ok: false, message: "Database is not connected to this deployment yet." };

  await db`
    INSERT INTO public.quick_captures (owner_id, raw_text)
    VALUES (${user.id}::uuid, ${rawText})
  `;

  revalidatePath("/os/quick-capture");
  revalidatePath("/os");

  return { ok: true, message: "Captured. The item is now ready for processing." };
}
