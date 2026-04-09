import type { PortableTextBlock } from "@portabletext/react";
import type { Image } from "sanity";
import type { AcuityServiceKey } from "@/lib/acuity";

export type Service = {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription: string;
  heroImage?: Image;
  whatItIs?: PortableTextBlock[];
  benefits?: string[];
  sessionExperience?: PortableTextBlock[];
  contraindications?: PortableTextBlock[];
  acuityLinkKey: AcuityServiceKey;
  faqs?: Faq[];
};

export type ServiceSummary = Pick<
  Service,
  "_id" | "title" | "slug" | "shortDescription" | "acuityLinkKey"
>;

export type PricingTier = {
  _id: string;
  name: string;
  type: "single" | "bundle" | "membership";
  serviceRef?: { _ref: string; title?: string };
  price: number;
  sessionCount?: number;
  description?: string;
  featured?: boolean;
  order?: number;
};

export type Testimonial = {
  _id: string;
  name: string;
  quote: string;
  service?: { _ref: string; title?: string };
  rating?: number;
};

export type FaqCategory =
  | "general"
  | "hbot"
  | "redLight"
  | "pemf"
  | "booking"
  | "safety";

export type Faq = {
  _id: string;
  question: string;
  answer: PortableTextBlock[];
  category: FaqCategory;
};

export type AboutCollageItem = Image & { alt?: string; caption?: string };

export type SiteSettings = {
  businessName: string;
  tagline?: string;
  contactEmail: string;
  contactPhone?: string;
  address?: {
    line1: string;
    line2?: string;
    city: string;
    region?: string;
    postcode: string;
    country: string;
  };
  openingHours?: { day: string; hours: string }[];
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  googleMapsEmbedUrl?: string;
  /* Photography slots — all optional, duotone fallback otherwise. */
  heroImage?: Image;
  founderPortrait?: Image;
  founderName?: string;
  founderRole?: string;
  receptionImage?: Image;
  exteriorImage?: Image;
  aboutCollage?: AboutCollageItem[];
};
