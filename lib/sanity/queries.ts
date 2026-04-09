import { groq } from "next-sanity";
import { hasSanityConfig, sanityClient } from "./client";
import type {
  Faq,
  FaqCategory,
  PricingTier,
  Service,
  ServiceSummary,
  SiteSettings,
  Testimonial,
} from "./types";

const REVALIDATE = 60;

/**
 * Wraps every query so that an unconfigured Sanity project (placeholder
 * env vars during scaffold) returns the supplied empty value instead of
 * throwing at build time.
 */
async function safeFetch<T>(query: string, params: Record<string, unknown>, fallback: T): Promise<T> {
  if (!hasSanityConfig) return fallback;
  try {
    return await sanityClient.fetch<T>(query, params, {
      next: { revalidate: REVALIDATE, tags: ["sanity"] },
    });
  } catch (err) {
    console.error("[sanity] query failed", err);
    return fallback;
  }
}

/**
 * Shared image projection — expands the asset so `<SanityImage />` can
 * read the LQIP blur placeholder directly from the fetched document.
 */
const IMAGE_PROJECTION = groq`{
  ...,
  asset->{
    _id,
    _ref,
    metadata { lqip, dimensions }
  }
}`;

const SERVICE_PROJECTION = groq`{
  _id, title, slug, shortDescription,
  "heroImage": heroImage${IMAGE_PROJECTION},
  whatItIs, benefits, sessionExperience, contraindications, acuityLinkKey,
  "faqs": faqs[]->{ _id, question, answer, category }
}`;

export function getServices() {
  return safeFetch<ServiceSummary[]>(
    groq`*[_type == "service"] | order(title asc){ _id, title, slug, shortDescription, acuityLinkKey }`,
    {},
    [],
  );
}

export function getServiceBySlug(slug: string) {
  return safeFetch<Service | null>(
    groq`*[_type == "service" && slug.current == $slug][0]${SERVICE_PROJECTION}`,
    { slug },
    null,
  );
}

export function getPricingTiers() {
  return safeFetch<PricingTier[]>(
    groq`*[_type == "pricingTier"] | order(order asc, price asc){
      _id, name, type, price, sessionCount, description, featured, order,
      "serviceRef": serviceRef->{ _id, title }
    }`,
    {},
    [],
  );
}

export function getTestimonials() {
  return safeFetch<Testimonial[]>(
    groq`*[_type == "testimonial"] | order(_createdAt desc){
      _id, name, quote, rating, "service": service->{ _id, title }
    }`,
    {},
    [],
  );
}

export function getFaqsByCategory(category?: FaqCategory) {
  if (category) {
    return safeFetch<Faq[]>(
      groq`*[_type == "faq" && category == $category] | order(_createdAt asc){
        _id, question, answer, category
      }`,
      { category },
      [],
    );
  }
  return safeFetch<Faq[]>(
    groq`*[_type == "faq"] | order(category asc, _createdAt asc){
      _id, question, answer, category
    }`,
    {},
    [],
  );
}

export function getSiteSettings() {
  return safeFetch<SiteSettings | null>(
    groq`*[_type == "siteSettings" && _id == "siteSettings"][0]{
      businessName, tagline, contactEmail, contactPhone, address,
      openingHours, socialLinks, googleMapsEmbedUrl,
      founderName, founderRole,
      "heroImage": heroImage${IMAGE_PROJECTION},
      "founderPortrait": founderPortrait${IMAGE_PROJECTION},
      "receptionImage": receptionImage${IMAGE_PROJECTION},
      "exteriorImage": exteriorImage${IMAGE_PROJECTION},
      "aboutCollage": aboutCollage[]{
        alt, caption,
        ...,
        asset->{ _id, _ref, metadata { lqip, dimensions } }
      }
    }`,
    {},
    null,
  );
}
