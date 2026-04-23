/**
 * Central WhatsApp CTA helper — single source of truth for the number and
 * the message body. Every wa.me link in the app should go through this so
 * attribution gets embedded and Contact events are fired consistently.
 */
import { getAttribution } from "./attribution";
import { trackContact } from "./tracking";

const WA_NUMBER = "918400979997";
const DEFAULT_TEXT = "Hi, I'd like to book a free demo for my child.";

interface BuildOptions {
  /** Where this CTA lives — "hero", "sticky_mobile", "footer", "testimonials", etc. */
  source: string;
  /** Override the default message body. */
  text?: string;
}

/**
 * Build a wa.me URL with the attribution embedded in the message body.
 * WhatsApp only honours `text` in the URL; putting source info in query
 * params would be stripped. So we append a signed footer to the message
 * the counsellor can see: `(via facebook · campaign=cw_prospecting) [cta:hero]`.
 */
export function buildWhatsAppHref({ source, text }: BuildOptions): string {
  const body = text?.trim() || DEFAULT_TEXT;
  const attr = getAttribution();
  const bits: string[] = [body];
  if (attr) {
    const meta: string[] = [];
    if (attr.utm_source) meta.push(`source=${attr.utm_source}`);
    if (attr.utm_campaign) meta.push(`campaign=${attr.utm_campaign}`);
    if (attr.utm_content) meta.push(`ad=${attr.utm_content}`);
    if (attr.fbclid) meta.push("fb=yes");
    else if (attr.gclid) meta.push("g=yes");
    if (meta.length) bits.push(`\n(via ${meta.join(" · ")})`);
  }
  bits.push(`\n[cta:${source}]`);
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(bits.join(""))}`;
}

/**
 * onClick factory — fire the Contact pixel event before the browser follows
 * the wa.me link. Attach to every WhatsApp anchor.
 *
 *   <a href={buildWhatsAppHref({source:'hero'})} onClick={onWhatsAppClick('hero')}>…</a>
 */
export function onWhatsAppClick(source: string) {
  return () => {
    trackContact(source);
  };
}
