"use client";

import { useState } from "react";
import { stepStyles as s, CompletedBadge } from "./step-styles";

interface StepDomainProps {
  fromEmail: string;
  onFromEmailChange: (v: string) => void;
  onComplete: () => void;
  alreadyCompleted: boolean;
}

export function StepDomain({
  fromEmail,
  onFromEmailChange,
  onComplete,
  alreadyCompleted,
}: StepDomainProps) {
  const [mode, setMode] = useState<"own" | "sandbox">(
    fromEmail === "onboarding@resend.dev" ? "sandbox" : "own"
  );

  function pickSandbox() {
    setMode("sandbox");
    onFromEmailChange("onboarding@resend.dev");
  }

  function pickOwn() {
    setMode("own");
    if (fromEmail === "onboarding@resend.dev") {
      onFromEmailChange("");
    }
  }

  const canContinue =
    mode === "sandbox" || /@.+\..+/.test(fromEmail.trim());

  return (
    <div>
      {alreadyCompleted && <CompletedBadge />}

      <p style={s.prose}>
        To send from an address on a domain you own (like{" "}
        <code style={s.inlineCode}>billing@baard.cc</code>), Resend needs proof
        you control the domain. It does this by checking DNS records you add.
      </p>

      <p style={s.prose}>
        Not ready to set up DNS? You can use Resend's sandbox address for this
        tutorial — the tradeoff is it only delivers to the email you signed up
        with.
      </p>

      <div style={localStyles.choiceGrid}>
        <button
          onClick={pickSandbox}
          style={{
            ...localStyles.choice,
            ...(mode === "sandbox" ? localStyles.choiceActive : {}),
          }}
        >
          <div style={localStyles.choiceTitle}>Use Resend sandbox</div>
          <div style={localStyles.choiceSub}>
            Send from <code>onboarding@resend.dev</code>. No DNS required.
            Delivers only to your signup email.
          </div>
        </button>
        <button
          onClick={pickOwn}
          style={{
            ...localStyles.choice,
            ...(mode === "own" ? localStyles.choiceActive : {}),
          }}
        >
          <div style={localStyles.choiceTitle}>Verify my own domain</div>
          <div style={localStyles.choiceSub}>
            Send from any address on your domain. Delivers to anyone. Takes
            ~10 minutes.
          </div>
        </button>
      </div>

      {mode === "own" && (
        <div style={{ marginTop: 24 }}>
          <h3 style={s.h3}>How to verify your domain</h3>
          <ol style={s.ol}>
            <li style={s.li}>
              In Resend go to{" "}
              <a
                href="https://resend.com/domains"
                target="_blank"
                style={s.link}
              >
                Domains → Add Domain
              </a>
              . Enter your domain and pick the region closest to your users.
            </li>
            <li style={s.li}>
              Resend shows you the DNS records to add — typically an MX record
              for bounces, a TXT for SPF, and TXT or CNAME records for DKIM.
              Leave that tab open.
            </li>
            <li style={s.li}>
              In your DNS provider (Namecheap, Cloudflare, etc.), add each
              record exactly as shown. The <strong>Host</strong> is just the
              subdomain part — if Resend shows{" "}
              <code style={s.inlineCode}>send.yourdomain.com</code>, type just{" "}
              <code style={s.inlineCode}>send</code>, not the full domain.
            </li>
            <li style={s.li}>
              Click <strong>Verify DNS Records</strong> back on Resend.
              Propagation usually takes a few minutes; some DNS providers take
              up to an hour.
            </li>
          </ol>

          <div style={s.callout}>
            <span style={s.calloutStrong}>On Namecheap specifically:</span>{" "}
            Advanced DNS → Add New Record. Leave TTL on <strong>Automatic</strong>.
            Namecheap auto-appends your domain to the Host field, so don't
            include the full domain yourself — otherwise you get{" "}
            <code style={s.inlineCode}>send.baard.cc.baard.cc</code>.
          </div>

          <label style={s.label} htmlFor="fromEmail">
            Your "from" address
          </label>
          <input
            id="fromEmail"
            type="email"
            value={fromEmail}
            onChange={(e) => onFromEmailChange(e.target.value)}
            placeholder="billing@yourdomain.com"
            style={s.input}
            autoComplete="off"
            spellCheck={false}
          />
          <p style={s.hint}>
            Must be on a domain you've verified. You can use any local-part
            (<code>billing@</code>, <code>noreply@</code>, etc.) — Resend
            doesn't care which mailbox, just that the domain checks out.
          </p>
        </div>
      )}

      {mode === "sandbox" && (
        <div style={s.callout}>
          Using <code style={s.inlineCode}>onboarding@resend.dev</code>. When
          you send in Step 5, the <strong>to</strong> address must be the
          email you used to sign up for Resend — sandbox won't deliver
          anywhere else.
        </div>
      )}

      <div style={s.actionsRow}>
        <button
          style={canContinue ? s.primaryBtn : s.primaryBtnDisabled}
          disabled={!canContinue}
          onClick={onComplete}
        >
          {alreadyCompleted ? "Continue" : "Mark complete & continue"}
        </button>
      </div>
    </div>
  );
}

const localStyles: Record<string, React.CSSProperties> = {
  choiceGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    margin: "20px 0",
  },
  choice: {
    textAlign: "left",
    padding: 16,
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    cursor: "pointer",
    transition: "all 150ms ease",
    fontFamily: "inherit",
  },
  choiceActive: {
    border: "1px solid #111827",
    background: "#f9fafb",
    boxShadow: "0 0 0 3px rgba(17, 24, 39, 0.08)",
  },
  choiceTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 4,
  },
  choiceSub: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 1.5,
  },
};
