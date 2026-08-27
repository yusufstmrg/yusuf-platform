import { AuthView } from "@neondatabase/auth-ui";
import { authViewPaths } from "@neondatabase/auth-ui/server";

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
        <div className="auth-card">
          <AuthView path={path} />
        </div>
      </div>
    </main>
  );
}
