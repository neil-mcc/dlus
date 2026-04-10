"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Link from "next/link";

/**
 * MobileNav — hamburger icon + full-screen overlay menu for mobile
 * and tablet (<1024px).
 *
 * The overlay is portalled to `document.body` so it escapes the
 * header's stacking context (sticky + z-index + backdrop-filter).
 *
 * Uses CSS transitions instead of AnimatePresence to avoid
 * portal + exit-animation reconciliation issues.
 */

type NavItem = { href: string; label: string };

export default function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  // Close on route change.
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll while open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Close on Escape.
  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }
  }, [open, onKeyDown]);

  return (
    <>
      {/* Hamburger / close toggle */}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative z-[95] flex h-11 w-11 flex-col items-center justify-center gap-[5px]"
      >
        <span
          className="block h-[2px] w-5 rounded-full bg-[var(--fg)] transition-all duration-300"
          style={{
            transform: open
              ? "translateY(3.5px) rotate(45deg)"
              : "translateY(0) rotate(0)",
          }}
        />
        <span
          className="block h-[2px] w-5 rounded-full bg-[var(--fg)] transition-all duration-300"
          style={{
            transform: open
              ? "translateY(-3.5px) rotate(-45deg)"
              : "translateY(0) rotate(0)",
          }}
        />
      </button>

      {/* Overlay — portalled to body, toggled via CSS transitions */}
      {mounted
        ? createPortal(
            <div
              className="fixed inset-0 z-[90] flex flex-col bg-[var(--bg)] transition-all duration-300"
              style={{
                opacity: open ? 1 : 0,
                pointerEvents: open ? "auto" : "none",
                visibility: open ? "visible" : "hidden",
              }}
              aria-hidden={!open}
            >
              {/* Spacer to clear the header bar */}
              <div className="h-[68px] shrink-0" />

              <nav
                aria-label="Mobile navigation"
                className="flex flex-1 flex-col overflow-y-auto px-8 pb-12 pt-8"
              >
                <ul className="flex flex-col gap-1">
                  {items.map((item, i) => (
                    <li
                      key={item.href}
                      className="transition-all duration-300"
                      style={{
                        opacity: open ? 1 : 0,
                        transform: open
                          ? "translateX(0)"
                          : "translateX(-16px)",
                        transitionDelay: open ? `${60 * i}ms` : "0ms",
                      }}
                    >
                      <Link
                        href={item.href}
                        tabIndex={open ? 0 : -1}
                        className="block rounded-xl px-4 py-3 text-2xl font-medium transition-colors hover:bg-[var(--surface)] sm:text-xl"
                        style={{
                          color:
                            pathname === item.href
                              ? "var(--accent)"
                              : "var(--fg)",
                        }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Book CTA */}
                <div
                  className="mt-auto pt-8 transition-all duration-400"
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(12px)",
                    transitionDelay: open
                      ? `${60 * items.length + 100}ms`
                      : "0ms",
                  }}
                >
                  <Link
                    href="/book"
                    tabIndex={open ? 0 : -1}
                    className="flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 py-4 text-base font-medium uppercase tracking-wide text-[var(--accent-ink)] transition hover:bg-[var(--accent-deep)]"
                  >
                    Book a session
                  </Link>
                </div>
              </nav>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
