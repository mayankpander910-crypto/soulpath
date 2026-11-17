# SoulPath Holiday — Faith-style rebuild (v3.0)

A production-ready frontend for **soulpathholiday.com** that recreates the design
language of [faithibiza.com](https://faithibiza.com) — circular MENU / centred
logo / circular BOOK header, the arch-shaped cinematic hero, the editorial +
service-card section rhythm, the oversized script typography and the reference
footer — while every piece of content, media, price and route belongs to
SoulPath Holiday.

**Nothing about the business was re-invented.** This frontend talks to the *same* live SoulPath
backend (`royalblue-giraffe-182996.hostingersite.com/api`), reuses the *same* CMS content and the
*same* media library. There is no mock data anywhere in this project.

See [`docs/REDESIGN-NOTES.md`](docs/REDESIGN-NOTES.md) for the token-by-token and
section-by-section mapping to the reference, and [`docs/AUDIT.md`](docs/AUDIT.md)
for the route/feature inventory.

---

## 1. Quick start (localhost)

```bash
# 1. install
npm install

# 2. configure (optional — defaults already point at the live API)
cp .env.example .env.local

# 3a. run the production build
npm run build
npm start            # → http://localhost:3000

# 3b. or run in dev mode with hot reload
npm run dev          # → http://localhost:3000
```

Requirements: **Node.js 18.18+** (tested on Node 20) and an internet connection — the site reads
live content from the SoulPath API.

### Environment variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_API_BASE` | `https://royalblue-giraffe-182996.hostingersite.com/api` | Existing backend base URL. |
| `NEXT_PUBLIC_MEDIA_ORIGIN` | same host as the API | Serves `/uploads/*` images, PDFs, videos. |
| `NEXT_PUBLIC_SITE_ORIGIN` | `https://soulpathholiday.com` | Serves the original hero video (`/videos/hero-banner-soulpath.mp4`). |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Canonical URL used in metadata, sitemap and structured data. |
| `NEXT_PUBLIC_WHATSAPP_FALLBACK` | `919898211063` | Used only if `/site-settings` cannot be reached. |

> **Hero video:** by default it streams from the existing site origin, exactly as the live site does.
> To self-host it instead, download `https://soulpathholiday.com/videos/hero-banner-soulpath.mp4`
> into `public/videos/` and set `NEXT_PUBLIC_SITE_ORIGIN=` (empty) — the app already resolves
> `/videos/...` against that origin and falls back to the API-provided poster frame.

---

## 2. Project structure

```
soulpath-holiday/
├─ public/
│  ├─ soulpath-logo.png          # original brand asset (used for OG/apple icon)
│  ├─ favicon.ico                # original favicon
│  └─ uploads/hero-poster.jpg    # optimised hero poster (LCP + preloader + video fallback)
├─ src/
│  ├─ app/                       # App Router — one folder per route
│  │  ├─ layout.js               # fonts, metadata, header, footer, preloader, JSON-LD
│  │  ├─ page.js                 # homepage
│  │  ├─ destinations/           # listing + [slug] detail
│  │  ├─ packages/               # listing + [slug] detail
│  │  ├─ offers/
│  │  ├─ blog/                   # listing + [slug] article
│  │  ├─ testimonials/
│  │  ├─ travel-guide/
│  │  ├─ travel-with-influencers/
│  │  ├─ corporate-tours/        # + CorporateForm
│  │  ├─ become-partner/         # + PartnerForm (franchise)
│  │  ├─ request-proposal/       # + ProposalForm
│  │  ├─ flights/                # search + /flights/search
│  │  ├─ checkout/[id]/
│  │  ├─ contact/                # + ContactForm
│  │  ├─ support/
│  │  ├─ login/ register/ forgot-password/
│  │  ├─ dashboard/              # account + saved destinations
│  │  ├─ about/ privacy/ terms/ refund/ hotels/ attractions/
│  │  ├─ not-found.js loading.js sitemap.js robots.js
│  ├─ components/                # Header, FullscreenMenu, Footer, Hero, SearchBar,
│  │                             # Preloader, FloatingActions, PackageCard, Testimonials…
│  ├─ lib/
│  │  ├─ config.js               # env, media resolver, nav, contact fallbacks
│  │  ├─ api.js                  # server data access + client API client + formatters
│  │  └─ content.js              # brand/business copy carried over from the live site
│  └─ styles/
│     ├─ globals.css             # design system: tokens, type, buttons, header, forms
│     ├─ home.css                # hero, search, editorial sections
│     └─ pages.css               # listing, detail, blog, auth, legal, forms
└─ docs/                         # AUDIT.md · REDESIGN-NOTES.md
```

---

## 3. What was preserved

Every page, route and integration from the live site is present and wired to the same endpoints:

- **Search** — flights (round trip / one way / multi-city, from, to, departure, return,
  travellers, cabin class, airport autocomplete via `/flights/airports`) and holiday packages
  (destination, style, duration, budget) → `/packages?destination=&category=&minDays=&maxDays=&price=`
  (identical query-parameter contract).
- **Destinations** — `/destinations`, `/destinations/[slug]`, region filters, search, highlights,
  360° tour link, save-to-account, related packages.
- **Packages** — `/packages` (filters + sort), `/packages/[slug]` (itinerary, inclusions/exclusions,
  add-ons, departure dates, TCS, PDF itinerary download, quote + WhatsApp actions).
- **Offers** — `/offers` with the original type filters (`seasonal`, `festival`, `honeymoon`,
  `group`, `early_bird`, `last_minute`) and the original empty state (the backend currently has no
  flagged offers).
- **Blog** — `/blog` categories + `/blog/[slug]` article pages.
- **Testimonials** — the six original reviews, verbatim, plus the 500+/4.9/50+ statistics.
- **Auth** — `/login` (`check-user` → password or OTP), `/register` (email OTP → verification token →
  profile), `/forgot-password` (OTP → reset), session in `localStorage['sp-token']`.
- **Forms** — contact (`POST /contact`), corporate (`POST /corporate-inquiries`), franchise
  (`POST /partner-applications`), proposal (`POST /proposal-requests`) with the original fields and
  validation rules.
- **Legal** — `/privacy`, `/terms`, `/refund` render the CMS policies from `/policies/:type`
  untouched (no clause rewritten).
- **Ask AI about SoulPath Holiday** — the original footer assistant block, with the same prefilled prompt and the same three assistants (ChatGPT, Perplexity, Gemini).
- **Business info** — address, phones, email, GSTIN/CIN/PAN, business hours, WhatsApp number and
  social links now come from `/site-settings` instead of being hardcoded.
- **SEO** — per-route metadata/canonicals, OpenGraph, `TravelAgency` JSON-LD, `sitemap.xml`,
  `robots.txt`, crawlable server-rendered content.

Full inventory, API map and bug list: [`docs/AUDIT.md`](docs/AUDIT.md).
Design system + implementation notes: [`docs/REDESIGN-NOTES.md`](docs/REDESIGN-NOTES.md).

---

## 4. Notable implementation details

- **Preloader** waits for the real hero poster (with an error path and a 2.8 s ceiling), shows once
  per session and never re-appears on client-side navigation. Skipped for `prefers-reduced-motion`.
- **Hero** uses the original `homepageHeroVideo` / `homepageHeroImage` from site settings; the poster
  is the base layer, the video fades in only when it can play, and the video is skipped on
  Save-Data / 2G / 3G connections.
- **Accessibility** — skip link, semantic landmarks, labelled inputs, focus-visible rings, keyboard
  trap + `Esc` in the menu, `aria-current` navigation, alt text on every image, reduced-motion
  support.
- **Performance** — server components with 120 s ISR, no client-side data waterfall for content
  pages, lazy-loaded imagery below the fold, one 103 kB shared JS bundle, no animation library.
