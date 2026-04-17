"use client";

import { useState } from "react";
import { stepStyles as s, CompletedBadge } from "./step-styles";

interface StepSendProps {
  apiKey: string;
  fromEmail: string;
  toEmail: string;
  customerName: string;
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

export function StepSend({
  apiKey,
  fromEmail,
  toEmail,
  customerName,
  onToEmailChange,
  onCustomerNameChange,
  onComplete,
  alreadyCompleted,
}: StepSendProps) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const canSend =
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
        This is the moment of truth. Fill in the recipient, tweak the customer
        name if you like, and hit send. Behind the scenes the app calls{" "}
        <code style={s.inlineCode}>POST /api/send-billing-failure</code>, which
        runs this code:
      </p>

      <pre style={s.codeBlock}>
{`const resend = new Resend(apiKey);

await resend.emails.send({
  from,                              // your verified address
  to: [to],                          // recipient
  subject: "Your payment didn't go through",
  react: BillingFailureEmail({ customerName, ... }),
});`}
      </pre>

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
          <p style={s.hint}>
            Set in Step 2. Go back if you need to change it.
          </p>
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
            Check your inbox (and{" "}
            <a
              href="https://resend.com/emails"
              target="_blank"
              style={s.link}
            >
              resend.com/emails
            </a>{" "}
            for the delivery log). That's the tutorial. 🎉
          </span>
        </div>
      )}
    </div>
  );
}
