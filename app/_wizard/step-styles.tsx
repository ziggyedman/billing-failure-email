"use client";

import type React from "react";

export const stepStyles: Record<string, React.CSSProperties> = {
  prose: {
    fontSize: 15,
    lineHeight: 1.65,
    color: "#374151",
    margin: "0 0 16px",
  },
  h3: {
    fontSize: 16,
    fontWeight: 600,
    color: "#111827",
    margin: "24px 0 10px",
  },
  ol: {
    fontSize: 15,
    lineHeight: 1.7,
    color: "#374151",
    paddingLeft: 22,
    margin: "0 0 16px",
  },
  li: {
    marginBottom: 6,
  },
  inlineCode: {
    background: "#f3f4f6",
    padding: "2px 6px",
    borderRadius: 4,
    fontSize: 13,
    fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
    color: "#111827",
  },
  codeBlock: {
    background: "#0f172a",
    color: "#e2e8f0",
    padding: "14px 16px",
    borderRadius: 8,
    fontSize: 13,
    lineHeight: 1.6,
    overflow: "auto",
    margin: "0 0 16px",
    fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
  },
  link: {
    color: "#2563eb",
    textDecoration: "underline",
  },
  callout: {
    background: "#fefce8",
    border: "1px solid #fde047",
    borderRadius: 8,
    padding: "12px 16px",
    fontSize: 14,
    lineHeight: 1.6,
    color: "#713f12",
    margin: "16px 0",
  },
  calloutStrong: {
    fontWeight: 600,
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 500,
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    display: "block",
    width: "100%",
    padding: "9px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    fontSize: 14,
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  hint: {
    fontSize: 12,
    color: "#6b7280",
    margin: "6px 0 0",
    lineHeight: 1.5,
  },
  primaryBtn: {
    background: "#111827",
    color: "#ffffff",
    border: "none",
    borderRadius: 6,
    padding: "10px 20px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
  primaryBtnDisabled: {
    background: "#9ca3af",
    color: "#ffffff",
    border: "none",
    borderRadius: 6,
    padding: "10px 20px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "not-allowed",
  },
  completedBanner: {
    background: "#ecfdf5",
    border: "1px solid #a7f3d0",
    borderRadius: 8,
    padding: "10px 14px",
    fontSize: 13,
    color: "#065f46",
    margin: "0 0 20px",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  fieldGrid: {
    display: "grid",
    gap: 14,
    margin: "16px 0",
  },
  actionsRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginTop: 24,
    paddingTop: 20,
    borderTop: "1px solid #e5e7eb",
  },
  errorBanner: {
    background: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: 8,
    padding: "10px 14px",
    fontSize: 13,
    color: "#991b1b",
    margin: "12px 0",
    wordBreak: "break-word",
  },
  successBanner: {
    background: "#ecfdf5",
    border: "1px solid #a7f3d0",
    borderRadius: 8,
    padding: "12px 16px",
    fontSize: 14,
    color: "#065f46",
    margin: "12px 0",
  },
};

export function CompletedBadge() {
  return (
    <div style={stepStyles.completedBanner}>
      <span>✓</span>
      <span>Step complete. You can revisit it anytime.</span>
    </div>
  );
}
