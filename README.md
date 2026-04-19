# Send a billing-failure email — interactive tutorial

An interactive guide to sending billing-failure emails with React Email and Resend. Each step covers a concrete piece of the implementation — creating an account, verifying a sending domain, building and previewing the email template, and firing a real send through a Next.js API route.

The wizard is the tutorial. Instead of a static guide, every step shows real code from this repo and lets you run it. The email template is written with React Email, the sending code runs in a Next.js App Router route, and this README is the written companion that goes deeper on each step.

## The four steps

| # | Step | What happens |
|---|---|---|
| 1 | **Create a Resend account** | Sign up, generate an API key, paste it into the app |
| 2 | **Verify your sending domain** | Add DNS records so Resend can send from your domain |
| 3 | **Email template & live preview** | Edit the template source, add React Email components from the library, render and preview the result |
| 4 | **Send the email** | Edit customer details, inspect the send call, enter a recipient, hit send |

You can navigate any step at any time — the sidebar is never locked. Each step has a **Mark complete** button you click manually. Once all four are marked, the Send button in Step 4 activates.

State (API key, progress, inputs, template edits) is persisted in `localStorage`, so refreshing keeps everything intact. Use **Reset progress** in the sidebar to start fresh.

## What's in the repo

```
├── app/
│   ├── page.tsx                      ← wizard shell + intro view (two-column layout)
│   ├── layout.tsx
│   ├── _wizard/
│   │   ├── steps.ts                  ← step metadata
│   │   ├── sidebar.tsx               ← progress sidebar
│   │   ├── step-account.tsx          ← Step 1
│   │   ├── step-domain.tsx           ← Step 2
│   │   ├── step-template.tsx         ← Step 3 (template editor + preview + component library panel)
│   │   ├── step-send.tsx             ← Step 4 (customer details + send form + route walkthrough)
│   │   ├── code-block.tsx            ← CodeBlock + FileCodeBlock shared components
│   │   └── step-styles.tsx           ← shared styles + CompletedBadge
│   └── api/
│       ├── preview/route.ts          ← renders email to HTML via query params
│       ├── render-custom/route.ts    ← transpiles + renders user-edited template code
│       ├── source/route.ts           ← serves raw source files (allowlisted)
│       └── send-billing-failure/route.ts  ← calls Resend SDK to send
├── emails/
│   └── billing-failure.tsx           ← the React Email template
├── render.yaml                       ← Render blueprint for one-click deploy
└── package.json
```

## Run it locally

```bash
git clone https://github.com/ziggyedman/billing-failure-email.git
cd billing-failure-email
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app starts on the intro view — click the sidebar title anytime to return to it.

To preview the email template in React Email's dedicated dev server with hot reload:

```bash
npm run email
# → http://localhost:3001
```

### Environment variables (optional)

The API key field in Step 1 takes priority, so no setup is required to get started. For deployed instances where you want to provide a shared key:

```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
FROM_EMAIL=billing@yourdomain.com
```

`RESEND_API_KEY` is the fallback when the Step 1 field is empty. `FROM_EMAIL` is the fallback sender when the Step 2 field is empty. This makes the app work in two modes: **public demo** (users bring their own key) and **private tool** (deployer sets the key, users only fill in recipient).

---

## Companion notes, step by step

### Step 1 — Resend account & API key

Resend's free tier gives you 100 emails/day and 3,000/month. Sign up at [resend.com/signup](https://resend.com/signup), then go to [resend.com/api-keys](https://resend.com/api-keys) and click **Create API Key**.

**Permission scope:** "Full access" works for this tutorial. For production, narrow it to **Sending access** — it can send mail but can't read logs, manage domains, or rotate keys.

**Where the key lives in this app:** the UI stores it in `localStorage` under `billing-tutorial-state-v1`. Fine for a single-developer tutorial on your own machine. Not fine for anything shared — any JS on the same origin can read it. If you fork this for a real product, remove the Step 1 field and use environment variables exclusively.

### Step 2 — Verifying a domain

Resend requires DNS verification before it will send from an address on your domain.

**The records Resend asks for:**

- **MX** — routes bounce notifications back to Resend
- **TXT (SPF)** — authorizes Resend's mail servers to send on your behalf
- **TXT or CNAME (DKIM)** — cryptographic signature proving emails came from you
- **TXT (DMARC)** — optional policy for receiving servers if SPF/DKIM fail

**How to verify:**

1. Go to [resend.com/domains](https://resend.com/domains) → **Add Domain**
2. Resend shows the records to add. Leave that tab open
3. In your DNS provider (Cloudflare, Namecheap, etc.), add each record exactly as shown. The **Host** field is just the subdomain — if Resend shows `send.yourdomain.com`, type only `send`
4. Click **Verify DNS Records** in Resend. Propagation usually takes minutes, occasionally an hour. [dnschecker.org](https://dnschecker.org) confirms what's live

Once verified, enter your sending address in the Step 2 field (e.g. `billing@yourdomain.com`).

### Step 3 — Email template & live preview

Step 3 has two top-level tabs: **Try it** and **How it's built**. The right panel shows the full React Email component library.

#### Try it

The **Try it** tab has two viewer tabs:

- **Template** — the `emails/billing-failure.tsx` source in an editable textarea. Make changes directly, or copy a snippet from the component library in the right panel and paste it in. Click **Render preview →** to compile and preview your edits live. Click **Reset to original** to discard all changes. Only `react` and `@react-email/components` imports are supported in the sandbox.
- **Preview template** — the rendered email in an iframe. Shows the standard default preview, or your custom-rendered version once you've clicked **Render preview →**.

Any template edits you render here are stored globally and carried into Step 4's send — your custom version is what gets delivered.

#### How it's built

The **How it's built** tab is a full component reference for `@react-email/components`. Every component gets its own card: what it does, when to reach for it, a paste hint showing where in the template it goes, and a copyable code snippet.

**The template** lives at `emails/billing-failure.tsx`:

```tsx
import { Html, Head, Body, Container, Section, Heading, Text, Button, Hr, Link, Preview } from "@react-email/components";
import * as React from "react";

export const BillingFailureEmail = ({ customerName, amount, cardLast4, ... }: BillingFailureEmailProps) => (
  <Html>
    <Head />
    <Preview>We couldn't process your payment of {currency} {amount}.</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* logo, alert banner, greeting, payment details, CTA, footer */}
      </Container>
    </Body>
  </Html>
);

export default BillingFailureEmail;
```

**Every style is an inline object.** Email clients strip external stylesheets. React Email's components emit table-based HTML for Outlook compatibility — you write modern JSX and the library handles cross-client normalization.

**The live preview** (`/api/preview`) calls `render()` with your values as query params:

```ts
// app/api/preview/route.ts
const html = await render(BillingFailureEmail({ customerName, amount, ... }));
return new Response(html, { headers: { "Content-Type": "text/html" } });
```

**The custom render** (`/api/render-custom`) transpiles user-edited template code on the fly using esbuild, evaluates it in a sandboxed Node.js context with real React Email modules, and returns the rendered HTML:

```ts
// app/api/render-custom/route.ts
const { code: js } = await esbuild.transform(userCode, { loader: "tsx", format: "cjs" });
// evaluate with controlled require → render() → return HTML
```

### Step 4 — Sending

Step 4 has two tabs: **Send** and **How it's built**.

#### Send

At the top: edit the **customer details** (name, amount, card last 4, failure reason, next retry, company name) and click **Apply**. These values update the `resend.emails.send()` code snippet shown below them, and are injected into the email when no custom template is active. If you rendered a custom template in Step 3, that version is sent instead — the customer values won't override it.

Below: enter a **recipient address** and click **Send the email**. The send button is active once Steps 1–3 are each marked complete.

If a custom template is active, a purple **Custom template active** callout confirms it will be used for the send.

#### How it's built

A five-section walkthrough of `app/api/send-billing-failure/route.ts`:

1. Receive and unpack the JSON body, fall back to env vars
2. Instantiate `new Resend(apiKey)`
3. Call `resend.emails.send()` — with `html:` (custom template) or `react: BillingFailureEmail({...})` (default)
4. Return `data.id` on success, surface `error.message` on failure
5. Track the send in the Resend dashboard

```ts
// app/api/send-billing-failure/route.ts
const resend = new Resend(apiKey);
const { data, error } = await resend.emails.send(
  customHtml
    ? { from, to: [to], subject: "Your payment didn't go through", html: customHtml }
    : { from, to: [to], subject: "Your payment didn't go through", react: BillingFailureEmail({...}) }
);
if (error) return Response.json({ error }, { status: 500 });
return Response.json(data); // { id: "msg_xxxx" }
```

**Test addresses that are always safe:**
- `delivered@resend.dev` — accepted, no real delivery
- `bounced@resend.dev` — simulates a hard bounce
- `complained@resend.dev` — simulates a spam complaint

---

## Deploying to Render

The `render.yaml` at the repo root is a [Render Blueprint](https://render.com/docs/blueprint-spec):

1. Push the repo to GitHub
2. On [render.com](https://render.com): **New +** → **Blueprint** → connect GitHub → select the repo
3. Render reads `render.yaml` and creates a web service. Set env vars:
   - `RESEND_API_KEY` — shared key for all visitors
   - `FROM_EMAIL` — your verified sender address
4. First build takes ~2 minutes

> Render's free tier sleeps after 15 minutes of inactivity. First request after a sleep takes 30+ seconds. Upgrade to Starter ($7/mo) for always-on.

## Adapting for a real product

Keep `emails/billing-failure.tsx` and the send route — drop the wizard UI. Wire it to a Stripe webhook:

```ts
// app/api/webhooks/stripe/route.ts
import Stripe from "stripe";
import { Resend } from "resend";
import BillingFailureEmail from "@/emails/billing-failure";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature")!,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === "invoice.payment_failed") {
    const invoice = event.data.object as Stripe.Invoice;
    await resend.emails.send({
      from: "billing@yourdomain.com",
      to: invoice.customer_email!,
      subject: "Your payment didn't go through",
      react: BillingFailureEmail({
        customerName:     invoice.customer_name ?? "there",
        amount:           (invoice.amount_due / 100).toFixed(2),
        currency:         invoice.currency.toUpperCase(),
        cardLast4:        invoice.last_finalization_error?.payment_method?.card?.last4,
        failureReason:    invoice.last_finalization_error?.message ?? "Card declined",
        nextRetryDate:    new Date(invoice.next_payment_attempt! * 1000).toLocaleDateString(),
        updatePaymentUrl: `https://yourapp.com/billing/update?invoice=${invoice.id}`,
        supportUrl:       "https://yourapp.com/support",
      }),
    });
  }

  return new Response(null, { status: 200 });
}
```

## Troubleshooting

| Symptom | Fix |
|---|---|
| `from` address rejected | Domain not verified in Resend. Check [resend.com/domains](https://resend.com/domains). |
| Delivered in dashboard but never arrived | Check spam. DKIM/SPF likely misconfigured — re-verify the domain. |
| "No API key" error on send | Neither the Step 1 field nor `RESEND_API_KEY` env var is set. |
| Send button stays disabled | Steps 1–3 must each be manually marked complete. |
| Template render error in Step 3 | Only `react` and `@react-email/components` imports are supported in the sandbox. Remove any other imports. |
| Build fails on Render | Usually a Node version mismatch. Pin Node in Render's settings or add `engines.node` to `package.json`. |

## References

- [Resend: Send emails with Next.js](https://resend.com/docs/send-with-nextjs)
- [React Email: Getting Started](https://react.email/docs/getting-started/automatic-setup)
- [React Email: Components](https://react.email/components)
- [Resend: API reference](https://resend.com/docs/api-reference/emails/send-email)

## License

MIT.
