import Link from 'next/link';
import { PageHero } from '@/components/ui';
import { ArrowRight } from '@/components/Icons';

export const metadata = {
  title: 'Attractions',
  description:
    'Tours, tickets and experiences at your destination — from desert safaris to island day trips.',
  alternates: { canonical: '/attractions' },
};

export default function AttractionsPage() {
  return (
    <>
      <PageHero eyebrow="Coming soon" title="Attractions" crumbs={[{ label: 'Attractions' }]} />
      <section className="coming">
        <div className="container coming__inner">
          <span className="coming__badge">In development</span>
          <h2 className="h2" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            Book tours, tickets and experiences at your destination
          </h2>
          <p className="lede" style={{ textAlign: 'center' }}>
            We are working on this. In the meantime our team can arrange it for you directly.
          </p>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/destinations" className="btn btn--dark">
              Explore destinations <ArrowRight size={14} />
            </Link>
            <Link href="/contact" className="btn btn--outline">
              Talk to our team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
