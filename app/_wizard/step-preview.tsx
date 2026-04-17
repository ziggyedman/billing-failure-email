"use client";

import { useEffect, useState } from "react";
import { stepStyles as s, CompletedBadge } from "./step-styles";

interface StepPreviewProps {
  onComplete: () => void;
  alreadyCompleted: boolean;
}

type Tab = "preview" | "code";

export function StepPreview({
  onComplete,
  alreadyCompleted,
}: StepPreviewProps) {
  const [tab, setTab] = useState<Tab>("preview");
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    if (tab === "code" && source === null) {
      fetch("/api/source")
        .then((r) => r.text())
        .then(setSource)
        .catch(() => setSource("// Could not load source."));
    }
  }, [tab, source]);

  return (
    <div>
      {alreadyCompleted && <CompletedBadge />}

      <p style={s.prose}>
        This is what the billing failure email looks like with realistic values
        plugged in. Switch to <strong>Code</strong> to see the React Email
        source — the same view you get in React Email's dev server at{" "}
        <code style={s.inlineCode}>localhost:3001</code>.
      </p>

      <div style={localStyles.viewer}>
        {/* tab bar */}
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
              style={{
                ...localStyles.tab,
                ...(tab === "preview" ? localStyles.tabActive : {}),
              }}
              onClick={() => setTab("preview")}
            >
              Preview
            </button>
            <button
              style={{
                ...localStyles.tab,
                ...(tab === "code" ? localStyles.tabActive : {}),
              }}
              onClick={() => setTab("code")}
            >
              Code
            </button>
          </div>
        </div>

        {/* content */}
        {tab === "preview" && (
          <iframe
            src="/api/preview"
            style={localStyles.frame}
            title="Email preview"
          />
        )}

        {tab === "code" && (
          <div style={localStyles.codeWrap}>
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

      <p style={s.hint}>
        The preview loads <code>/api/preview</code>, which calls React Email's{" "}
        <code>render()</code> server-side. The code tab reads the template
        directly from <code>emails/billing-failure.tsx</code>. Run{" "}
        <code>npm run email</code> locally for React Email's dev server with hot
        reload.
      </p>

      <div style={s.actionsRow}>
        <button style={s.primaryBtn} onClick={onComplete}>
          {alreadyCompleted ? "Continue to send" : "Looks good — continue"}
        </button>
      </div>
    </div>
  );
}

const localStyles: Record<string, React.CSSProperties> = {
  viewer: {
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    overflow: "hidden",
    margin: "16px 0 8px",
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
  frame: {
    width: "100%",
    height: 640,
    border: "none",
    background: "#f6f7f9",
    display: "block",
  },
  codeWrap: {
    background: "#0f172a",
    height: 640,
    overflowY: "auto",
  },
  code: {
    margin: 0,
    padding: "20px 24px",
    fontSize: 12.5,
    lineHeight: 1.65,
    color: "#e2e8f0",
    fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
    whiteSpace: "pre",
  },
  loading: {
    height: 640,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    color: "#94a3b8",
  },
};
