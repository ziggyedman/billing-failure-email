"use client";

import type { StepDef } from "./steps";

interface SidebarProps {
  steps: StepDef[];
  currentStep: number;
  completed: boolean[];
  onSelect: (index: number) => void;
  onReset: () => void;
}

export function Sidebar({
  steps,
  currentStep,
  completed,
  onSelect,
  onReset,
}: SidebarProps) {
  const completedCount = completed.filter(Boolean).length;
  const percent = Math.round((completedCount / steps.length) * 100);

  return (
    <aside style={styles.sidebar}>
      <div style={styles.header}>
        <div style={styles.eyebrow}>Tutorial</div>
        <h2 style={styles.title}>Send a billing-failure email</h2>
        <p style={styles.byline}>with Next.js, React Email, and Resend</p>
        <p style={styles.intro}>
          This wizard is the tutorial. The prompt was: build an example of how
          to send a billing failure email using React Email and Resend, write a
          companion guide for going from zero to sending an email, and share it
          as a GitHub repo. Instead of a static README, the tutorial became this
          app — each step walks a user or support engineer through the real
          implementation: an API key, a verified domain, a React Email template,
          a live preview, and finally the send form. The email template is
          written with React Email, the sending code runs in a Next.js App
          Router route, and the full written guide lives in the repo's README.
        </p>
      </div>

      <div style={styles.progress}>
        <div style={styles.progressHeader}>
          <span style={styles.progressLabel}>Progress</span>
          <span style={styles.progressPct}>{percent}%</span>
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
                  ...styles.itemButton,
                  ...(isCurrent ? styles.itemButtonCurrent : {}),
                }}
              >
                <span
                  style={{
                    ...styles.circle,
                    ...(isCompleted ? styles.circleDone : {}),
                    ...(isCurrent && !isCompleted ? styles.circleCurrent : {}),
                  }}
                >
                  {isCompleted ? "✓" : i + 1}
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
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: "28px 24px",
    height: "fit-content",
    position: "sticky",
    top: 32,
  },
  header: {
    paddingBottom: 20,
    borderBottom: "1px solid #e5e7eb",
    marginBottom: 20,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    color: "#6b7280",
    marginBottom: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: 700,
    color: "#111827",
    margin: "0 0 4px",
    lineHeight: 1.3,
  },
  byline: {
    fontSize: 12,
    color: "#6b7280",
    margin: "0 0 12px",
  },
  intro: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 1.6,
    margin: 0,
  },
  progress: {
    marginBottom: 20,
  },
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: 500,
  },
  progressPct: {
    fontSize: 12,
    color: "#111827",
    fontWeight: 600,
  },
  progressBar: {
    height: 4,
    background: "#f3f4f6",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "#111827",
    transition: "width 300ms ease",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  item: {
    margin: 0,
  },
  itemButton: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    gap: 12,
    padding: "10px 8px",
    margin: "2px 0",
    background: "transparent",
    border: "none",
    borderRadius: 6,
    textAlign: "left",
    cursor: "pointer",
    transition: "background 150ms ease",
  },
  itemButtonCurrent: {
    background: "#f3f4f6",
  },
  itemButtonLocked: {
    opacity: 0.45,
    cursor: "not-allowed",
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    background: "#f3f4f6",
    border: "1px solid #e5e7eb",
    color: "#6b7280",
    fontSize: 12,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  circleDone: {
    background: "#111827",
    borderColor: "#111827",
    color: "#ffffff",
  },
  circleCurrent: {
    borderColor: "#111827",
    color: "#111827",
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
    color: "#111827",
    lineHeight: 1.3,
  },
  itemDuration: {
    fontSize: 11,
    color: "#9ca3af",
  },
  footer: {
    marginTop: 24,
    paddingTop: 20,
    borderTop: "1px solid #e5e7eb",
  },
  resetBtn: {
    background: "transparent",
    border: "none",
    color: "#6b7280",
    fontSize: 12,
    cursor: "pointer",
    padding: 0,
    textDecoration: "underline",
  },
};
