import * as esbuild from "esbuild";
import { render } from "@react-email/components";
import * as React from "react";
import * as ReactEmailComponents from "@react-email/components";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();
    if (!code || typeof code !== "string") {
      return Response.json({ error: "No code provided." }, { status: 400 });
    }

    // Transpile TSX → CommonJS
    const { code: js } = await esbuild.transform(code, {
      loader: "tsx",
      format: "cjs",
      target: "node18",
      jsx: "transform",
    });

    // Evaluate with controlled require — only React + React Email allowed
    const mockRequire = (mod: string) => {
      if (mod === "react" || mod === "React") return React;
      if (mod === "@react-email/components") return ReactEmailComponents;
      throw new Error(`"${mod}" is not available in the preview sandbox. Only react and @react-email/components are supported.`);
    };

    const modExports: Record<string, unknown> = {};
    const modObj = { exports: modExports };
    // eslint-disable-next-line no-new-func
    new Function("require", "exports", "module", "__dirname", "__filename", js)(
      mockRequire, modExports, modObj, "/", "template.tsx"
    );

    const Component =
      (modObj.exports as Record<string, unknown>).default ??
      (modObj.exports as Record<string, unknown>).BillingFailureEmail ??
      modObj.exports;

    if (typeof Component !== "function") {
      return Response.json(
        { error: "No default export found. Make sure your template has `export default`." },
        { status: 400 }
      );
    }

    const props = {
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
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const html = await render(React.createElement(Component as any, props));

    return Response.json({ html });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return Response.json({ error: message }, { status: 400 });
  }
}
