"use client";

import { stepStyles as s, CompletedBadge, NumberedSection } from "./step-styles";

interface StepAccountProps {
  apiKey: string;
  onApiKeyChange: (v: string) => void;
  onComplete: () => void;
  alreadyCompleted: boolean;
}

export function StepAccount({
  apiKey,
  onApiKeyChange,
  onComplete,
  alreadyCompleted,
}: StepAccountProps) {
  const looksValid = /^re_[A-Za-z0-9_-]{10,}$/.test(apiKey.trim());

  return (
    <div>
      {alreadyCompleted && <CompletedBadge />}

      <p style={s.prose}>
        Resend is the email provider we're going to use. The free plan lets you
        send 100 emails per day, which is more than enough for this tutorial.
      </p>

      <NumberedSection num={1} title="Create a Resend account">
        Open{" "}
        <a href="https://resend.com/signup" target="_blank" style={s.link}>
          resend.com/signup
        </a>{" "}
        in a new tab and create an account. Email + password or GitHub OAuth,
        either works.
      </NumberedSection>

      <NumberedSection num={2} title="Generate an API key">
        Once you're in, go to{" "}
        <a href="https://resend.com/api-keys" target="_blank" style={s.link}>
          resend.com/api-keys
        </a>{" "}
        and click <strong>Create API Key</strong>. Name it something like{" "}
        <code style={s.inlineCode}>tutorial-dev</code>. For permission,{" "}
        <strong>Full access</strong> is fine.
      </NumberedSection>

      <NumberedSection num={3} title="Copy the key" last>
        The key starts with <code style={s.inlineCode}>re_</code>. Resend only
        shows it once, so don't navigate away before pasting it below.
      </NumberedSection>

      <div style={s.callout}>
        <span style={s.calloutStrong}>Heads up:</span> this key is secret. It'll
        be stored in your browser's localStorage for the tutorial. Don't paste it
        into public pastebins or commit it to git.
      </div>

      <div style={{ marginTop: 24 }}>
        <label style={s.label} htmlFor="apiKey">
          Paste your API key
        </label>
        <input
          id="apiKey"
          type="password"
          value={apiKey}
          onChange={(e) => onApiKeyChange(e.target.value)}
          placeholder="re_..."
          style={s.input}
          autoComplete="off"
          spellCheck={false}
        />
        <p style={s.hint}>
          Stored only in your browser. The app sends it to its own API route
          when you hit Send in Step 4. It never leaves the session.
        </p>
      </div>

      <div style={s.actionsRow}>
        <button
          style={looksValid ? s.primaryBtn : s.primaryBtnDisabled}
          disabled={!looksValid}
          onClick={onComplete}
        >
          {alreadyCompleted ? "Continue" : "Mark complete & continue"}
        </button>
        {!looksValid && apiKey.length > 0 && (
          <span style={{ fontSize: 12, color: "#dc2626" }}>
            Doesn't look like a Resend key (should start with{" "}
            <code>re_</code>).
          </span>
        )}
      </div>
    </div>
  );
}
