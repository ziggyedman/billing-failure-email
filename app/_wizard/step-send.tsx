"use client";

import { useEffect, useState } from "react";
import { stepStyles as s, CompletedBadge, NumberedSection } from "./step-styles";
import { FileCodeBlock } from "./code-block";

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

type MainTab = "send" | "learn";

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
  const [mainTab, setMainTab] = useState<MainTab>("send");
  const [sourceLines, setSourceLines] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/source?file=send-route")
      .then((r) => r.text())
      .then((src) => setSourceLines(src.split("\n")));
  }, []);

  function lines(start: number, end: number): string {
    if (!sourceLines.length) return "Loading…";
    return sourceLines.slice(start - 1, end).join("\n");
  }

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

      {/* ── Main tab bar ── */}
      <div style={localStyles.mainTabBar}>
        <button
          style={{ ...localStyles.mainTab, ...(mainTab === "send" ? localStyles.mainTabActive : {}) }}
          onClick={() => setMainTab("send")}
        >
          Send
        </button>
        <button
          style={{ ...localStyles.mainTab, ...(mainTab === "learn" ? localStyles.mainTabActive : {}) }}
          onClick={() => setMainTab("learn")}
        >
          How it's built
        </button>
      </div>

      {/* ══════════════ SEND ══════════════ */}
      {mainTab === "send" && (
        <>
          <p style={s.prose}>
            Enter a recipient address and click <strong>Send the email</strong>.
            The app will use your API key from Step 1 to authenticate with
            Resend, send from the address you verified in Step 2, and deliver
            the billing failure email with the details you set in Step 3.
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
                placeholder="recipient@example.com"
                style={s.input}
                autoComplete="off"
                spellCheck={false}
              />
              <p style={s.hint}>
                {!fromEmail || fromEmail === "onboarding@resend.dev"
                  ? "Must be the email you signed up to Resend with (sandbox restriction)."
                  : "Any real address. Use delivered@resend.dev for a safe test that won't land in a real inbox."}
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
        </>
      )}

      {/* ══════════════ HOW IT'S BUILT ══════════════ */}
      {mainTab === "learn" && (
        <>
          <p style={s.prose}>
            When you click Send, the browser calls a Next.js API route that
            uses the Resend SDK to deliver the email. The route lives at{" "}
            <code style={s.inlineCode}>
              app/api/send-billing-failure/route.ts
            </code>
            . Here's exactly what it does:
          </p>

          <NumberedSection num={1} title="Receive and unpack the request">
            The browser sends your API key, from address, recipient, and
            customer name as a JSON body. The route reads each field and falls
            back to environment variables if any are missing. So the app works
            whether the user pastes their own key in Step 1 or the deployer
            pre-sets one on the server.
            <FileCodeBlock filename="app/api/send-billing-failure/route.ts" code={lines(17, 45)} startLine={17} />
          </NumberedSection>

          <NumberedSection num={2} title="Authenticate with the Resend SDK">
            A Resend client is created using the resolved API key. This
            authenticates the request. Resend verifies the key against your
            account and allows sending from your verified domain. A new client
            is created per request so there's no shared state between calls.
            <FileCodeBlock filename="app/api/send-billing-failure/route.ts" code={lines(1, 2)} startLine={1} />
            <FileCodeBlock filename="app/api/send-billing-failure/route.ts" code={lines(47, 47)} startLine={47} />
          </NumberedSection>

          <NumberedSection num={3} title="Render the email template and send">
            The billing failure React component from Step 3 is passed directly
            to <code style={s.inlineCode}>resend.emails.send()</code> via the{" "}
            <code style={s.inlineCode}>react:</code> prop. Resend calls React
            Email's <code style={s.inlineCode}>render()</code> internally —
            converting the component to HTML and generating a plain-text
            fallback automatically. The customer details (name, amount, card,
            reason, retry date) are injected at send time.
            <FileCodeBlock filename="app/api/send-billing-failure/route.ts" code={lines(2, 2)} startLine={2} />
            <FileCodeBlock filename="app/api/send-billing-failure/route.ts" code={lines(49, 66)} startLine={49} />
          </NumberedSection>

          <NumberedSection num={4} title="Handle the response">
            If the send succeeds, Resend returns a unique message ID. The route
            passes it back to the browser, where it's shown as a confirmation.
            If anything goes wrong. Wrong API key, unverified domain, invalid
            recipient, rate limit. The error message from Resend is surfaced
            directly so you know exactly what to fix.
            <FileCodeBlock filename="app/api/send-billing-failure/route.ts" code={lines(68, 72)} startLine={68} />
          </NumberedSection>

          <NumberedSection num={5} title="Track the send in Resend" last>
            Every sent email appears in the{" "}
            <a href="https://resend.com/emails" target="_blank" style={s.link}>
              Resend dashboard
            </a>{" "}
            under Emails, searchable by message ID. The dashboard shows the
            delivery status (delivered, bounced, complained), the rendered HTML,
            and timestamps. In a production setup you'd also receive webhook
            events for each status change so your system can react. For
            example, pausing the subscription after a confirmed bounce.
          </NumberedSection>
        </>
      )}
    </div>
  );
}

const localStyles: Record<string, React.CSSProperties> = {
  mainTabBar: {
    display: "flex",
    gap: 2,
    borderBottom: "1px solid #e4e4e7",
    marginBottom: 24,
  },
  mainTab: {
    background: "transparent",
    border: "none",
    borderBottom: "2px solid transparent",
    marginBottom: -1,
    padding: "8px 16px",
    fontSize: 13,
    fontWeight: 500,
    color: "#71717a",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "color 120ms ease",
  },
  mainTabActive: {
    color: "#18181b",
    borderBottomColor: "#18181b",
  },
};
