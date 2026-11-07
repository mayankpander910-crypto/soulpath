# SoulPath Holiday — Editorial UI (React + Vite)

A complete front-end rebuild of **soulpathholiday.com**, restyled in the visual language of
**waldhaus-sils.ch** — huge transitional-serif headlines on white, hairline rules, forest-green
pill buttons, vertical edge rails and quiet, image-led cards.

All copy, prices, itineraries, images, creators and contact details are the **original content**
from the live SoulPath Holiday site. Nothing was rewritten.

---

## Stack

| Layer      | Choice                                   |
| ---------- | ---------------------------------------- |
| Framework  | React 18 + Vite 5                        |
| Routing    | react-router-dom v6 (client-side SPA)    |
| Styling    | Plain CSS with design tokens (no UI kit) |
| Type       | Self-hosted Playfair Display + Inter     |
| Icons      | Inline SVG (no icon library)             |

No CSS framework is used on purpose — the layout is editorial and relies on precise type scale,
grid and hairline rules rather than utility classes. Everything is component-scoped: each
component owns a small `.css` file next to it, global concerns live in `src/styles`.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
npm run preview  # serve the build
```

> The app is a SPA. When deploying, point all routes to `index.html`
> (a `_redirects` file for Netlify is included in `public/`).

---

## Project structure

```
src/
├── main.jsx                  # React entry + router
├── App.jsx                   # Route table
├── styles/
│   ├── base.css              # reset, typography, layout helpers, reveal animation
│   ├── tokens.css            # colour / type / spacing tokens (single source of truth)
│   └── fonts.css             # @font-face for the self-hosted typefaces
├── data/                     # ← all content lives here (edit these, not the JSX)
│   ├── packages.js           # 21 packages incl. day-by-day itineraries
│   ├── destinations.js       # 10 destinations
│   ├── content.js            # influencers, testimonials, journey steps, values
│   └── site.js               # nav, footer links, contact details, announcement
├── components/
│   ├── layout/               # Header, AnnouncementBar, SideRails, MenuOverlay, Footer, UtilityDock
│   ├── ui/                   # Button, Arrow, SectionHead, PageHeader, Carousel, Field, SearchWidget
│   └── cards/                # DestinationCard, PackageCard, InfluencerCard, QuoteCard
├── sections/                 # homepage sections (Hero, Intro, Destinations, Influencers, …)
├── pages/                    # one file per route + pages.css shared styles
└── hooks/                    # useReveal, useScrolled, useBodyLock, useCarousel, useDocumentTitle
public/assets/
├── images/                   # all photography pulled from your live site
├── images/influencers/       # creator portraits
├── video/                    # optimised hero video (webm + mp4) and poster
├── fonts/                    # woff2 subsets
└── logo.png, app-store.svg, google-play.svg
```

### Why the data is separated

Every page renders from `src/data`. To change a price, add a package, swap a testimonial or a
phone number you edit one object — no JSX changes required. The package objects are shaped like:

```js
{
  slug, title, country, duration, overview,
  included: [...], notIncluded: [...],
  itinerary: [{ day, title, items: [...] }],
  price, priceOld, image, category, popular
}
```

---

## Design system

Tokens are defined once in `src/styles/tokens.css`:

```css
--forest: #1e5e42;      /* primary green (pills, links, highlights)   */
--forest-deep: #0e412b; /* announcement bar, account panel           */
--ink: #101211;         /* body text                                 */
--grey: #5e6266;        /* secondary copy                            */
--line: #d4dae0;        /* hairline rules                            */
--paper-warm: #f7f6f3;  /* tinted sections                           */
```

Typography:

- `--font-display` — **Playfair Display** (uppercase, tight leading) for every headline
- `--font-sans` — **Inter** 300/400/500 for body, labels and buttons
- `.label` — 11 px, 500 weight, `0.16em` tracking, uppercase (used everywhere for eyebrows,
  meta rows, badges and pill buttons)

Reusable primitives:

| Class / component      | Purpose                                                  |
| ---------------------- | -------------------------------------------------------- |
| `.display--xl/lg/md/sm`| Serif headline scale                                     |
| `.shell`               | Max-width + responsive gutter wrapper                    |
| `.section`             | Vertical rhythm                                          |
| `SectionHead`          | Huge title left / support copy right                     |
| `PageHeader`           | Interior page opener with breadcrumb                     |
| `Button`               | solid, outline, light, outline-light, ghost              |
| `Carousel`             | Scroll-snap rail with progress line + arrow controls     |
| `[data-reveal]`        | IntersectionObserver fade-up (respects reduced motion)   |

---

## Routes

| Route                        | Page                                             |
| ---------------------------- | ------------------------------------------------ |
| `/`                          | Home                                             |
| `/destinations`              | All destinations + region filter                 |
| `/packages`                  | All 21 packages + travel-style filter            |
| `/packages/:slug`            | Package detail (overview, inclusions, itinerary) |
| `/travel-with-influencers`   | Creator roster                                   |
| `/offers`                    | Offers (empty state + concierge strip)           |
| `/testimonials`              | Reviews + stats band                             |
| `/about`                     | Story + core values                              |
| `/contact`                   | Contact details + inquiry form                   |
| `*`                          | 404                                              |

---

## What changed vs. the old site

1. **Type-led layout** — every section now opens with a serif headline and supporting copy instead
   of bold gradient headings.
2. **Waldhaus chrome** — hairline header with centred wordmark, pill actions, dismissible green
   announcement bar, vertical MENU/CONTACT rails, full-screen menu overlay.
3. **Cards** — 4:5 imagery, tiny uppercase meta, hairline footer with price + arrow link.
4. **Rhythm** — generous whitespace, hairline dividers, alternating white / warm-white sections.
5. **Interaction** — scroll-snap carousels, accordion steps, hover reveals, scroll fade-ins.
6. **Accessibility** — skip link, focus-visible rings, ARIA roles on tabs/carousels/dialogs,
   `prefers-reduced-motion` support, keyboard-dismissable overlay.
7. **Performance** — hero video re-encoded from 34 MB → 3.2 MB (mp4) / 5.7 MB (webm) with a poster
   fallback, lazy-loaded imagery, self-hosted fonts (no external CDN calls).

---

## Notes / next steps

- The search widget, newsletter, inquiry form and "Proceed to Booking" buttons are presentational;
  wire them to your booking engine / CRM / newsletter provider.
- `Download Itinerary` points at a placeholder — attach your PDFs per package.
- Legal links currently point to the live site's privacy/terms pages; move them in-house when ready.
- App Store / Google Play badges link to `#` until store URLs are available.
