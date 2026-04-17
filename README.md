# Send a billing-failure email — interactive tutorial

A Next.js app whose UI **is** the tutorial. It walks a developer from "no account" to "email sent" through five locked steps, each of which unlocks only once the previous is done. The final step is a real send form that fires [Resend](https://resend.com/)'s API against a React Email template.

Use it by itself as a hands-on lesson, or read along with this README as the code-level companion.

> A video walkthrough of the UI will be embedded here later.

![tutorial wizard screenshot placeholder]()

## The five steps

| # | Step | What happens |
|---|---|---|
| 1 | **Create a Resend account** | Sign up, make an API key, paste it into the app |
| 2 | **Verify your sending domain** | Pick sandbox or verify your own domain via DNS |
| 3 | **Understand the template** | Tour the React Email component in `emails/billing-failure.tsx` |
| 4 | **Preview the email** | Live render in an iframe — exactly what will be sent |
| 5 | **Send it** | Fill in to/from, hit send, watch it land |

State (your API key, your progress, your inputs) is persisted in `localStorage`, so refreshing doesn't lose anything. There's a **Reset progress** button in the sidebar when you want a clean slate.

## What's in the repo

```
├── app/
│   ├── page.tsx                      ← the wizard shell
│   ├── layout.tsx
│   ├── _wizard/                      ← step components (underscore = private folder)
│   │   ├── steps.ts                  ← step metadata
│   │   ├── sidebar.tsx               ← progress sidebar
│   │   ├── step-account.tsx          ← Step 1
│   │   ├── step-domain.tsx           ← Step 2
│   │   ├── step-template.tsx         ← Step 3
│   │   ├── step-preview.tsx          ← Step 4
│   │   ├── step-send.tsx             ← Step 5
│   │   └── step-styles.tsx           ← shared styles + CompletedBadge
│   └── api/
│       ├── preview/route.ts          ← renders the email to HTML (used by the iframe)
│       └── send-billing-failure/route.ts   ← actually calls Resend
├── emails/
│   └── billing-failure.tsx           ← the React Email template
├── render.yaml                       ← Render blueprint for one-click deploy
├── .env.example
└── package.json
```

## Run it locally

```bash
git clone https://github.com/YOUR-USERNAME/billing-failure-email.git
cd billing-failure-email
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start at Step 1.

You can also preview the template directly in React Email's dev tool, which has hot reload:

```bash
npm run email
# → http://localhost:3001
```

### Environment variables (optional)

The app's **UI field for the API key overrides env vars**, so you don't need any env to get started. But if you want to deploy without exposing the key field, set these:

```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
FROM_EMAIL=billing@yourdomain.com
```

When `RESEND_API_KEY` is set, Step 1's "paste your key" field still works — but leaving it empty will fall back to the env var. This makes the app useful in two modes: public demo (users bring their own key) and private tool (deployer sets the key, users only control from/to).

---

## Companion notes, step by step

Everything below expands on what the in-app wizard shows — the wrinkles, the gotchas, and the code the UI abstracts away.

### Step 1 — Resend account & API key

Resend's free tier gives you 100 emails/day and 3000/month, which is plenty for this tutorial. Sign up at [resend.com/signup](https://resend.com/signup), then go to [resend.com/api-keys](https://resend.com/api-keys) and click **Create API Key**.

**Permission scope:** "Full access" works for this tutorial. For production, narrow it to **Sending access** — it can send mail but can't read logs, manage domains, or rotate keys. Separate keys for separate environments (dev, staging, prod) is a good habit from day one.

**Where the key lives in this app:** the UI stores it in `localStorage` under the key `billing-tutorial-state-v1`. That's fine for a single-developer tutorial on your own laptop. It is *not* fine for anything else — any JS on the same origin can read it. If you fork this for a real product, delete the Step 1 UI and use environment variables exclusively.

### Step 2 — Verifying a domain

The sandbox address `onboarding@resend.dev` works immediately but can only deliver to the address on your Resend account. To send to anyone, verify a domain.

**The DNS records Resend asks for:**
- **MX** — routes bounce notifications back to Resend so they can track failures
- **TXT (SPF)** — authorizes Resend's mail servers to send as your domain
- **TXT or CNAME (DKIM)** — cryptographic signature verifying emails actually came from you
- **TXT (DMARC)** — optional policy telling receivers what to do if SPF/DKIM fail

**Namecheap-specific gotchas:**
1. Namecheap's Host field auto-appends your domain. If Resend says add a record for `send.baard.cc`, type **`send`** in Host, not `send.baard.cc` — otherwise you get `send.baard.cc.baard.cc`.
2. Leave TTL on **Automatic**.
3. For TXT records with long values (DKIM keys especially), paste exactly — no extra quotes, no line breaks. Namecheap handles the quoting.
4. MX records need a **priority**. Resend will tell you the value (usually 10).

After saving, hit **Verify DNS Records** on Resend. Propagation is usually under 15 minutes but can take up to an hour. [dnschecker.org](https://dnschecker.org) confirms what's actually live.

### Step 3 — The React Email template

The template is a regular React component whose output happens to be email HTML:

```tsx
// emails/billing-failure.tsx
import { Html, Head, Body, Container, Button, /* ... */ } from "@react-email/components";

export const BillingFailureEmail = ({ customerName, amount, cardLast4, ... }) => (
  <Html>
    <Head />
    <Preview>We couldn't process your payment of ${amount}.</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* logo, alert banner, heading, details box, CTA button, footer */}
      </Container>
    </Body>
  </Html>
);
```

A few patterns worth internalizing:

**`<Preview>`** is invisible in the body but shows as the inbox snippet next to the subject line. For a payment-failed email, a well-written preview ("We couldn't process your payment of $29 — update your card to keep Acme active") saves recipients from having to open the email to know what it's about. Worth the 15 seconds.

**Styles are inline objects**, not className-based. Email clients strip external stylesheets and ignore a lot of CSS selectors, so everything goes inline. React Email's components emit table-based HTML under the hood — you get to write modern React and the library handles the Outlook compatibility layer.

**Everything that varies per recipient is a prop.** The component is a pure function of its props: `customerName`, `amount`, `currency`, `cardLast4`, `failureReason`, `nextRetryDate`, `updatePaymentUrl`, `supportUrl`. No fetches, no side effects. This means you can render it into an iframe for preview, into a PDF for archival, or into HTML for sending — all from the same source.

### Step 4 — Preview

The iframe in Step 4 loads `/api/preview`, which is just:

```ts
// app/api/preview/route.ts
import { render } from "@react-email/components";
import BillingFailureEmail from "@/emails/billing-failure";

export async function GET() {
  const html = await render(BillingFailureEmail({ customerName: "Alex", /* ... */ }));
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
```

`render()` is the same function Resend uses internally when you pass a `react:` prop to `resend.emails.send()`. What you see in the iframe is byte-for-byte what gets delivered.

### Step 5 — Sending

The send endpoint is compact:

```ts
// app/api/send-billing-failure/route.ts
const apiKey = body.apiKey?.trim() || process.env.RESEND_API_KEY;
const from = body.from?.trim() || process.env.FROM_EMAIL || "onboarding@resend.dev";
const to = body.to?.trim();

const resend = new Resend(apiKey);

const { data, error } = await resend.emails.send({
  from,
  to: [to],
  subject: "Your payment didn't go through",
  react: BillingFailureEmail({ customerName, amount, currency, cardLast4, /* ... */ }),
});
```

The `react:` parameter is doing a lot of work: the SDK renders your component, generates a plain-text fallback automatically, and packages it for the API call. No manual HTML serialization needed.

**What comes back:** on success, `data.id` is a UUID you can use to look up the email in the Resend dashboard. On failure, `error.message` tells you why (invalid key, unverified domain, rate-limited, whatever).

**Test addresses worth knowing:**
- `delivered@resend.dev` — always accepted, useful for end-to-end smoke tests
- `bounced@resend.dev` — simulates a hard bounce
- `complained@resend.dev` — simulates a spam complaint

All three show up in your Resend logs with the appropriate status, so you can test your bounce-handling code without needing a real bad address.

---

## Deploying to Render

The `render.yaml` at the repo root is a [Render Blueprint](https://render.com/docs/blueprint-spec):

1. Push the repo to GitHub.
2. On [render.com](https://render.com): **New +** → **Blueprint** → connect your GitHub → select the repo.
3. Render reads `render.yaml` and creates a web service. On the env vars screen, set:
   - `RESEND_API_KEY` — if you want to provide a shared key for all visitors
   - `FROM_EMAIL` — your verified sender
4. First build takes about 2 minutes.

> Render's free tier sleeps services after 15 minutes of inactivity. The first request after a nap takes 30+ seconds to cold-start. Fine for a demo; upgrade to Starter ($7/mo) for always-on.

## Adapting this for a real product

The wizard UI is a teaching tool — for production you'd keep the template and the API route and drop the rest. Here's what wiring this into a real billing flow looks like:

```ts
// app/api/webhooks/stripe/route.ts
import Stripe from "stripe";
import { Resend } from "resend";
import BillingFailureEmail from "@/emails/billing-failure";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === "invoice.payment_failed") {
    const invoice = event.data.object as Stripe.Invoice;
    await resend.emails.send({
      from: "billing@yourdomain.com",
      to: invoice.customer_email!,
      subject: "Your payment didn't go through",
      react: BillingFailureEmail({
        customerName: invoice.customer_name ?? "there",
        amount: (invoice.amount_due / 100).toFixed(2),
        currency: invoice.currency.toUpperCase(),
        cardLast4: invoice.last_finalization_error?.payment_method?.card?.last4,
        failureReason: invoice.last_finalization_error?.message ?? "Card declined",
        nextRetryDate: new Date(invoice.next_payment_attempt! * 1000).toLocaleDateString(),
        updatePaymentUrl: `https://yourapp.com/billing/update?invoice=${invoice.id}`,
        supportUrl: "https://yourapp.com/support",
      }),
    });
  }

  return new Response(null, { status: 200 });
}
```

## Troubleshooting

| Symptom | Fix |
|---|---|
| `from` rejected | Domain not verified, or you're using a domain you haven't added to Resend. Check [resend.com/domains](https://resend.com/domains). |
| Delivered in Resend dashboard but never arrived | Check spam. If it's flagged, your DKIM/SPF setup isn't quite right — re-verify the domain. |
| "No API key" error on send | Neither the UI field nor `RESEND_API_KEY` env var is set. Fill one in. |
| Build fails on Render | Usually a Node version mismatch. Set `engines.node` in `package.json` or pin a Node version in Render's settings. |
| Step I completed is now locked | You probably cleared localStorage. Hit **Reset progress** and re-walk — it's quick. |

## References

- [Resend: Send emails with Next.js](https://resend.com/docs/send-with-nextjs)
- [React Email: Getting Started](https://react.email/docs/getting-started/automatic-setup)
- [React Email: Components](https://react.email/components)
- [Resend: API reference](https://resend.com/docs/api-reference/emails/send-email)

## License

MIT.
