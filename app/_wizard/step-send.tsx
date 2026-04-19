"use client";

import { useState } from "react";
import { stepStyles as s, CompletedBadge, NumberedSection } from "./step-styles";

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
  const [showCode, setShowCode] = useState(false);

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
        You're ready to send a real billing failure email. Enter the recipient
        address below and click <strong>Send the email</strong>. The email will
        be personalised with{" "}
        <strong>{customerName || "the customer name"}</strong> from Step 3 and
        sent from the address you verified in Step 2.
      </p>

      {/* ── Send form ── */}
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
              : "Any real address. Try delivered@resend.dev for a safe test that won't land in a real inbox."}
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

      {/* ── Collapsible technical detail ── */}
      <div style={localStyles.divider} />

      <button style={localStyles.toggleBtn} onClick={() => setShowCode((v) => !v)}>
        <span style={localStyles.toggleIcon}>{showCode ? "▲" : "▼"}</span>
        How it works under the hood
      </button>

      {showCode && (
        <div style={localStyles.codeSection}>
          <p style={s.prose}>
            When you click Send, the browser packages your details and sends
            them to a Next.js API route. That route uses the Resend SDK to
            deliver the email. Here's each step:
          </p>

          <NumberedSection num={1} title="Your details are sent to an API route">
            The app sends your API key, from address, recipient, and customer
            name to{" "}
            <code style={s.inlineCode}>
              /api/send-billing-failure
            </code>
            . If the API key field is empty, the route falls back to the{" "}
            <code style={s.inlineCode}>RESEND_API_KEY</code> environment
            variable set on the server — so the app works in both tutorial mode
            and shared-deploy mode.
            <pre style={localStyles.code}>{`const body   = await request.json();
const apiKey = body.apiKey?.trim() || process.env.RESEND_API_KEY;
const from   = body.from?.trim()   || process.env.FROM_EMAIL
                                    || "onboarding@resend.dev";
const to     = body.to?.trim();`}</pre>
          </NumberedSection>

          <NumberedSection num={2} title="The route connects to Resend">
            A Resend client is created using your API key. This is what
            authenticates the request — Resend checks the key and routes the
            email through your verified sending domain.
            <pre style={localStyles.code}>{`const resend = new Resend(apiKey);`}</pre>
          </NumberedSection>

          <NumberedSection num={3} title="The email template is rendered and sent">
            The billing failure email component from Step 3 is passed directly
            to Resend's send method. Resend converts it to HTML automatically —
            no manual rendering needed. The subject line, from, and to are set
            here too.
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
          </NumberedSection>

          <NumberedSection num={4} title="You get a confirmation or an error" last>
            If the send works, Resend returns a unique message ID you can track
            in the{" "}
            <a href="https://resend.com/emails" target="_blank" style={s.link}>
              Resend dashboard
            </a>
            . If something goes wrong — wrong API key, unverified domain, rate
            limit — the error message tells you exactly what to fix.
            <pre style={localStyles.code}>{`if (error) return Response.json({ error }, { status: 500 });
return Response.json(data); // { id: "msg_xxxxxxxxxxxx" }`}</pre>
          </NumberedSection>
        </div>
      )}
    </div>
  );
}

const localStyles: Record<string, React.CSSProperties> = {
  divider: {
    borderTop: "1px solid #e4e4e7",
    margin: "28px 0 20px",
  },
  toggleBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "transparent",
    border: "none",
    padding: 0,
    fontSize: 13,
    fontWeight: 600,
    color: "#3f3f46",
    cursor: "pointer",
    fontFamily: "inherit",
    marginBottom: 20,
  },
  toggleIcon: {
    fontSize: 10,
    color: "#a1a1aa",
  },
  codeSection: {
    borderLeft: "2px solid #e4e4e7",
    paddingLeft: 20,
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
    margin: "10px 0 0",
    border: "1px solid #27272a",
  },
};
