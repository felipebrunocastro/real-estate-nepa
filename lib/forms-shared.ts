/**
 * Shared building blocks for the form endpoints (leads + newsletter): input
 * coercion, validation constants, and a single webhook-delivery helper. Keeping
 * these in one place means the email rule, accepted languages, and delivery
 * behaviour (timeout, failure handling) never drift between the two pipelines.
 */

export const LANGUAGES = ["en", "es", "pt"] as const;
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trim a value to a string; non-strings become "". */
export const str = (v: unknown): string =>
  typeof v === "string" ? v.trim() : "";

/** True only for a non-null, non-array plain object. */
export function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/**
 * POST a JSON payload to a webhook with a hard timeout so a slow/hanging
 * endpoint can't stall the request indefinitely. Throws on network error,
 * timeout, or a non-2xx response.
 */
export async function postWebhook(
  url: string,
  payload: unknown,
  label: string,
): Promise<void> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) {
    throw new Error(`${label} webhook responded ${res.status}`);
  }
}
