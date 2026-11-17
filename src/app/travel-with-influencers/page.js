import Link from 'next/link';
import { getInfluencers, getInfluencerReels, getPackages, formatDate } from '@/lib/api';
import { mediaUrl } from '@/lib/config';
import { PageHero, SectionHead } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { ArrowRight, ArrowUpRight, Instagram, Youtube } from '@/components/Icons';

export const revalidate = 300;

export const metadata = {
  title: 'Travel with Influencers',
  description:
    'Join SoulPath Holiday creator trips — travel alongside your favourite creators on curated group departures and behind-the-scenes journeys.',
  alternates: { canonical: '/travel-with-influencers' },
};

const SOCIAL_ICON = { instagram: Instagram, youtube: Youtube };

export default async function InfluencersPage() {
  const [influencers, reels, packages] = await Promise.all([
    getInfluencers(),
    getInfluencerReels(),
    getPackages(),
  ]);
  const withTrips = influencers.filter((i) => i.upcomingTripCount > 0);
  const heroImage = packages[1]?.heroImage || packages[0]?.heroImage || influencers[0]?.photo;

  return (
    <>
      <PageHero
        eyebrow="Creator journeys"
        title="Travel with influencers"
        sub="Curated departures hosted by creators we actually travel with — same SoulPath planning, a little more storytelling."
        image={heroImage}
        crumbs={[{ label: 'Travel with Influencers' }]}
      />

      <section className="section" style={{ paddingTop: 'clamp(1.4rem, 3vw, 2.2rem)' }}>
        <div className="container">
          {withTrips.length > 0 ? (
            <>
              <SectionHead
                eyebrow="Upcoming departures"
                title="Creators with trips on the calendar"
                action={{ href: '/packages', label: 'All packages' }}
              />
              <div className="influencer-grid">
                {withTrips.map((inf, i) => (
                  <Reveal as="article" className="influencer-card" key={inf._id} delay={i * 60}>
                    <div className="influencer-card__photo">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={mediaUrl(inf.photo)} alt={inf.name} loading="lazy" />
                    </div>
                    <h3>{inf.name}</h3>
                    {inf.bio && <p>{inf.bio}</p>}
                    {inf.nextTrip && (
                      <p className="small muted">
                        Next trip: {inf.nextTrip.name || inf.nextTrip.destination || 'Announcing soon'}
                        {inf.nextTrip.travelDate ? ` · ${formatDate(inf.nextTrip.travelDate)}` : ''}
                      </p>
                    )}
                    {inf.socials?.length > 0 && (
                      <div className="influencer-card__socials">
                        {inf.socials.slice(0, 3).map((s, idx) => {
                          const Icon = SOCIAL_ICON[s.platform];
                          return (
                            <a
                              key={idx}
                              href={s.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${inf.name} on ${s.platform}`}
                            >
                              {Icon ? <Icon size={14} /> : s.platform}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </Reveal>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-state" style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
              <h3 className="h3">No creator departures on sale right now</h3>
              <p className="lede" style={{ maxWidth: '54ch', textAlign: 'center' }}>
                We run creator trips through the year and announce them here first. Tell us which
                creator or destination you&apos;d like to travel with and we&apos;ll keep you posted.
              </p>
              <Link href="/contact" className="btn btn--dark">
                Register your interest <ArrowRight size={14} />
              </Link>
            </div>
          )}

          {influencers.length > 0 && (
            <div style={{ marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
              <SectionHead eyebrow="Our creators" title="The people we travel with" />
              <div className="influencer-grid">
                {influencers.map((inf) => (
                  <article className="influencer-card" key={inf._id}>
                    <div className="influencer-card__photo">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={mediaUrl(inf.photo)} alt={inf.name} loading="lazy" />
                    </div>
                    <h3>{inf.name}</h3>
                    {inf.bio && <p>{inf.bio}</p>}
                    {inf.socials?.length > 0 && (
                      <div className="influencer-card__socials">
                        {inf.socials.slice(0, 3).map((s, idx) => (
                          <a
                            key={idx}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="small"
                          >
                            {s.platform}
                          </a>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          )}

          {reels.length > 0 && (
            <div style={{ marginTop: 'clamp(2.4rem, 5vw, 4rem)' }}>
              <SectionHead eyebrow="Reels" title="Reels from our creators" />
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  overflowX: 'auto',
                  paddingBottom: '0.6rem',
                  scrollSnapType: 'x mandatory',
                }}
              >
                {reels.map((reel) => (
                  <a
                    key={reel._id}
                    href={reel.url || reel.videoUrl || '/travel-with-influencers'}
                    target={reel.url ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    style={{
                      flex: '0 0 180px',
                      aspectRatio: '9 / 16',
                      borderRadius: 6,
                      overflow: 'hidden',
                      background: 'var(--sand)',
                      position: 'relative',
                    }}
                  >
                    {reel.thumbnail && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={mediaUrl(reel.thumbnail)}
                        alt={reel.caption || reel.influencerName || 'Creator reel'}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}

          <Reveal
            style={{
              marginTop: 'clamp(2.4rem, 5vw, 4rem)',
              padding: 'clamp(1.6rem, 4vw, 3rem)',
              background: 'var(--olive)',
              color: 'var(--ivory)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.4rem',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ maxWidth: '52ch' }}>
              <h3 className="h2" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.3rem)' }}>
                Want to host a journey with us?
              </h3>
              <p style={{ marginTop: '0.6rem', color: 'rgba(248,245,239,0.8)', fontSize: '0.94rem' }}>
                We partner with creators to design trips their audience actually books.
              </p>
            </div>
            <Link href="/contact" className="btn btn--light">
              Partner with us <ArrowUpRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
