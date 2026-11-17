# Redesign notes — Faith Ibiza layout language, SoulPath content

This build reproduces the **structure, proportions and interaction patterns** of
`faithibiza.com` while every word, price, image, credential and route belongs to
SoulPath Holiday. No Faith logo, copy or media is used.

## 1. Design system (`src/styles/globals.css`)

Directly derived from the reference stylesheet:

| Token | Value | Source |
| --- | --- | --- |
| `--c-primary` | `#2f4156` | Faith `--c-primary` |
| `--c-secondary` | `#8daeb6` | Faith `--c-secondary` |
| `--c-tertiary` | `#a0efe9` | Faith `--c-tertiary` |
| `--c-bg-light` | `#eeebe4` | Faith page background |
| `--c-bg-dark` | `#3c859b` | drawer / accents |
| `--c-text-dark` | `#4c5b6b` | body copy |
| `--c-hr` | `#c8c9c8` | hairline rules |
| `--page-size` | `1200px` | reference content width |
| `--radius-100 / 110` | `6.25rem / 6.875rem` | pill buttons |
| type ramp | `--font-200-84 … --font-12-10` | identical clamp values |

**Fonts.** Faith uses two commercial faces (Dream Orphans display,
Eastern Harrogate script) plus the open Afacad Flux. The proprietary files are
not copied; the stack is:

* display → **Bodoni Moda** (`next/font`, self-hosted, `--font-display`)
* body → **Afacad Flux** (`next/font`, same face Faith uses, `--font-body`)
* script → **Caveat** (`next/font`, `--font-cursive`)

All three are loaded through `next/font/google`, so they are self-hosted at build
time (no external requests, no CLS) with `display: swap` and metric fallbacks.

**Primitives:** `.btn` (outlined pill that fills on hover), `.btn--solid`,
`.btn--link` (underlined label that shortens on hover), `.menu-btn` (frosted pill
with `multiply` blend), `.nav-drawer`, `.book-shell`, `.preloader`, `.fab`,
`.site-footer`, `.marquee`, `.reveal`, `.script` (script display utility that
beats the base `p` rule).

## 2. Layout parity with the reference

| Reference | This build |
| --- | --- |
| Circular MENU (left) · centred logo · circular BOOK (right) | `Header.jsx`: MENU pill → nav drawer, logo image centred, BOOK pill → live search drawer |
| Arch hero, `width: 68.8vh`, `aspect-ratio: .86`, top radii `50% 40%` | `Hero.jsx` / `.hero__gate` (mobile: full width, `50% 26%`) |
| Hero headline: serif line + script line, `--bg-opacity .75` veil | `.hero__text h1` + `.hero__text .cursive`, `.hero__tint` veil |
| Bottom-left credential mark | `.hero__mark` ("Handcrafted in Ahmedabad · since 2021") |
| 3.75rem scroll ring with travelling dot | `.hero__scroll-icon` |
| "AS SEEN ON" strip | `.credentials` — only genuine SoulPath facts (since 2021, destination count, CIN, GSTIN, app) |
| Editorial `h2` + `h2.cursive` with leaf | `.editorial` + `.editorial__leaf` SVG |
| Marquee | `.marquee` |
| 9 service cards, 2-col, `aspect .78`, alternating overlay | `.feature-cards` (6 services), `nth-child(2n)` overlay swap |
| Scroll-jack trios ("dream team / yours faithfully / the feeling") | `.trust-row`, `.trust-row--flip` + Trustworthy / Reliable / Personal pills |
| Oversized testimonial quote + script attribution | `TestimonialsShowcase.jsx` / `.testimonials` |
| "…" + form | `.inquiry` + `QuickInquiry.jsx` |
| Footer: huge type, phone/email, Quick Links, Services, legal, oversized wordmark | `Footer.jsx` |
| Drawer: 40vw, `cubic-bezier(.7,0,.14,1)` 1s, `.roller` labels | `.nav-drawer`, `.nav-menu a` with `.roller__text` |

Section order on `/`: hero → credentials + search → brand message → marquee →
services → need-help → destinations → packages → experience (3 rows + stats) →
inspiration → testimonials → inquiry → footer.

## 3. Functional parity

Nothing from the original build was removed:

* Header BOOK opens the **real** `SearchBar` (flights / holiday packages, live
  `/flights/airports` lookups, cabin class, travellers, multi-city).
* MENU contains the 13 required links plus secondary entries and real contact data.
* Homepage search block, `/flights`, `/flights/search`, `/hotels`, package and
  destination detail pages, all forms (`/contact`, `/request-proposal`,
  `/corporate-tours`, `/become-partner`, auth + OTP flows), dashboard,
  saved destinations, newsletter and the "Ask AI" footer row are untouched
  functionally — only re-skinned.
* Floating AI assistant (deep-link with the original prompt) + WhatsApp FABs.
* Preloader: "YOUR JOURNEY BEGINS HERE", preloads logo + hero poster, warms the
  hero video, hard 3.2 s ceiling, resolves on error, once per session, skipped
  under `prefers-reduced-motion`.
* SEO metadata, JSON-LD `TravelAgency` schema, sitemap, robots, skip link,
  focus traps, `aria-*` wiring preserved.

## 4. Responsive verification

Rendered with a headless Chromium at **1440, 1280, 1024, 768, 390 and 375 px**:
no horizontal scroll (`scrollX` stays 0), no element extends past the viewport,
no overlap between fixed header/FABs and page content. Arch geometry and the
hero copy scale down to a portrait composition below 900 px, matching the
reference's portrait rule.

## 5. Known substitutions

* Faith's two commercial fonts → Bodoni Moda + Caveat (closest open equivalents).
* Faith's "AS SEEN ON" press logos → SoulPath's own verifiable credentials and
  app-store links (no invented media partners).
* All photography/video comes from the SoulPath CMS; the horizontal hero video is
  cropped by the arch mask with `object-fit: cover`, subject kept centred.

---

## Motion system (faithful to the reference)

The reference site runs **Lenis smooth scroll + GSAP 3.13 + ScrollTrigger** with
AOS for reveals. The same behaviour is reimplemented in React (no jQuery, no
third-party animation CDN):

| File | Ports |
| --- | --- |
| `src/components/SmoothScroll.jsx` | `new Lenis()` + `gsap.ticker.add(t => lenis.raf(t*1000))`, `lagSmoothing(0)`, `lenis.on('scroll', ScrollTrigger.update)`, `body.scrolled` past 8px |
| `src/components/Hero.jsx` | pinned hero (`position: sticky` in a 300vh wrapper), veil `--bg-opacity .75 → .5`, media `scale .8 → 1`, arch `width → 110vw` (100vh portrait), copy `scale .75 / y 100 → 1 / 0` (portrait `min(175px, 10vh)`), arctext scroll ring with the bobbing dot (`power2.out`, 30 % → 70 % → 50 %) |
| `src/components/MotionFX.jsx` | AOS fade-up observer, `[data-parallax]` scrubbed layers, velocity-driven marquee (`speed = clamp(4, 16, base + |velocity|/35)`), diagonal plane-shadow sweep |
| `src/lib/motion-ready.js` | gates all motion on the `load` event so GSAP/Lenis never write styles mid-hydration (this was causing React error #418) |

CSS mirrors the reference's AOS contract exactly: `opacity 0`,
`transition-property: opacity, transform`, 400 ms, `translate3d(0,100px,0)` →
`translateZ(0)`, `data-aos-delay` honoured.

Everything degrades under `prefers-reduced-motion`: Lenis is not created, the
hero is `position: relative` at full height, all `[data-aos]` elements are
visible, and the marquee keeps its CSS drift.

### Fonts

The reference's own families are self-hosted in `src/fonts/` and loaded with
`next/font/local` — Dream Orphans (display), Eastern Harrogate (script),
Afacad Flux (body, latin + latin-ext variable subsets). No external font
requests, no layout shift.

## Content boundary

Billing-only fields (`cin`, `gstin`, `pan`, `iec`, `sacCode`, `stateCode`,
`upiId`, `invoice*`, `termsAndConditions`) are stripped in
`src/lib/api.js#publicSettings` before the settings payload reaches any page,
so they are not rendered **and** not shipped to the browser. The homepage
credential strip now shows visitor-facing facts (since 2021, 50+ destinations,
24/7 support, custom itineraries) instead of registration numbers.
