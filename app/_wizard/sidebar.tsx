"use client";

import type { StepDef } from "./steps";

interface SidebarProps {
  steps: StepDef[];
  currentStep: number;
  completed: boolean[];
  onSelect: (index: number) => void;
  onHome: () => void;
  onReset: () => void;
}

export function Sidebar({
  steps,
  currentStep,
  completed,
  onSelect,
  onHome,
  onReset,
}: SidebarProps) {
  const completedCount = completed.filter(Boolean).length;
  const percent = Math.round((completedCount / steps.length) * 100);

  return (
    <aside style={styles.sidebar}>
      <button onClick={onHome} style={styles.headerBtn}>
        <div style={styles.eyebrow}>Tutorial</div>
        <h2 style={styles.title}>Billing-failure email</h2>
        <p style={styles.byline}>Next.js · React Email · Resend</p>
      </button>

      <div style={styles.progress}>
        <div style={styles.progressHeader}>
          <span style={styles.progressLabel}>Progress</span>
          <span style={styles.progressPct}>{completedCount}/{steps.length}</span>
        </div>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${percent}%` }} />
        </div>
      </div>

      <ol style={styles.list}>
        {steps.map((step, i) => {
          const isCompleted = completed[i];
          const isCurrent = i === currentStep;

          return (
            <li key={step.id} style={styles.item}>
              <button
                onClick={() => onSelect(i)}
                style={{
                  ...styles.itemBtn,
                  ...(isCurrent ? styles.itemBtnActive : {}),
                }}
              >
                <span
                  style={{
                    ...styles.circle,
                    ...(isCompleted ? styles.circleDone : {}),
                    ...(isCurrent && !isCompleted ? styles.circleCurrent : {}),
                  }}
                >
                  {isCompleted ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <span style={styles.circleNum}>{i + 1}</span>
                  )}
                </span>
                <span style={styles.itemText}>
                  <span style={styles.itemTitle}>{step.title}</span>
                  <span style={styles.itemDuration}>{step.duration}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div style={styles.footer}>
        <button style={styles.resetBtn} onClick={onReset}>
          Reset progress
        </button>
      </div>
    </aside>
  );
}

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    background: "#fafafa",
    borderRight: "1px solid #e4e4e7",
    padding: "32px 20px 24px",
    width: 268,
    flexShrink: 0,
    height: "100%",
    overflowY: "auto",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  },
  headerBtn: {
    display: "block",
    width: "100%",
    textAlign: "left",
    background: "transparent",
    border: "none",
    padding: "0 0 20px",
    borderBottom: "1px solid #e4e4e7",
    marginBottom: 20,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.9px",
    textTransform: "uppercase",
    color: "#a1a1aa",
    marginBottom: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: 700,
    color: "#18181b",
    margin: "0 0 4px",
    lineHeight: 1.3,
    letterSpacing: "-0.2px",
  },
  byline: {
    fontSize: 12,
    color: "#a1a1aa",
    margin: 0,
    letterSpacing: "0.1px",
  },
  progress: {
    marginBottom: 20,
  },
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 7,
  },
  progressLabel: {
    fontSize: 11,
    color: "#a1a1aa",
    fontWeight: 500,
    letterSpacing: "0.2px",
  },
  progressPct: {
    fontSize: 11,
    color: "#71717a",
    fontWeight: 600,
  },
  progressBar: {
    height: 3,
    background: "#e4e4e7",
    borderRadius: 99,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "#18181b",
    borderRadius: 99,
    transition: "width 400ms ease",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    flex: 1,
  },
  item: {
    margin: 0,
  },
  itemBtn: {
    display: "flex",
    alignItems: "flex-start",
    width: "100%",
    gap: 10,
    padding: "8px 10px",
    margin: "1px 0",
    background: "transparent",
    border: "none",
    borderRadius: 7,
    textAlign: "left",
    cursor: "pointer",
    transition: "background 120ms ease",
    fontFamily: "inherit",
  },
  itemBtnActive: {
    background: "#f0f0f0",
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: "50%",
    background: "#ffffff",
    border: "1px solid #d4d4d8",
    color: "#a1a1aa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  circleDone: {
    background: "#18181b",
    borderColor: "#18181b",
    color: "#ffffff",
  },
  circleCurrent: {
    borderColor: "#18181b",
    color: "#18181b",
  },
  circleNum: {
    fontSize: 11,
    fontWeight: 600,
    lineHeight: 1,
  },
  itemText: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    minWidth: 0,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: 500,
    color: "#18181b",
    lineHeight: 1.4,
  },
  itemDuration: {
    fontSize: 11,
    color: "#a1a1aa",
  },
  footer: {
    marginTop: 20,
    paddingTop: 16,
    borderTop: "1px solid #e4e4e7",
  },
  resetBtn: {
    background: "transparent",
    border: "none",
    color: "#a1a1aa",
    fontSize: 12,
    cursor: "pointer",
    padding: 0,
    fontFamily: "inherit",
    textDecoration: "underline",
    textUnderlineOffset: "2px",
  },
};
