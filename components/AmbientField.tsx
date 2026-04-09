"use client";

import { useEffect, useRef } from "react";

/**
 * AmbientField — a canvas-backed generative background with four
 * bespoke "moods". Used as a hero backdrop in place of stock or
 * commissioned imagery. Every variant is rendered on a single
 * 2D canvas (no WebGL) so it stays under ~2kb gzip'd JS and
 * works on every device.
 *
 * The four variants:
 *
 *   brand     — slow drifting gradient bloom in teal. Home hero.
 *   hbot      — concentric pressure rings radiating from centre
 *               at ~6 bpm. Reads as "descent / stillness".
 *   redLight  — soft radial bloom that breathes at ~6 bpm.
 *               Warm, radiant, feels like skin under light.
 *   pemf      — pulsing lattice aligned to 7.83Hz (Schumann
 *               resonance, which is on-brand for PEMF). Points
 *               brighten in waves across the grid.
 *
 * Hard constraints every variant obeys:
 * - devicePixelRatio aware, capped at 2 for performance
 * - `prefers-reduced-motion` → renders one static frame and stops
 * - Pauses when the tab is hidden (visibilitychange)
 * - Pauses when the canvas scrolls out of view (IntersectionObserver)
 * - All animations driven by a single rAF loop — no setInterval
 */

type Variant = "brand" | "hbot" | "redLight" | "pemf";

type Props = {
  variant?: Variant;
  /**
   * Controls how bold the rendering is. 1 = default opacity.
   * Drop to 0.6 for hero backgrounds behind large type that
   * needs to stay legible.
   */
  intensity?: number;
  className?: string;
};

export default function AmbientField({
  variant = "brand",
  intensity = 1,
  className = "",
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Size the backing store to the CSS-rendered size × dpr so we
    // get crisp lines on hi-dpi screens. Re-run on resize via RO.
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Visibility/intersection gate — only animate when on-screen
    // and tab is foreground. This is the single biggest perf win
    // for background decoration canvases.
    let running = true;
    const io = new IntersectionObserver(
      (entries) => {
        running = entries[0]?.isIntersecting ?? false;
        if (running) tick();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVis = () => {
      if (document.hidden) {
        running = false;
      } else if (io.takeRecords()) {
        running = true;
        tick();
      }
    };
    document.addEventListener("visibilitychange", onVis);

    let raf = 0;
    let t0 = performance.now();

    const tick = () => {
      if (!running) return;
      const now = performance.now();
      const t = (now - t0) / 1000;

      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, w, h);

      switch (variant) {
        case "brand":
          drawBrand(ctx, w, h, t, intensity);
          break;
        case "hbot":
          drawHbot(ctx, w, h, t, intensity);
          break;
        case "redLight":
          drawRedLight(ctx, w, h, t, intensity);
          break;
        case "pemf":
          drawPemf(ctx, w, h, t, intensity);
          break;
      }

      if (!reduce) raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [variant, intensity]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`h-full w-full ${className}`}
    />
  );
}

/* --------------------------------------------------------------
   Variant painters. Each receives the 2D context, CSS dimensions,
   an elapsed-seconds timestamp, and an intensity multiplier.
   Keep these pure: no closures over component state.
   -------------------------------------------------------------- */

// brand — soft drifting gradient bloom. Two blurred discs orbit
// the canvas centre at very low rpm, blending via "lighter".
function drawBrand(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  i: number,
) {
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.max(w, h) * 0.7;

  // Base wash
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, "#1c2729");
  bg.addColorStop(1, "#0e1617");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Two slow orbits
  const orbits = [
    { hue: "rgba(80, 156, 164,", radius: r * 0.25, speed: 0.08, phase: 0 },
    { hue: "rgba(184, 116, 74,", radius: r * 0.3, speed: 0.05, phase: Math.PI },
  ];

  ctx.globalCompositeOperation = "lighter";
  for (const o of orbits) {
    const x = cx + Math.cos(t * o.speed + o.phase) * o.radius;
    const y = cy + Math.sin(t * o.speed + o.phase) * o.radius * 0.6;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r * 0.6);
    g.addColorStop(0, `${o.hue} ${0.32 * i})`);
    g.addColorStop(1, `${o.hue} 0)`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }
  ctx.globalCompositeOperation = "source-over";
}

// hbot — concentric pressure rings radiating outward from centre.
// Six ring pulses at a time, period ~10s each, offset in phase.
// Reads as "depth / pressure / descent".
function drawHbot(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  i: number,
) {
  // Deep navy wash
  const bg = ctx.createRadialGradient(
    w / 2,
    h / 2,
    0,
    w / 2,
    h / 2,
    Math.max(w, h) * 0.8,
  );
  bg.addColorStop(0, "#142024");
  bg.addColorStop(1, "#060c0e");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2;
  const maxR = Math.hypot(w, h) / 2;
  const ringCount = 6;
  const period = 10; // seconds per ring

  ctx.globalCompositeOperation = "lighter";
  for (let k = 0; k < ringCount; k++) {
    // Each ring is offset by (period / ringCount) so a new one
    // enters as another fades out. `progress` is in [0, 1).
    const phase = (t / period + k / ringCount) % 1;
    const radius = phase * maxR;
    // Opacity ramps up then falls off — peak at 0.4 progress
    const alpha =
      Math.sin(Math.min(1, phase * 1.4) * Math.PI) * 0.22 * i;
    if (alpha <= 0) continue;
    ctx.strokeStyle = `rgba(80, 156, 164, ${alpha})`;
    ctx.lineWidth = 1.25;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalCompositeOperation = "source-over";
}

// redLight — a single radial bloom that breathes at ~6 bpm.
// Colour ramps from near-black through brass to a warm cream edge.
function drawRedLight(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  i: number,
) {
  ctx.fillStyle = "#140502";
  ctx.fillRect(0, 0, w, h);

  // 6 bpm = 0.1 Hz. Sine wave → [0, 1] for radius modulation.
  const breathe = (Math.sin(t * 0.1 * Math.PI * 2) + 1) / 2;
  const cx = w / 2;
  const cy = h / 2 + h * 0.05;
  const base = Math.max(w, h) * 0.38;
  const r = base * (0.85 + breathe * 0.25);

  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  g.addColorStop(0, `rgba(255, 170, 110, ${0.55 * i})`);
  g.addColorStop(0.4, `rgba(184, 116, 74, ${0.35 * i})`);
  g.addColorStop(1, "rgba(20, 5, 2, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // Subtle outer ring for dimensionality
  ctx.strokeStyle = `rgba(255, 170, 110, ${0.06 * i})`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 1.02, 0, Math.PI * 2);
  ctx.stroke();
}

// pemf — pulsing lattice of dots at 7.83 Hz (Schumann). A travelling
// brightness wave sweeps across the grid so individual points light
// up in sequence rather than blinking in unison.
function drawPemf(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  i: number,
) {
  // Deep teal wash, darker than HBOT so the dots have somewhere
  // bright to land against.
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, "#0b1618");
  bg.addColorStop(1, "#16272a");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const spacing = 36;
  const cols = Math.ceil(w / spacing) + 1;
  const rows = Math.ceil(h / spacing) + 1;
  // 7.83 Hz — Schumann resonance. Feels fast; throttle the visible
  // pulse by dividing so user-perceived rate lands near 1.5 Hz.
  const schumann = 7.83;
  const phase = t * (schumann / 5);
  const waveSpeed = 0.6;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * spacing;
      const y = r * spacing;
      // Distance from pseudo-origin, used to stagger brightness
      const d = Math.hypot(x - w * 0.5, y - h * 0.5);
      const local = Math.sin(phase - d * 0.01 + c * 0.08 + r * 0.11);
      const bright = Math.max(0, local);
      const radius = 1 + bright * 2.4;
      const alpha = (0.1 + bright * 0.55) * i;

      ctx.fillStyle = `rgba(120, 190, 198, ${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Horizontal gridline — very subtle, fades in sync with the
    // travelling wave so it reads as a scanline rather than a rule.
    const lineAlpha = (Math.sin(phase * 0.5 - r * 0.12) + 1) * 0.01 * i;
    if (lineAlpha > 0) {
      ctx.strokeStyle = `rgba(120, 190, 198, ${lineAlpha})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, r * spacing);
      ctx.lineTo(w, r * spacing);
      ctx.stroke();
    }
  }
}
