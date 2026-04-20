import { Resend } from "resend";
import BillingFailureEmail from "@/emails/billing-failure";

export const runtime = "nodejs";

interface SendBody {
  from?: string;
  to?: string;
  apiKey?: string;
  customerName?: string;
  amount?: string;
  currency?: string;
  cardLast4?: string;
  failureReason?: string;
  nextRetryDate?: string;
  companyName?: string;
  customHtml?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as SendBody;

    // API key: UI field wins, env var is the fallback.
    const apiKey = body.apiKey?.trim() || process.env.RESEND_API_KEY;
    if (!apiKey) {
      return Response.json(
        {
          error: {
            message:
              "No API key. Paste one in Step 1 of the wizard, or set RESEND_API_KEY as an environment variable.",
          },
        },
        { status: 400 }
      );
    }

    const from =
      body.from?.trim() ||
      process.env.FROM_EMAIL ||
      "onboarding@resend.dev";
    const to = body.to?.trim();

    if (!to) {
      return Response.json(
        { error: { message: "Missing `to` address." } },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);
    const customHtml = body.customHtml?.trim();

    const { data, error } = await resend.emails.send(
      customHtml
        ? { from, to: [to], subject: "Your payment didn't go through", html: customHtml }
        : {
            from,
            to: [to],
            subject: "Your payment didn't go through",
            react: BillingFailureEmail({
              customerName:  body.customerName  || "there",
              productName:   "Acme",
              planName:      "Pro",
              amount:        body.amount        || "29.00",
              currency:      body.currency      || "USD",
              cardLast4:     body.cardLast4     || "4242",
              failureReason: body.failureReason || "Your card was declined (insufficient_funds).",
              nextRetryDate: body.nextRetryDate || "in 3 days",
              companyName:   body.companyName   || "Acme, Inc.",
              updatePaymentUrl: "https://example.com/billing",
              supportUrl:       "https://example.com/support",
            }),
          }
    );

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: { message: (error as Error).message } },
      { status: 500 }
    );
  }
}
