/**
 * Lead model, validation and delivery.
 *
 * This is the single, clean interface for eventual CRM integration. The API
 * route (`/api/leads`) validates input and calls `deliverLead`, which routes to
 * whatever destination is configured via environment variables — with NO
 * credentials in code:
 *
 *   - LEAD_WEBHOOK_URL   generic JSON webhook (works with GoHighLevel, Zapier,
 *                        n8n, a custom endpoint, etc.)
 *
 * To add a first-class CRM later (Supabase / HubSpot / email via Resend),
 * implement a new branch in `deliverLead` that reads its own env vars. The rest
 * of the app never changes — it only ever calls `deliverLead`.
 */

export const LEAD_CATEGORIES = [
  "buy",
  "sell",
  "invest",
  "relocate",
  "realtor",
  "general",
] as const;
export type LeadCategory = (typeof LEAD_CATEGORIES)[number];

import { LANGUAGES, EMAIL_RE, str, postWebhook } from "./forms-shared";

export const CONTACT_PREFERENCES = ["email", "phone"] as const;
export type ContactPreference = (typeof CONTACT_PREFERENCES)[number];

/** Raw, untrusted input as received from the client. */
export interface LeadInput {
  category?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  language?: unknown;
  area?: unknown;
  message?: unknown;
  contactPreference?: unknown;
  /** Anti-spam honeypot — must be empty. Handled by the route. */
  company?: unknown;
  locale?: unknown;
  source?: unknown;
}

/** Normalized, validated lead ready for delivery to a CRM. */
export interface Lead {
  id: string;
  receivedAt: string;
  category: LeadCategory;
  name: string;
  email: string;
  phone: string;
  language: string;
  area: string;
  message: string;
  contactPreference: ContactPreference;
  locale: string;
  source: string;
}

export interface LeadValidation {
  ok: boolean;
  errors: string[];
  lead?: Lead;
}

/** Server-side validation. Deliberately requests no sensitive information. */
export function validateLead(input: LeadInput): LeadValidation {
  const errors: string[] = [];

  const name = str(input.name).slice(0, 120);
  const email = str(input.email).slice(0, 200);
  const message = str(input.message).slice(0, 5000);
  const phone = str(input.phone).slice(0, 40);
  const area = str(input.area).slice(0, 80);

  const categoryRaw = str(input.category) as LeadCategory;
  const category: LeadCategory = LEAD_CATEGORIES.includes(categoryRaw)
    ? categoryRaw
    : "general";

  const prefRaw = str(input.contactPreference) as ContactPreference;
  const contactPreference: ContactPreference = CONTACT_PREFERENCES.includes(
    prefRaw,
  )
    ? prefRaw
    : "email";

  const langRaw = str(input.language);
  const language = (LANGUAGES as readonly string[]).includes(langRaw)
    ? langRaw
    : "en";
  const localeRaw = str(input.locale);
  const locale = (LANGUAGES as readonly string[]).includes(localeRaw)
    ? localeRaw
    : "en";

  if (!name) errors.push("name_required");
  if (!email) errors.push("email_required");
  else if (!EMAIL_RE.test(email)) errors.push("email_invalid");
  if (!message) errors.push("message_required");

  if (errors.length > 0) return { ok: false, errors };

  const lead: Lead = {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    category,
    name,
    email,
    phone,
    language,
    area,
    message,
    contactPreference,
    locale,
    source: str(input.source).slice(0, 80) || "contact-form",
  };

  return { ok: true, errors: [], lead };
}

/**
 * Deliver a validated lead to the configured destination. Falls back to a
 * server log when nothing is configured yet, so the form works end-to-end in
 * development without any secrets.
 */
export async function deliverLead(lead: Lead): Promise<void> {
  const webhook = process.env.LEAD_WEBHOOK_URL;

  if (webhook) {
    try {
      await postWebhook(webhook, lead, "Lead");
    } catch (err) {
      // Never lose a lead on a delivery failure: record the full payload
      // server-side (recoverable from logs) before surfacing the error.
      console.error(`[leads] delivery FAILED for ${lead.id}`, err);
      console.info(`[leads] UNDELIVERED ${JSON.stringify(lead)}`);
      throw err;
    }
    return;
  }

  // No destination configured yet — accept and record server-side.
  console.info(
    `[leads] received ${lead.id} (${lead.category}) from ${lead.email} — no destination configured`,
  );
}
