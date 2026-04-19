"use client";

import { useEffect, useState } from "react";
import { stepStyles as s, CompletedBadge } from "./step-styles";

interface StepTemplateProps {
  customerName: string;
  onCustomerNameChange: (v: string) => void;
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
  customerName,
  onCustomerNameChange,
  onComplete,
  alreadyCompleted,
}: StepTemplateProps) {
  const [tab, setTab] = useState<Tab>("preview");
  const [values, setValues] = useState<EmailValues>({ ...DEFAULTS, customerName });
  const [previewUrl, setPreviewUrl] = useState(() => buildPreviewUrl({ ...DEFAULTS, customerName }));

  function set(key: keyof EmailValues, val: string) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  function applyPreview() {
    setPreviewUrl(buildPreviewUrl(values));
    onCustomerNameChange(values.customerName);
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

      {/* template walkthrough */}
      <h3 style={s.h3}>How the template is built</h3>
      <p style={s.prose}>
        The file <code style={s.inlineCode}>emails/billing-failure.tsx</code> is
        a single React component. Here's what each section does:
      </p>

      <div style={localStyles.section}>
        <div style={localStyles.sectionLabel}>1 · Preview text</div>
        <div style={localStyles.sectionBody}>
          <code style={s.inlineCode}>&lt;Preview&gt;</code> renders{" "}
          <em>hidden</em> text that email clients show as the inbox snippet —
          the line you see before opening a message. It's built from the amount
          and product name so the customer immediately knows what happened
          without opening the email.
          <pre style={localStyles.mini}>{`<Preview>
  We couldn't process your payment of {currency} {amount}.
  Update your card to keep {productName} active.
</Preview>`}</pre>
        </div>
      </div>

      <div style={localStyles.section}>
        <div style={localStyles.sectionLabel}>2 · Logo / product name</div>
        <div style={localStyles.sectionBody}>
          A <code style={s.inlineCode}>&lt;Section&gt;</code> at the top
          displays the product name as bold text. In a real deployment you'd
          swap this for an <code style={s.inlineCode}>&lt;Img&gt;</code> tag
          pointing to a hosted logo file.
        </div>
      </div>

      <div style={localStyles.section}>
        <div style={localStyles.sectionLabel}>3 · Alert banner</div>
        <div style={localStyles.sectionBody}>
          A red-tinted <code style={s.inlineCode}>&lt;Section&gt;</code> with a
          warning icon and "Payment failed" text. It uses inline background and
          border colors because email clients ignore external stylesheets — every
          style in the template is written as an inline object for this reason.
        </div>
      </div>

      <div style={localStyles.section}>
        <div style={localStyles.sectionLabel}>4 · Greeting & opening paragraph</div>
        <div style={localStyles.sectionBody}>
          A <code style={s.inlineCode}>&lt;Heading&gt;</code> addresses the
          customer by name, followed by a <code style={s.inlineCode}>&lt;Text&gt;</code>{" "}
          paragraph that states which card was charged and which plan it was for.
          Both pull directly from props so every email is personalised.
        </div>
      </div>

      <div style={localStyles.section}>
        <div style={localStyles.sectionLabel}>5 · Payment details box</div>
        <div style={localStyles.sectionBody}>
          A grey-background <code style={s.inlineCode}>&lt;Section&gt;</code>{" "}
          shows four rows — Amount, Card, Reason, Next retry — separated by{" "}
          <code style={s.inlineCode}>&lt;Hr&gt;</code> dividers. Each row uses
          flexbox to push the label left and the value right. This gives the
          customer all the facts they need to decide whether to update their card
          or contact support.
          <pre style={localStyles.mini}>{`<Section style={detailsBox}>
  <Text>Amount    · {currency} {amount}</Text>
  <Hr />
  <Text>Card      · •••• {cardLast4}</Text>
  <Hr />
  <Text>Reason    · {failureReason}</Text>
  <Hr />
  <Text>Next retry · {nextRetryDate}</Text>
</Section>`}</pre>
        </div>
      </div>

      <div style={localStyles.section}>
        <div style={localStyles.sectionLabel}>6 · CTA button</div>
        <div style={localStyles.sectionBody}>
          <code style={s.inlineCode}>&lt;Button href=&#123;updatePaymentUrl&#125;&gt;</code>{" "}
          is the primary action. React Email's{" "}
          <code style={s.inlineCode}>&lt;Button&gt;</code> outputs an anchor tag
          styled as a button — not an HTML{" "}
          <code style={s.inlineCode}>&lt;button&gt;</code>, which many email
          clients don't support. The URL is passed as a prop so each customer
          can be sent to the right billing page.
        </div>
      </div>

      <div style={localStyles.section}>
        <div style={localStyles.sectionLabel}>7 · Urgency paragraph</div>
        <div style={localStyles.sectionBody}>
          A short follow-up warning that if the retry also fails, the
          subscription will be paused. This is placed after the button
          deliberately — it reinforces urgency without blocking the CTA.
        </div>
      </div>

      <div style={localStyles.section}>
        <div style={localStyles.sectionLabel}>8 · Support link & footer</div>
        <div style={localStyles.sectionBody}>
          An <code style={s.inlineCode}>&lt;Hr&gt;</code> divider separates the
          main content from a smaller support line using{" "}
          <code style={s.inlineCode}>&lt;Link&gt;</code>. Below that, a footer{" "}
          <code style={s.inlineCode}>&lt;Text&gt;</code> shows the company name
          and a one-line reason for receiving the email — required by
          anti-spam best practices.
        </div>
      </div>

      <h3 style={s.h3}>Try it — edit values and apply</h3>
      <p style={s.prose}>
        Edit any field below and click <strong>Apply</strong> (or press Enter)
        to re-render the email with your values. Switch to{" "}
        <strong>Code</strong> to see the send call with your values filled in.
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
  section: {
    borderLeft: "3px solid #e5e7eb",
    paddingLeft: 14,
    marginBottom: 18,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
    color: "#6b7280",
    marginBottom: 6,
  },
  sectionBody: {
    fontSize: 14,
    lineHeight: 1.65,
    color: "#374151",
  },
  mini: {
    background: "#0f172a",
    color: "#e2e8f0",
    fontSize: 12,
    lineHeight: 1.55,
    padding: "10px 14px",
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 0,
    fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
    whiteSpace: "pre" as const,
    overflowX: "auto" as const,
  },
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
