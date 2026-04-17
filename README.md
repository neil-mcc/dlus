# Dlús Recovery

Brochure site for **Dlús Recovery Limited** — a recovery and wellness studio
offering Hyperbaric Oxygen Therapy (HBOT), Red Light Therapy and PEMF Therapy.

Built and maintained by [Northcode Studio](https://northcode.studio).

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS v4
- Sanity (embedded studio at `/studio`)
- Resend (contact form)
- Vercel Analytics + Google Analytics 4
- Lucide icons + Fraunces / Inter via `next/font`

> ⚠️ Next 16 has real differences from Next 14/15 — `params` and `searchParams`
> are async Promises, middleware is replaced by `proxy`, and Turbopack is the
> default builder. Read
> `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`
> before changing routing or caching code.

## Local setup

```bash
# 1. Install
npm install

# 2. Copy env file and fill in real values
cp .env.example .env.local

# 3. (First-time only) Create the Sanity project
npx sanity init --env=.env.local
#   - When prompted for an organisation, select "Northcode" — all Dlús
#     Sanity content is owned by Northcode Studio during build & maintenance.
#     (Sanity supports transferring projects between orgs later if the client
#     ever wants direct ownership — no code changes needed.)
#   - Project name: "Dlús Recovery"
#   - Dataset: "production" (matches NEXT_PUBLIC_SANITY_DATASET in .env.example)
#   - Paste the printed projectId into NEXT_PUBLIC_SANITY_PROJECT_ID
#   - Generate a write-enabled API token in the Sanity dashboard
#     (Manage → API → Tokens → Add API token → "Editor") and paste into
#     SANITY_API_TOKEN

# 4. Seed the dataset with placeholder content
npm run sanity:seed

# 5. Run dev server
npm run dev
```

Open <http://localhost:3000>. The studio is at <http://localhost:3000/studio>.

## Environment variables

See `.env.example` for the canonical list. The site will build with empty
Sanity / Resend env vars — pages render with placeholder fallbacks and the
contact form returns a friendly 503. **Do not deploy without filling them in.**

## Updating the Acuity link

Every booking button and the `/book` embed route to a single URL defined in
`lib/acuity.ts`:

```ts
export const ACUITY_BOOKING_URL = "https://dlusrecovery.as.me/schedule/d65e7959";
```

This is the same top-level scheduler shared on Instagram and elsewhere —
visitors land on Acuity's service picker and choose HBOT, Red Light, PEMF
or a consultation from there. Change the URL here and every CTA across the
site updates.

## Sanity content

Schemas live in `sanity/schemas/`:

- `siteSettings` — singleton (business name, contact, hours, address, social)
- `service` — HBOT, Red Light, PEMF
- `pricingTier` — single sessions, bundles, memberships
- `faq` — categorised
- `testimonial`

Edit content via the embedded studio at `/studio`. Pages revalidate every 60s
by default; on-demand revalidation can be added later via a webhook + the
`SANITY_API_TOKEN`.

To re-run the seed (it's idempotent — uses `createOrReplace`):

```bash
npm run sanity:seed
```

## Health-claim copy rules

This is a UK/Ireland wellness business — ASA and MHRA regulate health claims
strictly. **Do not write copy that says "treats", "cures", "heals" or
"prevents".** Always hedge: "may support", "users report", "research suggests",
"is commonly used for". Anything that needs a citation is marked with a
`TODO: verify source` comment. Anything ambiguous is marked
`TODO: legal review`.

The footer disclaimer is rendered site-wide. The HBOT page carries a
prominent pre-screening notice.

## Deployment

Deploys to Vercel. Set every key in `.env.example` as a Project Environment
Variable in Vercel. Verify the Resend sending domain (`dlusrecovery.com`)
before sending real mail.

## Pre-launch

See [`docs/launch-checklist.md`](docs/launch-checklist.md).
