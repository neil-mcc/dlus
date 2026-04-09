import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getResend } from "@/lib/resend";
import { rateLimit } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().max(40).optional().or(z.literal("")),
  enquiryType: z.string().min(2).max(80),
  message: z.string().min(10).max(4000),
  // Honeypot — must be empty
  website: z.string().max(0).optional().or(z.literal("")),
});

function clientKey(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  const limit = rateLimit(`contact:${clientKey(req)}`);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check your details and try again." },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot tripped — pretend success, drop on the floor.
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const resend = getResend();
  const to = process.env.CONTACT_FORM_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL || "Dlús Recovery <hello@dlusrecovery.com>";

  if (!resend || !to) {
    console.warn("[contact] Resend not configured — message not sent", { data });
    return NextResponse.json(
      { error: "Email is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  try {
    await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `New enquiry · ${data.enquiryType}`,
      text: [
        `From: ${data.name} <${data.email}>`,
        data.phone ? `Phone: ${data.phone}` : null,
        `Type: ${data.enquiryType}`,
        "",
        data.message,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  } catch (err) {
    console.error("[contact] Resend send failed", err);
    return NextResponse.json(
      { error: "Couldn't send your message. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
