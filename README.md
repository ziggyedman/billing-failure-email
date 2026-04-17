# Send a billing-failure email — interactive tutorial

An interactive guide to sending billing failure emails with React Email and Resend. Each step covers a concrete piece of the implementation — creating an account, verifying a sending domain, understanding the email template, previewing the rendered output, and firing a live send through a Next.js API route.

The wizard is the tutorial. Instead of a static guide, every step shows the real code from this repo and lets you run it. The email template is written with React Email, the sending code runs in a Next.js App Router route, and this README is the written companion that goes deeper on each step.

## The five steps

| # | Step | What happens |
|---|---|---|
| 1 | **Create a Resend account** | Sign up, generate an API key, paste it into the app |
| 2 | **Verify your sending domain** | Add DNS records so Resend can send from your domain |
| 3 | **Understand the template** | Tour the React Email component in `emails/billing-failure.tsx` |
| 4 | **Preview the email** | Toggle between the live rendered preview and the component source; download the template |
| 5 | **Send it** | Fill in from/to, inspect the Next.js route code, hit send |

You can navigate any step at any time — the sidebar is never locked. Each step has a **Mark complete** button you click manually. Once all five are marked, the Send button in Step 5 activates and you can fire a real email.

State (API key, progress, inputs) is persisted in `localStorage`, so refreshing the page keeps everything intact. Use **Reset progress** in the sidebar to start fresh.

## What's in the repo

```
├── app/
│   ├── page.tsx                      ← wizard shell + home/intro view
│   ├── layout.tsx
│   ├── _wizard/                      ← step components (underscore = Next.js private folder)
│   │   ├── steps.ts                  ← step metadata
│   │   ├── sidebar.tsx               ← progress sidebar (title is clickable → home)
│   │   ├── step-account.tsx          ← Step 1
│   │   ├── step-domain.tsx           ← Step 2
│   │   ├── step-template.tsx         ← Step 3
│   │   ├── step-preview.tsx          ← Step 4 (Preview / Code tabs + download)
│   │   ├── step-send.tsx             ← Step 5 (Send form / Route code tabs)
│   │   └── step-styles.tsx           ← shared styles + CompletedBadge
│   └── api/
│       ├── preview/route.ts          ← renders the email to HTML for the iframe
│       ├── source/route.ts           ← serves raw source files (allowlisted)
│       └── send-billing-failure/route.ts   ← calls Resend to send the email
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

The API key field in Step 1 takes priority over env vars, so no setup is required to get started. For deployed instances where you want to provide a shared key:

```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
FROM_EMAIL=billing@yourdomain.com
```

`RESEND_API_KEY` is the fallback when the Step 1 field is left empty. `FROM_EMAIL` is the fallback sender address when the Step 2 field is left empty. This makes the app work in two modes: **public demo** (users bring their own key) and **private tool** (deployer sets the key, users only fill in from/to).

---

## Companion notes, step by step

Everything below expands on what the in-app wizard shows — the wrinkles, the gotchas, and the code behind each step.

### Step 1 — Resend account & API key

Resend's free tier gives you 100 emails/day and 3,000/month, which is plenty for this tutorial. Sign up at [resend.com/signup](https://resend.com/signup), then go to [resend.com/api-keys](https://resend.com/api-keys) and click **Create API Key**.

**Permission scope:** "Full access" works for this tutorial. For production, narrow it to **Sending access** — it can send mail but can't read logs, manage domains, or rotate keys. Separate keys per environment (dev, staging, prod) is a good habit from day one.

**Where the key lives in this app:** the UI stores it in `localStorage` under `billing-tutorial-state-v1`. That's fine for a single-developer tutorial on your own machine. It is *not* fine for anything shared — any JS on the same origin can read it. If you fork this for a real product, remove the Step 1 field and use environment variables exclusively.

### Step 2 — Verifying a domain

Resend requires DNS verification before it will send from an address on your domain. This is how it proves you control the domain and protects its sending reputation.

**The DNS records Resend asks for:**

- **MX** — routes bounce notifications back to Resend so it can track delivery failures
- **TXT (SPF)** — authorizes Resend's mail servers to send on behalf of your domain
- **TXT or CNAME (DKIM)** — cryptographic signature that proves emails came from you
- **TXT (DMARC)** — optional policy telling receiving servers what to do if SPF/DKIM fail

**How verification works in practice:**

1. Go to [resend.com/domains](https://resend.com/domains) → **Add Domain**. Enter your domain and pick the nearest region.
2. Resend shows the DNS records to add. Leave that tab open.
3. In your DNS provider (Namecheap, Cloudflare, etc.), add each record exactly as shown.
4. Click **Verify DNS Records** in Resend. Propagation usually takes a few minutes, occasionally up to an hour. [dnschecker.org](https://dnschecker.org) lets you confirm what's live.

**Namecheap-specific gotchas:**

1. Namecheap's Host field auto-appends your domain. If Resend shows a record for `send.yourdomain.com`, type only `send` in Host — not the full domain — or you end up with `send.yourdomain.com.yourdomain.com`.
2. Leave TTL on **Automatic**.
3. For long TXT values (DKIM keys especially), paste exactly as shown — no extra quotes, no line breaks.
4. MX records need a **priority** value. Resend specifies it (usually `10`).

Once verified, enter your sending address in the Step 2 form field (e.g. `billing@yourdomain.com`). You can use any local-part — Resend only checks that the domain is verified.

### Step 3 — The React Email template

The template lives at `emails/billing-failure.tsx` and is a regular React component whose output is email-safe HTML:

```tsx
import { Html, Head, Body, Container, Button, Preview, /* ... */ } from "@react-email/components";

export const BillingFailureEmail = ({ customerName, amount, cardLast4, ... }) => (
  <Html>
    <Head />
    <Preview>We couldn't process your payment of ${amount}.</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* alert banner, heading, payment details box, CTA button, footer */}
      </Container>
    </Body>
  </Html>
);
```

**`<Preview>`** is invisible in the rendered email body but appears as the inbox snippet next to the subject line. For a billing failure email it's worth writing carefully — a good preview tells recipients what happened before they even open it.

**Styles are inline objects**, not class-based. Email clients strip external stylesheets and ignore most CSS selectors. React Email's components emit table-based HTML under the hood, so you write modern React and the library handles cross-client compatibility.

**Everything that varies per recipient is a prop.** The component is a pure function of its props: `customerName`, `amount`, `currency`, `cardLast4`, `failureReason`, `nextRetryDate`, `updatePaymentUrl`, `supportUrl`. No side effects, no fetches — the same component renders into an iframe for preview, and renders into the email payload for sending.

### Step 4 — Preview

Step 4 has two tabs:

**Preview** — an iframe that loads `/api/preview`, which calls React Email's `render()` server-side and returns the HTML:

```ts
// app/api/preview/route.ts
import { render } from "@react-email/components";
import BillingFailureEmail from "@/emails/billing-failure";

export async function GET() {
  const html = await render(BillingFailureEmail({ customerName: "Alex", /* ... */ }));
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
```

`render()` is the same function Resend uses internally when you pass `react:` to `resend.emails.send()`. What the iframe shows is byte-for-byte what gets delivered.

**Code** — fetches `emails/billing-failure.tsx` from `/api/source?file=email-template` and displays the raw source. The source route reads the file at runtime from disk (allowlisted paths only) and serves it as plain text.

A **↓ Download** button in the tab bar lets you save `billing-failure.tsx` directly to your machine.

### Step 5 — Sending

Step 5 has two tabs:

**Send form** — fill in the recipient address and customer name, then click **Send the email**. The form is only active once Steps 1–4 are each marked complete.

**Route code** — displays `app/api/send-billing-failure/route.ts` verbatim, fetched from `/api/source?file=send-route`. This is the exact Next.js App Router file that runs when you hit send:

```ts
// app/api/send-billing-failure/route.ts
import { Resend } from "resend";
import BillingFailureEmail from "@/emails/billing-failure";

export async function POST(request: Request) {
  const body = await request.json();
  const apiKey = body.apiKey?.trim() || process.env.RESEND_API_KEY;
  const from   = body.from?.trim()   || process.env.FROM_EMAIL || "onboarding@resend.dev";
  const to     = body.to?.trim();

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    subject: "Your payment didn't go through",
    react: BillingFailureEmail({ customerName: body.customerName, /* ... */ }),
  });

  if (error) return Response.json({ error }, { status: 500 });
  return Response.json(data);
}
```

The `react:` parameter does the heavy lifting: the Resend SDK renders the React Email component, generates a plain-text fallback automatically, and packages everything for the API call.

**What comes back:** on success, `data.id` is a UUID you can look up in the Resend dashboard at [resend.com/emails](https://resend.com/emails). On failure, `error.message` tells you why — invalid key, unverified domain, rate limit, etc.

**Test addresses that are always safe to use:**
- `delivered@resend.dev` — always accepted, no real delivery
- `bounced@resend.dev` — simulates a hard bounce
- `complained@resend.dev` — simulates a spam complaint

All three show up in your Resend logs with the appropriate status, useful for testing error-handling paths without touching a real inbox.

---

## Deploying to Render

The `render.yaml` at the repo root is a [Render Blueprint](https://render.com/docs/blueprint-spec):

1. Push the repo to GitHub.
2. On [render.com](https://render.com): **New +** → **Blueprint** → connect your GitHub → select the repo.
3. Render reads `render.yaml` and creates a web service. On the env vars screen, set:
   - `RESEND_API_KEY` — if you want to provide a shared key for all visitors
   - `FROM_EMAIL` — your verified sender address
4. First build takes about 2 minutes.

> Render's free tier sleeps after 15 minutes of inactivity. The first request after a sleep takes 30+ seconds. Fine for a demo; upgrade to Starter ($7/mo) for always-on.

## Adapting this for a real product

The wizard is a teaching tool — for production you'd keep `emails/billing-failure.tsx` and the send route, and drop the wizard UI. Here's what wiring it into a real billing flow looks like:

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
        customerName:   invoice.customer_name ?? "there",
        amount:         (invoice.amount_due / 100).toFixed(2),
        currency:       invoice.currency.toUpperCase(),
        cardLast4:      invoice.last_finalization_error?.payment_method?.card?.last4,
        failureReason:  invoice.last_finalization_error?.message ?? "Card declined",
        nextRetryDate:  new Date(invoice.next_payment_attempt! * 1000).toLocaleDateString(),
        updatePaymentUrl: `https://yourapp.com/billing/update?invoice=${invoice.id}`,
        supportUrl:     "https://yourapp.com/support",
      }),
    });
  }

  return new Response(null, { status: 200 });
}
```

## Troubleshooting

| Symptom | Fix |
|---|---|
| `from` address rejected | Domain not verified in Resend, or the address uses a domain you haven't added. Check [resend.com/domains](https://resend.com/domains). |
| Delivered in dashboard but never arrived | Check spam. If it's flagged, DKIM/SPF isn't set up correctly — re-verify the domain. |
| "No API key" error on send | Neither the Step 1 field nor the `RESEND_API_KEY` env var is set. |
| Send button stays disabled | Steps 1–4 must each be manually marked complete. Click the **Mark complete** button at the bottom of each step. |
| Build fails on Render | Usually a Node version mismatch. Pin a Node version in Render's settings or add `engines.node` to `package.json`. |

## References

- [Resend: Send emails with Next.js](https://resend.com/docs/send-with-nextjs)
- [React Email: Getting Started](https://react.email/docs/getting-started/automatic-setup)
- [React Email: Components](https://react.email/components)
- [Resend: API reference](https://resend.com/docs/api-reference/emails/send-email)

## License

MIT.
