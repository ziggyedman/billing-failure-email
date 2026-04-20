"use client";

import { useEffect, useState } from "react";
import { stepStyles as s, CompletedBadge, NumberedSection } from "./step-styles";
import { CodeBlock, FileCodeBlock } from "./code-block";

interface EmailValues {
  customerName: string;
  amount: string;
  cardLast4: string;
  failureReason: string;
  nextRetryDate: string;
  companyName: string;
}

const FIELDS: { key: keyof EmailValues; label: string; wide?: boolean }[] = [
  { key: "customerName",  label: "Customer name" },
  { key: "amount",        label: "Amount" },
  { key: "cardLast4",     label: "Card last 4" },
  { key: "failureReason", label: "Failure reason", wide: true },
  { key: "nextRetryDate", label: "Next retry" },
  { key: "companyName",   label: "Company name" },
];

function buildPreviewUrl(v: EmailValues): string {
  const p = new URLSearchParams({
    customerName:  v.customerName,
    amount:        v.amount,
    cardLast4:     v.cardLast4,
    failureReason: v.failureReason,
    nextRetryDate: v.nextRetryDate,
    companyName:   v.companyName,
    productName:   "Acme",
    planName:      "Pro",
    currency:      "USD",
    updatePaymentUrl: "https://example.com/billing",
    supportUrl:       "https://example.com/support",
  });
  return `/api/preview?${p.toString()}`;
}

function buildCodeSnippet(v: EmailValues, from: string): string {
  return `import { Resend } from "resend";
import BillingFailureEmail from "@/emails/billing-failure";

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "${from || "billing@yourdomain.com"}",
  to: ["customer@example.com"],
  subject: "Your payment didn't go through",
  react: BillingFailureEmail({
    customerName:     "${v.customerName}",
    productName:      "Acme",
    planName:         "Pro",
    amount:           "${v.amount}",
    currency:         "USD",
    cardLast4:        "${v.cardLast4}",
    failureReason:    "${v.failureReason}",
    nextRetryDate:    "${v.nextRetryDate}",
    companyName:      "${v.companyName}",
    updatePaymentUrl: "https://example.com/billing",
    supportUrl:       "https://example.com/support",
  }),
});`;
}

interface StepSendProps {
  apiKey: string;
  fromEmail: string;
  toEmail: string;
  emailValues: EmailValues;
  customTemplateHtml: string;
  customTemplateCode: string;
  completed: boolean[];
  onToEmailChange: (v: string) => void;
  onEmailValuesChange: (v: EmailValues) => void;
  onCustomHtmlChange: (html: string) => void;
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
  emailValues,
  customTemplateHtml,
  customTemplateCode,
  completed,
  onToEmailChange,
  onEmailValuesChange,
  onCustomHtmlChange,
  onComplete,
  alreadyCompleted,
}: StepSendProps) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [mainTab, setMainTab] = useState<MainTab>("send");
  const [sourceLines, setSourceLines] = useState<string[]>([]);
  const [values, setValues] = useState<EmailValues>(emailValues);
  const [defaultPreviewUrl, setDefaultPreviewUrl] = useState(() => buildPreviewUrl(emailValues));
  const [rerendering, setRerendering] = useState(false);

  function setField(key: keyof EmailValues, val: string) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  async function applyValues() {
    onEmailValuesChange(values);
    setDefaultPreviewUrl(buildPreviewUrl(values));
    if (customTemplateHtml && customTemplateCode) {
      setRerendering(true);
      try {
        const res = await fetch("/api/render-custom", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: customTemplateCode, props: values }),
        });
        const json = await res.json();
        if (!json.error) onCustomHtmlChange(json.html);
      } finally {
        setRerendering(false);
      }
    }
  }

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
        body: JSON.stringify({
          apiKey,
          from: fromEmail,
          to: toEmail,
          customerName:  values.customerName,
          amount:        values.amount,
          cardLast4:     values.cardLast4,
          failureReason: values.failureReason,
          nextRetryDate: values.nextRetryDate,
          companyName:   values.companyName,
          ...(customTemplateHtml ? { customHtml: customTemplateHtml } : {}),
        }),
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
          {/* ── Customer details + code snippet ── */}
          <p style={s.prose}>
            These fields represent the data your app already has about the customer at the moment
            a payment fails: their name, the charge amount, which card was on file, why it was
            declined, and when you will retry. In a real integration, these values come from your
            payment provider's webhook payload (for example, a Stripe{" "}
            <code style={s.inlineCode}>invoice.payment_failed</code> event) or from your own
            database record for that subscription. Edit the fields below to see how the template
            responds to different scenarios, then click <strong>Apply</strong>. The code snippet
            updates, the preview re-renders, and these are the exact values that will be passed as
            props to the email template when you send.
          </p>

          <div style={localStyles.fieldGrid}>
            {FIELDS.map(({ key, label, wide }) => (
              <div key={key} style={{ ...localStyles.field, ...(wide ? localStyles.fieldWide : {}) }}>
                <label style={localStyles.fieldLabel}>{label}</label>
                <input
                  style={localStyles.fieldInput}
                  value={values[key]}
                  onChange={(e) => setField(key, e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applyValues()}
                  spellCheck={false}
                />
              </div>
            ))}
            <div style={localStyles.applyRow}>
              <button
                style={rerendering ? { ...localStyles.applyBtn, opacity: 0.5, cursor: "not-allowed" } : localStyles.applyBtn}
                onClick={applyValues}
                disabled={rerendering}
              >
                {rerendering ? "Re-rendering…" : "Apply →"}
              </button>
              <span style={localStyles.applyHint}>
                {customTemplateHtml
                  ? "Re-renders your custom template with the updated values."
                  : "Updates the send call below."}
              </span>
            </div>
          </div>

          <div style={localStyles.codeViewer}>
            <div style={localStyles.codeViewerBar}>
              <div style={localStyles.codeViewerDots}>
                <span style={localStyles.dot} />
                <span style={localStyles.dot} />
                <span style={localStyles.dot} />
                <span style={localStyles.codeViewerTitle}>resend.emails.send(…)</span>
              </div>
            </div>
            <CodeBlock code={buildCodeSnippet(values, fromEmail)} />
          </div>

          <p style={s.hint}>
            <code style={s.inlineCode}>resend.emails.send()</code> is the single method from the Resend SDK that delivers an email.
            You pass it a <code style={s.inlineCode}>from</code> address (must be on your verified domain),
            a <code style={s.inlineCode}>to</code> array of recipients, a <code style={s.inlineCode}>subject</code> line,
            and either a <code style={s.inlineCode}>react:</code> prop with your template component or an <code style={s.inlineCode}>html:</code> prop with a raw HTML string.
            When you use <code style={s.inlineCode}>react:</code>, Resend converts the component to email-safe HTML automatically.
            The method returns a message ID you can use to track delivery in the Resend dashboard.
          </p>

          <div style={localStyles.sendDivider} />

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

          <div style={localStyles.previewPanel}>
            <div style={localStyles.previewBar}>
              <div style={localStyles.codeViewerDots}>
                <span style={localStyles.dot} />
                <span style={localStyles.dot} />
                <span style={localStyles.dot} />
                <span style={localStyles.codeViewerTitle}>
                  {customTemplateHtml ? "Your payment didn't go through (custom template)" : "Your payment didn't go through"}
                </span>
              </div>
              {customTemplateHtml && (
                <span style={localStyles.customBadge}>Custom</span>
              )}
            </div>
            {customTemplateHtml ? (
              <iframe
                srcDoc={customTemplateHtml}
                style={localStyles.previewFrame}
                title="Email preview"
                sandbox="allow-same-origin"
              />
            ) : (
              <iframe
                src={defaultPreviewUrl}
                style={localStyles.previewFrame}
                title="Email preview"
              />
            )}
          </div>

          {!allPriorComplete && (
            <div style={s.callout}>
              <span style={s.calloutStrong}>Complete steps 1, 2, and 3 first.</span>{" "}
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
            Email's <code style={s.inlineCode}>render()</code> internally,
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
  fieldGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "10px 14px",
    background: "#f4f4f5",
    border: "1px solid #e4e4e7",
    borderRadius: 8,
    padding: "16px 18px",
    marginBottom: 14,
  },
  field: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 4,
  },
  fieldWide: {
    gridColumn: "span 2",
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: 500,
    color: "#71717a",
    letterSpacing: "0.1px",
  },
  fieldInput: {
    fontSize: 13,
    padding: "5px 8px",
    border: "1px solid #e4e4e7",
    borderRadius: 5,
    fontFamily: "inherit",
    background: "#ffffff",
    color: "#18181b",
    width: "100%",
    boxSizing: "border-box" as const,
    outline: "none",
  },
  applyRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    gridColumn: "span 3",
    paddingTop: 4,
  },
  applyBtn: {
    fontSize: 13,
    fontWeight: 600,
    padding: "6px 16px",
    background: "#18181b",
    color: "#ffffff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  applyHint: {
    fontSize: 12,
    color: "#a1a1aa",
  },
  codeViewer: {
    border: "1px solid #e4e4e7",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 24,
    background: "#fafafa",
  },
  codeViewerBar: {
    background: "#f4f4f5",
    borderBottom: "1px solid #e4e4e7",
    padding: "0 12px",
    display: "flex",
    alignItems: "center",
    minHeight: 40,
  },
  codeViewerDots: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#d4d4d8",
    flexShrink: 0,
  },
  codeViewerTitle: {
    marginLeft: 10,
    fontSize: 12,
    color: "#71717a",
    fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
  },
  sendDivider: {
    borderTop: "1px solid #e4e4e7",
    marginBottom: 24,
  },
  previewPanel: {
    border: "1px solid #e4e4e7",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 20,
  },
  previewBar: {
    background: "#f4f4f5",
    borderBottom: "1px solid #e4e4e7",
    padding: "0 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 40,
  },
  previewFrame: {
    width: "100%",
    height: 380,
    border: "none",
    display: "block",
    background: "#f6f7f9",
  },
  customBadge: {
    fontSize: 11,
    fontWeight: 600,
    color: "#625DF5",
    background: "rgba(98,93,245,0.08)",
    border: "1px solid rgba(98,93,245,0.25)",
    borderRadius: 4,
    padding: "2px 8px",
  },
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
