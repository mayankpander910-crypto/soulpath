import Link from 'next/link';
import { getPackages, packagePrice } from '@/lib/api';
import { mediaUrl } from '@/lib/config';
import { PageHero, SectionHead } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { ArrowRight, Calendar, Sparkle } from '@/components/Icons';

export const revalidate = 120;

export const metadata = {
  title: 'Special Offers & Deals',
  description:
    'Irresistible travel deals from SoulPath Holiday — seasonal, festival, honeymoon, group, early-bird and last-minute offers on our most popular destinations.',
  alternates: { canonical: '/offers' },
};

const TYPES = [
  { value: 'all', label: 'All Offers' },
  { value: 'seasonal', label: 'Seasonal' },
  { value: 'festival', label: 'Festival' },
  { value: 'honeymoon', label: 'Honeymoon' },
  { value: 'group', label: 'Group' },
  { value: 'early_bird', label: 'Early Bird' },
  { value: 'last_minute', label: 'Last Minute' },
];

const toType = (pkg) =>
  String(pkg.offerTag || pkg.category || '')
    .toLowerCase()
    .replace(/\s+/g, '_');

export default async function OffersPage({ searchParams }) {
  const sp = await searchParams;
  const type = (Array.isArray(sp.type) ? sp.type[0] : sp.type) || 'all';
  const packages = await getPackages();

  // Offers are packages flagged as offers by the existing backend
  const offers = packages.filter(
    (p) =>
      p.isOffer ||
      p.hasOffer ||
      (p.pricing?.offerPrice && p.pricing.offerPrice > 0) ||
      p.offerTag
  );

  const filtered = type === 'all' ? offers : offers.filter((p) => toType(p) === type);

  return (
    <>
      <PageHero
        eyebrow="Exclusive deals"
        title="Irresistible travel deals"
        sub="Handpicked offers on our most popular destinations. Book your dream vacation now before these limited-time packages are gone!"
        image={offers[0]?.heroImage || packages[0]?.heroImage}
        crumbs={[{ label: 'Offers' }]}
      />

      <section className="section" style={{ paddingTop: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
        <div className="container">
          <div className="toolbar">
            <div className="toolbar__group pills" role="group" aria-label="Filter offers by type">
              {TYPES.map((t) => (
                <Link
                  key={t.value}
                  href={t.value === 'all' ? '/offers' : `/offers?type=${t.value}`}
                  className={`pill${type === t.value ? ' is-active' : ''}`}
                  aria-current={type === t.value ? 'page' : undefined}
                >
                  {t.label}
                </Link>
              ))}
            </div>
            <span className="toolbar__count">
              {filtered.length} {filtered.length === 1 ? 'offer' : 'offers'}
            </span>
          </div>

          {filtered.length === 0 ? (
            <Reveal>
              <div className="empty-state">
                <Sparkle size={22} style={{ color: 'var(--brown)' }} />
                <h3 className="h3">No offers right now</h3>
                <p className="lede" style={{ textAlign: 'center', maxWidth: '52ch' }}>
                  Our travel experts are currently cooking up some amazing new deals. Check back soon
                  or browse our regular packages!
                </p>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Link href="/packages" className="btn btn--dark">
                    Browse all packages <ArrowRight size={14} />
                  </Link>
                  <Link href="/request-proposal" className="btn btn--outline">
                    Request custom quote
                  </Link>
                </div>
              </div>
            </Reveal>
          ) : (
            <div className="split-list">
              {filtered.map((pkg, i) => {
                const price = packagePrice(pkg);
                return (
                  <Reveal key={pkg._id} className="offer-card" delay={i * 60}>
                    <div className="offer-card__media">
                      <Link href={`/packages/${pkg.slug}`} aria-label={pkg.title}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={mediaUrl(pkg.heroImage)} alt={pkg.title} loading="lazy" />
                      </Link>
                      {pkg.offerTag && <span className="offer-card__badge">{pkg.offerTag}</span>}
                    </div>
                    <div className="offer-card__body">
                      <span className="eyebrow eyebrow--plain">{pkg.category || 'Special offer'}</span>
                      <h3>
                        <Link href={`/packages/${pkg.slug}`}>{pkg.title}</Link>
                      </h3>
                      <p>{pkg.description}</p>
                      <div className="pkg-card__meta">
                        {pkg.duration && (
                          <span>
                            {pkg.duration.nights}N / {pkg.duration.days}D
                          </span>
                        )}
                        {pkg.destination?.name && <span>{pkg.destination.name}</span>}
                      </div>
                      <div className="offer-card__price">
                        {price.text}
                        {price.strike && <s>{price.strike}</s>}
                      </div>
                      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                        <Link href={`/packages/${pkg.slug}`} className="btn btn--dark btn--sm">
                          View offer
                        </Link>
                        <Link href={`/request-proposal?package=${pkg.slug}`} className="btn btn--outline btn--sm">
                          Request quote
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}

          <Reveal
            style={{
              marginTop: 'clamp(2rem, 4vw, 3rem)',
              padding: 'clamp(1.4rem, 3vw, 2.4rem)',
              background: 'var(--cream)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.2rem',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ maxWidth: '52ch' }}>
              <h3 className="h3">Can&apos;t find the perfect deal?</h3>
              <p className="small muted" style={{ marginTop: '0.5rem' }}>
                Let our travel concierge create a custom itinerary with exclusive, unpublished pricing
                just for you and your group.
              </p>
            </div>
            <Link href="/request-proposal" className="btn btn--dark">
              Request custom quote <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
