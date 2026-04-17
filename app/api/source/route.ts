import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";

export async function GET() {
  const filePath = join(process.cwd(), "emails", "billing-failure.tsx");
  const source = readFileSync(filePath, "utf-8");

  return new Response(source, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
