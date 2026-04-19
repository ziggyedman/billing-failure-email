"use client";

import { useEffect, useState } from "react";
import { stepStyles as s, CompletedBadge } from "./step-styles";

interface StepSendProps {
  apiKey: string;
  fromEmail: string;
  toEmail: string;
  customerName: string;
  completed: boolean[];
  onToEmailChange: (v: string) => void;
  onCustomerNameChange: (v: string) => void;
  onComplete: () => void;
  alreadyCompleted: boolean;
}

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; id: string }
  | { kind: "error"; message: string };

type Tab = "form" | "code";

export function StepSend({
  apiKey,
  fromEmail,
  toEmail,
  customerName,
  completed,
  onToEmailChange,
  onCustomerNameChange,
  onComplete,
  alreadyCompleted,
}: StepSendProps) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [tab, setTab] = useState<Tab>("form");
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    if (tab === "code" && source === null) {
      fetch("/api/source?file=send-route")
        .then((r) => r.text())
        .then(setSource)
        .catch(() => setSource("// Could not load source."));
    }
  }, [tab, source]);

  const allPriorComplete = completed.slice(0, 3).every(Boolean);
  const canSend =
    allPriorComplete &&
    /@.+\..+/.test(toEmail.trim()) &&
    !!fromEmail.trim() &&
    !!apiKey.trim() &&
    status.kind !== "sending";

  async function send() {
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/send-billing-failure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey,
          from: fromEmail,
          to: toEmail,
          customerName,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        const msg =
          json?.error?.message ||
          (typeof json?.error === "string"
            ? json.error
            : "Send failed with no error message.");
        setStatus({ kind: "error", message: msg });
        return;
      }
      setStatus({ kind: "success", id: json.id });
      onComplete();
    } catch (err) {
      setStatus({ kind: "error", message: (err as Error).message });
    }
  }

  return (
    <div>
      {alreadyCompleted && <CompletedBadge />}

      <p style={s.prose}>
        When you click <strong>Send</strong>, the browser posts to{" "}
        <code style={s.inlineCode}>POST /api/send-billing-failure</code> — a
        Next.js App Router route that instantiates the Resend SDK and calls{" "}
        <code style={s.inlineCode}>resend.emails.send()</code> with your React
        Email template as the <code style={s.inlineCode}>react</code> prop.
        Switch to <strong>Route code</strong> to read the exact file running in
        this app.
      </p>

      {/* tab bar */}
      <div style={localStyles.tabBar}>
        <button
          style={{
            ...localStyles.tab,
            ...(tab === "form" ? localStyles.tabActive : {}),
          }}
          onClick={() => setTab("form")}
        >
          Send form
        </button>
        <button
          style={{
            ...localStyles.tab,
            ...(tab === "code" ? localStyles.tabActive : {}),
          }}
          onClick={() => setTab("code")}
        >
          Route code
          <span style={localStyles.filepath}>
            app/api/send-billing-failure/route.ts
          </span>
        </button>
      </div>

      {/* ── Send form ── */}
      {tab === "form" && (
        <>
          <div style={s.fieldGrid}>
            <div>
              <label style={s.label} htmlFor="from">
                From
              </label>
              <input
                id="from"
                type="email"
                value={fromEmail}
                readOnly
                style={{ ...s.input, background: "#f9fafb", color: "#6b7280" }}
              />
              <p style={s.hint}>Set in Step 2. Go back if you need to change it.</p>
            </div>

            <div>
              <label style={s.label} htmlFor="to">
                To
              </label>
              <input
                id="to"
                type="email"
                value={toEmail}
                onChange={(e) => onToEmailChange(e.target.value)}
                placeholder="you@yourdomain.com"
                style={s.input}
                autoComplete="off"
                spellCheck={false}
              />
              <p style={s.hint}>
                {fromEmail === "onboarding@resend.dev"
                  ? "Must be the email you signed up to Resend with. (Sandbox restriction.)"
                  : "Any real address. Also try delivered@resend.dev — it's a test inbox that always accepts."}
              </p>
            </div>

            <div>
              <label style={s.label} htmlFor="customer">
                Customer name (shown in the email body)
              </label>
              <input
                id="customer"
                type="text"
                value={customerName}
                onChange={(e) => onCustomerNameChange(e.target.value)}
                style={s.input}
                autoComplete="off"
              />
            </div>
          </div>

          {!allPriorComplete && (
            <div style={s.callout}>
              <span style={s.calloutStrong}>Complete steps 1–4 first.</span>{" "}
              Mark each step complete using its button, then come back here to send.
            </div>
          )}

          <div style={s.actionsRow}>
            <button
              style={canSend ? s.primaryBtn : s.primaryBtnDisabled}
              disabled={!canSend}
              onClick={send}
            >
              {status.kind === "sending" ? "Sending…" : "Send the email"}
            </button>
          </div>

          {status.kind === "error" && (
            <div style={s.errorBanner}>
              <strong>Send failed:</strong> {status.message}
            </div>
          )}

          {status.kind === "success" && (
            <div style={s.successBanner}>
              <strong>✓ Sent.</strong> Resend message ID:{" "}
              <code style={{ fontSize: 12 }}>{status.id}</code>
              <br />
              <span style={{ fontSize: 13 }}>
                Check your inbox and{" "}
                <a
                  href="https://resend.com/emails"
                  target="_blank"
                  style={s.link}
                >
                  resend.com/emails
                </a>{" "}
                for the delivery log.
              </span>
            </div>
          )}
        </>
      )}

      {/* ── Route code ── */}
      {tab === "code" && (
        <div style={localStyles.codeViewer}>
          <div style={localStyles.codeBar}>
            <span style={localStyles.codeBarLabel}>
              app/api/send-billing-failure/route.ts
            </span>
            <span style={localStyles.codeBarBadge}>Next.js App Router</span>
          </div>
          {source === null ? (
            <div style={localStyles.loading}>Loading…</div>
          ) : (
            <pre style={localStyles.code}>
              <code>{source}</code>
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

const localStyles: Record<string, React.CSSProperties> = {
  tabBar: {
    display: "flex",
    gap: 4,
    borderBottom: "1px solid #e5e7eb",
    marginBottom: 24,
  },
  tab: {
    background: "transparent",
    border: "none",
    borderBottom: "2px solid transparent",
    marginBottom: -1,
    padding: "8px 14px",
    fontSize: 13,
    fontWeight: 500,
    color: "#6b7280",
    cursor: "pointer",
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  tabActive: {
    color: "#111827",
    borderBottomColor: "#111827",
  },
  filepath: {
    fontSize: 11,
    fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
    background: "#f3f4f6",
    border: "1px solid #e5e7eb",
    borderRadius: 4,
    padding: "1px 6px",
    color: "#6b7280",
  },
  codeViewer: {
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    overflow: "hidden",
  },
  codeBar: {
    background: "#f3f4f6",
    borderBottom: "1px solid #e5e7eb",
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  codeBarLabel: {
    fontSize: 12,
    fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
    color: "#374151",
  },
  codeBarBadge: {
    fontSize: 11,
    fontWeight: 600,
    background: "#111827",
    color: "#ffffff",
    borderRadius: 4,
    padding: "2px 8px",
    letterSpacing: "0.3px",
  },
  code: {
    margin: 0,
    padding: "20px 24px",
    fontSize: 12.5,
    lineHeight: 1.65,
    color: "#e2e8f0",
    fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
    whiteSpace: "pre",
    background: "#0f172a",
    overflowX: "auto",
    display: "block",
  },
  loading: {
    padding: 40,
    textAlign: "center",
    fontSize: 13,
    color: "#94a3b8",
    background: "#0f172a",
  },
};
