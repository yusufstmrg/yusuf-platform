"use server";

import { redirect } from "next/navigation";
import { requirePrivateDb } from "@/lib/os/server";

export async function publishProject(formData: FormData) {
  const { user, db } = await requirePrivateDb();
  const projectId = String(formData.get("project_id") || "").trim();
  if (!projectId) redirect("/os/publication?error=missing_project");

  const rows = await db`SELECT id, slug, title, kind, summary, problem, objective, approach, tools, outcome, lessons, visibility FROM public.projects WHERE id=${projectId}::uuid AND owner_id=${user.id}::uuid LIMIT 1`;
  const project = rows[0];
  if (!project) redirect("/os/publication?error=not_found");
  if (!["ready_to_publish", "published"].includes(String(project.visibility))) redirect("/os/publication?error=not_ready");

  const payload = {
    kind: project.kind,
    summary: project.summary,
    problem: project.problem,
    objective: project.objective,
    approach: project.approach,
    tools: project.tools,
    outcome: project.outcome,
    lessons: project.lessons,
  };

  await db`
    INSERT INTO public.public_publications (entity_type, entity_id, public_slug, public_title, public_summary, public_payload, published_at, updated_at)
    VALUES ('project', ${project.id}::uuid, ${project.slug}, ${project.title}, ${project.summary}, ${JSON.stringify(payload)}::jsonb, NOW(), NOW())
    ON CONFLICT (public_slug) DO UPDATE SET
      entity_id=EXCLUDED.entity_id,
      public_title=EXCLUDED.public_title,
      public_summary=EXCLUDED.public_summary,
      public_payload=EXCLUDED.public_payload,
      published_at=EXCLUDED.published_at,
      updated_at=NOW()
  `;

  await db`UPDATE public.projects SET visibility='published', updated_at=NOW() WHERE id=${project.id}::uuid AND owner_id=${user.id}::uuid`;
  redirect("/os/publication?published=1");
}
