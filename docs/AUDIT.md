# Phase 1 audit — existing site, API and assets

Audit performed against the live site (`https://soulpathholiday.com`, Next.js App Router build) and
its public API. The private repository was **not** available in this environment, so the existing
deployed bundle was inspected instead: SSR HTML of every route, all `_next/static/chunks/*.js`
bundles, and the API itself. Every finding below is evidence-based (fetched, not assumed).

## 1. Route inventory (all preserved)

| Route | Source in new build | Notes |
| --- | --- | --- |
| `/` | `src/app/page.js` | hero + search + 8 sections |
| `/destinations` | `destinations/page.js` | region + text filters |
| `/destinations/[slug]` | `destinations/[slug]/page.js` | hero video/image, highlights, gallery, packages, save |
| `/packages` | `packages/page.js` + `PackageBrowser` | filter/sort, URL params preserved |
| `/packages/[slug]` | `packages/[slug]/page.js` | itinerary, inclusions, PDF, departures |
| `/offers` (+ `?type=`) | `offers/page.js` | 6 offer types, empty state preserved |
| `/blog`, `/blog/[slug]` | `blog/page.js`, `blog/[slug]/page.js` | categories, article body from CMS |
| `/testimonials` | `testimonials/page.js` | original 6 reviews + stats |
| `/travel-guide` | `travel-guide/page.js` | month-by-month from `/travel-guides` |
| `/travel-with-influencers` | `travel-with-influencers/page.js` | influencers + reels |
| `/corporate-tours` | `corporate-tours/page.js` | services, stats, inquiry form |
| `/become-partner` | `become-partner/page.js` | franchise benefits + application |
| `/request-proposal` | `request-proposal/page.js` | accepts `?package=` and `?destination=` |
| `/flights`, `/flights/search` | `flights/page.js`, `flights/search/page.js` | query contract preserved |
| `/checkout/[id]` | `checkout/[id]/page.js` | auth-gated hand-off (see limitations) |
| `/contact` | `contact/page.js` | form + Google Maps embed |
| `/support` | `support/page.js` | FAQ + contact channels |
| `/login`, `/register`, `/forgot-password` | own folders | full OTP flows |
| `/dashboard` | `dashboard/page.js` | account + saved destinations |
| `/about`, `/privacy`, `/terms`, `/refund` | own folders | company + CMS legal text |
| `/hotels`, `/attractions` | own folders | “coming soon” preserved |
| `/partner`, `/admin` | `partner/page.js`, `admin/page.js` | redirect to `/dashboard` (see limitations) |
| `404` | `not-found.js` | original wording preserved |

## 2. API map (unchanged endpoints)

Read (server-side, ISR 120 s):

```
GET /api/site-settings               → company details, hero video/image, whatsapp, business hours
GET /api/destinations                → 10 destinations (heroImage, heroVideo, highlights, packageCount…)
GET /api/destinations/mega-menu      → featured destinations for navigation
GET /api/destinations/:slug
GET /api/packages                    → 21 packages (pricing, duration, itinerary, inclusions…)
GET /api/packages?featured=true
GET /api/packages?category=Luxury
GET /api/packages/:slug
GET /api/blog  ·  GET /api/blog/:slug
GET /api/influencers  ·  GET /api/influencers/reels
GET /api/travel-guides
GET /api/policies/privacy|terms|refund
GET /api/flights/airports?q=         → currently returns an empty array (handled)
```

Write (client-side, `Authorization: Bearer <sp-token>`):

```
POST /api/contact                { name, email, subject, message }
POST /api/corporate-inquiries    { companyName, contactName, phone, countryCode, email,
                                   numberOfPeople:int, destination, travelDates, requirements }
POST /api/partner-applications   { fullName, businessName, email, phone, city, experience, reason }
POST /api/proposal-requests      trip brief (+ packageSlug when arriving from a package)
POST /api/auth/check-user        { email } → { exists, hasPassword }
POST /api/auth/login             { email, password } → { token, user }
POST /api/auth/send-otp          { email, purpose: login|signup } → { expiresAt }
POST /api/auth/verify-otp        { email, otp, purpose } → { token, user } | { verificationToken }
POST /api/auth/signup            { verificationToken, name, phone } → { token, user }
POST /api/auth/forgot-password   { email } → { expiresAt }
POST /api/auth/reset-password    { verificationToken, newPassword }
GET/POST/DELETE /api/auth/saved-destinations[/:id]
```

`/api/offers`, `/api/testimonials`, `/api/newsletter` **do not exist** on the backend. Therefore:

- Offers are derived from packages flagged by the backend (`isOffer`, `hasOffer`,
  `pricing.offerPrice`, `offerTag`) — the same data the original site reads, which is why it shows
  its “No Offers Right Now” state today. It will populate automatically the moment offers are flagged.
- Testimonials are the original hardcoded set from the live homepage (carried over verbatim into
  `src/lib/content.js`), matching the original implementation.
- Newsletter has no endpoint (see limitations).

## 3. Asset inventory (reused, never replaced with stock)

| Asset | Source | Used in |
| --- | --- | --- |
| Hero video `/videos/hero-banner-soulpath.mp4` | `site-settings.homepageHeroVideo` | homepage hero |
| Hero poster `/uploads/file-1774525516899-320747674.jpeg` | `site-settings.homepageHeroImage` | hero base layer, preloader, video poster (optimised to 1800 px, 271 kB) |
| 10 destination hero images + videos | `/api/destinations` | destinations grid, page heroes, journey/about collages, auth screens |
| 21 package hero images, day images, PDF itineraries | `/api/packages` | package cards/details, offers, guide cards |
| Blog hero images | `/api/blog` | blog feature + cards + article hero |
| Influencer photos & reel thumbnails | `/api/influencers(/reels)` | influencer page |
| Logo + favicon | `soulpathholiday.com/SoulPath-Logo.png`, `/favicon.ico` | brand, OG image, apple icon |
| Traveller photo, deals photo | original homepage `uploads/file-1774614395131…`, `…1774711873008…` | “need help” band, newsletter band |

No image was renamed, deleted or substituted. Media is resolved through one helper
(`mediaUrl()` in `src/lib/config.js`), so changing the asset host is a one-line change.

## 4. Existing issues found (documented, not silently changed)

1. **`/api/flights/airports` returns `{"data": []}`** — no airport master data is seeded, so
   autocomplete can never match. The redesign keeps the endpoint, shows “no airport matched, you can
   still type the city name”, and still submits the search. No fare/availability endpoint exists
   either (`/api/flights/search` → 404), which is why flight search hands over to the travel desk
   instead of fabricating results.
2. **`site-settings.companyDetails.state` is `"Maharashtra"` with state code `27`** while the address,
   city and pincode are Ahmedabad, Gujarat (`382470`, code `24`). This affects GST invoices. The
   redesign prints “Ahmedabad, Gujarat” (as the live About page already does) but does **not** alter
   the stored data — please fix it in the backend.
3. **`/terms`, `/privacy` and `/api/policies/*` are readable publicly** while `/api/contact` and
   `/api/corporate-inquiries` GET require a token — consistent, but the public policy endpoints
   return HTML that is injected raw; the new build keeps that (same as before) inside a scoped
   `.prose` container.
4. **`/become-partner` and `/checkout/[id]` render an “Authenticating…” shell** in the original build
   (client-side gate). The redesign keeps the routes but makes the gate explicit instead of blank.
5. **Duplicate package image reuse** — `file-1774614395131-31497354.jpg` is used both as the homepage
   “Need help planning your trip?” banner and as the Kazakhstan package hero, and one Bhutan package
   lists inclusions as `123` (data-entry artefact). Both are content issues in the CMS.
6. **`/offers` links exist in navigation but no offer data exists**, producing an empty page. Handled
   with the original empty-state copy plus a custom-quote path.
7. **Influencer `upcomingTripCount` is 0 for every record**, so the live “creator departures” section
   renders nothing; the redesign shows an honest “no creator departures on sale right now” state
   alongside the full creator roster.
