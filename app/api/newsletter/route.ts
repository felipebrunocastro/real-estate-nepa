import { NextResponse } from "next/server";
import {
  validateSubscription,
  deliverSubscription,
  type SubscriptionInput,
} from "@/lib/newsletter";
import { isPlainObject } from "@/lib/forms-shared";

/**
 * Newsletter subscription endpoint. Same-origin JSON POST. Validates, drops
 * honeypot submissions, then delivers to the configured destination. No
 * credentials here — see lib/newsletter.ts.
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
  const body = raw as SubscriptionInput;

  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const result = validateSubscription(body);
  if (!result.ok || !result.subscription) {
    return NextResponse.json(
      { ok: false, errors: result.errors },
      { status: 400 },
    );
  }

  try {
    await deliverSubscription(result.subscription);
  } catch {
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
