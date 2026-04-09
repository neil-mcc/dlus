# Pre-launch checklist — Dlús Recovery

Work through this top to bottom before pointing the production domain at the
site. Anything left unchecked is a launch blocker.

## Booking

- [ ] Replace placeholder URLs in `lib/acuity.ts` with the live Acuity owner +
      appointment-type IDs for HBOT, Red Light, PEMF and the free consultation.
- [ ] Visit `/book` on the production preview. Click each service tab (HBOT,
      Red Light, PEMF, Free consult) and confirm the embedded Acuity scheduler
      loads the correct appointment type and auto-resizes as you step through
      it.
- [ ] Click every "Book Now" / "Book a session" CTA across the site and
      confirm it routes to `/book?service=…` with the right tab preselected.
- [ ] Complete one real test booking end-to-end and confirm the confirmation
      email from Acuity arrives.
- [ ] **CSP (if/when added):** the Acuity iframe + auto-resize script require
      `frame-src https://*.acuityscheduling.com` and
      `script-src https://embed.acuityscheduling.com` in any Content Security
      Policy. No CSP is set today — add these if one is introduced later.
- [ ] **Safari ITP caveat:** Safari with "Prevent cross-site tracking" on will
      block third-party cookies inside the embedded iframe, which can break
      Acuity's session in edge cases. The `/book` page already surfaces a
      "Having trouble? Open the scheduler in a new tab" fallback link — test
      it works on Safari before launch.

## Content

- [ ] Run `npm run sanity:seed` once against the production dataset, then
      replace every seeded document with real copy in `/studio`.
- [ ] Replace every `// TODO: replace placeholder photo` comment with real
      photography. Provide responsive sources via Sanity image hotspots.
- [ ] Set `siteSettings` (business name, address, contact, hours, social,
      Google Maps embed URL) — these drive the footer, JSON-LD, and contact
      page sidebar.

## Legal & compliance

- [ ] Review every page for hedged language. Search the codebase for
      `TODO: legal review` and `TODO: verify source` and resolve each.
- [ ] Replace `/privacy` and `/terms` placeholder copy with reviewed text.
- [ ] Confirm the site-wide footer disclaimer reads as intended.
- [ ] Confirm the HBOT pre-screening notice is in place and worded correctly.
- [ ] Add company registration number and registered address to `/privacy`.

## Email (Resend)

- [ ] Create a Resend account and add `dlusrecovery.com` as a sending domain.
- [ ] Add the DKIM/SPF records to DNS and wait for verification.
- [ ] Set `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_FORM_TO_EMAIL` in
      Vercel Project Environment Variables.
- [ ] Submit the contact form on the production preview and confirm the
      message lands in the team inbox.
- [ ] Trip the honeypot manually (devtools → inject value into `name="website"`)
      and confirm no email is sent.

## Sanity

- [ ] Confirm the project lives under the **Northcode** org in Sanity (not a
      personal account). Created via `npx sanity init` — choose "Northcode"
      when prompted for the organisation.
- [ ] Create production dataset and add the `projectId` to Vercel env vars.
- [ ] Generate a read-write API token, store as `SANITY_API_TOKEN`.
- [ ] Rely on the embedded `/studio` route — sufficient for a brochure site,
      no separate studio deployment required.
- [ ] Add the client's editor accounts to the Sanity project as "Editor" role.
- [ ] **Optional, at handover:** if the client asks to take ownership of the
      CMS, transfer the project from the Northcode org to a client-owned org
      via Sanity dashboard → Manage → Project settings → Transfer project.
      The `projectId` stays stable, so no code or env-var changes are needed.

## Analytics

- [ ] Create a GA4 property, paste measurement ID into `NEXT_PUBLIC_GA_ID`.
- [ ] Vercel Analytics is enabled automatically — confirm it's reporting on
      the production deployment.

## SEO

- [ ] Confirm `NEXT_PUBLIC_SITE_URL` is the production URL.
- [ ] Confirm `/sitemap.xml` and `/robots.txt` resolve and reference the
      correct domain.
- [ ] Submit the sitemap to Google Search Console.
- [ ] Confirm `LocalBusiness` JSON-LD on `/` and `/contact` matches
      `siteSettings`.
- [ ] Open Graph image renders correctly when shared (test in
      <https://opengraph.xyz>).

## Domain & DNS

- [ ] Add the production domain to the Vercel project.
- [ ] Update DNS records.
- [ ] Confirm HTTPS certificate is issued.
- [ ] Set up a 301 from any old site/landing page if applicable.

## Off-site presence

- [ ] Create / update Google Business Profile with address, hours, photos and
      a link to the site.
- [ ] Update Instagram bio link.

## Performance & accessibility

- [ ] `npm run build && npm start`, then run Lighthouse on `/`, a service
      page, and `/contact`. Targets: Performance ≥95, Accessibility 100,
      Best Practices ≥95, SEO 100.
- [ ] Tab through every interactive element with the keyboard. Confirm visible
      focus rings and the FAQ accordion is operable.
- [ ] Test the contact form with a screen reader (VoiceOver / NVDA).
- [ ] Record current Lighthouse scores below so we know what regressed once
      photos are added.

```
Lighthouse on launch day:
  Home:    P __ / A __ / BP __ / SEO __
  HBOT:    P __ / A __ / BP __ / SEO __
  Contact: P __ / A __ / BP __ / SEO __
```
