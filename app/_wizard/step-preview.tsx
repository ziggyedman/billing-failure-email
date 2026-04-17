"use client";

import { stepStyles as s, CompletedBadge } from "./step-styles";

interface StepPreviewProps {
  onComplete: () => void;
  alreadyCompleted: boolean;
}

export function StepPreview({
  onComplete,
  alreadyCompleted,
}: StepPreviewProps) {
  return (
    <div>
      {alreadyCompleted && <CompletedBadge />}

      <p style={s.prose}>
        This is what the billing failure email looks like with realistic values
        plugged in. It's the exact HTML that gets delivered when you send in
        the next step.
      </p>

      <div style={localStyles.frameWrap}>
        <div style={localStyles.frameBar}>
          <span style={localStyles.dot} />
          <span style={localStyles.dot} />
          <span style={localStyles.dot} />
          <span style={localStyles.barTitle}>
            Your payment didn't go through
          </span>
        </div>
        <iframe
          src="/api/preview"
          style={localStyles.frame}
          title="Email preview"
        />
      </div>

      <p style={s.hint}>
        The preview is served from <code>/api/preview</code>, which renders the
        React Email template to HTML server-side and returns it. You can also
        run <code>npm run email</code> to get React Email's dedicated preview
        server with live reload.
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
  frameWrap: {
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    overflow: "hidden",
    margin: "16px 0 8px",
    background: "#f6f7f9",
  },
  frameBar: {
    background: "#f3f4f6",
    borderBottom: "1px solid #e5e7eb",
    padding: "8px 12px",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#d1d5db",
  },
  barTitle: {
    marginLeft: 12,
    fontSize: 12,
    color: "#6b7280",
  },
  frame: {
    width: "100%",
    height: 640,
    border: "none",
    background: "#f6f7f9",
  },
};
