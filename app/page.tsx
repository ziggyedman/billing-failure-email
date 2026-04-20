"use client";

import { useEffect, useState } from "react";
import { STEPS } from "./_wizard/steps";
import { StepAccount } from "./_wizard/step-account";
import { StepDomain } from "./_wizard/step-domain";
import { StepTemplate, ComponentLibraryPanel } from "./_wizard/step-template";
import { StepSend } from "./_wizard/step-send";
import { Sidebar } from "./_wizard/sidebar";

const STORAGE_KEY = "billing-tutorial-state-v1";

interface EmailValues {
  customerName: string;
  amount: string;
  cardLast4: string;
  failureReason: string;
  nextRetryDate: string;
  companyName: string;
}

interface WizardState {
  currentStep: number;
  completed: boolean[];
  apiKey: string;
  fromEmail: string;
  toEmail: string;
  emailValues: EmailValues;
  notes: string[];
  customTemplateCode: string;
  customTemplateHtml: string;
}

const initialState: WizardState = {
  currentStep: -1,
  completed: STEPS.map(() => false),
  apiKey: "",
  fromEmail: "",
  toEmail: "",
  emailValues: {
    customerName: "Alex",
    amount: "29.00",
    cardLast4: "4242",
    failureReason: "Your card was declined (insufficient_funds).",
    nextRetryDate: "in 3 days",
    companyName: "Acme, Inc.",
  },
  notes: STEPS.map(() => ""),
  customTemplateCode: "",
  customTemplateHtml: "",
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
          setState({
            ...initialState,
            ...parsed,
            notes: Array.isArray(parsed.notes) && parsed.notes.length === STEPS.length
              ? parsed.notes
              : initialState.notes,
          });
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
          <div style={{ ...styles.contentInner, ...(isHome ? {} : { maxWidth: 1400, padding: "48px 40px 64px" }) }}>
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
                <div style={styles.videoSection}>
                  <div style={styles.watchBadge}>2 min overview</div>
                  <div style={styles.videoWrapper}>
                    <iframe
                      src="https://www.loom.com/embed/af24b2bb3e904053bb6d2c5c56a35740"
                      allowFullScreen
                      style={styles.videoIframe}
                    />
                  </div>
                </div>

                <p style={styles.introProse}>
                  This is an interactive companion tutorial on how to send a billing-failure email using Next.js, React Email and Resend.
                  It&apos;s a full step-by-step tutorial that walks you through the entire process, from start to finish.
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
                    repo&apos;s README
                  </a>
                  .
                </p>
                <p style={styles.introProse}>
                  Use the sidebar to navigate any step at any time. Mark each
                  one complete when you&apos;re done. Once all steps are checked, the
                  final send form unlocks.
                </p>

                <div style={styles.whatYoullDo}>
                  <p style={styles.whatTitle}>What you'll do in 4 steps</p>
                  <ol style={styles.stepList}>
                    <li style={styles.stepItem}>
                      <span style={styles.stepNum}>1</span>
                      <div>
                        <strong style={styles.stepItemTitle}>Create a Resend account</strong>
                        <span style={styles.stepItemDesc}>, sign up and generate an API key</span>
                      </div>
                    </li>
                    <li style={styles.stepItem}>
                      <span style={styles.stepNum}>2</span>
                      <div>
                        <strong style={styles.stepItemTitle}>Verify your sending domain</strong>
                        <span style={styles.stepItemDesc}>, add DNS records so Resend can send from your domain</span>
                      </div>
                    </li>
                    <li style={styles.stepItem}>
                      <span style={styles.stepNum}>3</span>
                      <div>
                        <strong style={styles.stepItemTitle}>Build &amp; preview the email template</strong>
                        <span style={styles.stepItemDesc}>, edit the React Email component and preview live</span>
                      </div>
                    </li>
                    <li style={styles.stepItem}>
                      <span style={styles.stepNum}>4</span>
                      <div>
                        <strong style={styles.stepItemTitle}>Send the email</strong>
                        <span style={styles.stepItemDesc}>, fire a real send through a Next.js API route</span>
                      </div>
                    </li>
                  </ol>
                </div>

                <div style={styles.startRow}>
                  <button
                    style={styles.startBtn}
                    onClick={() => goTo(0)}
                  >
                    Start with Step 1 →
                  </button>
                  <span style={styles.startNote}>
                    Use the sidebar to jump to any step at any time
                  </span>
                </div>
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

              <div style={styles.stepColumns}>
                <div style={styles.stepMain}>
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
                      emailValues={state.emailValues}
                      onComplete={() => markComplete(2)}
                      alreadyCompleted={state.completed[2]}
                      customTemplateCode={state.customTemplateCode}
                      onCustomTemplateCodeChange={(v) => update("customTemplateCode", v)}
                      onCustomHtmlChange={(html) => update("customTemplateHtml", html ?? "")}
                    />
                  )}
                  {current === 3 && (
                    <StepSend
                      apiKey={state.apiKey}
                      fromEmail={state.fromEmail}
                      toEmail={state.toEmail}
                      emailValues={state.emailValues}
                      customTemplateHtml={state.customTemplateHtml}
                      customTemplateCode={state.customTemplateCode}
                      completed={state.completed}
                      onToEmailChange={(v) => update("toEmail", v)}
                      onEmailValuesChange={(v) => update("emailValues", v)}
                      onCustomHtmlChange={(html) => update("customTemplateHtml", html)}
                      onComplete={() => markComplete(3)}
                      alreadyCompleted={state.completed[3]}
                    />
                  )}
                </div>

                <div style={styles.stepPanel}>
                  {current === 2 ? (
                    <ComponentLibraryPanel />
                  ) : (
                    <div style={styles.notesPanel}>
                      <label style={styles.notesPanelLabel}>Notes</label>
                      <textarea
                        style={styles.notesTextarea}
                        value={state.notes[current] ?? ""}
                        onChange={(e) => {
                          const next = [...state.notes];
                          next[current] = e.target.value;
                          update("notes", next);
                        }}
                        placeholder="Jot anything down as you work through this step…"
                        spellCheck={false}
                      />
                      <p style={styles.notesHint}>Auto-saved. Persists across refreshes.</p>
                    </div>
                  )}
                </div>
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
  videoSection: {
    marginBottom: 28,
  },
  watchBadge: {
    display: "inline-block",
    background: "#f4f4f5",
    color: "#71717a",
    border: "1px solid #e4e4e7",
    borderRadius: 5,
    padding: "3px 8px",
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
    marginBottom: 8,
  },
  videoWrapper: {
    position: "relative",
    paddingBottom: "56.25%",
    height: 0,
    borderRadius: 10,
    overflow: "hidden",
    border: "1px solid #e4e4e7",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  videoIframe: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: 0,
  },
  whatYoullDo: {
    background: "#f4f4f5",
    border: "1px solid #e4e4e7",
    borderRadius: 10,
    padding: "18px 20px",
    marginBottom: 20,
  },
  whatTitle: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.7px",
    color: "#71717a",
    margin: "0 0 12px",
  },
  stepList: {
    margin: 0,
    padding: 0,
    listStyle: "none",
    display: "flex",
    flexDirection: "column" as const,
    gap: 10,
  },
  stepItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    fontSize: 14,
    lineHeight: 1.5,
    color: "#3f3f46",
  },
  stepNum: {
    flexShrink: 0,
    width: 22,
    height: 22,
    background: "#18181b",
    color: "#fff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 11,
    fontWeight: 700,
    marginTop: 1,
  },
  stepItemTitle: {
    fontWeight: 600,
    color: "#18181b",
  },
  stepItemDesc: {
    color: "#71717a",
  },
  introProse: {
    fontSize: 14,
    lineHeight: 1.75,
    color: "#71717a",
    margin: "0 0 20px",
  },
  introLink: {
    color: "#18181b",
    textDecoration: "underline",
    textUnderlineOffset: "3px",
  },
  startRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    flexWrap: "wrap" as const,
  },
  startBtn: {
    background: "#18181b",
    color: "#ffffff",
    border: "none",
    borderRadius: 8,
    padding: "10px 20px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "-0.1px",
    flexShrink: 0,
  },
  startNote: {
    fontSize: 12,
    color: "#a1a1aa",
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
  stepColumns: {
    display: "flex",
    gap: 32,
    alignItems: "flex-start",
  },
  stepMain: {
    flex: 1,
    minWidth: 0,
  },
  stepPanel: {
    width: 420,
    flexShrink: 0,
    position: "sticky" as const,
    top: 0,
    maxHeight: "calc(100vh - 96px)",
    overflowY: "auto" as const,
  },
  notesPanel: {
    border: "1px solid #e4e4e7",
    borderRadius: 8,
    overflow: "hidden",
    background: "#fafafa",
    display: "flex",
    flexDirection: "column" as const,
  },
  notesPanelLabel: {
    display: "block",
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.6px",
    color: "#71717a",
    padding: "10px 14px 8px",
    borderBottom: "1px solid #e4e4e7",
    background: "#f4f4f5",
  },
  notesTextarea: {
    flex: 1,
    width: "100%",
    minHeight: 280,
    padding: "12px 14px",
    fontSize: 13,
    lineHeight: 1.7,
    color: "#3f3f46",
    background: "#ffffff",
    border: "none",
    outline: "none",
    resize: "vertical" as const,
    fontFamily: "inherit",
    boxSizing: "border-box" as const,
  },
  notesHint: {
    fontSize: 11,
    color: "#a1a1aa",
    padding: "6px 14px 10px",
    margin: 0,
    borderTop: "1px solid #e4e4e7",
    background: "#fafafa",
  },
};
