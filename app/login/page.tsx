import Link from "next/link";
import { ArrowLeft, ArrowUpRight, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";

export const metadata = {
  title: "Sign in — Yusuf B. Situmorang",
  description: "Secure gateway to the private Yusuf Personal OS.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="section section-white" style={{ minHeight: "100svh", display: "grid", placeItems: "center" }}>
      <div className="container" style={{ maxWidth: 920 }}>
        <Link className="btn btn-dark" href="/" style={{ display: "inline-flex", marginBottom: 36 }}>
          <ArrowLeft size={15} /> Back to Yusuf
        </Link>

        <div className="kicker">Yusuf Platform</div>
        <h1 style={{ marginTop: 10, maxWidth: 780 }}>One identity. Two worlds. Private by default.</h1>
        <p className="section-lead" style={{ maxWidth: 700, marginTop: 18 }}>
          The public profile and private Personal OS share a controlled identity layer. Sensitive life, financial, career and planning data stays inside the private workspace.
        </p>

        <div className="grid-2" style={{ marginTop: 42 }}>
          <div className="card">
            <LockKeyhole size={20} />
            <h3>Private Personal OS</h3>
            <p>Command Center, life strategy, goals, sprint, quick capture, skills, career, proof, brand, network, business, wealth, purpose and reviews.</p>
            <Link className="btn btn-dark" href="/auth/sign-in" style={{ marginTop: 20 }}>
              Sign in securely <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="card">
            <ShieldCheck size={20} />
            <h3>Security boundary</h3>
            <p>Private records are owner-scoped and intended to be exposed only through authenticated application paths and explicit publication workflows.</p>
            <Link className="btn btn-secondary" href="/auth/sign-up" style={{ marginTop: 20 }}>
              Create account <Sparkles size={15} />
            </Link>
          </div>
        </div>

        <div className="notice" style={{ marginTop: 28, padding: 20, border: "1px solid rgba(17,37,54,.14)", borderRadius: 18, background: "#f6f8fa" }}>
          <strong>Private access is protected by Neon Auth.</strong>
          <p style={{ margin: "8px 0 0" }}>
            The public website remains available without login. Private access becomes active after the production identity, cookie secret and database connection are configured in Vercel.
          </p>
        </div>
      </div>
    </main>
  );
}
