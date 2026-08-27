"use client";

import { useActionState } from "react";
import { ArrowLeft, CheckCircle2, Send } from "lucide-react";
import Link from "next/link";
import { createQuickCapture } from "./actions";

const initialState = { ok: false, message: "" };

export function QuickCaptureForm() {
  const [state, action, pending] = useActionState(createQuickCapture, initialState);

  return (
    <form action={action} className="capture-form">
      <label htmlFor="raw_text">Capture anything you want Yusuf OS to remember</label>
      <textarea id="raw_text" name="raw_text" rows={8} maxLength={5000} placeholder="Example: Finished a DCF sensitivity analysis for 2 hours. Need to turn it into a public case study next week." required />
      <div className="capture-footer">
        <Link className="btn btn-secondary" href="/os"><ArrowLeft size={15} /> Back to Command Center</Link>
        <button className="btn btn-dark" type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save capture"} <Send size={15} />
        </button>
      </div>
      {state.message && (
        <div className={state.ok ? "capture-message success" : "capture-message error"} role="status">
          {state.ok && <CheckCircle2 size={16} />} {state.message}
        </div>
      )}
    </form>
  );
}
