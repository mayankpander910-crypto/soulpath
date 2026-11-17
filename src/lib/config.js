/**
 * Central configuration. Every value can be overridden with an env var,
 * but the defaults point at the EXISTING SoulPath Holiday backend, so the
 * redesigned frontend talks to exactly the same endpoints as the original site.
 */
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || 'https://royalblue-giraffe-182996.hostingersite.com/api';

export const MEDIA_ORIGIN =
  process.env.NEXT_PUBLIC_MEDIA_ORIGIN || 'https://royalblue-giraffe-182996.hostingersite.com';

export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://soulpathholiday.com';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const WHATSAPP_FALLBACK = process.env.NEXT_PUBLIC_WHATSAPP_FALLBACK || '919898211063';

/** Resolve any API media path (relative `/uploads/...` or absolute) to a usable URL. */
export function mediaUrl(path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  if (/^\/videos\//i.test(path)) return `${SITE_ORIGIN}${path}`;
  return `${MEDIA_ORIGIN}${path}`;
}

/** Contact details used when the API can't be reached (mirrors the live site). */
export const CONTACT_FALLBACK = {
  phone: '+91 78610 11063',
  altPhone: '+91 98982 11063',
  email: 'info@soulpathholiday.com',
  address: 'E 919, Ganesh Glory 11, Jagatpur Road',
  city: 'Ahmedabad',
  pincode: '382470',
  businessHours: 'Mon–Sat, 10 AM – 6:30 PM (IST)',
  whatsapp: WHATSAPP_FALLBACK,
};

export const NAV_LINKS = [
  { label: 'Destinations', href: '/destinations' },
  { label: 'Packages', href: '/packages' },
  { label: 'Offers', href: '/offers' },
  { label: 'Travel with Influencers', href: '/travel-with-influencers' },
  { label: 'Blogs', href: '/blog' },
  { label: 'Testimonials', href: '/testimonials' },
];

export const CABIN_CLASSES = [
  { value: 'Y', label: 'Economy' },
  { value: 'PE', label: 'Premium Economy' },
  { value: 'C', label: 'Business' },
  { value: 'F', label: 'First Class' },
];
