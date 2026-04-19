"use client";

import { stepStyles as s, CompletedBadge, NumberedSection } from "./step-styles";

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
  const canContinue = /@.+\..+/.test(fromEmail.trim());

  return (
    <div>
      {alreadyCompleted && <CompletedBadge />}

      <p style={s.prose}>
        To send from an address on your domain (like{" "}
        <code style={s.inlineCode}>billing@yourdomain.com</code>), Resend needs
        proof you control it. It does this by checking DNS records you add.
      </p>

      <h3 style={s.h3}>How to verify your domain</h3>

      <NumberedSection num={1} title="Add your domain in Resend">
        Go to{" "}
        <a href="https://resend.com/domains" target="_blank" style={s.link}>
          Domains → Add Domain
        </a>
        . Enter your domain and pick the region closest to your users.
      </NumberedSection>

      <NumberedSection num={2} title="Note the DNS records Resend gives you">
        Resend shows the records to add. Typically an MX record for bounces, a
        TXT for SPF, and TXT or CNAME records for DKIM. Leave that tab open.
      </NumberedSection>

      <NumberedSection num={3} title="Add the records in your DNS provider">
        In Namecheap, Cloudflare, or wherever your domain lives, add each record
        exactly as shown. The <strong>Host</strong> field is just the subdomain
        part. 
      </NumberedSection>

      <NumberedSection num={4} title="Verify in Resend" last>
        Click <strong>Verify DNS Records</strong> in Resend. Propagation usually
        takes a few minutes; some providers take up to an hour.
      </NumberedSection>

      <div style={{ marginTop: 24 }}>
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
          Must be on a domain you've verified in Resend. You can use any
          local-part (<code>billing@</code>, <code>noreply@</code>, etc.) —
          Resend only checks that the domain checks out.
        </p>
      </div>

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
