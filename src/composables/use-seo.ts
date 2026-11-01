import { useHead, useSeoMeta } from "@unhead/vue";

import { SITE } from "@/lib/site";

export interface Meta {
  title: string;
  description?: string;
  shortDescription?: string;
  url?: string;
  author?: string;
  path?: string;
}

/**
 * Resolve a relative path or absolute URL against the original site URL.
 */
function getCanonicalUrl(meta: Meta): string | undefined {
  const target = meta.url || meta.path;

  if (!target) return undefined;

  try {
    const baseUrl = SITE.originalSite.endsWith("/") ? SITE.originalSite : `${SITE.originalSite}/`;

    return new URL(target, baseUrl).href;
  } catch {
    return undefined;
  }
}

/**
 * Main SEO composable.
 */
export function useSeo(meta: Meta) {
  const canonicalUrl = getCanonicalUrl(meta);
  const socialDescription = meta.shortDescription || meta.description;

  useSeoMeta({
    title: meta.title,
    description: meta.description,
    author: meta.author,

    ogTitle: meta.title,
    ogDescription: socialDescription,
    ogUrl: canonicalUrl,
    ogType: "website",

    twitterTitle: meta.title,
    twitterDescription: socialDescription,
    twitterCard: "summary",
  });

  useHead({
    link: canonicalUrl
      ? [
          {
            rel: "canonical",
            href: canonicalUrl,
          },
        ]
      : [],
  });
}
