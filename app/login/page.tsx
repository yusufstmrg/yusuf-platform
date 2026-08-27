import Link from "next/link";
import { ArrowLeft, LockKeyhole, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Sign in — Yusuf B. Situmorang",
  description: "Secure gateway to the private Yusuf Personal OS.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="section section-white" style={{ minHeight: "100svh", display: "grid", placeItems: "center" }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <Link className="btn btn-dark" href="/" style={{ display: "inline-flex", marginBottom: 36 }}>
          <ArrowLeft size={15} /> Back to Yusuf
        </Link>

        <div className="kicker">Yusuf Platform</div>
        <h1 style={{ marginTop: 10, maxWidth: 680 }}>One identity. Two worlds. Private by default.</h1>
        <p className="section-lead" style={{ maxWidth: 620, marginTop: 18 }}>
          Your public profile and private Personal OS are designed to share a controlled identity layer while keeping sensitive life, financial and planning data private.
        </p>

        <div className="card-grid" style={{ marginTop: 42 }}>
          <div className="card">
            <LockKeyhole size={20} />
            <h3>Private Personal OS</h3>
            <p>Command Center, goals, sprint, skills, career, business, wealth, purpose, reviews and AI Chief of Staff.</p>
          </div>
          <div className="card">
            <ShieldCheck size={20} />
            <h3>Security Gate</h3>
            <p>Authentication and authorization are intentionally required before private routes can be enabled.</p>
          </div>
        </div>

        <div className="notice" style={{ marginTop: 28, padding: 20, border: "1px solid rgba(17,37,54,.14)", borderRadius: 18, background: "#f6f8fa" }}>
          <strong>Private access is being wired.</strong>
          <p style={{ margin: "8px 0 0" }}>
            The private experience is currently protected by the production gate. Supabase Auth will replace this setup gate once the canonical database project is connected.
          </p>
        </div>
      </div>
    </main>
  );
}
