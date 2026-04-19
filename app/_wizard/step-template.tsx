"use client";

import { stepStyles as s, CompletedBadge } from "./step-styles";

interface StepTemplateProps {
  onComplete: () => void;
  alreadyCompleted: boolean;
}

export function StepTemplate({
  onComplete,
  alreadyCompleted,
}: StepTemplateProps) {
  return (
    <div>
      {alreadyCompleted && <CompletedBadge />}

      <p style={s.prose}>
        The billing failure email is built as a <strong>React component</strong>{" "}
        using{" "}
        <a
          href="https://react.email"
          target="_blank"
          rel="noreferrer"
          style={s.link}
        >
          React Email
        </a>
        . Think of it like a form letter with placeholders — the component
        receives customer-specific data as props and renders a fully formatted
        email every time it's called.
      </p>

      <h3 style={s.h3}>Why React Email instead of plain HTML?</h3>
      <p style={s.prose}>
        Email clients are notoriously inconsistent. Gmail strips out certain
        styles, Outlook uses its own rendering engine, and mobile clients add
        their own quirks on top. Writing reliable email HTML by hand means
        wrestling with nested tables and inline styles for every client.
      </p>
      <p style={s.prose}>
        React Email handles all of that behind the scenes. You write clean,
        readable component code — it outputs the table-based HTML that email
        clients actually understand. The components (
        <code style={s.inlineCode}>Container</code>,{" "}
        <code style={s.inlineCode}>Button</code>,{" "}
        <code style={s.inlineCode}>Text</code>,{" "}
        <code style={s.inlineCode}>Hr</code>) have been tested across major
        clients so you don't have to.
      </p>

      <h3 style={s.h3}>What the template receives</h3>
      <p style={s.prose}>
        The template file lives at{" "}
        <code style={s.inlineCode}>emails/billing-failure.tsx</code>. Everything
        that varies per customer is passed in as a prop:
      </p>

      <pre style={s.codeBlock}>
{`interface BillingFailureEmailProps {
  customerName?: string;     // e.g. "Alex"
  productName?: string;      // e.g. "Acme App"
  planName?: string;         // e.g. "Pro Plan"
  amount?: string;           // e.g. "49.00"
  currency?: string;         // e.g. "USD"
  cardLast4?: string;        // e.g. "4242"
  failureReason?: string;    // e.g. "Insufficient funds"
  nextRetryDate?: string;    // e.g. "Jan 25, 2025"
  updatePaymentUrl?: string; // link to the billing page
  supportUrl?: string;       // link to support
  companyName?: string;      // e.g. "Acme Inc."
}`}
      </pre>

      <p style={s.prose}>
        When Resend sends the email, it calls this component with the actual
        customer data, renders it to HTML, and delivers it. The same component
        is also used in Step 4 to generate the live preview you'll see in the
        browser.
      </p>

      <h3 style={s.h3}>How the template is structured</h3>
      <p style={s.prose}>
        The layout follows a simple top-to-bottom flow that's common in
        transactional emails:
      </p>

      <pre style={s.codeBlock}>
{`<Html>
  <Head />
  <Preview>We couldn't process your payment of \${amount}.</Preview>

  <Body>
    <Container>
      <Section>[company logo]</Section>
      <Section>⚠ Payment failed</Section>      {/* red alert banner */}
      <Heading>Hi {customerName},</Heading>
      <Text>We tried to charge card ending in {cardLast4}...</Text>

      <Section>                                {/* payment details box */}
        <Text>Amount · \${amount} {currency}</Text>
        <Text>Reason · {failureReason}</Text>
        <Text>Next retry · {nextRetryDate}</Text>
      </Section>

      <Button href={updatePaymentUrl}>
        Update payment method
      </Button>

      <Text>
        If the retry also fails, your subscription will pause...
      </Text>
    </Container>
  </Body>
</Html>`}
      </pre>

      <h3 style={s.h3}>The Preview line — easy to miss, worth getting right</h3>
      <p style={s.prose}>
        The <code style={s.inlineCode}>&lt;Preview&gt;</code> component renders
        hidden text that email clients show as the snippet in the inbox list —
        the line you see before opening a message. It doesn't appear in the
        email body itself.
      </p>
      <p style={s.prose}>
        For a billing failure email this matters: a clear preview like{" "}
        <em>"We couldn't process your $49 payment — action needed"</em> tells
        the customer what happened before they even open it, which increases the
        chance they act on it quickly.
      </p>

      <div style={s.actionsRow}>
        <button style={s.primaryBtn} onClick={onComplete}>
          {alreadyCompleted ? "Continue" : "Got it — continue"}
        </button>
      </div>
    </div>
  );
}
