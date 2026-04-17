import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";

const ALLOWED: Record<string, string> = {
  "email-template": join("emails", "billing-failure.tsx"),
  "send-route": join("app", "api", "send-billing-failure", "route.ts"),
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("file") ?? "email-template";

  const relative = ALLOWED[key];
  if (!relative) {
    return new Response("Not found", { status: 404 });
  }

  const source = readFileSync(join(process.cwd(), relative), "utf-8");

  return new Response(source, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
