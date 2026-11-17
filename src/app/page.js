import Link from 'next/link';
import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import TestimonialsShowcase from '@/components/TestimonialsShowcase';
import QuickInquiry from '@/components/QuickInquiry';
import { Reveal, Counter } from '@/components/Reveal';
import { DestTile, PackageCard } from '@/components/ui';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Download,
  Globe,
  Headset,
  Sparkle,
  Star,
} from '@/components/Icons';
import { getDestinations, getPackages, getPosts, getSiteSettings } from '@/lib/api';
import { mediaUrl } from '@/lib/config';
import { BENEFITS, BRAND, JOURNEY_STEPS } from '@/lib/content';

export const revalidate = 120;

export const metadata = {
  title: 'SoulPath Holiday | Journeys that stay with you',
  description:
    'Handcrafted international holidays to 50+ destinations from Ahmedabad — flights, hotels, transfers and personal travel design. Not just a holiday, a journey that stays with you.',
  alternates: { canonical: '/' },
};

const BENEFIT_ICONS = { sparkle: Sparkle, headset: Headset, globe: Globe, tag: Star };

const MARQUEE = [
  'Holidays',
  'Flights',
  'Hotels',
  'Transfers',
  'Experiences',
  'Corporate tours',
  'Influencer trips',
];

export default async function HomePage() {
  const [settings, destinations, featured, posts] = await Promise.all([
    getSiteSettings(),
    getDestinations(),
    getPackages('featured=true'),
    getPosts(),
  ]);

  const packages = (featured.length ? featured : await getPackages()).slice(0, 6);
  const heroDest = destinations.find((d) => d.featured) || destinations[0];
  const ordered = heroDest
    ? [heroDest, ...destinations.filter((d) => d._id !== heroDest._id)]
    : destinations;

  const img = (i) => mediaUrl(ordered[i % Math.max(ordered.length, 1)]?.heroImage);

  /* ---- D · services showcase — the reference's alternating feature cards ---- */
  const services = [
    {
      kicker: 'Holiday packages',
      title: 'Journeys, designed',
      desc:
        'Curated international itineraries to 50+ destinations — priced transparently, with adult, child and infant fares shown up front.',
      href: '/packages',
      image: img(0),
      cta: 'Find your holiday',
    },
    {
      kicker: 'Flights',
      title: 'Every route, sorted',
      desc:
        'Live fares across carriers with cabin-class comparisons, alternate departure airports and instant seat holds.',
      href: '/flights',
      image: img(1),
      cta: 'Search flights',
    },
    {
      kicker: 'Hotels & stays',
      title: 'Rooms worth waking up in',
      desc:
        'Hand-picked hotels and villas we have actually inspected — breakfast, transfers and early check-in negotiated for you.',
      href: '/hotels',
      image: img(2),
      cta: 'Browse stays',
    },
    {
      kicker: 'Travel with influencers',
      title: 'Same trip, better company',
      desc:
        'Join curated departures hosted by creators on the exact same dates, the exact same package — no markup.',
      href: '/travel-with-influencers',
      image: img(3),
      cta: 'See hosted trips',
    },
    {
      kicker: 'Corporate tours',
      title: 'Offsites that land',
      desc:
        'Incentive travel, MICE and team retreats planned end to end — one coordinator, one invoice, zero surprises.',
      href: '/corporate-tours',
      image: img(4),
      cta: 'Plan an offsite',
    },
    {
      kicker: 'Franchise partner',
      title: 'Grow with SoulPath',
      desc: 'Bring a 2021-born travel brand to your city with our booking engine and back office behind you.',
      href: '/become-partner',
      image: img(5),
      cta: 'Partner with us',
    },
  ];

  const inspiration = posts.slice(0, 4);
  const featurePost = inspiration[0];
  const listPosts = inspiration.slice(1);

  return (
    <>
      {/* ============================ A · HERO ============================ */}
      <Hero settings={settings} destinations={destinations} />

      {/* ===================== B · TRUST / CREDENTIAL STRIP ================ */}
      <section className="intro section--tight" id="discover">
        <div className="container">
          <div className="credentials">
            <span className="credentials__label">Why travellers choose us</span>
            <div className="credentials__row">
              <span className="credentials__item">
                <Sparkle size={18} />
                <b>Since {BRAND.since}</b>
              </span>
              <span className="credentials__item">
                <Globe size={18} />
                <b>{destinations.length || 50}+</b> destinations
              </span>
              <span className="credentials__item">
                <Check size={18} />
                24/7 on-trip support
              </span>
              <span className="credentials__item">
                <Check size={18} />
                Custom itineraries
              </span>
              <a
                className="credentials__item"
                href="https://play.google.com/store/apps/details?id=com.soulpathholiday.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={18} />
                SoulPath app
              </a>
            </div>
          </div>

          {/* search — the real booking interface, kept up front */}
          <div className="search-strip__head" style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <div>
              <h2 className="h2">Where shall we</h2>
              <p className="script script--md">
                take you next?
              </p>
            </div>
            <div className="cta-row--left" style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <Link href="/offers" className="btn btn--outline">
                Seasonal offers
              </Link>
              <Link href="/request-proposal" className="btn btn--solid btn--w-icon">
                Plan my trip
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <SearchBar destinations={destinations} />
        </div>
      </section>

      {/* ================= C · LARGE EDITORIAL BRAND MESSAGE =============== */}
      <section className="editorial">
        <svg
          className="editorial__leaf" data-parallax="-60"
          viewBox="0 0 400 400"
          aria-hidden="true"
          fill="none"
          stroke="var(--c-secondary)"
          strokeWidth="1"
          opacity=".6"
        >
          <path d="M200 20C120 90 80 190 120 300c40-100 90-150 160-190-70 60-110 140-120 250" />
          <path d="M320 40C260 120 220 210 230 320" />
          <path d="M90 60C60 150 60 250 90 350" />
        </svg>

        <div className="container editorial__inner">
          <Reveal>
            <h2>Not just a holiday</h2>
            <p className="script script--xl">a journey that stays with you</p>
          </Reveal>
          <Reveal delay={120}>
            <p className="editorial__note">
              We are a small, obsessive team in Ahmedabad who believe the best trips are designed
              around people, not around a brochure. Tell us how you like to travel and we will build
              the rest — flights, stays, transfers, tables, guides and the quiet corners nobody
              photographs.
            </p>
          </Reveal>
        </div>
      </section>

      {/* --------------------------- marquee --------------------------- */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track" data-marquee data-marquee-speed="4">
          {[0, 1].map((k) => (
            <span key={k} style={{ display: 'inline-flex', gap: '2.2rem' }}>
              <span className="marquee__item marquee__item--script">go further with</span>
              {MARQUEE.map((m) => (
                <span className="marquee__item" key={`${k}-${m}`}>
                  {m}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ==================== D · SERVICES SHOWCASE ======================= */}
      <section className="section services" id="services">
        <div className="container">
          <div className="section-head">
            <span className="label--cursive">Discover our</span>
            <h2 className="h2">Travel services</h2>
            <p className="lede" style={{ maxWidth: '44rem' }}>
              Everything a journey needs, built by people who have done the journey. Pick a service
              or hand us the whole thing.
            </p>
          </div>

          <div className="feature-cards">
            {services.map((s, i) => (
              <Reveal key={s.title} className="feature-card" delay={i * 70}>
                <span className="feature-card__bg" aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.image} alt="" loading="lazy" decoding="async" />
                </span>
                <div className="feature-card__body">
                  <span className="feature-card__kicker">{s.kicker}</span>
                  <h3 className="feature-card__title">{s.title}</h3>
                  <p className="feature-card__desc">{s.desc}</p>
                  <Link href={s.href} className="feature-card__link">
                    {s.cta} <ArrowUpRight size={12} style={{ display: 'inline' }} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------ need help band ------------------------ */}
      <section className="section section--tight">
        <div className="container">
          <Reveal className="trust-row" style={{ borderTop: '1px solid var(--c-hr)' }}>
            <div className="trust-row__copy">
              <span className="trust-row__kicker">Need help?</span>
              <h3>Speak to our team of</h3>
              <h3 className="cursive">travel experts</h3>
              <p>
                Real people in Ahmedabad, Monday to Saturday, 10:00 – 18:30 IST. Call, WhatsApp or
                ask for a written proposal — no call-centre scripts.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                <Link href="/contact" className="btn btn--solid btn--w-icon">
                  Get a quote
                  <ArrowRight size={14} />
                </Link>
                <a
                  href={`https://wa.me/${settings?.whatsappNumber || '919898211063'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline"
                >
                  WhatsApp us
                </a>
              </div>
            </div>
            <div className="trust-row__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img data-parallax="-110" src={img(2)} alt="SoulPath travel experts on the road" loading="lazy" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ======================== E · DESTINATIONS ======================== */}
      <section className="section" id="destinations">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <span className="label--cursive">Find your place</span>
              <h2 className="h2">Destinations</h2>
            </div>
            <div className="cta-row--left" style={{ display: 'flex', gap: '0.6rem' }}>
              <Link href="/destinations" className="btn btn--link btn">
                All {destinations.length} destinations <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {destinations.length > 0 ? (
            <div className="dest-grid">
              {ordered.slice(0, 7).map((d, i) => (
                <DestTile
                  key={d._id}
                  destination={d}
                  size={i === 0 ? 'hero' : i === 1 || i === 2 ? 'tall' : 'default'}
                  delay={i * 60}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3 className="h3">Destinations are on their way</h3>
              <p>Our destination list could not load just now — please try again shortly.</p>
            </div>
          )}
        </div>
      </section>

      {/* ====================== F · POPULAR PACKAGES ====================== */}
      <section className="section section--cream" id="packages">
        <div className="container">
          <div className="section-head">
            <span className="label--cursive">Popular right now</span>
            <h2 className="h2">Holiday packages</h2>
            <p className="lede" style={{ maxWidth: '44rem' }}>
              Transparent, itemised pricing — adult, child and infant fares shown separately, with
              every inclusion listed before you commit.
            </p>
          </div>

          {packages.length > 0 ? (
            <>
              <div className="pkg-grid">
                {packages.map((pkg, i) => (
                  <PackageCard key={pkg._id} pkg={pkg} delay={i * 60} />
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
                <Link href="/packages" className="btn btn--solid btn--w-icon">
                  All packages
                  <ArrowRight size={14} />
                </Link>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <h3 className="h3">Packages are loading</h3>
              <p>We could not reach our package list just now — try again in a moment.</p>
              <Link href="/contact" className="btn btn--outline">
                Ask for a custom quote
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ==================== G · THE SOULPATH EXPERIENCE ================= */}
      <section className="section experience" id="experience" style={{ position: 'relative' }}>
        <span className="plane-shadow-wrap" aria-hidden="true"><span className="plane-shadow" data-plane /></span>
        <div className="container">
          <div className="section-head">
            <span className="label--cursive">the SoulPath feeling</span>
            <h2 className="h2">Why travellers stay with us</h2>
          </div>

          <Reveal className="trust-row">
            <div className="trust-row__copy">
              <span className="trust-row__kicker">01 — the dream team</span>
              <h3>Planned by people who</h3>
              <h3 className="cursive">have been there</h3>
              <p>
                Every itinerary is drawn by a specialist who has walked the streets, eaten at the
                restaurants and knows which room has the better view.
              </p>
              <div className="pills">
                <span className="pill">Trustworthy</span>
                <span className="pill">Reliable</span>
                <span className="pill">Personal</span>
              </div>
            </div>
            <div className="trust-row__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img data-parallax="-160" src={img(1)} alt="Planning a SoulPath itinerary" loading="lazy" />
            </div>
          </Reveal>

          <Reveal className="trust-row trust-row--flip">
            <div className="trust-row__copy">
              <span className="trust-row__kicker">02 — yours faithfully</span>
              <h3>Three steps to your</h3>
              <h3 className="cursive">next chapter</h3>
              <div style={{ display: 'grid', gap: '0.9rem' }}>
                {JOURNEY_STEPS.map((step) => (
                  <div key={step.step} style={{ display: 'flex', gap: '0.9rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--ff-cursive)',
                        fontSize: 'var(--font-36-24)',
                        lineHeight: 1,
                        color: 'var(--c-secondary)',
                        minWidth: '1.6em',
                      }}
                    >
                      {step.step}
                    </span>
                    <div>
                      <h4 style={{ fontSize: 'var(--font-24-19)' }}>{step.title}</h4>
                      <p className="small" style={{ opacity: 0.85 }}>
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="trust-row__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img data-parallax="-70" src={img(3)} alt="A SoulPath journey in progress" loading="lazy" />
            </div>
          </Reveal>

          <Reveal className="trust-row">
            <div className="trust-row__copy">
              <span className="trust-row__kicker">03 — the SoulPath feeling</span>
              <h3>Details you notice</h3>
              <h3 className="cursive">long after you're home</h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(11rem, 1fr))',
                  gap: '1.4rem',
                  width: '100%',
                }}
              >
                {BENEFITS.map((b) => {
                  const Icon = BENEFIT_ICONS[b.icon] || Sparkle;
                  return (
                    <div key={b.title} style={{ display: 'grid', gap: '0.35rem' }}>
                      <Icon size={20} style={{ color: 'var(--c-bg-dark)' }} />
                      <h4 style={{ fontSize: 'var(--font-18-15)' }}>{b.title}</h4>
                      <p className="small" style={{ opacity: 0.85 }}>
                        {b.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="trust-row__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img data-parallax="-120" src={img(4)} alt="A detail from a SoulPath holiday" loading="lazy" />
            </div>
          </Reveal>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 'clamp(1.5rem, 6vw, 5rem)',
              paddingTop: 'clamp(2rem, 4vw, 3.5rem)',
              borderTop: '1px solid var(--c-hr)',
              textAlign: 'center',
            }}
          >
            {[
              { value: 50, suffix: '+', label: 'Destinations' },
              { value: 500, suffix: '+', label: 'Happy travellers' },
              { value: 24, suffix: '/7', label: 'On-trip support' },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: 'var(--ff-display)',
                    fontSize: 'var(--font-70-36)',
                    lineHeight: 1,
                    color: 'var(--c-primary)',
                  }}
                >
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <span className="label" style={{ opacity: 0.8 }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== H · TRAVEL INSPIRATION ===================== */}
      {featurePost && (
        <section className="section section--cream" id="inspiration">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <span className="label--cursive">the journal</span>
                <h2 className="h2">Travel inspiration</h2>
              </div>
              <Link href="/blog" className="btn btn--link btn">
                All stories <ArrowRight size={13} />
              </Link>
            </div>

            <div className="inspiration">
              <Link href={`/blog/${featurePost.slug}`} className="inspire-feature">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img data-parallax="-80" src={mediaUrl(featurePost.heroImage)} alt={featurePost.title} loading="lazy" />
                <div className="inspire-feature__body">
                  <span className="kicker">{featurePost.category || 'Featured story'}</span>
                  <h3>{featurePost.title}</h3>
                  <p>{featurePost.excerpt}</p>
                </div>
              </Link>

              <div className="inspire-list">
                {listPosts.map((post) => (
                  <Link key={post._id} href={`/blog/${post.slug}`} className="inspire-item">
                    <span className="inspire-item__media">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={mediaUrl(post.heroImage)} alt="" loading="lazy" />
                    </span>
                    <span>
                      <h4>{post.title}</h4>
                      <span>
                        {post.category || 'Journal'}
                        {post.readTime ? ` · ${post.readTime} min read` : ''}
                      </span>
                    </span>
                  </Link>
                ))}
                {listPosts.length === 0 && (
                  <p className="small muted">
                    New stories are being written — meanwhile, browse the{' '}
                    <Link href="/travel-guide" style={{ textDecoration: 'underline' }}>
                      travel guides
                    </Link>
                    .
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ======================== I · TESTIMONIALS ======================== */}
      <TestimonialsShowcase />

      {/* ========================= J · INQUIRY =========================== */}
      <section className="inquiry" id="enquire">
        <div className="container inquiry__grid">
          <div className="inquiry__copy">
            <span className="label--cursive">ready when you are</span>
            <h2>Tell us where</h2>
            <h2 className="cursive">you'd rather be</h2>
            <p>
              Share a few details and one of our travel designers will come back with a considered
              plan — not a template. No obligation, no spam.
            </p>
            <ul className="inquiry__points">
              <li>
                <Check size={16} /> Reply within one business day
              </li>
              <li>
                <Check size={16} /> Itemised, transparent pricing
              </li>
              <li>
                <Check size={16} /> Real people on WhatsApp before, during and after the trip
              </li>
            </ul>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.6rem' }}>
              <a href="tel:+919898211063" className="btn btn--outline">
                +91 98982 11063
              </a>
              <Link href="/contact" className="btn--link btn">
                All contact options <ArrowUpRight size={12} />
              </Link>
            </div>
          </div>

          <div className="inquiry__panel">
            <QuickInquiry />
          </div>
        </div>
      </section>
    </>
  );
}
