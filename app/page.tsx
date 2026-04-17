"use client";

import { useEffect, useState } from "react";
import { STEPS } from "./_wizard/steps";
import { StepAccount } from "./_wizard/step-account";
import { StepDomain } from "./_wizard/step-domain";
import { StepTemplate } from "./_wizard/step-template";
import { StepPreview } from "./_wizard/step-preview";
import { StepSend } from "./_wizard/step-send";
import { Sidebar } from "./_wizard/sidebar";

const STORAGE_KEY = "billing-tutorial-state-v1";

interface WizardState {
  currentStep: number;
  completed: boolean[];
  apiKey: string;
  fromEmail: string;
  toEmail: string;
  customerName: string;
}

const initialState: WizardState = {
  currentStep: -1,
  completed: STEPS.map(() => false),
  apiKey: "",
  fromEmail: "",
  toEmail: "",
  customerName: "Alex",
};

export default function Home() {
  const [state, setState] = useState<WizardState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as WizardState;
        if (
          Array.isArray(parsed.completed) &&
          parsed.completed.length === STEPS.length
        ) {
          setState(parsed);
        }
      }
    } catch {
      // ignore — start fresh
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  function markComplete(index: number) {
    setState((s) => {
      const completed = [...s.completed];
      completed[index] = true;
      return {
        ...s,
        completed,
        currentStep: Math.min(index + 1, STEPS.length - 1),
      };
    });
  }

  function goTo(index: number) {
    setState((s) => ({ ...s, currentStep: index }));
  }

  function goHome() {
    setState((s) => ({ ...s, currentStep: -1 }));
  }

  function reset() {
    if (confirm("Reset the tutorial? You'll lose all progress and inputs.")) {
      localStorage.removeItem(STORAGE_KEY);
      setState(initialState);
    }
  }

  function update<K extends keyof WizardState>(key: K, value: WizardState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  if (!hydrated) {
    return (
      <main style={styles.loadingMain}>
        <div style={styles.loadingDot} />
      </main>
    );
  }

  const current = state.currentStep;
  const isHome = current === -1;

  return (
    <main style={styles.main}>
      <div style={styles.shell}>
        <Sidebar
          steps={STEPS}
          currentStep={current}
          completed={state.completed}
          onSelect={goTo}
          onHome={goHome}
          onReset={reset}
        />

        <div style={styles.content}>
          {isHome ? (
            <>
              <header style={styles.contentHeader}>
                <div style={styles.stepLabel}>About this tutorial</div>
                <h1 style={styles.contentTitle}>
                  Send a billing-failure email
                </h1>
                <p style={styles.contentSubtitle}>
                  with Next.js, React Email, and Resend
                </p>
              </header>
              <div style={styles.contentBody}>
                <p style={styles.introProse}>
                  An interactive guide to sending billing failure emails with
                  React Email and Resend. Each step covers a concrete piece of
                  the implementation — creating an account, verifying a sending
                  domain, understanding the email template, previewing the
                  rendered output, and firing a live send through a Next.js API
                  route.
                </p>
                <p style={styles.introProse}>
                  The email template is written as a React component using React
                  Email. The sending code runs in a Next.js App Router API
                  route. Every step shows the actual code from this repo — not
                  simplified snippets. The full written guide lives in the{" "}
                  <a
                    href="https://github.com/ziggyedman/billing-failure-email/blob/main/README.md"
                    target="_blank"
                    rel="noreferrer"
                    style={styles.introLink}
                  >
                    repo's README
                  </a>
                  .
                </p>
                <p style={styles.introProse}>
                  Use the sidebar to navigate any step at any time. Mark each
                  one complete when you're done — once all five are checked, the
                  final send form unlocks.
                </p>
                <button
                  style={styles.startBtn}
                  onClick={() => goTo(0)}
                >
                  Start with Step 1 →
                </button>
              </div>
            </>
          ) : (
            <>
              <header style={styles.contentHeader}>
                <div style={styles.stepLabel}>
                  Step {current + 1} of {STEPS.length} ·{" "}
                  {STEPS[current].duration}
                </div>
                <h1 style={styles.contentTitle}>{STEPS[current].title}</h1>
                <p style={styles.contentSubtitle}>
                  {STEPS[current].subtitle}
                </p>
              </header>

              <div style={styles.contentBody}>
                {current === 0 && (
                  <StepAccount
                    apiKey={state.apiKey}
                    onApiKeyChange={(v) => update("apiKey", v)}
                    onComplete={() => markComplete(0)}
                    alreadyCompleted={state.completed[0]}
                  />
                )}
                {current === 1 && (
                  <StepDomain
                    fromEmail={state.fromEmail}
                    onFromEmailChange={(v) => update("fromEmail", v)}
                    onComplete={() => markComplete(1)}
                    alreadyCompleted={state.completed[1]}
                  />
                )}
                {current === 2 && (
                  <StepTemplate
                    onComplete={() => markComplete(2)}
                    alreadyCompleted={state.completed[2]}
                  />
                )}
                {current === 3 && (
                  <StepPreview
                    onComplete={() => markComplete(3)}
                    alreadyCompleted={state.completed[3]}
                  />
                )}
                {current === 4 && (
                  <StepSend
                    apiKey={state.apiKey}
                    fromEmail={state.fromEmail}
                    toEmail={state.toEmail}
                    customerName={state.customerName}
                    completed={state.completed}
                    onToEmailChange={(v) => update("toEmail", v)}
                    onCustomerNameChange={(v) => update("customerName", v)}
                    onComplete={() => markComplete(4)}
                    alreadyCompleted={state.completed[4]}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: "100vh",
    background: "#f6f7f9",
    padding: "32px 16px",
  },
  shell: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "320px 1fr",
    gap: 24,
  },
  content: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: "32px 40px 40px",
    minHeight: 560,
  },
  contentHeader: {
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: 20,
    marginBottom: 28,
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.6px",
    color: "#6b7280",
    marginBottom: 6,
  },
  contentTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: "#111827",
    margin: "0 0 6px",
    lineHeight: 1.2,
  },
  contentSubtitle: {
    fontSize: 15,
    color: "#6b7280",
    margin: 0,
    lineHeight: 1.5,
  },
  contentBody: {},
  introProse: {
    fontSize: 15,
    lineHeight: 1.7,
    color: "#374151",
    margin: "0 0 16px",
  },
  introLink: {
    color: "#2563eb",
    textDecoration: "underline",
  },
  startBtn: {
    marginTop: 8,
    background: "#111827",
    color: "#ffffff",
    border: "none",
    borderRadius: 6,
    padding: "10px 20px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
  loadingMain: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f6f7f9",
  },
  loadingDot: {
    width: 8,
    height: 8,
    background: "#111827",
    borderRadius: "50%",
    opacity: 0.4,
  },
};
