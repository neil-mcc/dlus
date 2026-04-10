import Section from "@/components/Section";
import TherapyChooser from "@/components/TherapyChooser";
import Reveal from "@/components/motion/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Which therapy fits you?",
  description:
    "A 30-second quiz that recommends HBOT, Red Light or PEMF based on your goal, comfort and time.",
  path: "/which",
});

/**
 * /which — the interactive therapy chooser. Short hero, then the
 * full chooser component. Designed to be linked to from the home
 * hero, the sticky dock, and future campaigns.
 */
export default function WhichPage() {
  return (
    <>
      <Section bleed className="pt-24 pb-12 sm:pt-44 sm:pb-16">
        <Reveal>
          <span className="t-eyebrow">30-second quiz</span>
          <h1 className="t-display-sm mt-4 max-w-[16ch]">
            Which therapy
            <br />
            fits you today?
          </h1>
          <p
            className="t-lead mt-6"
            style={{ color: "var(--muted)" }}
          >
            Three short questions. An honest recommendation based on your goal,
            your comfort with enclosed spaces, and how long you want to be in
            the studio. No email required.
          </p>
        </Reveal>
      </Section>

      <Section className="pb-32">
        <TherapyChooser />
      </Section>
    </>
  );
}
