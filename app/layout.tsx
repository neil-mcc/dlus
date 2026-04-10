import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Curtain from "@/components/motion/Curtain";
import "./globals.css";

// TODO: confirm font pairing during design pass
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif-stack",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans-stack",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dlusrecovery.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dlús Recovery — HBOT, Red Light & PEMF Therapy",
    template: "%s | Dlús Recovery",
  },
  description:
    "A recovery and wellness studio offering Hyperbaric Oxygen, Red Light, and PEMF therapy in a calm, considered space.",
  openGraph: {
    type: "website",
    siteName: "Dlús Recovery",
    locale: "en_GB",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html
      lang="en-GB"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--bg)] text-[var(--fg)]">
        {/* One-shot intro curtain — mounts once, persists across
            soft navigations. */}
        <Curtain />
        {children}
        <Analytics />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
