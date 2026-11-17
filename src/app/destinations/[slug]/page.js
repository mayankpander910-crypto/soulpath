import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDestination, getPackages } from '@/lib/api';
import { mediaUrl } from '@/lib/config';
import { PageHero, PackageCard, SectionHead } from '@/components/ui';
import SaveDestinationButton from '@/components/SaveDestinationButton';
import { Reveal } from '@/components/Reveal';
import { ArrowRight, ArrowUpRight, Calendar, Globe, Sparkle } from '@/components/Icons';

export const revalidate = 120;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const destination = await getDestination(slug);
  if (!destination) return { title: 'Destination not found' };
  const title = destination.seoMeta?.title || `${destination.name} Holiday Packages`;
  const description =
    destination.seoMeta?.description ||
    destination.description ||
    `Curated ${destination.name} holidays with SoulPath Holiday.`;
  return {
    title,
    description,
    alternates: { canonical: `/destinations/${destination.slug}` },
    openGraph: {
      title,
      description,
      images: destination.heroImage ? [{ url: mediaUrl(destination.heroImage) }] : undefined,
    },
  };
}

export default async function DestinationDetail({ params }) {
  const { slug } = await params;
  const destination = await getDestination(slug);
  if (!destination) notFound();

  const allPackages = await getPackages();
  const packages = allPackages.filter(
    (p) =>
      p.destination?.slug === destination.slug ||
      p.destination?._id === destination._id ||
      p.destination?.name === destination.name
  );

  const highlights = destination.highlights || [];
  const gallery = destination.gallery?.images?.length
    ? destination.gallery.images
    : [destination.heroImage].filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow={destination.region || destination.country}
        title={destination.name}
        sub={destination.shortDescription || destination.description}
        image={destination.heroImage}
        video={destination.heroVideo}
        crumbs={[{ label: 'Destinations', href: '/destinations' }, { label: destination.name }]}
      >
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.6rem' }}>
          <Link href={`/request-proposal?destination=${destination.slug}`} className="btn btn--light">
            Plan this trip <ArrowRight size={14} />
          </Link>
          <SaveDestinationButton destinationId={destination._id} label="Save destination" />
          {destination.vrTourUrl && (
            <a
              href={destination.vrTourUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost-light"
            >
              360° virtual tour <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </PageHero>

      <section className="section" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="container">
          <div className="detail">
            <div className="detail__main">
              <Reveal className="detail__block">
                <h2>Why {destination.name}</h2>
                <p>{destination.description}</p>
              </Reveal>

              {highlights.length > 0 && (
                <Reveal className="detail__block">
                  <h2>Highlights</h2>
                  <ul className="inclusion-list" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    {highlights.map((h) => (
                      <li key={h}>
                        <Sparkle size={14} /> {h}
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
                        <img src={mediaUrl(src)} alt={`${destination.name} ${i + 1}`} loading="lazy" />
                      </figure>
                    ))}
                  </div>
                </Reveal>
              )}
            </div>

            <aside className="detail__aside">
              <div className="booking-card">
                <div>
                  <span className="eyebrow eyebrow--plain">Good to know</span>
                  <h3 className="h3" style={{ marginTop: '0.5rem' }}>
                    {destination.name} essentials
                  </h3>
                </div>
                <div className="booking-card__meta">
                  {destination.bestTimeToVisit && (
                    <div>
                      <span>
                        <Calendar size={13} style={{ display: 'inline', verticalAlign: '-2px' }} /> Best
                        time
                      </span>
                      <b>{destination.bestTimeToVisit}</b>
                    </div>
                  )}
                  {destination.country && (
                    <div>
                      <span>
                        <Globe size={13} style={{ display: 'inline', verticalAlign: '-2px' }} /> Country
                      </span>
                      <b>{destination.country}</b>
                    </div>
                  )}
                  <div>
                    <span>Packages</span>
                    <b>{packages.length || destination.packageCount || 0}</b>
                  </div>
                  {destination.rating > 0 && (
                    <div>
                      <span>Guest rating</span>
                      <b>{destination.rating} / 5</b>
                    </div>
                  )}
                </div>
                <div className="booking-card__actions">
                  <Link
                    href={`/request-proposal?destination=${destination.slug}`}
                    className="btn btn--dark"
                  >
                    Request a quote
                  </Link>
                  <Link href="/contact" className="btn btn--outline">
                    Talk to an expert
                  </Link>
                </div>
                <p className="booking-card__note">
                  Itineraries, hotels and dates are tailored to you — share your travel window and our
                  team will come back with options.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {packages.length > 0 && (
        <section className="section section--cream">
          <div className="container">
            <SectionHead
              eyebrow="Curated journeys"
              title={`${destination.name} <em>packages</em>`}
              sub="Every itinerary can be personalised — dates, hotels and pace."
              action={{ href: '/packages', label: 'All packages' }}
            />
            <div className="pkg-grid">
              {packages.slice(0, 6).map((pkg, i) => (
                <PackageCard key={pkg._id} pkg={pkg} delay={i * 60} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
