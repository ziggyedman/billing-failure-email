"use client";

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
      <ol style={s.ol}>
        <li style={s.li}>
          In Resend go to{" "}
          <a href="https://resend.com/domains" target="_blank" style={s.link}>
            Domains → Add Domain
          </a>
          . Enter your domain and pick the region closest to your users.
        </li>
        <li style={s.li}>
          Resend shows you the DNS records to add — typically an MX record for
          bounces, a TXT for SPF, and TXT or CNAME records for DKIM. Leave that
          tab open.
        </li>
        <li style={s.li}>
          In your DNS provider (Namecheap, Cloudflare, etc.), add each record
          exactly as shown. The <strong>Host</strong> is just the subdomain
          part — if Resend shows{" "}
          <code style={s.inlineCode}>send.yourdomain.com</code>, type just{" "}
          <code style={s.inlineCode}>send</code>, not the full domain.
        </li>
        <li style={s.li}>
          Click <strong>Verify DNS Records</strong> back on Resend. Propagation
          usually takes a few minutes; some DNS providers take up to an hour.
        </li>
      </ol>

      <div style={s.callout}>
        <span style={s.calloutStrong}>On Namecheap specifically:</span>{" "}
        Advanced DNS → Add New Record. Leave TTL on <strong>Automatic</strong>.
        Namecheap auto-appends your domain to the Host field, so don't include
        the full domain yourself — otherwise you get{" "}
        <code style={s.inlineCode}>send.baard.cc.baard.cc</code>.
      </div>

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
          Resend doesn't care which mailbox, just that the domain checks out.
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
