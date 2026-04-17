import Section from "@/components/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({
    title: "Privacy Policy",
    description: "How Dlús Recovery handles your personal data.",
    path: "/privacy",
  }),
  // Keep this page out of search results until legal sign-off.
  // Remove `robots` once the copy has been reviewed and published.
  robots: { index: false, follow: true },
};

/**
 * Privacy policy — DRAFT.
 *
 * TODO(legal): the copy below is a reasonable UK-GDPR-aligned draft
 * but has NOT been reviewed by a solicitor. Before removing the
 * `Draft` banner and the `robots: { index: false }` metadata, have
 * it read by qualified counsel and confirm:
 *   - Company registration details (name, number, registered office)
 *   - Lawful basis for each processing activity
 *   - Named sub-processors (Resend, Google Analytics, Vercel) with
 *     data-transfer safeguards
 *   - Cookie banner / consent flow, if analytics needs one under PECR
 *   - Data-retention periods
 */
export default function PrivacyPage() {
  return (
    <Section bleed className="pt-24 pb-24 sm:pt-32">
      <div className="mx-auto max-w-3xl">
        {/* Draft banner — visible to reviewers; removed at launch */}
        <div
          role="note"
          className="mb-8 rounded-xl border border-[var(--accent)]/40 bg-[var(--accent-soft)] p-4 text-sm leading-relaxed text-[var(--fg)]"
        >
          <strong>Draft — pending legal review.</strong> This page is
          a working draft and may change before launch. For anything
          that materially affects you, please email{" "}
          <a
            href="mailto:hello@dlusrecovery.com"
            className="underline underline-offset-4"
          >
            hello@dlusrecovery.com
          </a>
          .
        </div>

        <h1 className="font-serif text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-[var(--muted)]">
          Draft — not yet effective.
        </p>

        <div className="prose prose-sm mt-8 max-w-none">
          <h2>Who we are</h2>
          <p>
            Dlús Recovery operates this website from Armagh, Northern
            Ireland. Company registration details will appear here
            once the studio is formally incorporated.
          </p>

          <h2>What data we collect</h2>
          <p>
            We collect data you submit through the contact form (name,
            email, optional phone, message), and basic analytics about
            site usage via Google Analytics 4 and Vercel Analytics. We
            do not use marketing cookies by default.
          </p>

          <h2>How we use it</h2>
          <p>
            Contact form submissions are sent to our team inbox via
            Resend so we can reply to your enquiry. Analytics data is
            used to understand how the site is used and improve it.
            We do not sell your data.
          </p>

          <h2>Your rights (UK GDPR / DPA 2018)</h2>
          <p>
            You have the right to access, correct or delete your
            personal data. Email{" "}
            <a href="mailto:hello@dlusrecovery.com">
              hello@dlusrecovery.com
            </a>{" "}
            to make a request.
          </p>

          <h2>Cookies</h2>
          <p>
            This site uses analytics cookies only. No advertising or
            tracking cookies are set.
          </p>

          <h2>Governing law</h2>
          <p>
            This policy is governed by the laws of Northern Ireland,
            subject to final legal review.
          </p>
        </div>
      </div>
    </Section>
  );
}
