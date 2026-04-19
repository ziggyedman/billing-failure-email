"use client";

import type React from "react";

export const stepStyles: Record<string, React.CSSProperties> = {
  prose: {
    fontSize: 14,
    lineHeight: 1.75,
    color: "#3f3f46",
    margin: "0 0 16px",
  },
  h3: {
    fontSize: 14,
    fontWeight: 600,
    color: "#18181b",
    margin: "28px 0 10px",
    letterSpacing: "-0.1px",
  },
  ol: {
    fontSize: 14,
    lineHeight: 1.75,
    color: "#3f3f46",
    paddingLeft: 20,
    margin: "0 0 16px",
  },
  li: {
    marginBottom: 8,
  },
  inlineCode: {
    background: "#f4f4f5",
    padding: "1px 5px",
    borderRadius: 4,
    fontSize: 12.5,
    fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
    color: "#18181b",
    border: "1px solid #e4e4e7",
  },
  codeBlock: {
    background: "#18181b",
    color: "#e4e4e7",
    padding: "16px 20px",
    borderRadius: 8,
    fontSize: 12.5,
    lineHeight: 1.65,
    overflow: "auto",
    margin: "0 0 16px",
    fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
    border: "1px solid #27272a",
  },
  link: {
    color: "#18181b",
    textDecoration: "underline",
    textUnderlineOffset: "3px",
  },
  callout: {
    background: "#fafafa",
    border: "1px solid #e4e4e7",
    borderRadius: 8,
    padding: "12px 16px",
    fontSize: 13,
    lineHeight: 1.65,
    color: "#3f3f46",
    margin: "16px 0",
  },
  calloutStrong: {
    fontWeight: 600,
    color: "#18181b",
  },
  label: {
    display: "block",
    fontSize: 12,
    fontWeight: 500,
    color: "#3f3f46",
    marginBottom: 6,
    letterSpacing: "0.1px",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #e4e4e7",
    borderRadius: 7,
    fontSize: 14,
    boxSizing: "border-box" as const,
    fontFamily: "inherit",
    color: "#18181b",
    background: "#ffffff",
    outline: "none",
    transition: "border-color 150ms ease",
  },
  hint: {
    fontSize: 12,
    color: "#a1a1aa",
    margin: "6px 0 0",
    lineHeight: 1.6,
  },
  primaryBtn: {
    background: "#18181b",
    color: "#ffffff",
    border: "none",
    borderRadius: 8,
    padding: "9px 18px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    letterSpacing: "-0.1px",
    transition: "opacity 150ms ease",
  },
  primaryBtnDisabled: {
    background: "#d4d4d8",
    color: "#a1a1aa",
    border: "none",
    borderRadius: 8,
    padding: "9px 18px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "not-allowed",
    fontFamily: "inherit",
  },
  completedBanner: {
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: 8,
    padding: "10px 14px",
    fontSize: 13,
    color: "#15803d",
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
    marginTop: 28,
    paddingTop: 20,
    borderTop: "1px solid #e4e4e7",
  },
  errorBanner: {
    background: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: 8,
    padding: "10px 14px",
    fontSize: 13,
    color: "#dc2626",
    margin: "12px 0",
    wordBreak: "break-word" as const,
  },
  successBanner: {
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: 8,
    padding: "12px 16px",
    fontSize: 14,
    color: "#15803d",
    margin: "12px 0",
  },
};

export function CompletedBadge() {
  return (
    <div style={stepStyles.completedBanner}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span>Step complete. You can revisit it anytime.</span>
    </div>
  );
}
