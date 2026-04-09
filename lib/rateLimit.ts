/**
 * Tiny in-memory token bucket. Per-instance only — fine for a brochure
 * site behind Vercel where bursts on a single warm function are the
 * realistic abuse vector. For multi-region or persistent rate limiting,
 * swap for Upstash Ratelimit.
 */
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60_000;
const MAX_HITS = 5;

export function rateLimit(key: string): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, retryAfter: 0 };
  }
  if (bucket.count >= MAX_HITS) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  bucket.count += 1;
  return { ok: true, retryAfter: 0 };
}
