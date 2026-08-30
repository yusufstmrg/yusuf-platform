import { AuthView } from "@neondatabase/auth-ui";
import { authViewPaths } from "@neondatabase/auth-ui/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/lib/auth/server";

export const dynamicParams = false;
export const metadata = {
  title: "Authentication — Yusuf B. Situmorang",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return Object.values(authViewPaths).map((path) => ({ path }));
}

export default async function AuthPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;

  return (
    <main className="auth-shell">
      <div className="auth-panel">
        <div className="kicker">Yusuf Platform</div>
        <h1>One identity. Two worlds.</h1>
        <p className="section-lead">
          Secure access to the private Personal OS. Your public profile remains public; your personal workspace stays protected.
        </p>
        {auth ? <div className="auth-card"><AuthView path={path} /></div> : (
          <div className="auth-card auth-unavailable" role="status">
            <h2>Private access is being configured</h2>
            <p>The public profile is available now. Sign-in will be enabled as soon as the production identity and database connection are configured.</p>
            <Link className="btn btn-dark" href="/login"><ArrowLeft size={15} /> Back to access gateway</Link>
          </div>
        )}
      </div>
    </main>
  );
}
