import Section from "@/components/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "Terms governing use of the Dlús Recovery website and services.",
  path: "/terms",
});

/* TODO: legal review before launch */
export default function TermsPage() {
  return (
    <Section bleed className="pt-24 pb-24 sm:pt-32">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-5xl">Terms of Service</h1>
        <p className="mt-4 text-sm text-[var(--muted)]">
          Last updated: placeholder. <strong>TODO: legal review before launch.</strong>
        </p>

        <div className="prose prose-sm mt-8 max-w-none">
          <h2>Use of this site</h2>
          <p>
            By using this website you agree to these terms. Content is provided
            for general information only and is not medical advice.
          </p>

          <h2>Bookings</h2>
          <p>
            All bookings are made through our scheduling provider (Acuity).
            Cancellation, refund and no-show policies are presented at the time
            of booking.
          </p>

          <h2>Health information</h2>
          <p>
            Information on this site is for educational purposes only and is not
            a substitute for medical advice. Consult your GP before beginning
            any new wellness protocol.
          </p>

          <h2>Liability</h2>
          <p>
            To the maximum extent permitted by law, Dlús Recovery Limited is not
            liable for any indirect, incidental or consequential loss arising
            from use of this website.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of [TODO: jurisdiction].
          </p>
        </div>
      </div>
    </Section>
  );
}
