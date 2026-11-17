import { API_BASE } from './config';

/* ------------------------------------------------------------------ */
/*  SERVER-SIDE DATA ACCESS                                            */
/*  Same endpoints the original site calls, fetched on the server so    */
/*  the HTML stays crawlable (SEO) and the first paint stays fast.      */
/* ------------------------------------------------------------------ */

const REVALIDATE = 120; // seconds — keeps content fresh without hammering the API

async function get(path) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.success === false ? null : json;
  } catch {
    return null; // network hiccup: page renders with its graceful empty state
  }
}

/**
 * Fields that belong to the internal billing/invoicing flow and must never
 * reach the public site (they used to be printed in the footer and on the
 * homepage, and were shipped to the client in the settings payload).
 */
const PRIVATE_ORG_FIELDS = [
  'cin',
  'gstin',
  'pan',
  'iec',
  'sacCode',
  'stateCode',
  'upiId',
  'termsAndConditions',
  'estimateTerms',
  'invoiceTerms',
  'invoiceLogo',
  'signatureImage',
];

export function publicSettings(settings) {
  if (!settings) return null;
  const companyDetails = { ...(settings.companyDetails || {}) };
  PRIVATE_ORG_FIELDS.forEach((key) => delete companyDetails[key]);
  const { invoiceFormats, ...rest } = settings; // eslint-disable-line no-unused-vars
  return { ...rest, companyDetails };
}

export async function getSiteSettings() {
  const json = await get('/site-settings');
  return publicSettings(json?.data || null);
}

export async function getDestinations() {
  const json = await get('/destinations');
  return (json?.data || []).filter((d) => d.active !== false);
}

export async function getDestination(slug) {
  const json = await get(`/destinations/${encodeURIComponent(slug)}`);
  return json?.data || null;
}

export async function getMegaMenu() {
  const json = await get('/destinations/mega-menu');
  return json?.data || { featured: [], regions: [], trending: [] };
}

export async function getPackages(query = '') {
  const json = await get(`/packages${query ? `?${query}` : ''}`);
  return (json?.data || []).filter((p) => p.available !== false);
}

export async function getPackage(slug) {
  const json = await get(`/packages/${encodeURIComponent(slug)}`);
  return json?.data || null;
}

export async function getPosts() {
  const json = await get('/blog');
  return (json?.data || []).filter((p) => p.published !== false);
}

export async function getPost(slug) {
  const json = await get(`/blog/${encodeURIComponent(slug)}`);
  return json?.data || null;
}

export async function getInfluencers() {
  const json = await get('/influencers');
  return json?.data || [];
}

export async function getInfluencerReels() {
  const json = await get('/influencers/reels');
  return json?.data || [];
}

export async function getTravelGuides() {
  const json = await get('/travel-guides');
  return json?.data || [];
}

export async function getPolicy(type) {
  const json = await get(`/policies/${type}`);
  return json?.data || null;
}

/* ------------------------------------------------------------------ */
/*  CLIENT-SIDE API CLIENT (auth + forms)                              */
/*  Byte-for-byte behaviour of the original: Bearer token from          */
/*  localStorage `sp-token`, JSON body, error surfaced from `message`.  */
/* ------------------------------------------------------------------ */

export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('sp-token');
}

export function getStoredUser() {
  if (typeof window === 'undefined') return null;
  try {
    return JSON.parse(localStorage.getItem('sp-user') || 'null');
  } catch {
    return null;
  }
}

export function saveSession(token, user) {
  if (typeof window === 'undefined') return;
  if (token) localStorage.setItem('sp-token', token);
  if (user) localStorage.setItem('sp-user', JSON.stringify(user));
  window.dispatchEvent(new Event('sp-auth-change'));
}

export function clearSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('sp-token');
  localStorage.removeItem('sp-user');
  window.dispatchEvent(new Event('sp-auth-change'));
}

export async function apiRequest(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    cache: 'no-store',
  });
  let json = null;
  try {
    json = await res.json();
  } catch {
    json = null;
  }
  if (!res.ok) {
    throw new Error(json?.message || `Request failed (${res.status})`);
  }
  return json;
}

/* ---------------------------- helpers ----------------------------- */

export const formatINR = (n) =>
  typeof n === 'number' && Number.isFinite(n) ? `₹${n.toLocaleString('en-IN')}` : '';

/** Price shown for a package — offer price wins, matching the original logic. */
export function packagePrice(pkg) {
  if (pkg?.pricing?.priceVisible === false) return { custom: true, text: 'Custom Quote' };
  const offer = pkg?.pricing?.offerPrice;
  const base = pkg?.pricing?.basePrice;
  const active = offer && offer > 0 && (!base || offer < base) ? offer : base;
  if (!active) return { custom: true, text: 'Get Quote' };
  return {
    custom: false,
    active,
    base,
    text: formatINR(active),
    strike: offer && base && offer < base ? formatINR(base) : null,
  };
}

export function formatDate(value, opts = { day: 'numeric', month: 'short', year: 'numeric' }) {
  if (!value) return '';
  try {
    return new Date(value).toLocaleDateString('en-IN', opts);
  } catch {
    return '';
  }
}

export function readingTime(html = '') {
  const words = String(html).replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export const BLOG_CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'seasonal_tips', label: 'Seasonal Tips' },
  { value: 'travel_tips', label: 'Travel Tips' },
  { value: 'latest_news', label: 'Latest News' },
  { value: 'destination_guide', label: 'Destination Guide' },
  { value: 'visa_guide', label: 'Visa Guide' },
  { value: 'packing_guide', label: 'Packing Guide' },
  { value: 'travel_stories', label: 'Travel Stories' },
];

export const categoryLabel = (value) =>
  BLOG_CATEGORIES.find((c) => c.value === value)?.label ||
  String(value || 'Travel').replace(/_/g, ' ');
