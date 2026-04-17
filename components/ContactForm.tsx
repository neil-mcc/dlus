"use client";

import { useState } from "react";

const ENQUIRY_TYPES = [
  "General enquiry",
  "HBOT question",
  "Red Light question",
  "PEMF question",
  "Pricing & packages",
  "Press / partnerships",
] as const;

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(json.error || "Something went wrong. Please try again.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unexpected error.");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-[var(--rule)] bg-[var(--surface)] p-8"
      >
        <h3 className="font-serif text-2xl">Thanks — message received.</h3>
        <p className="mt-3 text-sm text-[var(--muted)]">
          We aim to reply within one working day. For bookings, please use our
          online scheduler.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot — real users will leave this blank; bots fill it. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Field label="Your name" name="name" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Phone (optional)" name="phone" type="tel" />

      <label className="block">
        <span className="text-sm font-medium">What&rsquo;s it about?</span>
        <select
          name="enquiryType"
          required
          className="mt-1 block w-full rounded-md border border-[var(--rule)] bg-[var(--surface)] px-3 py-2 text-sm"
        >
          {ENQUIRY_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium">Message</span>
        <textarea
          name="message"
          required
          rows={6}
          className="mt-1 block w-full rounded-md border border-[var(--rule)] bg-[var(--surface)] px-3 py-2 text-sm"
        />
      </label>

      {error ? (
        <p role="alert" aria-live="assertive" className="text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium uppercase tracking-wide text-[var(--accent-ink)] transition hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-1 block w-full rounded-md border border-[var(--rule)] bg-[var(--surface)] px-3 py-2 text-sm"
      />
    </label>
  );
}
