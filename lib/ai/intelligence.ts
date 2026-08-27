import type { getDb } from "@/lib/db/server";

type Db = NonNullable<ReturnType<typeof getDb>>;

export async function refreshNextBestActions(db: Db, ownerId: string) {
  const [openTasks, openCaptures, stalledGoals, staleSkills, activeDeals] = await Promise.all([
    db`SELECT COUNT(*)::int AS count FROM public.tasks WHERE owner_id=${ownerId}::uuid AND status NOT IN ('done','completed')`,
    db`SELECT COUNT(*)::int AS count FROM public.quick_captures WHERE owner_id=${ownerId}::uuid AND processed=false`,
    db`SELECT COUNT(*)::int AS count FROM public.goals WHERE owner_id=${ownerId}::uuid AND status NOT IN ('done','completed') AND COALESCE(progress,0) < 30`,
    db`SELECT COUNT(*)::int AS count FROM public.skills WHERE owner_id=${ownerId}::uuid AND validated=false`,
    db`SELECT COUNT(*)::int AS count FROM public.deals WHERE owner_id=${ownerId}::uuid AND stage NOT IN ('won','lost','closed')`,
  ]);

  const candidates = [
    { title: "Process untriaged captures", reason: `${openCaptures[0]?.count ?? 0} capture(s) are waiting for processing. Convert raw notes into tasks, goals, evidence or decisions.`, impact: 9, effort: 20 },
    { title: "Close one high-priority task", reason: `${openTasks[0]?.count ?? 0} open task(s) remain. Pick the highest-leverage item and finish it before adding more work.`, impact: 8, effort: 30 },
    { title: "Rescue a stalled goal", reason: `${stalledGoals[0]?.count ?? 0} goal(s) have low progress. Identify the smallest next action and attach it to the active sprint.`, impact: 9, effort: 25 },
    { title: "Validate one capability", reason: `${staleSkills[0]?.count ?? 0} skill(s) are not yet validated. Attach recent evidence or schedule an assessment.`, impact: 7, effort: 35 },
    { title: "Advance one commercial opportunity", reason: `${activeDeals[0]?.count ?? 0} deal(s) are still active. Move the next one toward a concrete buyer/supplier/customer action.`, impact: 9, effort: 40 },
  ];
  const active = candidates.filter((c) => !c.reason.startsWith("0 ")).sort((a,b) => b.impact - a.impact || a.effort - b.effort).slice(0,5);

  await db`UPDATE public.next_best_actions SET status='superseded' WHERE owner_id=${ownerId}::uuid AND status NOT IN ('done','completed')`;
  for (let index=0; index<active.length; index++) {
    const action=active[index];
    await db`
      INSERT INTO public.next_best_actions (owner_id, title, reason, impact_score, effort_minutes, priority_rank, status)
      VALUES (${ownerId}::uuid, ${action.title}, ${action.reason}, ${action.impact}, ${action.effort}, ${index+1}, 'recommended')
    `;
  }
  return active.length;
}
