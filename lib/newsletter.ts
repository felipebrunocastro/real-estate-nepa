/**
 * Newsletter subscription model, validation and delivery. Mirrors the lead
 * pipeline: validate, then deliver to a configured destination via env vars
 * with NO credentials in code:
 *
 *   - NEWSLETTER_WEBHOOK_URL   generic JSON webhook (falls back to
 *                              LEAD_WEBHOOK_URL, then to a server log)
 *
 * Swap in an email provider (Resend, Mailchimp, etc.) by adding a branch in
 * `deliverSubscription` that reads its own env vars.
 */

const LANGUAGES = ["en", "es", "pt"] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

export interface SubscriptionInput {
  email?: unknown;
  language?: unknown;
  company?: unknown;
  source?: unknown;
}

export interface Subscription {
  id: string;
  receivedAt: string;
  email: string;
  language: string;
  source: string;
}

export interface SubscriptionValidation {
  ok: boolean;
  errors: string[];
  subscription?: Subscription;
}

export function validateSubscription(
  input: SubscriptionInput,
): SubscriptionValidation {
  const errors: string[] = [];
  const email = str(input.email).slice(0, 200);
  if (!email) errors.push("email_required");
  else if (!EMAIL_RE.test(email)) errors.push("email_invalid");

  if (errors.length > 0) return { ok: false, errors };

  const langRaw = str(input.language);
  const language = (LANGUAGES as readonly string[]).includes(langRaw)
    ? langRaw
    : "en";

  return {
    ok: true,
    errors: [],
    subscription: {
      id: crypto.randomUUID(),
      receivedAt: new Date().toISOString(),
      email,
      language,
      source: str(input.source).slice(0, 80) || "newsletter",
    },
  };
}

export async function deliverSubscription(sub: Subscription): Promise<void> {
  const webhook =
    process.env.NEWSLETTER_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL;

  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ type: "newsletter", ...sub }),
    });
    if (!res.ok) {
      throw new Error(`Newsletter webhook responded ${res.status}`);
    }
    return;
  }

  console.info(
    `[newsletter] received ${sub.id} from ${sub.email} — no destination configured`,
  );
}
