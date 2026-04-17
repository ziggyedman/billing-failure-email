"use client";

import { useState } from "react";

export default function HomePage() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [recipient, setRecipient] = useState("delivered@resend.dev");

  async function sendBillingFailure() {
    setLoading("billing");
    setStatus(null);
    try {
      const res = await fetch("/api/send-billing-failure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: recipient }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error?.message || "Send failed");
      setStatus(`✅ Billing-failure email sent. id: ${json.id}`);
    } catch (err) {
      setStatus(`❌ ${(err as Error).message}`);
    } finally {
      setLoading(null);
    }
  }

  async function sendCompletion() {
    setLoading("completion");
    setStatus(null);
    try {
      const res = await fetch("/api/send-completion", { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error?.message || "Send failed");
      setStatus(`✅ Completion email sent to jonni@ and brian@. id: ${json.id}`);
    } catch (err) {
      setStatus(`❌ ${(err as Error).message}`);
    } finally {
      setLoading(null);
    }
  }

  return (
    <main style={styles.main}>
      <div style={styles.card}>
        <h1 style={styles.h1}>Billing failure email demo</h1>
        <p style={styles.p}>
          A tiny Next.js app that uses React Email for the template and Resend
          to deliver it. Pick an action.
        </p>

        <section style={styles.section}>
          <h2 style={styles.h2}>Send the billing-failure email</h2>
          <label style={styles.label}>
            Recipient
            <input
              style={styles.input}
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="you@example.com"
            />
          </label>
          <p style={styles.hint}>
            Tip: <code>delivered@resend.dev</code> is a Resend test inbox that
            always accepts mail.
          </p>
          <button
            style={loading === "billing" ? styles.buttonDisabled : styles.button}
            onClick={sendBillingFailure}
            disabled={loading !== null}
          >
            {loading === "billing" ? "Sending…" : "Send billing-failure email"}
          </button>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Send the completion email</h2>
          <p style={styles.p}>
            Sends to <strong>jonni@resend.com</strong> and{" "}
            <strong>brian@resend.com</strong> with the rendered email attached
            as a PDF and links to the repo.
          </p>
          <button
            style={
              loading === "completion" ? styles.buttonDisabled : styles.button
            }
            onClick={sendCompletion}
            disabled={loading !== null}
          >
            {loading === "completion" ? "Sending…" : "Send completion email"}
          </button>
        </section>

        {status && <div style={styles.status}>{status}</div>}

        <footer style={styles.footer}>
          Docs:{" "}
          <a href="https://resend.com/docs/send-with-nextjs">Resend + Next.js</a>{" "}
          · <a href="https://react.email/docs">React Email</a>
        </footer>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "48px 16px",
  },
  card: {
    width: "100%",
    maxWidth: 560,
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: "32px 32px 24px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  },
  h1: { fontSize: 24, fontWeight: 700, margin: "0 0 8px" },
  h2: { fontSize: 16, fontWeight: 600, margin: "0 0 10px" },
  p: { fontSize: 14, lineHeight: 1.6, color: "#374151", margin: "0 0 16px" },
  section: {
    borderTop: "1px solid #e5e7eb",
    paddingTop: 20,
    marginTop: 20,
  },
  label: {
    display: "block",
    fontSize: 13,
    color: "#374151",
    fontWeight: 500,
    marginBottom: 8,
  },
  input: {
    display: "block",
    width: "100%",
    marginTop: 6,
    padding: "8px 10px",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    fontSize: 14,
    boxSizing: "border-box",
  },
  hint: { fontSize: 12, color: "#6b7280", margin: "6px 0 14px" },
  button: {
    background: "#111827",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "10px 16px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
  buttonDisabled: {
    background: "#9ca3af",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "10px 16px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "not-allowed",
  },
  status: {
    marginTop: 20,
    padding: "10px 12px",
    borderRadius: 6,
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    fontSize: 13,
    color: "#111827",
    fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
  },
  footer: {
    marginTop: 28,
    paddingTop: 16,
    borderTop: "1px solid #e5e7eb",
    fontSize: 12,
    color: "#6b7280",
  },
};
