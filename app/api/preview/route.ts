import { render } from "@react-email/components";
import BillingFailureEmail from "@/emails/billing-failure";

export const runtime = "nodejs";

export async function GET() {
  const html = await render(
    BillingFailureEmail({
      customerName: "Alex",
      productName: "Acme",
      planName: "Pro",
      amount: "29.00",
      currency: "USD",
      cardLast4: "4242",
      failureReason: "Your card was declined (insufficient_funds).",
      nextRetryDate: "in 3 days",
      updatePaymentUrl: "https://example.com/billing",
      supportUrl: "https://example.com/support",
      companyName: "Acme, Inc.",
    })
  );

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
