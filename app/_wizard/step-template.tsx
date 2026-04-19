"use client";

import { useEffect, useRef, useState } from "react";
import { stepStyles as s, CompletedBadge } from "./step-styles";
import { CodeBlock } from "./code-block";

interface StepTemplateProps {
  customerName: string;
  onComplete: () => void;
  alreadyCompleted: boolean;
  customTemplateCode: string;
  onCustomTemplateCodeChange: (code: string) => void;
  onCustomHtmlChange: (html: string | null) => void;
}

type MainTab = "try" | "learn";
type ViewerTab = "preview" | "template";

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

interface ComponentEntry {
  name: string;
  tag: string;
  badge: string;
  description: string;
  when: string;
  pasteHint: string;
  needsImport: boolean; // true = not in the template yet, user must add to import
  snippet: string;
}

const COMPONENTS: ComponentEntry[] = [
  {
    name: "Html",
    tag: "<Html>",
    badge: "root",
    needsImport: false,
    description: "The outermost wrapper for every React Email template. Sets the lang and dir attributes and outputs the <!DOCTYPE html> declaration.",
    when: "Always — every template must have exactly one Html as the root.",
    pasteHint: "Already the root of the template. Change the lang/dir attributes directly on line 46.",
    snippet: `// Already imported ✓
// import { Html } from "@react-email/components";

// Edit the existing <Html> tag at line 46:
<Html lang="en" dir="ltr">
  <Head />
  <Preview>{previewText}</Preview>
  <Body style={main}>
    ...
  </Body>
</Html>`,
  },
  {
    name: "Head",
    tag: "<Head>",
    badge: "metadata",
    needsImport: false,
    description: "Holds email metadata, @font-face declarations, and @media query style blocks. Renders as <head> in the final HTML.",
    when: "When you need custom fonts (via <Font>) or mobile-responsive @media overrides. Most email styling is inline — Head is for the exceptions.",
    pasteHint: "Replace the self-closing <Head /> on line 48 with an opening/closing pair and add content inside.",
    snippet: `// Already imported ✓
// import { Head } from "@react-email/components";

// Replace <Head /> on line 48 with:
<Head>
  <style>{\`
    @media (max-width: 600px) {
      .mobile-text { font-size: 14px !important; }
    }
  \`}</style>
</Head>`,
  },
  {
    name: "Preview",
    tag: "<Preview>",
    badge: "inbox",
    needsImport: false,
    description: "Hidden text that email clients display as the inbox snippet — the line visible before opening a message. Never appears in the email body itself.",
    when: "Always include it. It's one of the most impactful conversion levers in email. Keep it under 90 characters or it gets cut off.",
    pasteHint: "Already in the template on line 49. Edit the previewText variable near line 43 to change its content.",
    snippet: `// Already imported ✓
// import { Preview } from "@react-email/components";

// Edit the previewText variable near line 43:
const previewText = \`We couldn't process your \${currency} \${amount}. Update your card.\`;

// The <Preview> at line 49 uses it:
<Preview>{previewText}</Preview>`,
  },
  {
    name: "Body",
    tag: "<Body>",
    badge: "layout",
    needsImport: false,
    description: "Sets the background color and base font for the entire email. Equivalent to the <body> tag — wraps everything the recipient sees.",
    when: "Always — place it directly inside Html, wrapping Container.",
    pasteHint: "Already in the template on line 50. Edit the `main` style object near the bottom of the file to change background color or font.",
    snippet: `// Already imported ✓
// import { Body } from "@react-email/components";

// Edit the existing <Body> on line 50,
// or update the \`main\` style object at the bottom of the file:
const main: React.CSSProperties = {
  backgroundColor: "#f0f4ff", // change the background color
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};`,
  },
  {
    name: "Container",
    tag: "<Container>",
    badge: "layout",
    needsImport: false,
    description: "Centers content and caps its width. The primary layout wrapper inside Body. Renders as a centered table for Outlook compatibility.",
    when: "Always — set maxWidth between 560–600px. Wider emails don't render well in preview panes and mobile clients.",
    pasteHint: "Already in the template on line 51. Edit the `container` style object at the bottom of the file to change width, background, or border.",
    snippet: `// Already imported ✓
// import { Container } from "@react-email/components";

// Edit the \`container\` style object at the bottom of the file:
const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "32px 40px",
  maxWidth: "560px",   // increase to 600px for wider emails
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
};`,
  },
  {
    name: "Section",
    tag: "<Section>",
    badge: "layout",
    needsImport: false,
    description: "A block-level container. Renders as a <table> row internally to ensure Outlook compatibility. Use it anywhere you'd use a <div> on the web.",
    when: "For any distinct region: header, alert banner, content area, footer, colored band, or padding zone.",
    pasteHint: "Paste inside <Container> (between lines 51 and 121). Used for the logo, alert banner, details box, and button sections already.",
    snippet: `// Already imported ✓
// import { Section } from "@react-email/components";

// Paste inside <Container>, e.g. after the alertBanner Section (~line 57):
<Section style={{
  padding: "16px 24px",
  backgroundColor: "#fffbeb",
  borderLeft: "4px solid #f59e0b",
  marginBottom: "24px",
}}>
  <Text style={{ margin: 0, color: "#92400e", fontSize: 14 }}>
    ⏱ This offer expires in 48 hours.
  </Text>
</Section>`,
  },
  {
    name: "Row / Column",
    tag: "<Row> + <Column>",
    badge: "layout",
    needsImport: true,
    description: "Multi-column layouts. Row is the grid container; Column is each cell. Renders as table-based layout for cross-client compatibility including Outlook.",
    when: "Two-column layouts: content + sidebar, logo + nav, icon + text. Use percentage widths on Column — they're the most reliable unit across email clients.",
    pasteHint: "Add Row, Column to the import on line 1. Then paste inside <Container> or inside a <Section>.",
    snippet: `// 1. Add to the import on line 1:
import {
  Body, Button, Container, Head, Heading, Hr, Html,
  Link, Preview, Row, Column, Section, Text, // ← add Row, Column
} from "@react-email/components";

// 2. Paste inside <Container>, e.g. after the logoSection (~line 53):
<Row>
  <Column style={{ width: "60%", paddingRight: 16 }}>
    <Text style={{ margin: 0, fontWeight: 600 }}>Account status</Text>
    <Text style={{ margin: 0, color: "#6b7280" }}>Payment past due</Text>
  </Column>
  <Column style={{ width: "40%", textAlign: "right" }}>
    <Text style={{ margin: 0, fontWeight: 700, color: "#ef4444" }}>
      USD {amount}
    </Text>
  </Column>
</Row>`,
  },
  {
    name: "Heading",
    tag: "<Heading>",
    badge: "text",
    needsImport: false,
    description: "Renders h1–h6 headings. Use it over a styled <Text> when the content is semantically a heading — it outputs the correct HTML element, which matters for accessibility.",
    when: "Email titles, section headers, and any text that functions as a heading. The as prop accepts 'h1' through 'h6'.",
    pasteHint: "Already in the template on line 59. Add another <Heading> inside <Container> to create a sub-section header.",
    snippet: `// Already imported ✓
// import { Heading } from "@react-email/components";

// Add a sub-section heading inside <Container>, e.g. before the detailsBox:
<Heading
  as="h3"
  style={{
    fontSize: 14,
    fontWeight: 600,
    color: "#6b7280",
    margin: "0 0 8px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  }}
>
  Payment details
</Heading>`,
  },
  {
    name: "Text",
    tag: "<Text>",
    badge: "text",
    needsImport: false,
    description: "Paragraph text. Renders as a <p> tag with safe default resets that prevent email clients from adding unexpected margins.",
    when: "Every prose block — body copy, labels, detail rows, footers. The most-used component. Avoid raw <p> tags; use Text instead.",
    pasteHint: "Already used throughout the template. Add a new <Text> inside <Container> anywhere you need a paragraph.",
    snippet: `// Already imported ✓
// import { Text } from "@react-email/components";

// Add inside <Container>, e.g. after the button Section (~line 100):
<Text style={{
  fontSize: 13,
  color: "#9ca3af",
  lineHeight: "20px",
  margin: "0 0 12px",
  textAlign: "center",
}}>
  You have until {nextRetryDate} before your account is paused.
</Text>`,
  },
  {
    name: "Button",
    tag: "<Button>",
    badge: "action",
    needsImport: false,
    description: "A CTA rendered as an anchor tag styled to look like a button. Email clients don't reliably support HTML <button> — Button outputs an <a> that works everywhere.",
    when: "Primary calls to action: 'Update payment method', 'View invoice', 'Reactivate subscription'. Always provide an href — the button is meaningless without a destination.",
    pasteHint: "Already in the template inside buttonContainer (~line 97). Add a secondary button in a new Section below it.",
    snippet: `// Already imported ✓
// import { Button } from "@react-email/components";

// Add a secondary CTA after the existing button Section (~line 100):
<Section style={{ textAlign: "center", marginTop: 12 }}>
  <Button
    href={supportUrl}
    style={{
      backgroundColor: "transparent",
      color: "#6b7280",
      padding: "8px 20px",
      borderRadius: 6,
      fontSize: 13,
      border: "1px solid #e5e7eb",
      display: "inline-block",
    }}
  >
    Contact support instead
  </Button>
</Section>`,
  },
  {
    name: "Link",
    tag: "<Link>",
    badge: "action",
    needsImport: false,
    description: "A plain hyperlink. Renders as an <a> tag. Use inside Text for inline links; use Button for standalone CTA links.",
    when: "Inline links within a paragraph — 'Contact support', 'View your invoice', 'Unsubscribe'. Button handles full-width click targets better.",
    pasteHint: "Already used in the support line (~line 110). Wrap any word in an existing <Text> with <Link> to make it clickable.",
    snippet: `// Already imported ✓
// import { Link } from "@react-email/components";

// Edit the existing support Text (~line 109) to add or change a link:
<Text style={smallText}>
  Need help? Reach out at{" "}
  <Link href={supportUrl} style={{ color: "#2563eb" }}>
    our support page
  </Link>{" "}
  or call us at{" "}
  <Link href="tel:+18005551234" style={{ color: "#2563eb" }}>
    1-800-555-1234
  </Link>.
</Text>`,
  },
  {
    name: "Img",
    tag: "<Img>",
    badge: "media",
    needsImport: true,
    description: "Email-safe image tag. src must be an absolute https:// URL — email clients cannot load relative paths. Always set width and height to prevent layout shift.",
    when: "Logos, product screenshots, hero banners. Add alt text for clients that block images by default (common in corporate environments).",
    pasteHint: "Add Img to the import on line 1. Then replace the text logo inside the logoSection Section (~line 52–54).",
    snippet: `// 1. Add to the import on line 1:
import {
  Body, Button, Container, Head, Heading, Hr, Html,
  Img, Link, Preview, Section, Text, // ← add Img
} from "@react-email/components";

// 2. Replace the logoSection content (~line 52–54):
// Before:
// <Section style={logoSection}>
//   <Text style={logoText}>{productName}</Text>
// </Section>

// After:
<Section style={logoSection}>
  <Img
    src="https://yourdomain.com/logo.png"
    alt={productName}
    width={120}
    height={40}
    style={{ display: "block" }}
  />
</Section>`,
  },
  {
    name: "Hr",
    tag: "<Hr>",
    badge: "layout",
    needsImport: false,
    description: "A horizontal divider line. Renders a <hr> element with safe cross-client styles. Visually separates content sections.",
    when: "Between content sections, between detail rows in a table-style layout, and before the footer. Already used in the payment details box.",
    pasteHint: "Already used inside the detailsBox and before the footer (~line 107). Add another <Hr> between any two sections inside <Container>.",
    snippet: `// Already imported ✓
// import { Hr } from "@react-email/components";

// Add between any two sections inside <Container>,
// e.g. between the button Section and the urgency Text (~line 101):
<Hr style={{
  borderColor: "#e5e7eb",
  borderWidth: 1,
  margin: "24px 0",
}} />`,
  },
  {
    name: "Font",
    tag: "<Font>",
    badge: "style",
    needsImport: true,
    description: "Loads a web font via @font-face for clients that support it (Apple Mail, iOS Mail, Outlook on Mac). Falls back to fallbackFontFamily silently on Gmail and webmail.",
    when: "When brand typography matters and you have a hosted woff2 file. Include Font inside Head — not inside Body.",
    pasteHint: "Add Font to the import on line 1. Then replace <Head /> on line 48 with <Head>...</Head> and put <Font> inside it.",
    snippet: `// 1. Add to the import on line 1:
import {
  Body, Button, Container, Font, Head, Heading, Hr, Html,
  Link, Preview, Section, Text, // ← add Font
} from "@react-email/components";

// 2. Replace <Head /> on line 48 with:
<Head>
  <Font
    fontFamily="Inter"
    fallbackFontFamily="Arial"
    webFont={{
      url: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2",
      format: "woff2",
    }}
    fontWeight={400}
    fontStyle="normal"
  />
</Head>`,
  },
  {
    name: "Markdown",
    tag: "<Markdown>",
    badge: "content",
    needsImport: true,
    description: "Converts a markdown string to email-safe HTML at render time. Useful when email body content is stored as markdown in a database or CMS.",
    when: "Dynamic or user-authored content that lives outside code. Stick to headings, bold, italic, and links — not all markdown features are supported in email.",
    pasteHint: "Add Markdown to the import on line 1. Then replace any prose Text block inside <Container> with a <Markdown> block.",
    snippet: `// 1. Add to the import on line 1:
import {
  Body, Button, Container, Head, Heading, Hr, Html,
  Link, Markdown, Preview, Section, Text, // ← add Markdown
} from "@react-email/components";

// 2. Replace a Text block inside <Container>, e.g. the paragraph at ~line 61:
// Before:
// <Text style={paragraph}>
//   We tried to charge your card...
// </Text>

// After:
<Markdown>{\`
We tried to charge your card ending in **\${cardLast4}** for your
**\${productName} \${planName}** subscription, but the payment didn't go through.
\`}</Markdown>`,
  },
];

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


const BADGE_COLORS: Record<string, { bg: string; color: string }> = {
  root:     { bg: "#fef3c7", color: "#92400e" },
  metadata: { bg: "#ede9fe", color: "#5b21b6" },
  inbox:    { bg: "#dbeafe", color: "#1d4ed8" },
  layout:   { bg: "#f0fdf4", color: "#166534" },
  text:     { bg: "#f4f4f5", color: "#3f3f46" },
  action:   { bg: "#fff1f2", color: "#9f1239" },
  media:    { bg: "#fdf4ff", color: "#7e22ce" },
  style:    { bg: "#fff7ed", color: "#9a3412" },
  content:  { bg: "#f0f9ff", color: "#075985" },
};

export function ComponentLibraryPanel() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  function copy(name: string, snippet: string) {
    navigator.clipboard.writeText(snippet).catch(() => {});
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div>
      <div style={localStyles.componentPanelHeader}>
        <div style={localStyles.componentLibraryTitle}>React Email components</div>
        <div style={localStyles.componentLibrarySubtitle}>
          Copy snippet → paste into Template tab → Render preview
        </div>
      </div>
      <div style={localStyles.componentGrid}>
        {COMPONENTS.map((c) => {
          const isExpanded = expanded === c.name;
          const isCopied = copied === c.name;
          const badgeStyle = BADGE_COLORS[c.badge] ?? BADGE_COLORS.text;
          return (
            <div key={c.name} style={localStyles.componentCard}>
              <div style={localStyles.componentCardHeader}>
                <div style={localStyles.componentCardLeft}>
                  <code style={localStyles.componentTag}>{c.tag}</code>
                  <span style={{ ...localStyles.componentBadge, background: badgeStyle.bg, color: badgeStyle.color }}>
                    {c.badge}
                  </span>
                  {c.needsImport
                    ? <span style={localStyles.importBadgeNew}>+ import</span>
                    : <span style={localStyles.importBadgeOk}>✓ imported</span>}
                </div>
                <div style={localStyles.componentCardActions}>
                  <button style={localStyles.componentExpandBtn} onClick={() => setExpanded(isExpanded ? null : c.name)}>
                    {isExpanded ? "Hide ↑" : "Snippet ↓"}
                  </button>
                  <button
                    style={{ ...localStyles.componentCopyBtn, ...(isCopied ? localStyles.componentCopyBtnDone : {}) }}
                    onClick={() => copy(c.name, c.snippet)}
                  >
                    {isCopied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
              <p style={localStyles.componentDesc}>{c.description}</p>
              <p style={localStyles.pasteHintText}>
                <span style={localStyles.pasteHintLabel}>↳</span> {c.pasteHint}
              </p>
              {isExpanded && (
                <>
                  <p style={localStyles.componentWhen}><strong>When to use:</strong> {c.when}</p>
                  <CodeBlock code={c.snippet} compact />
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function StepTemplate({
  customerName,
  onComplete,
  alreadyCompleted,
  customTemplateCode,
  onCustomTemplateCodeChange,
  onCustomHtmlChange,
}: StepTemplateProps) {
  const [mainTab, setMainTab] = useState<MainTab>("try");
  const [viewerTab, setViewerTab] = useState<ViewerTab>("preview");
  const previewUrl = buildPreviewUrl({ ...DEFAULTS, customerName });
  const [copied, setCopied] = useState<string | null>(null);

  // Template editor state
  const [templateCode, setTemplateCode] = useState(customTemplateCode);
  const [templateLoading, setTemplateLoading] = useState(false);
  const [templateApplying, setTemplateApplying] = useState(false);
  const [customHtml, setCustomHtml] = useState<string | null>(null);
  const [renderError, setRenderError] = useState<string | null>(null);
  const templateFetched = useRef(false);
  const originalCode = useRef("");
  const templateTextareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumsRef = useRef<HTMLDivElement>(null);

  function syncScroll() {
    if (templateTextareaRef.current && lineNumsRef.current) {
      lineNumsRef.current.scrollTop = templateTextareaRef.current.scrollTop;
    }
  }

  async function applyTemplate() {
    setTemplateApplying(true);
    setRenderError(null);
    try {
      const res = await fetch("/api/render-custom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: templateCode }),
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        setRenderError(json.error ?? "Render failed.");
      } else {
        setCustomHtml(json.html);
        onCustomHtmlChange(json.html);
        setViewerTab("preview");
      }
    } catch (e) {
      setRenderError((e as Error).message);
    } finally {
      setTemplateApplying(false);
    }
  }

  function resetTemplate() {
    setTemplateCode(originalCode.current);
    setCustomHtml(null);
    onCustomHtmlChange(null);
    onCustomTemplateCodeChange(originalCode.current);
    setRenderError(null);
  }

  function copy(name: string, snippet: string) {
    navigator.clipboard.writeText(snippet).catch(() => {});
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  }

  useEffect(() => {
    if (viewerTab === "template" && !templateFetched.current) {
      templateFetched.current = true;
      const alreadyHasCode = !!customTemplateCode;
      if (!alreadyHasCode) setTemplateLoading(true);
      fetch("/api/source?file=email-template")
        .then((r) => r.text())
        .then((src) => {
          originalCode.current = src;
          if (!alreadyHasCode) {
            setTemplateCode(src);
            onCustomTemplateCodeChange(src);
          }
          setTemplateLoading(false);
        })
        .catch(() => setTemplateLoading(false));
    }
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
            Open <strong>Template</strong> to edit the React Email component — copy a snippet from the
            panel on the right, paste it in, then click <strong>Render preview →</strong> to see the
            result. Switch to <strong>Preview template</strong> to see the rendered email.
            Customer details and the send call live in Step 4.
          </p>

          <div style={localStyles.viewer}>
            <div style={localStyles.viewerBar}>
              <div style={localStyles.viewerDots}>
                <span style={localStyles.dot} />
                <span style={localStyles.dot} />
                <span style={localStyles.dot} />
                <span style={localStyles.viewerTitle}>
                  {viewerTab === "preview"
                    ? customHtml ? "Preview — custom template" : "Your payment didn't go through"
                    : "emails/billing-failure.tsx — edit & render"}
                </span>
              </div>
              <div style={localStyles.viewerTabs}>
                <button
                  style={{ ...localStyles.viewerTab, ...(viewerTab === "template" ? localStyles.viewerTabActive : {}) }}
                  onClick={() => setViewerTab("template")}
                >Template</button>
                <button
                  style={{ ...localStyles.viewerTab, ...(viewerTab === "preview" ? localStyles.viewerTabActive : {}) }}
                  onClick={() => setViewerTab("preview")}
                >
                  {customHtml ? "Preview template ●" : "Preview template"}
                </button>
                <a href="/api/source?file=email-template" download="billing-failure.tsx" style={localStyles.downloadBtn}>
                  ↓ Download
                </a>
              </div>
            </div>

            {viewerTab === "preview" && (
              customHtml
                ? <iframe srcDoc={customHtml} style={localStyles.frame} title="Email preview (custom)" />
                : <iframe key={previewUrl} src={previewUrl} style={localStyles.frame} title="Email preview" />
            )}
            {viewerTab === "template" && (
              <div style={{ position: "relative" as const }}>
                {templateLoading ? (
                  <div style={localStyles.templateLoading}>Loading template…</div>
                ) : (
                  <div style={localStyles.templateEditorWrapper}>
                    <div ref={lineNumsRef} style={localStyles.templateLineNums}>
                      {templateCode.split("\n").map((_, i) => (
                        <div key={i} style={localStyles.templateLineNum}>{i + 1}</div>
                      ))}
                    </div>
                    <textarea
                      ref={templateTextareaRef}
                      style={localStyles.templateTextarea}
                      value={templateCode}
                      onChange={(e) => { setTemplateCode(e.target.value); onCustomTemplateCodeChange(e.target.value); }}
                      onScroll={syncScroll}
                      spellCheck={false}
                      autoComplete="off"
                      autoCorrect="off"
                    />
                  </div>
                )}
                <div style={localStyles.templateBar}>
                  {renderError && <span style={localStyles.templateError}>{renderError}</span>}
                  {!templateLoading && templateCode && (
                    <button style={localStyles.templateResetBtn} onClick={resetTemplate}>
                      Reset to original
                    </button>
                  )}
                  <button
                    style={templateApplying ? localStyles.templateApplyBtnDisabled : localStyles.templateApplyBtn}
                    onClick={applyTemplate}
                    disabled={templateApplying || templateLoading}
                  >
                    {templateApplying ? "Rendering…" : "Render preview →"}
                  </button>
                </div>
              </div>
            )}
          </div>

          <p style={s.hint}>
            <strong>Template</strong> — edit the component, paste in snippets from the right panel, click <strong>Render preview →</strong>.{" "}
            <strong>Preview template</strong> — the rendered email as it will be delivered.
            {customHtml && <>{" "}<strong style={{ color: "#625DF5" }}>Custom template active</strong> — your edited version will be sent in Step 4.</>}
          </p>
        </>
      )}

      {/* ══════════════ HOW IT'S BUILT ══════════════ */}
      {mainTab === "learn" && (
        <>
          <p style={s.prose}>
            React Email provides a set of components that abstract away the quirks of
            email HTML. Tables for layout, inline styles everywhere, absolute image
            URLs. Each component below is available in{" "}
            <code style={s.inlineCode}>@react-email/components</code>. Here's what
            each one does, why it exists, and when to reach for it.
          </p>

          {COMPONENTS.map((c, i) => {
            const isCopied = copied === `learn-${c.name}`;
            const badgeStyle = BADGE_COLORS[c.badge] ?? BADGE_COLORS.text;
            return (
              <div
                key={c.name}
                style={{ ...localStyles.learnCard, ...(i === COMPONENTS.length - 1 ? { marginBottom: 0 } : {}) }}
              >
                <div style={localStyles.learnCardHeader}>
                  <div style={localStyles.learnCardLeft}>
                    <code style={localStyles.learnTag}>{c.tag}</code>
                    <span style={{ ...localStyles.componentBadge, background: badgeStyle.bg, color: badgeStyle.color }}>
                      {c.badge}
                    </span>
                  </div>
                  <button
                    style={{ ...localStyles.componentCopyBtn, ...(isCopied ? localStyles.componentCopyBtnDone : {}) }}
                    onClick={() => copy(`learn-${c.name}`, c.snippet)}
                  >
                    {isCopied ? "Copied!" : "Copy snippet"}
                  </button>
                </div>
                <p style={localStyles.learnDesc}>{c.description}</p>
                <p style={localStyles.componentWhen}>
                  <strong>When to use:</strong> {c.when}
                </p>
                <CodeBlock code={c.snippet} compact />
              </div>
            );
          })}
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
  componentPanelHeader: {
    paddingBottom: 14,
    marginBottom: 12,
    borderBottom: "1px solid #e4e4e7",
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
    background: "rgba(98,93,245,0.1)",
    color: "#625DF5",
    boxShadow: "0 0 0 1px rgba(98,93,245,0.35), 0 0 8px rgba(98,93,245,0.25)",
    borderRadius: 5,
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
  // Template editor
  templateEditorWrapper: {
    display: "flex",
    height: 560,
    overflow: "hidden",
    background: "#18181b",
  },
  templateLineNums: {
    flexShrink: 0,
    width: 36,
    overflowY: "hidden" as const,
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 8,
    textAlign: "right" as const,
    color: "#52525b",
    fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
    fontSize: 12,
    lineHeight: 1.65,
    userSelect: "none" as const,
    borderRight: "1px solid #27272a",
  },
  templateLineNum: {
    lineHeight: 1.65,
  },
  templateTextarea: {
    flex: 1,
    padding: "16px 20px",
    margin: 0,
    background: "#18181b",
    color: "#e4e4e7",
    fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
    fontSize: 12,
    lineHeight: 1.65,
    border: "none",
    outline: "none",
    resize: "none" as const,
    boxSizing: "border-box" as const,
    display: "block",
    tabSize: 2,
    overflowY: "scroll" as const,
  },
  templateLoading: {
    height: 560,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    color: "#71717a",
    background: "#18181b",
  },
  templateBar: {
    padding: "10px 14px",
    background: "#27272a",
    borderTop: "1px solid #3f3f46",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 12,
    flexWrap: "wrap" as const,
  },
  templateError: {
    flex: 1,
    fontSize: 11.5,
    color: "#f87171",
    fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
    lineHeight: 1.5,
    wordBreak: "break-word" as const,
  },
  templateApplyBtn: {
    fontSize: 12,
    fontWeight: 600,
    padding: "6px 14px",
    background: "#6366f1",
    color: "#ffffff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontFamily: "inherit",
    flexShrink: 0,
  },
  templateApplyBtnDisabled: {
    fontSize: 12,
    fontWeight: 600,
    padding: "6px 14px",
    background: "#3f3f46",
    color: "#71717a",
    border: "none",
    borderRadius: 6,
    cursor: "not-allowed",
    fontFamily: "inherit",
    flexShrink: 0,
  },
  templateResetBtn: {
    fontSize: 12,
    fontWeight: 500,
    padding: "6px 12px",
    background: "transparent",
    color: "#71717a",
    border: "1px solid #3f3f46",
    borderRadius: 6,
    cursor: "pointer",
    fontFamily: "inherit",
    flexShrink: 0,
  },
  // Component library (Try it tab)
  componentLibraryHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: 28,
    marginBottom: 12,
    paddingTop: 24,
    borderTop: "1px solid #e4e4e7",
  },
  componentLibraryTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: "#18181b",
    marginBottom: 4,
  },
  componentLibrarySubtitle: {
    fontSize: 12,
    color: "#71717a",
    lineHeight: 1.5,
  },
  componentGrid: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 8,
  },
  componentCard: {
    border: "1px solid #e4e4e7",
    borderRadius: 8,
    padding: "12px 14px",
    background: "#fafafa",
  },
  componentCardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  componentCardLeft: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  componentCardActions: {
    display: "flex",
    gap: 6,
    alignItems: "center",
  },
  componentTag: {
    fontSize: 12.5,
    fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
    color: "#18181b",
    background: "#f4f4f5",
    border: "1px solid #e4e4e7",
    borderRadius: 4,
    padding: "1px 6px",
    fontWeight: 600,
  },
  componentBadge: {
    fontSize: 10,
    fontWeight: 600,
    padding: "2px 7px",
    borderRadius: 99,
    letterSpacing: "0.2px",
    textTransform: "uppercase" as const,
  },
  componentDesc: {
    fontSize: 12.5,
    color: "#52525b",
    lineHeight: 1.65,
    margin: 0,
  },
  pasteHintText: {
    fontSize: 11.5,
    color: "#71717a",
    lineHeight: 1.5,
    margin: "5px 0 0",
  },
  pasteHintLabel: {
    fontWeight: 600,
    color: "#6366f1",
  },
  importBadgeNew: {
    fontSize: 10,
    fontWeight: 600,
    padding: "2px 7px",
    borderRadius: 99,
    background: "#fff7ed",
    color: "#c2410c",
    border: "1px solid #fed7aa",
    letterSpacing: "0.1px",
  },
  importBadgeOk: {
    fontSize: 10,
    fontWeight: 600,
    padding: "2px 7px",
    borderRadius: 99,
    background: "#f0fdf4",
    color: "#166534",
    border: "1px solid #bbf7d0",
    letterSpacing: "0.1px",
  },
  componentWhen: {
    fontSize: 12,
    color: "#71717a",
    lineHeight: 1.6,
    margin: "8px 0 0",
  },
  componentExpandBtn: {
    fontSize: 11,
    fontWeight: 500,
    color: "#71717a",
    background: "transparent",
    border: "1px solid #e4e4e7",
    borderRadius: 5,
    padding: "3px 9px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  componentCopyBtn: {
    fontSize: 11,
    fontWeight: 500,
    color: "#3f3f46",
    background: "#ffffff",
    border: "1px solid #e4e4e7",
    borderRadius: 5,
    padding: "3px 9px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  componentCopyBtnDone: {
    color: "#16a34a",
    borderColor: "#bbf7d0",
    background: "#f0fdf4",
  },
  // How it's built tab
  learnCard: {
    border: "1px solid #e4e4e7",
    borderRadius: 8,
    padding: "16px 18px",
    marginBottom: 12,
    background: "#ffffff",
  },
  learnCardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  learnCardLeft: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  learnTag: {
    fontSize: 13,
    fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
    color: "#18181b",
    background: "#f4f4f5",
    border: "1px solid #e4e4e7",
    borderRadius: 5,
    padding: "2px 8px",
    fontWeight: 600,
  },
  learnDesc: {
    fontSize: 13,
    color: "#3f3f46",
    lineHeight: 1.7,
    margin: "0 0 0",
  },
};
