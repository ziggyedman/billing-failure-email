import { render } from "@react-email/components";
import BillingFailureEmail from "@/emails/billing-failure";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const get = (key: string, fallback: string) =>
    searchParams.get(key) || fallback;

  const html = await render(
    BillingFailureEmail({
      customerName:     get("customerName",  "Alex"),
      productName:      get("productName",   "Acme"),
      planName:         get("planName",      "Pro"),
      amount:           get("amount",        "29.00"),
      currency:         get("currency",      "USD"),
      cardLast4:        get("cardLast4",     "4242"),
      failureReason:    get("failureReason", "Your card was declined (insufficient_funds)."),
      nextRetryDate:    get("nextRetryDate", "in 3 days"),
      updatePaymentUrl: get("updatePaymentUrl", "https://example.com/billing"),
      supportUrl:       get("supportUrl",    "https://example.com/support"),
      companyName:      get("companyName",   "Acme, Inc."),
    })
  );

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
