"use client";

/**
 * Last-resort error boundary. Only invoked when the root layout
 * itself throws — which is extremely rare (font load, globals.css
 * parse error, etc.). Must define its own <html>/<body> because
 * the root layout is the thing that failed.
 *
 * Kept deliberately minimal: no external fonts, no CSS modules, no
 * components. Just inline styles in the brand palette so the page
 * still reads as Dlús even when everything else is broken.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-GB">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
          background: "#f7f2ea",
          color: "#1a1a1a",
        }}
      >
        <div style={{ maxWidth: 560, textAlign: "center" }}>
          <p
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "#6b6458",
              margin: 0,
            }}
          >
            Dlús Recovery
          </p>
          <h1
            style={{
              fontSize: "1.875rem",
              lineHeight: 1.2,
              margin: "1rem 0 0.75rem",
              fontWeight: 500,
            }}
          >
            The studio page couldn&rsquo;t load.
          </h1>
          <p
            style={{
              margin: "0 0 2rem",
              color: "#6b6458",
              lineHeight: 1.6,
            }}
          >
            Something has gone wrong at the root. A refresh usually
            sorts it — if not, please get in touch.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              appearance: "none",
              border: "none",
              cursor: "pointer",
              borderRadius: 9999,
              padding: "0.75rem 1.5rem",
              fontSize: "0.875rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              background: "#b5651d",
              color: "#fff",
              fontWeight: 500,
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
