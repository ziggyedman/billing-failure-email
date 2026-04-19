"use client";

import { useEffect, useState } from "react";
import { stepStyles as s, CompletedBadge, NumberedSection } from "./step-styles";

interface StepTemplateProps {
  customerName: string;
  onCustomerNameChange: (v: string) => void;
  onComplete: () => void;
  alreadyCompleted: boolean;
}

type MainTab = "try" | "learn";
type ViewerTab = "preview" | "code";

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

const FIELDS: { key: keyof EmailValues; label: string; wide?: boolean }[] = [
  { key: "customerName",  label: "Customer name" },
  { key: "amount",        label: "Amount" },
  { key: "cardLast4",     label: "Card last 4" },
  { key: "failureReason", label: "Failure reason", wide: true },
  { key: "nextRetryDate", label: "Next retry" },
  { key: "companyName",   label: "Company name" },
];

export function StepTemplate({
  customerName,
  onCustomerNameChange,
  onComplete,
  alreadyCompleted,
}: StepTemplateProps) {
  const [mainTab, setMainTab] = useState<MainTab>("try");
  const [viewerTab, setViewerTab] = useState<ViewerTab>("code");
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
    if (viewerTab === "preview") setPreviewUrl(buildPreviewUrl(values));
  }, [viewerTab]);

  return (
    <div>
      {alreadyCompleted && <CompletedBadge />}

      {/* ── Main tab bar ── */}
      <div style={localStyles.mainTabBar}>
        <button
          style={{ ...localStyles.mainTab, ...(mainTab === "try" ? localStyles.mainTabActive : {}) }}
          onClick={() => setMainTab("try")}
        >
          Try it
        </button>
        <button
          style={{ ...localStyles.mainTab, ...(mainTab === "learn" ? localStyles.mainTabActive : {}) }}
          onClick={() => setMainTab("learn")}
        >
          How it's built
        </button>
      </div>

      {/* ══════════════ TRY IT ══════════════ */}
      {mainTab === "try" && (
        <>
          <p style={s.prose}>
            Edit the customer details below and click <strong>Apply</strong> to
            re-render the email. Switch to <strong>Preview</strong> to see it
            as the customer would, or stay on <strong>Code</strong> to see the
            send call with your values filled in.
          </p>

          {/* compact fields */}
          <div style={localStyles.fieldGrid}>
            {FIELDS.map(({ key, label, wide }) => (
              <div key={key} style={{ ...localStyles.field, ...(wide ? localStyles.fieldWide : {}) }}>
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
            <div style={localStyles.applyRow}>
              <button style={localStyles.applyBtn} onClick={applyPreview}>
                Apply →
              </button>
              <span style={localStyles.applyHint}>or press Enter in any field</span>
            </div>
          </div>

          {/* viewer */}
          <div style={localStyles.viewer}>
            <div style={localStyles.viewerBar}>
              <div style={localStyles.viewerDots}>
                <span style={localStyles.dot} />
                <span style={localStyles.dot} />
                <span style={localStyles.dot} />
                <span style={localStyles.viewerTitle}>
                  {viewerTab === "preview"
                    ? "Your payment didn't go through"
                    : "emails/billing-failure.tsx"}
                </span>
              </div>
              <div style={localStyles.viewerTabs}>
                <button
                  style={{ ...localStyles.viewerTab, ...(viewerTab === "code" ? localStyles.viewerTabActive : {}) }}
                  onClick={() => setViewerTab("code")}
                >
                  Code
                </button>
                <button
                  style={{
                    ...localStyles.viewerTab,
                    ...(viewerTab === "preview" ? localStyles.viewerTabActive : localStyles.viewerTabGlow),
                  }}
                  onClick={() => setViewerTab("preview")}
                >
                  Preview
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

            {viewerTab === "preview" && (
              <iframe
                key={previewUrl}
                src={previewUrl}
                style={localStyles.frame}
                title="Email preview"
              />
            )}
            {viewerTab === "code" && (
              <pre style={localStyles.code}>{buildCodeSnippet(values)}</pre>
            )}
          </div>

          <p style={s.hint}>
            The preview is server-rendered using React Email's{" "}
            <code>render()</code> — exactly what Resend delivers to the inbox.
            Run <code>npm run email</code> locally for hot-reload.
          </p>
        </>
      )}

      {/* ══════════════ HOW IT'S BUILT ══════════════ */}
      {mainTab === "learn" && (
        <>
          <p style={s.prose}>
            The template lives at{" "}
            <code style={s.inlineCode}>emails/billing-failure.tsx</code> — a
            single React component. Every value that changes per customer is a
            prop. Here's what each section of the email does:
          </p>

          <NumberedSection num={1} title="Preview text">
            <code style={s.inlineCode}>&lt;Preview&gt;</code> renders{" "}
            <em>hidden</em> text that email clients show as the inbox snippet —
            the line you see before opening a message. It's built from the
            amount and product name so the customer knows what happened without
            opening the email.
            <pre style={localStyles.mini}>{`<Preview>
  We couldn't process your payment of {currency} {amount}.
  Update your card to keep {productName} active.
</Preview>`}</pre>
          </NumberedSection>

          <NumberedSection num={2} title="Logo / product name">
            A <code style={s.inlineCode}>&lt;Section&gt;</code> at the top
            displays the product name as bold text. In a real deployment you'd
            swap this for an <code style={s.inlineCode}>&lt;Img&gt;</code> tag
            pointing to a hosted logo file.
          </NumberedSection>

          <NumberedSection num={3} title="Alert banner">
            A red-tinted <code style={s.inlineCode}>&lt;Section&gt;</code> with
            a warning icon and "Payment failed" text. It uses inline background
            and border colors because email clients ignore external stylesheets
            — every style in the template is an inline object for this reason.
          </NumberedSection>

          <NumberedSection num={4} title="Greeting & opening paragraph">
            A <code style={s.inlineCode}>&lt;Heading&gt;</code> addresses the
            customer by name, followed by a{" "}
            <code style={s.inlineCode}>&lt;Text&gt;</code> paragraph that states
            which card was charged and which plan it was for. Both pull directly
            from props so every email is personalised.
          </NumberedSection>

          <NumberedSection num={5} title="Payment details box">
            A grey-background <code style={s.inlineCode}>&lt;Section&gt;</code>{" "}
            shows four rows — Amount, Card, Reason, Next retry — separated by{" "}
            <code style={s.inlineCode}>&lt;Hr&gt;</code> dividers. Each row
            uses flexbox to push the label left and the value right.
            <pre style={localStyles.mini}>{`<Section style={detailsBox}>
  <Text>Amount    · {currency} {amount}</Text>
  <Hr />
  <Text>Card      · •••• {cardLast4}</Text>
  <Hr />
  <Text>Reason    · {failureReason}</Text>
  <Hr />
  <Text>Next retry · {nextRetryDate}</Text>
</Section>`}</pre>
          </NumberedSection>

          <NumberedSection num={6} title="CTA button">
            <code style={s.inlineCode}>&lt;Button href=&#123;updatePaymentUrl&#125;&gt;</code>{" "}
            is the primary action. React Email's{" "}
            <code style={s.inlineCode}>&lt;Button&gt;</code> outputs an anchor
            tag styled as a button — not an HTML{" "}
            <code style={s.inlineCode}>&lt;button&gt;</code>, which many email
            clients don't support. The URL is a prop so each customer can be
            sent to the right billing page.
          </NumberedSection>

          <NumberedSection num={7} title="Urgency paragraph">
            A short warning that if the retry also fails, the subscription will
            be paused. Placed after the button deliberately — it reinforces
            urgency without blocking the CTA.
          </NumberedSection>

          <NumberedSection num={8} title="Support link & footer" last>
            An <code style={s.inlineCode}>&lt;Hr&gt;</code> divider separates
            the main content from a support line using{" "}
            <code style={s.inlineCode}>&lt;Link&gt;</code>. Below that, a
            footer <code style={s.inlineCode}>&lt;Text&gt;</code> shows the
            company name and a one-line reason for receiving the email —
            required by anti-spam best practices.
          </NumberedSection>
        </>
      )}

      <div style={s.actionsRow}>
        <button style={s.primaryBtn} onClick={onComplete}>
          {alreadyCompleted ? "Continue" : "Got it — continue"}
        </button>
      </div>
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
  viewer: {
    border: "1px solid #e4e4e7",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 8,
    background: "#fafafa",
  },
  viewerBar: {
    background: "#f4f4f5",
    borderBottom: "1px solid #e4e4e7",
    padding: "0 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 40,
  },
  viewerDots: {
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
  viewerTitle: {
    marginLeft: 10,
    fontSize: 12,
    color: "#71717a",
    fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
  },
  viewerTabs: {
    display: "flex",
    gap: 2,
    alignItems: "center",
  },
  viewerTab: {
    background: "transparent",
    border: "none",
    borderRadius: 5,
    padding: "4px 12px",
    fontSize: 12,
    fontWeight: 500,
    color: "#71717a",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  viewerTabActive: {
    background: "#ffffff",
    color: "#18181b",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },
  viewerTabGlow: {
    background: "rgba(99,102,241,0.08)",
    color: "#6366f1",
    boxShadow: "0 0 0 1px rgba(99,102,241,0.3), 0 0 8px rgba(99,102,241,0.2)",
    borderRadius: 5,
    animation: "none",
  },
  downloadBtn: {
    fontSize: 12,
    fontWeight: 500,
    color: "#3f3f46",
    textDecoration: "none",
    border: "1px solid #e4e4e7",
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
    background: "#fafafa",
    display: "block",
  },
  code: {
    margin: 0,
    padding: "20px 24px",
    fontSize: 12.5,
    lineHeight: 1.65,
    color: "#e4e4e7",
    background: "#18181b",
    fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
    whiteSpace: "pre" as const,
    display: "block",
    overflowX: "auto" as const,
  },
  mini: {
    background: "#18181b",
    color: "#e4e4e7",
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
};
