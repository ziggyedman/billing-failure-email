"use client";

import { useEffect, useState } from "react";
import { stepStyles as s, CompletedBadge } from "./step-styles";

interface StepTemplateProps {
  onComplete: () => void;
  alreadyCompleted: boolean;
}

type Tab = "preview" | "code";

interface EmailValues {
  customerName: string;
  amount: string;
  cardLast4: string;
  failureReason: string;
  nextRetryDate: string;
  companyName: string;
}

const DEFAULTS: EmailValues = {
  customerName:  "Alex",
  amount:        "29.00",
  cardLast4:     "4242",
  failureReason: "Your card was declined (insufficient_funds).",
  nextRetryDate: "in 3 days",
  companyName:   "Acme, Inc.",
};

function buildPreviewUrl(values: EmailValues): string {
  const p = new URLSearchParams({
    ...values,
    productName: "Acme",
    planName: "Pro",
    currency: "USD",
    updatePaymentUrl: "https://example.com/billing",
    supportUrl: "https://example.com/support",
  });
  return `/api/preview?${p.toString()}`;
}

function buildCodeSnippet(values: EmailValues): string {
  return `import { Resend } from "resend";
import BillingFailureEmail from "@/emails/billing-failure";

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "billing@yourdomain.com",
  to: ["customer@example.com"],
  subject: "Your payment didn't go through",
  react: BillingFailureEmail({
    customerName:     "${values.customerName}",
    productName:      "Acme",
    planName:         "Pro",
    amount:           "${values.amount}",
    currency:         "USD",
    cardLast4:        "${values.cardLast4}",
    failureReason:    "${values.failureReason}",
    nextRetryDate:    "${values.nextRetryDate}",
    companyName:      "${values.companyName}",
    updatePaymentUrl: "https://example.com/billing",
    supportUrl:       "https://example.com/support",
  }),
});`;
}

const FIELDS: { key: keyof EmailValues; label: string }[] = [
  { key: "customerName",  label: "Customer name" },
  { key: "amount",        label: "Amount" },
  { key: "cardLast4",     label: "Card last 4" },
  { key: "failureReason", label: "Failure reason" },
  { key: "nextRetryDate", label: "Next retry" },
  { key: "companyName",   label: "Company name" },
];

export function StepTemplate({
  onComplete,
  alreadyCompleted,
}: StepTemplateProps) {
  const [tab, setTab] = useState<Tab>("preview");
  const [values, setValues] = useState<EmailValues>(DEFAULTS);
  const [previewUrl, setPreviewUrl] = useState(() => buildPreviewUrl(DEFAULTS));

  function set(key: keyof EmailValues, val: string) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  function applyPreview() {
    setPreviewUrl(buildPreviewUrl(values));
  }

  useEffect(() => {
    if (tab === "preview") setPreviewUrl(buildPreviewUrl(values));
  }, [tab]);

  return (
    <div>
      {alreadyCompleted && <CompletedBadge />}

      <p style={s.prose}>
        The billing failure email is a <strong>React component</strong> built
        with{" "}
        <a href="https://react.email" target="_blank" rel="noreferrer" style={s.link}>
          React Email
        </a>
        . Everything that varies per customer — name, amount, card, failure
        reason — is passed as a prop. Edit the values below and hit{" "}
        <strong>Apply</strong> to see the changes reflected in the preview and
        the generated code.
      </p>

      {/* editable fields */}
      <div style={localStyles.fieldGrid}>
        {FIELDS.map(({ key, label }) => (
          <div key={key} style={localStyles.fieldRow}>
            <label style={localStyles.fieldLabel}>{label}</label>
            <input
              style={localStyles.fieldInput}
              value={values[key]}
              onChange={(e) => set(key, e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyPreview()}
              spellCheck={false}
            />
          </div>
        ))}
        <div style={localStyles.fieldRow}>
          <span />
          <button style={localStyles.applyBtn} onClick={applyPreview}>
            Apply →
          </button>
        </div>
      </div>

      {/* viewer */}
      <div style={localStyles.viewer}>
        <div style={localStyles.tabBar}>
          <div style={localStyles.tabBarLeft}>
            <span style={localStyles.dot} />
            <span style={localStyles.dot} />
            <span style={localStyles.dot} />
            <span style={localStyles.barTitle}>
              {tab === "preview"
                ? "Your payment didn't go through"
                : "emails/billing-failure.tsx"}
            </span>
          </div>
          <div style={localStyles.tabs}>
            <button
              style={{ ...localStyles.tab, ...(tab === "preview" ? localStyles.tabActive : {}) }}
              onClick={() => setTab("preview")}
            >
              Preview
            </button>
            <button
              style={{ ...localStyles.tab, ...(tab === "code" ? localStyles.tabActive : {}) }}
              onClick={() => setTab("code")}
            >
              Code
            </button>
            <a
              href="/api/source?file=email-template"
              download="billing-failure.tsx"
              style={localStyles.downloadBtn}
            >
              ↓ Download
            </a>
          </div>
        </div>

        {tab === "preview" && (
          <iframe
            key={previewUrl}
            src={previewUrl}
            style={localStyles.frame}
            title="Email preview"
          />
        )}

        {tab === "code" && (
          <div style={localStyles.codeWrap}>
            <pre style={localStyles.code}>
              <code>{buildCodeSnippet(values)}</code>
            </pre>
          </div>
        )}
      </div>

      <p style={s.hint}>
        The preview calls <code>/api/preview</code>, which renders the React
        Email component server-side — the same output Resend delivers. The{" "}
        <strong>Code</strong> tab shows the send call with your current values
        filled in. Run <code>npm run email</code> locally for React Email's dev
        server with hot reload.
      </p>

      <div style={s.actionsRow}>
        <button style={s.primaryBtn} onClick={onComplete}>
          {alreadyCompleted ? "Continue" : "Got it — continue"}
        </button>
      </div>
    </div>
  );
}

const localStyles: Record<string, React.CSSProperties> = {
  fieldGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px 20px",
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: "16px 20px",
    marginBottom: 16,
  },
  fieldRow: {
    display: "grid",
    gridTemplateColumns: "120px 1fr",
    alignItems: "center",
    gap: 8,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: 500,
    color: "#6b7280",
    whiteSpace: "nowrap",
  },
  fieldInput: {
    fontSize: 13,
    padding: "5px 8px",
    border: "1px solid #d1d5db",
    borderRadius: 5,
    fontFamily: "inherit",
    background: "#ffffff",
    color: "#111827",
    width: "100%",
    boxSizing: "border-box" as const,
  },
  applyBtn: {
    fontSize: 13,
    fontWeight: 600,
    padding: "5px 14px",
    background: "#111827",
    color: "#ffffff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    fontFamily: "inherit",
    justifySelf: "start",
  },
  viewer: {
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    overflow: "hidden",
    margin: "0 0 8px",
    background: "#f6f7f9",
  },
  tabBar: {
    background: "#f3f4f6",
    borderBottom: "1px solid #e5e7eb",
    padding: "0 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 40,
  },
  tabBarLeft: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#d1d5db",
    flexShrink: 0,
  },
  barTitle: {
    marginLeft: 10,
    fontSize: 12,
    color: "#6b7280",
    fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
  },
  tabs: {
    display: "flex",
    gap: 2,
  },
  tab: {
    background: "transparent",
    border: "none",
    borderRadius: 5,
    padding: "4px 12px",
    fontSize: 12,
    fontWeight: 500,
    color: "#6b7280",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  tabActive: {
    background: "#ffffff",
    color: "#111827",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },
  downloadBtn: {
    fontSize: 12,
    fontWeight: 500,
    color: "#374151",
    textDecoration: "none",
    border: "1px solid #d1d5db",
    borderRadius: 5,
    padding: "3px 10px",
    marginLeft: 6,
    background: "#ffffff",
    display: "inline-flex",
    alignItems: "center",
  },
  frame: {
    width: "100%",
    height: 560,
    border: "none",
    background: "#f6f7f9",
    display: "block",
  },
  codeWrap: {
    background: "#0f172a",
  },
  code: {
    margin: 0,
    padding: "20px 24px",
    fontSize: 12.5,
    lineHeight: 1.65,
    color: "#e2e8f0",
    fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
    whiteSpace: "pre",
    display: "block",
  },
};
