import {
  validateName,
  validateAge,
  validateLocation,
  validateEmail,
  validateGrievance,
  sanitize,
} from "@/lib/validation";
import type { ValidationResult } from "@/lib/validation";

// ---------------------------------------------------------------------------
// In-memory rate limiting
// ---------------------------------------------------------------------------
// NOTE: This is intentionally best-effort only. In a multi-instance or
// serverless deployment (e.g., Vercel) each instance maintains its own
// in-memory store. For production-grade rate limiting, use an external
// store such as Redis (e.g., @upstash/ratelimit).
// ---------------------------------------------------------------------------

interface RateEntry {
  count: number;
  windowStart: number;
}

const rateLimitMap = new Map<string, RateEntry>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 submissions per IP per minute

function getClientIp(request: Request): string {
  // Respect common reverse-proxy headers, fall back to a generic key.
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return { allowed: true, retryAfter: 0 };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((RATE_LIMIT_WINDOW_MS - (now - entry.windowStart)) / 1000);
    return { allowed: false, retryAfter };
  }

  entry.count += 1;
  return { allowed: true, retryAfter: 0 };
}

// Periodically clean up stale entries to prevent unbounded memory growth.
// This runs once per process, not per request.
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitMap) {
      if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS * 2) {
        rateLimitMap.delete(key);
      }
    }
  }, RATE_LIMIT_WINDOW_MS * 2);
}

// ---------------------------------------------------------------------------
// Validation guard
// ---------------------------------------------------------------------------
// TypeScript 7 does not narrow discriminated-union members through `!result.ok`
// on single-line returns. This helper narrows inside an explicit block so the
// type-checker always sees the correct branch.



function rejectIf(result: ValidationResult, field: string): Response | null {
  if (result.ok === false) {
    return Response.json({ error: result.error, field }, { status: 422 });
  }
  return null;
}

// ---------------------------------------------------------------------------
// POST /api/grievance
// ---------------------------------------------------------------------------

export async function POST(request: Request): Promise<Response> {
  // 1. Rate limiting
  const ip = getClientIp(request);
  const { allowed, retryAfter } = checkRateLimit(ip);
  if (!allowed) {
    return Response.json(
      { error: "Too many requests. Please wait before submitting again." },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfter) },
      }
    );
  }

  // 2. Parse body — guard against malformed JSON and oversized requests
  let body: unknown;
  try {
    const text = await request.text();
    if (text.length > 20_000) {
      return Response.json({ error: "Request body is too large." }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, age, location, email, grievance } = body as Record<string, unknown>;

  // 3. Validate all fields
  const nameReject = rejectIf(validateName(name), "name");
  if (nameReject) return nameReject;

  const ageReject = rejectIf(validateAge(age), "age");
  if (ageReject) return ageReject;

  const locationReject = rejectIf(validateLocation(location), "location");
  if (locationReject) return locationReject;

  const emailReject = rejectIf(validateEmail(email), "email");
  if (emailReject) return emailReject;

  const grievanceReject = rejectIf(validateGrievance(grievance), "grievance");
  if (grievanceReject) return grievanceReject;

  // 4. Sanitize fields before using them
  const safeName = sanitize(String(name));
  const safeAge = Number(age);
  const safeLocation = sanitize(String(location));
  const safeEmail = sanitize(String(email));
  const safeGrievance = sanitize(String(grievance));

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZoneName: "short" });

  // 5. Check email credentials
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.GRIEVANCE_TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    // Honest error — do not fake success
    console.warn("[/api/grievance] Email credentials not configured. Set RESEND_API_KEY, RESEND_FROM_EMAIL, GRIEVANCE_TO_EMAIL.");
    return Response.json(
      {
        error: "Email delivery is not configured on this server. The grievance was received but could not be forwarded.",
        received: true,
      },
      { status: 503 }
    );
  }

  // 6. Send via Resend
  const emailBody = {
    from: fromEmail,
    to: [toEmail],
    subject: `ANCHOR Grievance from ${safeName}`,
    text: [
      "═══════════════════════════════════",
      "   ANCHOR — NEW GRIEVANCE RECEIVED",
      "═══════════════════════════════════",
      "",
      `Name:      ${safeName}`,
      `Age:       ${safeAge}`,
      `Location:  ${safeLocation}`,
      `Email:     ${safeEmail}`,
      "",
      `Date:      ${dateStr}`,
      `Time:      ${timeStr}`,
      "",
      "───────────────────────────────────",
      "GRIEVANCE:",
      "───────────────────────────────────",
      safeGrievance,
      "",
      "═══════════════════════════════════",
    ].join("\n"),
    html: `
      <div style="font-family: monospace; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f5f5f5; padding: 32px; border: 1px solid #222;">
        <h2 style="font-family: sans-serif; letter-spacing: 0.2em; text-transform: uppercase; color: #fcf6ba; margin: 0 0 24px;">ANCHOR — New Grievance</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr><td style="padding: 6px 0; color: #888; width: 100px;">Name</td><td style="padding: 6px 0;">${safeName}</td></tr>
          <tr><td style="padding: 6px 0; color: #888;">Age</td><td style="padding: 6px 0;">${safeAge}</td></tr>
          <tr><td style="padding: 6px 0; color: #888;">Location</td><td style="padding: 6px 0;">${safeLocation}</td></tr>
          <tr><td style="padding: 6px 0; color: #888;">Email</td><td style="padding: 6px 0;">${safeEmail}</td></tr>
          <tr><td style="padding: 6px 0; color: #888;">Date</td><td style="padding: 6px 0;">${dateStr}</td></tr>
          <tr><td style="padding: 6px 0; color: #888;">Time</td><td style="padding: 6px 0;">${timeStr}</td></tr>
        </table>
        <div style="border-top: 1px solid #222; padding-top: 20px;">
          <div style="color: #888; text-transform: uppercase; letter-spacing: 0.15em; font-size: 12px; margin-bottom: 12px;">Grievance</div>
          <p style="white-space: pre-wrap; margin: 0; line-height: 1.6;">${safeGrievance}</p>
        </div>
      </div>
    `,
  };

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailBody),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json().catch(() => ({}));
      console.error("[/api/grievance] Resend error:", resendResponse.status, errorData);
      return Response.json(
        { error: "Failed to deliver grievance. Please try again." },
        { status: 502 }
      );
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    // Do not expose internal error details
    console.error("[/api/grievance] Network error contacting Resend:", err);
    return Response.json(
      { error: "A network error occurred. Please try again." },
      { status: 502 }
    );
  }
}

// Return 405 for all other HTTP methods
export async function GET() {
  return Response.json({ error: "Method not allowed." }, { status: 405 });
}
