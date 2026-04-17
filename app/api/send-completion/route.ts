import { Resend } from "resend";
import { readFile } from "node:fs/promises";
import path from "node:path";
import CompletionEmail from "@/emails/completion-notice";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const from = process.env.FROM_EMAIL ?? "onboarding@resend.dev";
    const repoUrl =
      process.env.REPO_URL ??
      "https://github.com/your-username/billing-failure-email";
    const liveUrl =
      process.env.APP_URL ?? "https://billing-failure-email.onrender.com";

    // Read the sample invoice PDF from /public and attach it.
    const pdfPath = path.join(process.cwd(), "public", "sample-invoice.pdf");
    const pdfBuffer = await readFile(pdfPath);

    const { data, error } = await resend.emails.send({
      from: `Billing Demo <${from}>`,
      to: ["jonni@resend.com", "brian@resend.com"],
      subject: "Task complete: billing-failure email (Next.js + React Email)",
      react: CompletionEmail({
        repoUrl,
        liveUrl,
        reviewerName: "Jonni & Brian",
      }),
      attachments: [
        {
          filename: "sample-invoice.pdf",
          content: pdfBuffer,
        },
      ],
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
