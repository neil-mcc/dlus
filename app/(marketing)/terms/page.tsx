import Section from "@/components/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({
    title: "Terms of Service",
    description:
      "Terms governing use of the Dlús Recovery website and services.",
    path: "/terms",
  }),
  // Keep this page out of search results until legal sign-off.
  // Remove `robots` once the copy has been reviewed and published.
  robots: { index: false, follow: true },
};

/**
 * Terms of service — DRAFT.
 *
 * TODO(legal): the copy below is a reasonable starting point but has
 * NOT been reviewed by a solicitor. Before removing the `Draft`
 * banner and the `robots: { index: false }` metadata, have it read
 * by qualified counsel and confirm:
 *   - Company name / registration / trading style
 *   - Acuity cancellation + no-show policy wording matches the
 *     `/book` page and our Acuity account settings
 *   - Health / medical-advice disclaimer is strong enough for
 *     hyperbaric oxygen, red-light and PEMF services
 *   - Limitation-of-liability clause is enforceable under NI law
 */
export default function TermsPage() {
  return (
    <Section bleed className="pt-24 pb-24 sm:pt-32">
      <div className="mx-auto max-w-3xl">
        {/* Draft banner — visible to reviewers; removed at launch */}
        <div
          role="note"
          className="mb-8 rounded-xl border border-[var(--accent)]/40 bg-[var(--accent-soft)] p-4 text-sm leading-relaxed text-[var(--fg)]"
        >
          <strong>Draft — pending legal review.</strong> This page is
          a working draft and may change before launch. The booking
          terms you actually sign up to are those presented at the
          time of booking through our scheduler.
        </div>

        <h1 className="font-serif text-5xl">Terms of Service</h1>
        <p className="mt-4 text-sm text-[var(--muted)]">
          Draft — not yet effective.
        </p>

        <div className="prose prose-sm mt-8 max-w-none">
          <h2>Use of this site</h2>
          <p>
            By using this website you agree to these terms. Content
            is provided for general information only and is not
            medical advice.
          </p>

          <h2>Bookings</h2>
          <p>
            All bookings are made through our scheduling provider
            (Acuity). Reschedule or cancel up to 24 hours before your
            session at no charge; late cancellations and no-shows are
            charged at full rate. The definitive cancellation and
            refund terms are presented at the time of booking.
          </p>

          <h2>Health information</h2>
          <p>
            Information on this site is for educational purposes only
            and is not a substitute for medical advice. Consult your
            GP before beginning any new wellness protocol. Hyperbaric
            oxygen therapy has contra-indications — please complete
            the pre-session questionnaire honestly so we can flag any
            pre-screening needs before your first visit.
          </p>

          <h2>Liability</h2>
          <p>
            To the maximum extent permitted by law, Dlús Recovery is
            not liable for any indirect, incidental or consequential
            loss arising from use of this website.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of Northern Ireland,
            subject to final legal review.
          </p>
        </div>
      </div>
    </Section>
  );
}
