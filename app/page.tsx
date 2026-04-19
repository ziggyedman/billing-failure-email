"use client";

import { useEffect, useState } from "react";
import { STEPS } from "./_wizard/steps";
import { StepAccount } from "./_wizard/step-account";
import { StepDomain } from "./_wizard/step-domain";
import { StepTemplate } from "./_wizard/step-template";
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
          <div style={styles.contentInner}>
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
                  This is an interactive companion tutorial on how to send a billing-failure email using Next.js, React Email and Resend. 
                  It's a full step-by-step tutorial that walks you through the entire process, from start to finish.
                  From creating a Resend account, verifying a sending domain, building the email template, and finally sending the email, every step is covered in detail with live code and previews.
                  
                </p>
                <p style={styles.introProse}>
                  The email template is written as a React component using React Email.
                  The sending code runs in a Next.js App Router API route.
                  Every step shows the actual code from the repo and a live preview of the email. You can interact with the code and preview at each step, and see how changes affect the final output in real time.
                  The full written guide lives in the{" "}
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
                  one complete when you're done. Once all steps are checked, the
                  final send form unlocks.
                </p>
                <div style={styles.videoWrapper}>
                  <iframe
                    src="https://www.loom.com/embed/af24b2bb3e904053bb6d2c5c56a35740"
                    allowFullScreen
                    style={styles.videoIframe}
                  />
                </div>
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
                    customerName={state.customerName}
                    onCustomerNameChange={(v) => update("customerName", v)}
                    onComplete={() => markComplete(2)}
                    alreadyCompleted={state.completed[2]}
                  />
                )}
                {current === 3 && (
                  <StepSend
                    apiKey={state.apiKey}
                    fromEmail={state.fromEmail}
                    toEmail={state.toEmail}
                    customerName={state.customerName}
                    completed={state.completed}
                    onToEmailChange={(v) => update("toEmail", v)}
                    onComplete={() => markComplete(3)}
                    alreadyCompleted={state.completed[3]}
                  />
                )}
              </div>
            </>
          )}
          </div>
        </div>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    height: "100vh",
    display: "flex",
    overflow: "hidden",
    background: "#fafafa",
  },
  shell: {
    display: "flex",
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },
  content: {
    flex: 1,
    overflowY: "auto",
    background: "#ffffff",
    borderLeft: "1px solid #e4e4e7",
  },
  contentInner: {
    maxWidth: 760,
    margin: "0 auto",
    padding: "48px 48px 64px",
  },
  contentHeader: {
    borderBottom: "1px solid #e4e4e7",
    paddingBottom: 24,
    marginBottom: 32,
  },
  stepLabel: {
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.7px",
    color: "#71717a",
    marginBottom: 8,
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: "#18181b",
    margin: "0 0 6px",
    lineHeight: 1.25,
    letterSpacing: "-0.3px",
  },
  contentSubtitle: {
    fontSize: 14,
    color: "#71717a",
    margin: 0,
    lineHeight: 1.6,
  },
  contentBody: {},
  introProse: {
    fontSize: 15,
    lineHeight: 1.75,
    color: "#3f3f46",
    margin: "0 0 16px",
  },
  introLink: {
    color: "#18181b",
    textDecoration: "underline",
    textUnderlineOffset: "3px",
  },
  videoWrapper: {
    position: "relative",
    paddingBottom: "56.25%",
    height: 0,
    marginBottom: 24,
    borderRadius: 10,
    overflow: "hidden",
    border: "1px solid #e4e4e7",
  },
  videoIframe: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: 0,
  },
  startBtn: {
    marginTop: 8,
    background: "#18181b",
    color: "#ffffff",
    border: "none",
    borderRadius: 8,
    padding: "10px 20px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "-0.1px",
  },
  loadingMain: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fafafa",
  },
  loadingDot: {
    width: 8,
    height: 8,
    background: "#18181b",
    borderRadius: "50%",
    opacity: 0.3,
  },
};
