import { useEffect } from "react";

/**
 * Lightweight per-route head manager — avoids pulling in react-helmet-async
 * for five legal pages. Sets <title>, <link rel="canonical">, OG url/title/
 * description, twitter equivalents, and removes the homepage's page-specific
 * JSON-LD (FAQPage) from legal routes.
 *
 * On unmount, restores the original homepage values so back-navigation
 * doesn't leave stale tags.
 */
export type RouteMeta = {
  title: string;
  description: string;
  path: string; // e.g. "/privacy-policy"
  noIndex?: boolean;
};

const SITE_ORIGIN = "https://chesswize.in";

function upsertMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function getMeta(attr: "name" | "property", key: string): string | null {
  return document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)?.getAttribute("content") ?? null;
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setRobots(value: string | null) {
  let el = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
  if (value === null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", "robots");
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

export function useRouteMeta(meta: RouteMeta) {
  useEffect(() => {
    const url = `${SITE_ORIGIN}${meta.path}`;

    // Snapshot so we can restore when the legal route unmounts.
    const prev = {
      title: document.title,
      description: getMeta("name", "description"),
      canonical: document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.getAttribute("href") ?? null,
      ogTitle: getMeta("property", "og:title"),
      ogDesc: getMeta("property", "og:description"),
      ogUrl: getMeta("property", "og:url"),
      twitterTitle: getMeta("name", "twitter:title"),
      twitterDesc: getMeta("name", "twitter:description"),
      robots: getMeta("name", "robots"),
    };

    document.title = meta.title;
    upsertMeta("name", "description", meta.description);
    setCanonical(url);
    upsertMeta("property", "og:title", meta.title);
    upsertMeta("property", "og:description", meta.description);
    upsertMeta("property", "og:url", url);
    upsertMeta("name", "twitter:title", meta.title);
    upsertMeta("name", "twitter:description", meta.description);

    if (meta.noIndex) {
      setRobots("noindex, follow");
    } else {
      // Legal pages are typically indexable but low-priority; let crawlers
      // decide. Explicit 'index' is fine too but the default works.
      setRobots(null);
    }

    return () => {
      document.title = prev.title;
      if (prev.description !== null) upsertMeta("name", "description", prev.description);
      if (prev.canonical !== null) setCanonical(prev.canonical);
      if (prev.ogTitle !== null) upsertMeta("property", "og:title", prev.ogTitle);
      if (prev.ogDesc !== null) upsertMeta("property", "og:description", prev.ogDesc);
      if (prev.ogUrl !== null) upsertMeta("property", "og:url", prev.ogUrl);
      if (prev.twitterTitle !== null) upsertMeta("name", "twitter:title", prev.twitterTitle);
      if (prev.twitterDesc !== null) upsertMeta("name", "twitter:description", prev.twitterDesc);
      if (prev.robots !== null) setRobots(prev.robots);
      else setRobots(null);
    };
  }, [meta.title, meta.description, meta.path, meta.noIndex]);
}
