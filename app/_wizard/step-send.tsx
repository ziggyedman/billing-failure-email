"use client";

import { useState } from "react";
import { stepStyles as s, CompletedBadge } from "./step-styles";

interface StepSendProps {
  apiKey: string;
  fromEmail: string;
  toEmail: string;
  customerName: string;
  completed: boolean[];
  onToEmailChange: (v: string) => void;
  onComplete: () => void;
  alreadyCompleted: boolean;
}

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; id: string }
  | { kind: "error"; message: string };

export function StepSend({
  apiKey,
  fromEmail,
  toEmail,
  customerName,
  completed,
  onToEmailChange,
  onComplete,
  alreadyCompleted,
}: StepSendProps) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

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
        body: JSON.stringify({ apiKey, from: fromEmail, to: toEmail, customerName }),
      });
      const json = await res.json();
      if (!res.ok) {
        const msg =
          json?.error?.message ||
          (typeof json?.error === "string" ? json.error : "Send failed.");
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
        Hitting <strong>Send</strong> at the bottom of this page fires a{" "}
        <code style={s.inlineCode}>POST</code> to{" "}
        <code style={s.inlineCode}>app/api/send-billing-failure/route.ts</code>{" "}
        — a Next.js App Router route that calls the Resend SDK. Here's exactly
        what that route does, step by step.
      </p>

      {/* ── Route explanation ── */}
      <div style={localStyles.section}>
        <div style={localStyles.sectionNum}>1</div>
        <div style={localStyles.sectionContent}>
          <div style={localStyles.sectionTitle}>Parse the request & apply fallbacks</div>
          <p style={localStyles.sectionProse}>
            The route reads the JSON body sent by the browser. For each field it
            prefers the value from the request, then falls back to environment
            variables. This lets the app run in two modes: users supply their
            own API key (tutorial mode), or the deployer pre-sets one via{" "}
            <code style={s.inlineCode}>RESEND_API_KEY</code> (shared demo mode).
          </p>
          <pre style={localStyles.code}>{`const body   = await request.json();
const apiKey = body.apiKey?.trim() || process.env.RESEND_API_KEY;
const from   = body.from?.trim()   || process.env.FROM_EMAIL
                                    || "onboarding@resend.dev";
const to     = body.to?.trim();`}</pre>
        </div>
      </div>

      <div style={localStyles.section}>
        <div style={localStyles.sectionNum}>2</div>
        <div style={localStyles.sectionContent}>
          <div style={localStyles.sectionTitle}>Instantiate the Resend client</div>
          <p style={localStyles.sectionProse}>
            A new <code style={s.inlineCode}>Resend</code> instance is created
            on every request using the resolved API key. There's no shared
            singleton — each call gets its own authenticated client, which keeps
            the code simple and stateless.
          </p>
          <pre style={localStyles.code}>{`const resend = new Resend(apiKey);`}</pre>
        </div>
      </div>

      <div style={localStyles.section}>
        <div style={localStyles.sectionNum}>3</div>
        <div style={localStyles.sectionContent}>
          <div style={localStyles.sectionTitle}>Send the email using the React Email template</div>
          <p style={localStyles.sectionProse}>
            This is where everything comes together. The{" "}
            <code style={s.inlineCode}>react:</code> prop accepts the{" "}
            <code style={s.inlineCode}>BillingFailureEmail</code> component
            directly — the Resend SDK calls React Email's{" "}
            <code style={s.inlineCode}>render()</code> internally to convert it
            to HTML and auto-generates a plain-text fallback. You don't have to
            write HTML or manage two versions of the content.
          </p>
          <pre style={localStyles.code}>{`const { data, error } = await resend.emails.send({
  from,
  to: [to],
  subject: "Your payment didn't go through",
  react: BillingFailureEmail({
    customerName,
    amount:           "29.00",
    currency:         "USD",
    cardLast4:        "4242",
    failureReason:    "Card declined (insufficient_funds).",
    nextRetryDate:    "in 3 days",
    updatePaymentUrl: "https://example.com/billing",
    supportUrl:       "https://example.com/support",
  }),
});`}</pre>
        </div>
      </div>

      <div style={{ ...localStyles.section, marginBottom: 0 }}>
        <div style={localStyles.sectionNum}>4</div>
        <div style={localStyles.sectionContent}>
          <div style={localStyles.sectionTitle}>Return the result</div>
          <p style={localStyles.sectionProse}>
            On success, Resend returns a message ID you can look up in the{" "}
            <a href="https://resend.com/emails" target="_blank" style={s.link}>
              Resend dashboard
            </a>
            . On failure, the error message tells you exactly what went wrong —
            invalid key, unverified domain, rate limit, etc.
          </p>
          <pre style={localStyles.code}>{`if (error) return Response.json({ error }, { status: 500 });
return Response.json(data); // { id: "msg_xxxxxxxxxxxx" }`}</pre>
        </div>
      </div>

      {/* ── Send form ── */}
      <div style={localStyles.divider} />

      <p style={s.prose}>
        Fill in the recipient address and fire a real send. The email will use{" "}
        <strong>{customerName || "the customer name"}</strong> set in Step 3.
      </p>

      <div style={s.fieldGrid}>
        <div>
          <label style={s.label} htmlFor="from">From</label>
          <input
            id="from"
            type="email"
            value={fromEmail}
            readOnly
            style={{ ...s.input, background: "#f4f4f5", color: "#71717a" }}
          />
          <p style={s.hint}>Set in Step 2. Go back if you need to change it.</p>
        </div>
        <div>
          <label style={s.label} htmlFor="to">To</label>
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
            {!fromEmail || fromEmail === "onboarding@resend.dev"
              ? "Must be the email you signed up to Resend with (sandbox restriction)."
              : "Any real address. Try delivered@resend.dev for a safe test inbox."}
          </p>
        </div>
      </div>

      {!allPriorComplete && (
        <div style={s.callout}>
          <span style={s.calloutStrong}>Complete steps 1–3 first.</span>{" "}
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
          <strong>✓ Sent.</strong> Message ID:{" "}
          <code style={{ fontSize: 12 }}>{status.id}</code>
          <br />
          <span style={{ fontSize: 13 }}>
            Check your inbox and{" "}
            <a href="https://resend.com/emails" target="_blank" style={s.link}>
              resend.com/emails
            </a>{" "}
            for the delivery log.
          </span>
        </div>
      )}
    </div>
  );
}

const localStyles: Record<string, React.CSSProperties> = {
  section: {
    display: "flex",
    gap: 16,
    marginBottom: 28,
  },
  sectionNum: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    background: "#18181b",
    color: "#ffffff",
    fontSize: 11,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 2,
  },
  sectionContent: {
    flex: 1,
    minWidth: 0,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#18181b",
    marginBottom: 6,
    letterSpacing: "-0.1px",
  },
  sectionProse: {
    fontSize: 13,
    lineHeight: 1.7,
    color: "#3f3f46",
    margin: "0 0 10px",
  },
  code: {
    background: "#18181b",
    color: "#e4e4e7",
    padding: "14px 16px",
    borderRadius: 7,
    fontSize: 12,
    lineHeight: 1.65,
    fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
    whiteSpace: "pre" as const,
    overflowX: "auto" as const,
    display: "block",
    margin: 0,
    border: "1px solid #27272a",
  },
  divider: {
    borderTop: "1px solid #e4e4e7",
    margin: "32px 0",
  },
};
