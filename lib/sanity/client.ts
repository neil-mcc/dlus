import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

/**
 * Server-side read token. Required because Sanity projects created from
 * 2025 onward ship with document-level ACLs that deny unauthenticated
 * reads of custom document types even on "public" datasets — a read
 * token bypasses that and is the path Sanity themselves recommend for
 * Next.js SSR. Falls back to `SANITY_API_TOKEN` (the write token used
 * by the seed script) so one token can cover both jobs in local dev.
 *
 * Never exposed to the browser — this file is only imported from server
 * components and route handlers.
 */
const readToken =
  process.env.SANITY_READ_TOKEN || process.env.SANITY_API_TOKEN || "";

export const hasSanityConfig = projectId.length > 0;

/**
 * Server-only Sanity client. Tolerates a missing projectId at build
 * time so the scaffold can `next build` before a Sanity project is
 * provisioned — queries are short-circuited in `lib/sanity/queries.ts`
 * when that's the case.
 *
 * `useCdn: false` when a token is present because Sanity disallows
 * authenticated reads against the CDN endpoint.
 */
export const sanityClient = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: !readToken,
  perspective: "published",
  token: readToken || undefined,
});
