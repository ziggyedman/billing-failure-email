import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface CompletionEmailProps {
  repoUrl?: string;
  liveUrl?: string;
  reviewerName?: string;
}

export const CompletionEmail = ({
  repoUrl = "https://github.com/your-username/billing-failure-email",
  liveUrl = "https://billing-failure-email.onrender.com",
  reviewerName = "there",
}: CompletionEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Billing failure email task complete — repo, live app, and PDF attached
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Hi {reviewerName},</Heading>

        <Text style={paragraph}>
          Sending this to mark the billing-failure-email task as complete.
          Everything is linked below, and a PDF of the rendered email is
          attached.
        </Text>

        <Section style={box}>
          <Text style={boxLabel}>GitHub repo</Text>
          <Link href={repoUrl} style={link}>
            {repoUrl}
          </Link>

          <Hr style={divider} />

          <Text style={boxLabel}>Live app (Render)</Text>
          <Link href={liveUrl} style={link}>
            {liveUrl}
          </Link>
        </Section>

        <Section style={buttonContainer}>
          <Button style={button} href={repoUrl}>
            Open the repo
          </Button>
        </Section>

        <Text style={paragraph}>
          The repo has a tutorial in the README that walks from zero (no
          account) to a sent email, and the billing-failure template itself is
          in <code style={code}>emails/billing-failure.tsx</code>. This email
          you're reading was also built and sent from that same project.
        </Text>

        <Text style={paragraph}>Thanks!</Text>

        <Hr style={divider} />

        <Text style={footer}>
          Sent from the billing-failure-email demo · built with Next.js, React
          Email, and Resend
        </Text>
      </Container>
    </Body>
  </Html>
);

export default CompletionEmail;

// ---------- styles ----------

const main: React.CSSProperties = {
  backgroundColor: "#f6f7f9",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
};

const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "32px 40px",
  maxWidth: "560px",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
};

const heading: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: 600,
  color: "#111827",
  margin: "0 0 16px",
};

const paragraph: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#374151",
  margin: "0 0 16px",
};

const box: React.CSSProperties = {
  backgroundColor: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: "6px",
  padding: "16px 20px",
  margin: "20px 0",
};

const boxLabel: React.CSSProperties = {
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  color: "#6b7280",
  margin: "0 0 4px",
  fontWeight: 600,
};

const link: React.CSSProperties = {
  color: "#2563eb",
  textDecoration: "underline",
  fontSize: "14px",
  wordBreak: "break-all",
};

const divider: React.CSSProperties = {
  borderColor: "#e5e7eb",
  margin: "16px 0",
};

const buttonContainer: React.CSSProperties = {
  textAlign: "center",
  margin: "24px 0",
};

const button: React.CSSProperties = {
  backgroundColor: "#111827",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: 600,
  padding: "12px 24px",
  borderRadius: "6px",
  textDecoration: "none",
  display: "inline-block",
};

const code: React.CSSProperties = {
  backgroundColor: "#f3f4f6",
  padding: "2px 6px",
  borderRadius: "4px",
  fontSize: "13px",
  fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
};

const footer: React.CSSProperties = {
  fontSize: "12px",
  color: "#9ca3af",
  margin: 0,
};
