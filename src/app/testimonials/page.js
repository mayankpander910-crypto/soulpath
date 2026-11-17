import Link from 'next/link';
import { PageHero, SectionHead, StatsStrip } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { ArrowRight, Star } from '@/components/Icons';
import { TESTIMONIALS, TESTIMONIAL_STATS } from '@/lib/content';
import { getDestinations } from '@/lib/api';

export const revalidate = 600;

export const metadata = {
  title: 'Testimonials',
  description:
    'Real reviews from real travellers — 500+ happy guests, a 4.9 average rating and journeys across 50+ destinations with SoulPath Holiday.',
  alternates: { canonical: '/testimonials' },
};

const initials = (name) =>
  name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

export default async function TestimonialsPage() {
  const destinations = await getDestinations();
  const heroImage = destinations[3]?.heroImage || destinations[0]?.heroImage;

  return (
    <>
      <PageHero
        eyebrow="Community"
        title="What our travellers say"
        sub="Real stories from real adventurers. Discover why thousands of travellers trust SoulPath Holiday for their dream vacations."
        image={heroImage}
        crumbs={[{ label: 'Testimonials' }]}
      />

      <section className="section" style={{ paddingTop: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
        <div className="container">
          <StatsStrip items={TESTIMONIAL_STATS} />

          <div style={{ marginTop: 'clamp(2rem, 4vw, 3.4rem)' }}>
            <SectionHead
              eyebrow="Verified reviews"
              title="Stories from the <em>road</em>"
              sub="Every review below was shared by a traveller who booked with us."
              action={{ href: '/packages', label: 'Explore packages' }}
            />
            <div className="testi-grid">
              {TESTIMONIALS.map((t, i) => (
                <Reveal as="article" className="testi-card" key={t.name} delay={(i % 3) * 70}>
                  <div className="testi__stars" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} size={13} />
                    ))}
                  </div>
                  <p>“{t.text}”</p>
                  <div className="testi-card__foot">
                    <span className="testi__avatar" aria-hidden="true">
                      {initials(t.name)}
                    </span>
                    <span>
                      <b>{t.name}</b>
                      <span>{t.city}</span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

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
            <div style={{ maxWidth: '46ch' }}>
              <h3 className="h2" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
                Ready to create your story?
              </h3>
              <p style={{ marginTop: '0.7rem', color: 'rgba(248,245,239,0.8)', fontSize: '0.94rem' }}>
                Join hundreds of happy travellers who have trusted us with their dream vacations.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <Link href="/packages" className="btn btn--light">
                Explore packages <ArrowRight size={14} />
              </Link>
              <Link href="/contact" className="btn btn--ghost-light">
                Talk to us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
