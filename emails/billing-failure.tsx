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

interface BillingFailureEmailProps {
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
}

export const BillingFailureEmail = ({
  customerName = "there",
  productName = "Acme",
  planName = "Pro",
  amount = "29.00",
  currency = "USD",
  cardLast4 = "4242",
  failureReason = "Your card was declined by the issuing bank.",
  nextRetryDate = "April 20, 2026",
  updatePaymentUrl = "https://example.com/billing",
  supportUrl = "https://example.com/support",
  companyName = "Acme, Inc.",
}: BillingFailureEmailProps) => {
  const previewText = `We couldn't process your payment of ${currency} ${amount}. Update your card to keep ${productName} active.`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Text style={logoText}>{productName}</Text>
          </Section>

          <Section style={alertBanner}>
            <Text style={alertText}>⚠ Payment failed</Text>
          </Section>

          <Heading style={heading}>Hi {customerName},</Heading>

          <Text style={paragraph}>
            We tried to charge your card ending in <strong>{cardLast4}</strong> for
            your <strong>{productName} {planName}</strong> subscription, but the
            payment didn't go through.
          </Text>

          <Section style={detailsBox}>
            <Text style={detailsRow}>
              <span style={detailsLabel}>Amount</span>
              <span style={detailsValue}>
                {currency} {amount}
              </span>
            </Text>
            <Hr style={detailsHr} />
            <Text style={detailsRow}>
              <span style={detailsLabel}>Card</span>
              <span style={detailsValue}>•••• {cardLast4}</span>
            </Text>
            <Hr style={detailsHr} />
            <Text style={detailsRow}>
              <span style={detailsLabel}>Reason</span>
              <span style={detailsValue}>{failureReason}</span>
            </Text>
            <Hr style={detailsHr} />
            <Text style={detailsRow}>
              <span style={detailsLabel}>Next retry</span>
              <span style={detailsValue}>{nextRetryDate}</span>
            </Text>
          </Section>

          <Text style={paragraph}>
            To keep your subscription active, please update your payment method
            before the next retry attempt.
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={updatePaymentUrl}>
              Update payment method
            </Button>
          </Section>

          <Text style={paragraph}>
            If the retry also fails, your subscription will be paused and you'll
            lose access to {productName} {planName} features.
          </Text>

          <Hr style={divider} />

          <Text style={smallText}>
            Need help? Reach out at{" "}
            <Link href={supportUrl} style={link}>
              our support page
            </Link>{" "}
            and we'll sort it out with you.
          </Text>

          <Text style={footer}>
            {companyName} &middot; You received this email because your
            subscription requires a valid payment method.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default BillingFailureEmail;

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

const logoSection: React.CSSProperties = {
  marginBottom: "24px",
};

const logoText: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: 700,
  color: "#111827",
  margin: 0,
};

const alertBanner: React.CSSProperties = {
  backgroundColor: "#fef2f2",
  border: "1px solid #fecaca",
  borderRadius: "6px",
  padding: "10px 14px",
  marginBottom: "24px",
};

const alertText: React.CSSProperties = {
  color: "#991b1b",
  fontSize: "14px",
  fontWeight: 600,
  margin: 0,
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

const detailsBox: React.CSSProperties = {
  backgroundColor: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: "6px",
  padding: "4px 16px",
  margin: "20px 0",
};

const detailsRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "14px",
  margin: "10px 0",
};

const detailsLabel: React.CSSProperties = {
  color: "#6b7280",
};

const detailsValue: React.CSSProperties = {
  color: "#111827",
  fontWeight: 500,
  textAlign: "right",
};

const detailsHr: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid #e5e7eb",
  margin: 0,
};

const buttonContainer: React.CSSProperties = {
  textAlign: "center",
  margin: "28px 0",
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

const divider: React.CSSProperties = {
  borderColor: "#e5e7eb",
  margin: "28px 0",
};

const smallText: React.CSSProperties = {
  fontSize: "13px",
  lineHeight: "20px",
  color: "#6b7280",
  margin: "0 0 12px",
};

const link: React.CSSProperties = {
  color: "#2563eb",
  textDecoration: "underline",
};

const footer: React.CSSProperties = {
  fontSize: "12px",
  lineHeight: "18px",
  color: "#9ca3af",
  margin: "16px 0 0",
};
