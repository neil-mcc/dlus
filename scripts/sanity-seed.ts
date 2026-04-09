/**
 * Seed the Sanity dataset with placeholder content.
 *
 * Usage:
 *   1. Create a Sanity project (`npx sanity init` from this directory).
 *   2. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and a
 *      write-enabled SANITY_API_TOKEN in `.env.local`.
 *   3. Run: `npm run sanity:seed`
 *
 * Idempotent: uses createOrReplace, so re-running overwrites existing
 * documents with the same _id.
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Run with `npm run sanity:seed` — that script passes --env-file=.env.local
// so process.env is populated by Node's built-in dotenv loader (Node ≥20.6).

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN. " +
      "Set them in .env.local before running this script.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const SEED_FILES = [
  "siteSettings.ndjson",
  "services.ndjson",
  "pricing.ndjson",
  "testimonials.ndjson",
  "faqs.ndjson",
];

function readNdjson(name: string): Record<string, unknown>[] {
  const path = resolve(process.cwd(), "sanity/seed", name);
  return readFileSync(path, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

async function run() {
  for (const file of SEED_FILES) {
    const docs = readNdjson(file);
    console.log(`→ ${file}: ${docs.length} document(s)`);
    let tx = client.transaction();
    for (const doc of docs) {
      tx = tx.createOrReplace(doc as { _id: string; _type: string });
    }
    await tx.commit();
  }
  console.log("✓ Seed complete.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
