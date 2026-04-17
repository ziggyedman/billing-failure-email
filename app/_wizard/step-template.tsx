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
        The email itself is a React component. React Email gives you building
        blocks — <code style={s.inlineCode}>Container</code>,{" "}
        <code style={s.inlineCode}>Button</code>,{" "}
        <code style={s.inlineCode}>Hr</code> — that compile down to the
        table-based HTML that email clients actually render well.
      </p>

      <p style={s.prose}>
        The billing failure template lives at{" "}
        <code style={s.inlineCode}>emails/billing-failure.tsx</code>. Its props
        are everything that varies per customer:
      </p>

      <pre style={s.codeBlock}>
{`interface BillingFailureEmailProps {
  customerName?: string;
  productName?: string;
  planName?: string;
  amount?: string;
  currency?: string;
  cardLast4?: string;
  failureReason?: string;
  nextRetryDate?: string;
  updatePaymentUrl?: string;
  supportUrl?: string;
  companyName?: string;
}`}
      </pre>

      <p style={s.prose}>Here's the structure of the template:</p>

      <pre style={s.codeBlock}>
{`<Html>
  <Head />
  <Preview>{previewText}</Preview>  {/* inbox snippet */}
  <Body>
    <Container>
      <Section>[product logo]</Section>
      <Section>⚠ Payment failed</Section>   {/* red alert banner */}
      <Heading>Hi {customerName},</Heading>
      <Text>We tried to charge ••• {cardLast4}...</Text>
      <Section>                              {/* amount / reason / retry */}
        <Text>Amount · \${amount}</Text>
        <Text>Reason · {failureReason}</Text>
        <Text>Next retry · {nextRetryDate}</Text>
      </Section>
      <Button href={updatePaymentUrl}>Update payment method</Button>
      <Text>If retry also fails, subscription will pause...</Text>
    </Container>
  </Body>
</Html>`}
      </pre>

      <h3 style={s.h3}>Why React Email and not plain HTML</h3>
      <p style={s.prose}>
        Email clients are stuck in the 2000s. Gmail strips half your CSS,
        Outlook renders in Word, and mobile clients add their own surprises.
        React Email's components have spent years being tested against all of
        them — you get consistent rendering without hand-writing{" "}
        <code style={s.inlineCode}>&lt;table&gt;</code> soup.
      </p>

      <p style={s.prose}>
        The <code style={s.inlineCode}>&lt;Preview&gt;</code> component is a
        small-but-important detail: it's the hidden text that shows as the
        snippet in the inbox list, before anyone opens the email. For a billing
        email, a good preview saves people from having to guess what arrived.
      </p>

      <div style={s.actionsRow}>
        <button style={s.primaryBtn} onClick={onComplete}>
          {alreadyCompleted ? "Continue" : "Got it — continue"}
        </button>
      </div>
    </div>
  );
}
