import Section from "@/components/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Dlús Recovery handles your personal data.",
  path: "/privacy",
});

/* TODO: legal review before launch */
export default function PrivacyPage() {
  return (
    <Section bleed className="pt-24 pb-24 sm:pt-32">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-[var(--muted)]">
          Last updated: placeholder. <strong>TODO: legal review before launch.</strong>
        </p>

        <div className="prose prose-sm mt-8 max-w-none">
          <h2>Who we are</h2>
          <p>
            Dlús Recovery Limited (“we”, “us”) operates this website. We are
            registered in [TODO: jurisdiction] under company number [TODO].
          </p>

          <h2>What data we collect</h2>
          <p>
            We collect data you submit through the contact form (name, email,
            optional phone, message), and basic analytics about site usage via
            Google Analytics 4 and Vercel Analytics. We do not use marketing
            cookies by default.
          </p>

          <h2>How we use it</h2>
          <p>
            Contact form submissions are sent to our team inbox via Resend so we
            can reply to your enquiry. Analytics data is used to understand how
            the site is used and improve it. We do not sell your data.
          </p>

          <h2>Your rights (UK GDPR / DPA 2018)</h2>
          <p>
            You have the right to access, correct or delete your personal data.
            Email <a href="mailto:hello@dlusrecovery.com">hello@dlusrecovery.com</a> to
            make a request.
          </p>

          <h2>Cookies</h2>
          <p>
            This site uses analytics cookies only. No advertising or tracking
            cookies are set.
          </p>
        </div>
      </div>
    </Section>
  );
}
