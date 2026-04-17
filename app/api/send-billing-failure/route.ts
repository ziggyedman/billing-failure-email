import { Resend } from "resend";
import BillingFailureEmail from "@/emails/billing-failure";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      to?: string | string[];
    };

    const to = body.to ?? "delivered@resend.dev";
    const from = process.env.FROM_EMAIL ?? "onboarding@resend.dev";

    const { data, error } = await resend.emails.send({
      from: `Acme Billing <${from}>`,
      to: Array.isArray(to) ? to : [to],
      subject: "Your payment didn't go through",
      react: BillingFailureEmail({
        customerName: "Alex",
        productName: "Acme",
        planName: "Pro",
        amount: "29.00",
        currency: "USD",
        cardLast4: "4242",
        failureReason: "Your card was declined (insufficient_funds).",
        nextRetryDate: "April 20, 2026",
        updatePaymentUrl: `${process.env.APP_URL ?? "http://localhost:3000"}/billing`,
        supportUrl: `${process.env.APP_URL ?? "http://localhost:3000"}/support`,
        companyName: "Acme, Inc.",
      }),
    });

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
