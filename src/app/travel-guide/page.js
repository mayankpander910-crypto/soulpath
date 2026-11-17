import Link from 'next/link';
import { getTravelGuides } from '@/lib/api';
import { PageHero } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { ArrowRight } from '@/components/Icons';
import TravelGuideBrowser from './TravelGuideBrowser';

export const revalidate = 300;

export const metadata = {
  title: 'International Travel Guides',
  description:
    'Where to go, month by month. Honest guides to the world’s most rewarding destinations — best time to visit, seasons and what to know before you book.',
  alternates: { canonical: '/travel-guide' },
};

export default async function TravelGuidePage() {
  const guides = await getTravelGuides();

  return (
    <>
      <PageHero
        eyebrow="Travel guides"
        title="Where to go, month by month"
        sub="Honest, human guides to the world's most rewarding destinations — what's great, what to know, and exactly when to go. Pick a month and start dreaming."
        crumbs={[{ label: 'Travel Guide' }]}
      />

      <section className="section" style={{ paddingTop: 'clamp(1.4rem, 3vw, 2.2rem)' }}>
        <div className="container">
          <TravelGuideBrowser guides={guides} />

          <Reveal
            style={{
              marginTop: 'clamp(2.4rem, 5vw, 4rem)',
              padding: 'clamp(1.6rem, 4vw, 3rem)',
              background: 'var(--cream)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.4rem',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ maxWidth: '52ch' }}>
              <span className="eyebrow">Found your next escape?</span>
              <h3 className="h2" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', marginTop: '0.7rem' }}>
                Let our curators build the itinerary
              </h3>
              <p style={{ marginTop: '0.6rem', color: 'var(--olive-soft)', fontSize: '0.94rem' }}>
                Tell us where and when, and our travel curators will craft a personalised itinerary for
                you — no obligation.
              </p>
            </div>
            <Link href="/request-proposal" className="btn btn--dark">
              Plan my trip <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
