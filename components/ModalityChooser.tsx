"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";
import AmbientField from "@/components/AmbientField";
import Magnetic from "@/components/motion/Magnetic";

/**
 * ModalityChooser — a 3-question interactive quiz that recommends
 * HBOT, Red Light or PEMF based on (1) goal, (2) sensitivity to
 * enclosed spaces, and (3) preferred time commitment.
 *
 * Philosophy: this is the most interactive single element on the
 * whole site, so it has to be both technically pretty *and*
 * substantively useful. The scoring is simple — each answer adds
 * weight to one or more modalities — but the presentation uses
 * the same motion vocabulary as the rest of the site so it feels
 * native, not bolted on.
 *
 * State persists to the URL hash (`#q=1,2,0`) so a user can share
 * their result. State initialises from the hash on mount so a
 * refresh lands on the same step.
 *
 * A11y:
 * - Each question is rendered as a fieldset + legend so screen
 *   readers announce the group context.
 * - Options are real buttons with explicit focus styles.
 * - Respects `prefers-reduced-motion` by swapping tween props.
 */

type Modality = "hbot" | "redLight" | "pemf";

type Option = {
  label: string;
  /** Points added to each modality if this option is chosen. */
  weights: Partial<Record<Modality, number>>;
};

type Question = {
  prompt: string;
  hint: string;
  options: Option[];
};

const QUESTIONS: Question[] = [
  {
    prompt: "What are you hoping to get out of today?",
    hint: "Pick the one that sounds closest. You can stack modalities later if your goals shift.",
    options: [
      {
        label: "Faster physical recovery after training",
        weights: { hbot: 3, pemf: 1 },
      },
      {
        label: "A nervous-system reset — calm, sleep, stress",
        weights: { pemf: 3, redLight: 1 },
      },
      {
        label: "Skin, collagen and overall glow",
        weights: { redLight: 3 },
      },
      {
        label: "I'm not sure yet — exploring what's out there",
        weights: { hbot: 1, pemf: 1, redLight: 1 },
      },
    ],
  },
  {
    prompt: "How do you feel about enclosed spaces?",
    hint: "HBOT uses a single-occupant chamber. We want you to enjoy your session, not endure it.",
    options: [
      {
        label: "Totally fine — I like a cosy room",
        weights: { hbot: 2 },
      },
      {
        label: "Mostly OK with a bit of reassurance",
        weights: { hbot: 1, pemf: 1 },
      },
      {
        label: "I'd rather be in an open space",
        weights: { redLight: 2, pemf: 2 },
      },
    ],
  },
  {
    prompt: "How long do you want to spend in-studio?",
    hint: "Includes settle-in and integration time.",
    options: [
      {
        label: "Quick — under 30 minutes",
        weights: { pemf: 2, redLight: 1 },
      },
      {
        label: "A real break — 60 minutes",
        weights: { hbot: 1, redLight: 2, pemf: 1 },
      },
      {
        label: "Full escape — 90 minutes or more",
        weights: { hbot: 3 },
      },
    ],
  },
];

const MODALITY_META: Record<
  Modality,
  {
    title: string;
    subtitle: string;
    href: string;
    copy: string;
    bookKey: Modality;
  }
> = {
  hbot: {
    title: "Hyperbaric Oxygen",
    subtitle: "Pressure + oxygen, deep rest",
    href: "/hbot",
    copy:
      "You're after a long, quiet session with real physical recovery payoff. HBOT is the closest thing we offer to a reset button.",
    bookKey: "hbot",
  },
  redLight: {
    title: "Red Light Therapy",
    subtitle: "Warm, open, skin-first",
    href: "/red-light-therapy",
    copy:
      "You prefer an open room and care about how you look as well as how you feel. Red light is the most sociable, stack-friendly option we run.",
    bookKey: "redLight",
  },
  pemf: {
    title: "PEMF Therapy",
    subtitle: "Calming, rhythmic, short",
    href: "/pemf",
    copy:
      "You want to drop your shoulders and leave calmer than you arrived. PEMF is the shortest, softest entry point and pairs well with everything else.",
    bookKey: "pemf",
  },
};

// Encode/decode answers to URL hash — the smallest share primitive
// we can get away with. Each answer is its index in the question,
// comma-separated. e.g. `#q=2,0,1`.
const HASH_KEY = "q=";
function encodeHash(answers: number[]): string {
  return `#${HASH_KEY}${answers.join(",")}`;
}
function decodeHash(hash: string): number[] {
  if (!hash.startsWith("#" + HASH_KEY)) return [];
  const raw = hash.slice(1 + HASH_KEY.length);
  if (!raw) return [];
  return raw
    .split(",")
    .map((x) => Number.parseInt(x, 10))
    .filter((n) => Number.isFinite(n));
}

function scoreAnswers(answers: number[]): Modality {
  const scores: Record<Modality, number> = { hbot: 0, redLight: 0, pemf: 0 };
  answers.forEach((answerIdx, qIdx) => {
    const opt = QUESTIONS[qIdx]?.options[answerIdx];
    if (!opt) return;
    for (const [m, w] of Object.entries(opt.weights)) {
      scores[m as Modality] += w ?? 0;
    }
  });
  // Tie-break by a fixed order so results are deterministic.
  const order: Modality[] = ["hbot", "pemf", "redLight"];
  let best: Modality = order[0];
  for (const m of order) {
    if (scores[m] > scores[best]) best = m;
  }
  return best;
}

export default function ModalityChooser() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  // Hydrate from URL hash on mount so shared results land on the
  // correct step. We intentionally don't subscribe to hashchange
  // after mount — user choices drive the hash from here on.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const existing = decodeHash(window.location.hash);
    if (existing.length > 0) {
      setAnswers(existing);
      setStep(Math.min(existing.length, QUESTIONS.length));
    }
  }, []);

  const writeHash = useCallback((next: number[]) => {
    if (typeof window === "undefined") return;
    const hash = encodeHash(next);
    // Use history.replaceState rather than location.hash so we
    // don't spam the back button stack with every answer.
    history.replaceState(null, "", `${window.location.pathname}${hash}`);
  }, []);

  const choose = (optIdx: number) => {
    const next = [...answers];
    next[step] = optIdx;
    setAnswers(next);
    writeHash(next);
    setStep((s) => Math.min(s + 1, QUESTIONS.length));
  };

  const back = () => {
    setStep((s) => Math.max(0, s - 1));
  };

  const reset = () => {
    setAnswers([]);
    setStep(0);
    writeHash([]);
  };

  const isResult = step >= QUESTIONS.length && answers.length >= QUESTIONS.length;
  const result = useMemo(
    () => (isResult ? scoreAnswers(answers) : null),
    [isResult, answers],
  );
  const progress = Math.min(step, QUESTIONS.length) / QUESTIONS.length;

  // Motion presets — swap to instant when reduced motion is on so
  // the AnimatePresence still mounts/unmounts children cleanly.
  // The ease tuple is typed as a fixed-length tuple so motion/react
  // infers it as a cubic-bezier rather than a generic number[].
  const tween = reduce
    ? { duration: 0 }
    : {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      };

  return (
    <div className="relative isolate mx-auto w-full max-w-3xl">
      {/* Progress bar */}
      <div className="mb-10 flex items-center justify-between">
        <span className="t-eyebrow">
          {isResult
            ? "Your recommendation"
            : `Question ${step + 1} of ${QUESTIONS.length}`}
        </span>
        <div className="h-1 w-40 overflow-hidden rounded-full bg-[var(--rule)]">
          <motion.div
            className="h-full rounded-full bg-[var(--accent)]"
            initial={false}
            animate={{ width: `${progress * 100}%` }}
            transition={tween}
          />
        </div>
      </div>

      {/* Step body */}
      <AnimatePresence mode="wait">
        {!isResult ? (
          <motion.fieldset
            key={`q-${step}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={tween}
            className="m-0 border-0 p-0"
          >
            <legend className="t-h2 mb-4">{QUESTIONS[step].prompt}</legend>
            <p
              className="mb-10 max-w-xl text-sm"
              style={{ color: "var(--muted)" }}
            >
              {QUESTIONS[step].hint}
            </p>
            <ul className="grid gap-3">
              {QUESTIONS[step].options.map((opt, i) => (
                <li key={opt.label}>
                  <button
                    type="button"
                    onClick={() => choose(i)}
                    className="group flex w-full items-center justify-between gap-6 rounded-2xl border border-[var(--rule)] bg-[var(--surface)] px-6 py-5 text-left text-base font-medium transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[var(--shadow-sm)]"
                  >
                    <span>{opt.label}</span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 opacity-60 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </button>
                </li>
              ))}
            </ul>
            {step > 0 ? (
              <button
                type="button"
                onClick={back}
                className="mt-8 inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--fg)]"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
              </button>
            ) : null}
          </motion.fieldset>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={tween}
            className="relative overflow-hidden rounded-3xl"
            style={{ background: "var(--slab)" }}
          >
            {/* Per-result AmbientField backdrop */}
            <div className="absolute inset-0" aria-hidden="true">
              <AmbientField variant={result ?? "hbot"} intensity={0.9} />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.15))",
              }}
            />

            {result ? (
              <div
                className="relative flex flex-col gap-8 p-10 sm:p-14"
                style={{ color: "var(--slab-ink)" }}
              >
                <div className="flex items-center gap-3">
                  <Sparkles
                    className="h-5 w-5"
                    style={{ color: "var(--accent)" }}
                    aria-hidden="true"
                  />
                  <span
                    className="t-eyebrow"
                    style={{ color: "var(--accent)" }}
                  >
                    {MODALITY_META[result].subtitle}
                  </span>
                </div>
                <h2
                  className="t-display-sm max-w-[14ch]"
                  style={{ color: "var(--slab-ink)" }}
                >
                  Start with {MODALITY_META[result].title}.
                </h2>
                <p
                  className="max-w-xl text-base leading-relaxed"
                  style={{ color: "var(--slab-ink)", opacity: 0.8 }}
                >
                  {MODALITY_META[result].copy}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-5">
                  <Magnetic>
                    <Link
                      href={`/book?service=${MODALITY_META[result].bookKey}`}
                      className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium uppercase tracking-wide text-[var(--accent-ink)] hover:bg-[var(--accent-deep)]"
                    >
                      Book {MODALITY_META[result].title}
                    </Link>
                  </Magnetic>
                  <Link
                    href={MODALITY_META[result].href}
                    className="inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
                    style={{ color: "var(--slab-ink)" }}
                  >
                    Read more about it
                    <ArrowUpRight
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                  <button
                    type="button"
                    onClick={reset}
                    className="text-sm underline-offset-4 hover:underline"
                    style={{ color: "var(--slab-ink)", opacity: 0.6 }}
                  >
                    Retake the quiz
                  </button>
                </div>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
