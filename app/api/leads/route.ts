import { NextResponse } from "next/server";
import { validateLead, deliverLead, type LeadInput } from "@/lib/leads";
import { isPlainObject } from "@/lib/forms-shared";

/**
 * Lead intake endpoint. Same-origin JSON POST from the contact form.
 * Validates, drops obvious spam (honeypot), then delivers to the configured
 * destination via `deliverLead`. No credentials live here — see lib/leads.ts.
 */
export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  if (!isPlainObject(raw)) {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }
  const body = raw as LeadInput;

  // Honeypot: real users never fill the hidden `company` field. Silently accept
  // so bots don't learn they were filtered.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const result = validateLead(body);
  if (!result.ok || !result.lead) {
    return NextResponse.json(
      { ok: false, errors: result.errors },
      { status: 400 },
    );
  }

  try {
    await deliverLead(result.lead);
  } catch {
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
