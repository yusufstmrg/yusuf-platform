import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";
import { QuickCaptureForm } from "./quick-capture-form";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Quick Capture — Yusuf Personal OS",
  description: "Capture private work, ideas and observations into Yusuf Personal OS.",
  robots: { index: false, follow: false },
};

export default async function QuickCapturePage() {
  if (!auth) redirect("/login?reason=auth_setup");

  const result = await auth.getSession();
  if (!result.data?.session) redirect("/auth/sign-in");

  return (
    <main className="os-shell">
      <div className="container" style={{ maxWidth: 920 }}>
        <div className="kicker">Execution layer</div>
        <h1 style={{ marginTop: 8 }}>Quick Capture.</h1>
        <p className="section-lead" style={{ marginTop: 14, maxWidth: 720 }}>
          Record work, ideas, decisions, lessons or opportunities in one fast place. Later, the intelligence layer can classify the capture into goals, projects, skills, evidence and next actions.
        </p>
        <div className="card" style={{ marginTop: 34 }}>
          <QuickCaptureForm />
        </div>
      </div>
    </main>
  );
}
