import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPackage, getPackages, getSiteSettings, packagePrice } from '@/lib/api';
import { mediaUrl, CONTACT_FALLBACK } from '@/lib/config';
import { PageHero, PackageCard, SectionHead } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import {
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Close,
  Download,
  MapPin,
  Users,
  Whatsapp,
} from '@/components/Icons';

export const revalidate = 120;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const pkg = await getPackage(slug);
  if (!pkg) return { title: 'Package not found' };
  const title = pkg.seoMeta?.title || pkg.title;
  const description = pkg.seoMeta?.description || pkg.description;
  return {
    title,
    description,
    alternates: { canonical: `/packages/${pkg.slug}` },
    openGraph: {
      title,
      description,
      images: pkg.heroImage ? [{ url: mediaUrl(pkg.heroImage) }] : undefined,
    },
  };
}

export default async function PackageDetail({ params }) {
  const { slug } = await params;
  const [pkg, all, settings] = await Promise.all([getPackage(slug), getPackages(), getSiteSettings()]);
  if (!pkg) notFound();

  const price = packagePrice(pkg);
  const itinerary = pkg.itinerary || [];
  const inclusions = pkg.inclusions || [];
  const exclusions = pkg.exclusions || [];
  const addOns = pkg.optionalAddOns || [];
  const gallery = pkg.gallery?.images || [];
  const wa = String(settings?.whatsappNumber || CONTACT_FALLBACK.whatsapp).replace(/\D/g, '');

  const related = all
    .filter((p) => p.slug !== pkg.slug && p.destination?.slug === pkg.destination?.slug)
    .slice(0, 3);
  const fallbackRelated = all.filter((p) => p.slug !== pkg.slug).slice(0, 3);
  const relatedList = related.length ? related : fallbackRelated;

  const waText = encodeURIComponent(
    `Hi SoulPath Holiday, I'm interested in the "${pkg.title}" package${
      pkg.duration ? ` (${pkg.duration.nights}N/${pkg.duration.days}D)` : ''
    }. Could you share more details?`
  );

  return (
    <>
      <PageHero
        eyebrow={pkg.category || 'Tour package'}
        title={pkg.title}
        sub={pkg.description}
        image={pkg.heroImage}
        video={pkg.heroVideo}
        crumbs={[
          { label: 'Packages', href: '/packages' },
          ...(pkg.destination
            ? [{ label: pkg.destination.name, href: `/destinations/${pkg.destination.slug}` }]
            : []),
          { label: pkg.title },
        ]}
      >
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.6rem', fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {pkg.duration && (
            <span>
              <Clock size={13} style={{ display: 'inline', verticalAlign: '-2px' }} />{' '}
              {pkg.duration.nights}N / {pkg.duration.days}D
            </span>
          )}
          {pkg.destination?.name && (
            <span>
              <MapPin size={13} style={{ display: 'inline', verticalAlign: '-2px' }} />{' '}
              {pkg.destination.name}
            </span>
          )}
          {pkg.maxGroupSize ? (
            <span>
              <Users size={13} style={{ display: 'inline', verticalAlign: '-2px' }} /> Max{' '}
              {pkg.maxGroupSize} guests
            </span>
          ) : null}
        </div>
      </PageHero>

      <section className="section" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="container">
          <div className="detail">
            <div className="detail__main">
              <Reveal className="detail__block">
                <h2>About this journey</h2>
                <p>{pkg.description}</p>
              </Reveal>

              {(inclusions.length > 0 || exclusions.length > 0) && (
                <Reveal className="detail__block">
                  <h2>What&apos;s included</h2>
                  <div className="inclusion-grid">
                    {inclusions.length > 0 && (
                      <ul className="inclusion-list">
                        {inclusions.map((item) => (
                          <li key={item}>
                            <Check size={14} /> {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    {exclusions.length > 0 && (
                      <ul className="inclusion-list inclusion-list--excl">
                        {exclusions.map((item) => (
                          <li key={item}>
                            <Close size={13} /> {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              )}

              {itinerary.length > 0 && (
                <Reveal className="detail__block">
                  <h2>Day-by-day itinerary</h2>
                  <div className="itinerary">
                    {itinerary.map((day) => (
                      <article className="itin-day" key={day._id || day.day}>
                        <div className="itin-day__num">
                          Day <b>{String(day.day).padStart(2, '0')}</b>
                        </div>
                        <div>
                          <h3>{day.title}</h3>
                          {day.description && <p>{day.description}</p>}
                          {day.image && (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={mediaUrl(day.image)} alt={day.title} loading="lazy" />
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </Reveal>
              )}

              {addOns.length > 0 && (
                <Reveal className="detail__block">
                  <h2>Optional add-ons</h2>
                  <ul className="inclusion-list">
                    {addOns.map((a, i) => (
                      <li key={i}>
                        <Check size={14} /> {a.name || a.title || a}{' '}
                        {a.price ? `— ₹${Number(a.price).toLocaleString('en-IN')}` : ''}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              {gallery.length > 0 && (
                <Reveal className="detail__block">
                  <h2>Gallery</h2>
                  <div className="gallery-strip">
                    {gallery.slice(0, 8).map((src, i) => (
                      <figure key={i}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={mediaUrl(src)} alt={`${pkg.title} ${i + 1}`} loading="lazy" />
                      </figure>
                    ))}
                  </div>
                </Reveal>
              )}
            </div>

            <aside className="detail__aside">
              <div className="booking-card">
                <div className="booking-card__price">
                  <small>{price.custom ? 'Tailor-made' : 'Starting from'}</small>
                  {price.text}
                  {price.strike && (
                    <s style={{ fontSize: '1rem', color: '#9a9a90', marginLeft: '0.5rem' }}>
                      {price.strike}
                    </s>
                  )}
                </div>

                <div className="booking-card__meta">
                  {pkg.duration && (
                    <div>
                      <span>Duration</span>
                      <b>
                        {pkg.duration.nights}N / {pkg.duration.days}D
                      </b>
                    </div>
                  )}
                  {pkg.destination?.name && (
                    <div>
                      <span>Destination</span>
                      <b>{pkg.destination.name}</b>
                    </div>
                  )}
                  {pkg.difficulty && (
                    <div>
                      <span>Pace</span>
                      <b>{pkg.difficulty}</b>
                    </div>
                  )}
                  {pkg.departureDates?.length ? (
                    <div>
                      <span>Departures</span>
                      <b>{pkg.departureDates.length} dates</b>
                    </div>
                  ) : null}
                  {pkg.pricing?.tcsApplicable ? (
                    <div>
                      <span>TCS</span>
                      <b>{pkg.pricing.tcsPercent}% (as applicable)</b>
                    </div>
                  ) : null}
                </div>

                <div className="booking-card__actions">
                  <Link href={`/request-proposal?package=${pkg.slug}`} className="btn btn--dark">
                    Request a quote <ArrowRight size={14} />
                  </Link>
                  <a
                    href={`https://wa.me/${wa}?text=${waText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--outline"
                  >
                    <Whatsapp size={15} /> Ask on WhatsApp
                  </a>
                  {pkg.itineraryPdf && (
                    <a
                      href={mediaUrl(pkg.itineraryPdf)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--outline"
                    >
                      <Download size={15} /> Detailed itinerary (PDF)
                    </a>
                  )}
                </div>

                <p className="booking-card__note">
                  Prices are per person on twin sharing, subject to availability at the time of
                  confirmation. No payment is taken online — our travel team confirms every booking
                  personally.
                </p>
              </div>

              {pkg.departureDates?.length > 0 && (
                <div className="booking-card">
                  <span className="eyebrow eyebrow--plain">Fixed departures</span>
                  <div className="booking-card__meta" style={{ borderTop: 0, paddingTop: 0 }}>
                    {pkg.departureDates.slice(0, 6).map((d, i) => (
                      <div key={i}>
                        <span>
                          <Calendar size={13} style={{ display: 'inline', verticalAlign: '-2px' }} />{' '}
                          {typeof d === 'string' ? d : d.date || d.startDate}
                        </span>
                        <b>{d.seats ? `${d.seats} seats` : 'Enquire'}</b>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {relatedList.length > 0 && (
        <section className="section section--cream">
          <div className="container">
            <SectionHead
              eyebrow="You may also like"
              title="More journeys like this"
              action={{ href: '/packages', label: 'All packages' }}
            />
            <div className="pkg-grid">
              {relatedList.map((p, i) => (
                <PackageCard key={p._id} pkg={p} delay={i * 60} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
